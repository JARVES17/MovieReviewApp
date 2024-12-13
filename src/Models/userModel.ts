import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please Enter userName"]
    },
    name: {
        type: String,
        required:[true,"Please Enter name"]
    },
    
    email: {
        type: String,
        required:[true,"Please Enter email"]
    },
    password: {
        type: String,
        required:[true,"Please Enter password"]
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    watchList: {
        type:[{type:mongoose.Types.ObjectId,ref:"Entertainement"}]
    },
    isVerified: {
        type: Boolean,
        default:false
    }


}, { timestamps: true })


const User=mongoose.models.users || mongoose.model("User",UserSchema)

export default User;