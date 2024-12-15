import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    value: {
        type:String
    },
    entertainemtId:{type:mongoose.Schema.ObjectId, ref:"Entertainement"},
   
    UserName: {
        type: String,
        required:true,
    }

}, { timestamps: true })

const Comments=mongoose.models.Comment || mongoose.model("Comment",commentSchema)

export default Comments;