import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Provide provide a password"]
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{           //Better approach to go with roles instead of such isAdmin
        type:Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("User", userSchema); // MongoDB create database as users even if we provide the name as "User" or "user"


export default User;