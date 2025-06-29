import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken:String,
    forgetPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

// const User=mongoose.model("users",userSchema)


// Check if the model already exists to avoid overwriting it
// If it exists, use the existing model; otherwise, create a new one

//mongoose.models("databaseName",SchemaName)
const User=mongoose.models.users||mongoose.model("users",userSchema)
export default User