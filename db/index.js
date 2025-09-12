import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(console.log("MONGODB CONNECTED!!!"))
    } catch (error) {
        console.log("ERROR !", error)
    }
}

export default connectDB;