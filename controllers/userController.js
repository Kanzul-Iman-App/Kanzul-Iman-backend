import express from "express"
import { User } from "../db/User.model.js";
const app = express();

const createUser = async(req, res) => {
    try {
        console.log("NEW USER");
        const { username, email } = req.body();
        const user = {
            username: username,
            email: email,
        }
        const newUser = await User.create(user);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log('Error :', error);
    }

}
export { createUser };