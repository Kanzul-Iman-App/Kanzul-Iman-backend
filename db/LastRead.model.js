import mongoose from "mongoose";

const LastreadSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    BookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
},{timestamps:true})


export const LastRead = new mongoose.model('LastRead',LastreadSchema)