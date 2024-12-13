import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import Comments from "@/Models/comments";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const { movieId, userId, parentCommentId, comment } = requestBody
        if (comment==="") {
            return NextResponse.json({status:200})
        }
        const commentData = await Comments.create({
            value: comment,
        })
        await commentData.save()
         await Entertainement.updateOne({ _id: movieId }, {
            $push: {
                replies:commentData._id
            }
        })
        const getData = await Entertainement.findById({ _id: movieId }).populate("replies")
   
        return NextResponse.json({success:true,getData},{status:200})

    } catch (error:any) {
        return NextResponse.json({error},{status:500})
        
    }
}