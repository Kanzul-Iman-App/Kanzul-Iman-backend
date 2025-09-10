import dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT;

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(console.log("MONGODB CONNECTED!!!"))
        app.on("error", (error) => {
            console.log("ERROR !", error);
            throw error
        })
        app.listen(PORT, () => {
            console.log(`app is listening on port :${PORT}`);

        })
    } catch (error) {
        console.log("ERROR !", error)
    }
}

export default connectDB;