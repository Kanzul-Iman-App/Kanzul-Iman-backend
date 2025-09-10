import mongoose  from "mongoose";

const bookSchema = new mongoose.Schema({
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
    numberofChapters:{
        type:Number,
        required:true,
    }
},{timestamps:true})

export const Book = mongoose.model('Book',bookSchema)
