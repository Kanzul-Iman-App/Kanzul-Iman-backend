import { User } from "../db/User.model.js";
import bcrypt from "bcrypt"

// register User

const createUser = async (req, res) => {
    try {
        const { userName, userEmail, userLocation, password, gender, age, phoneNumber } = req.body;
        const user = {
            userName: userName,
            userEmail: userEmail,
            userLocation: userLocation,
            password: password,
            gender: gender,
            age: age,
            phoneNumber: phoneNumber
        }
        const existedUser = await User.findOne({
            $or: [{ userName }, { userEmail }]
        })
        if (existedUser) {
            return res.status(400).json({ message: "user already exists" })
        }

        const newUser = await User.create(user);
        console.log(`hello , ${userName}`)
        return res.status(201).json({ newUser })

    } catch (error) {
        console.log('Error :', error);
        return res.status(500).json({ error: error.message });
    }

}
// Login User

const loginUser = async (req, res) => {
    try {
        console.log('User Login !!!');
        const { userEmail, password } = req.body;
        if (!userEmail || !password) {
            return res.status(400).json({
                message: 'Email and Password are required'
            })
        }
        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password  : user not found'
            })
        }
        const issPasswordValid = await user.isPasswordValid(password);
        if (!issPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password : password is not valid'
            })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();


        user.token = refreshToken;
        await user.save();
        res.status(200).json({
            message: 'login successful',
            accessToken,
            user: {
                id: user._id,
                name: user.userName,
                email: user.userEmail,
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error. Please try again later'
        })
    }
}
// Logout User

const logoutUser = async (req, res) => {

    try {
        const userId = req.user._id;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.token = null;
        await user.save();

        return res.status(200).json({
            message: 'Logout Successful'
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error.Please try again later"
        })
    }
}
// get user 
const getUser = async(req, res)=>{
    try {
        console.log('finding the user');
        const user = req.user;    

        const userProfile = await User.findById(user._id).select("-password -token");
   
        if(!userProfile){
            res.status(404).json({
                message:"User not found !"
            })
        }
        res.status(200).json({userProfile, message : "the user is founded !!"});

    } catch (error) {
        res.status(500).json({message:"Server Error : Please try again later"});
    }
    
    
}




export { getUser }
export { logoutUser }
export { createUser };
export { loginUser };   
