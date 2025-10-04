import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    userLocation: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['F', "M"],
    },
    age: {
        type: Number,
    },
    phoneNumber: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"] // for the validation of the mobile number 
    },
    token: {
        type: String
    }

}, { timestamps: true });

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password , 10)
    next()
})
// password checking 
userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password , this.password )
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.userEmail,
        username:this.userName,
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { _id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}
export const User = mongoose.model("User", userSchema)