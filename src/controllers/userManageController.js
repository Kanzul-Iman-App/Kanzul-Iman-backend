import { User } from "../db/User.model.js";


// to update the profile 

const updateProfile = async (req, res) => {
    try {
        const { userName, userEmail, userLocation, gender, age, phoneNumber } = req.body;
        const updateData = {}
        if (userName) updateData.userName = userName
        if (userEmail) updateData.userEmail = userEmail
        if (userLocation) updateData.userLocation = userLocation
        if (gender) updateData.gender = gender
        if (age) updateData.age = age
        if (phoneNumber) updateData.phoneNumber = phoneNumber

        const userId = req.user._id;
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: 'profile updated'
        })



    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server error. Please try again later'
        })
    }
}


// change user password  
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user._id;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "old password and new password are required"
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await user.isPasswordValid(oldPassword);

        if (!isPasswordValid) {
            return res.status(401).json(
                {
                    "success": false,
                    "error": "incorrect password"
                })
        }
        user.password = newPassword;5
        await user.save({validateBeforeSave : false })


        return res.status(200).json({
            message: 'password updated'
        })


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Server error.Please try again later"
        })
    }
}


export { updateProfile }
export { changePassword }