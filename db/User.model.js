import mongoose from "mongoose"
 

const userSchema = new mongoose.Schema({
    
    userId:{
        type:Number,
        required:true,
        unique:true,
    },
    
    userName :{
        type:String ,
        required : true,
        unique : true,
        lowercase:true
    },
    userEmail :{
        type:String ,
        required : true,
        unique : true,
        lowercase:true
    },
    userLocation:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        enum:['F',"M"],
    },
    Age:{
        type:Number,
    },
    phoneNumber:{
        type:String,
         match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"] // for the validation of the mobile number 
    },
    tokens:{
        type: String
    }

},{timestamps:true});


export const User = mongoose.model("User",userSchema)