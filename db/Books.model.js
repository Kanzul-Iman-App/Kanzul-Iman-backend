import mongoose  from "mongoose";



const BookSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    refAuthor:{
        type:String,
        lowercase:true
    },
    NumberofChapters:{
        type:Number,
        required:true,
    }
},{timestamps:true})



export const Book = mongoose.model('Book',BookSchema)
