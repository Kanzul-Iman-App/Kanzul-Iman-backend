import mongoose from "mongoose";
const lastreadSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastRead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
},{timestamps:true})
export const LastRead = mongoose.model('LastRead',lastreadSchema)