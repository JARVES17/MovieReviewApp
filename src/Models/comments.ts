import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    value: {
        type:String
    },
    entertainemtId:{type:mongoose.Schema.ObjectId, ref:"Entertainement"},
    childId: [{type:mongoose.Schema.ObjectId,ref:"Comment"}],
    userId:{type:mongoose.Types.ObjectId,ref:"User"}

}, { timestamps: true })

const Comments=mongoose.models.Comment || mongoose.model("Comment",commentSchema)

export default Comments;