import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import Comments from "@/Models/comments";
import { NextRequest, NextResponse } from "next/server";
import { getInfo } from "@/helper/userInfo";

connect()

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const userData = getInfo(request)
        const { movieId, comment } = requestBody
        if (comment==="") {
            return NextResponse.json({message:"enter value to addComment"},{status:400})
        }
        const commentData = await Comments.create({
            value: comment,
            UserName:userData.username
        })
        await commentData.save()
         await Entertainement.updateOne({ _id: movieId }, {
            $push: {
                replies:commentData._id
            }
        })
        const getData = await Entertainement.findById({ _id: movieId }).populate("replies")
   
        return NextResponse.json({success:true,getData},{status:200})

    } catch (error:unknown) {
        return NextResponse.json({message:error},{status:500})
        
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const requestBody = await request.json()
        console.log(requestBody)
        await Comments.deleteOne({_id:requestBody.commentId})

        await Entertainement.updateOne({ _id: requestBody.movieId }, {
            $pull: {
                replies:requestBody.commentId
            }
        })
        return NextResponse.json({message:"comment delted succesfully",success:true},{status:200})
    } catch (error:unknown) {
        return NextResponse.json({message:"error occured while deleting comment",error:error})
        
    }
}