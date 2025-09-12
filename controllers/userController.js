import { User } from "../db/User.model.js";

const createUser = async(req, res) => {
    try {
        console.log("Creating new user!!");
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
        const newUser = await User.create(user);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log('Error :', error);
        return res.status(500).json({ error: error.message });
    }

}
export { createUser };