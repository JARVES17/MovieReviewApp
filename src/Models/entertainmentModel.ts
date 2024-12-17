import mongoose from "mongoose"

const EntertainmentSchema=new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Please enter movie or seriesName"]
    },
    description: {
        type: String,
        required:[true,"Please enter discription"]
    },
    image: {
        type: String,
        required:[true,"Please upload  image"]
    },
    genera: {
        type: [String],
        required:[true,"Please enter genera"]
    },  
    isMovie: {
        type: Boolean,
        default:false
    },
    replies: {
        type: [{type:mongoose.Types.ObjectId, ref:"Comment"}],
    },
    isHidden: {
        type: Boolean,
        default:false
    },
    rating: Number,
    totalRatingCount:Number,
}, { timestamps: true })

const Entertainement = mongoose.models.Entertainement || mongoose.model("Entertainement", EntertainmentSchema)

export default Entertainement;