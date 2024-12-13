import connect from "@/dbConfig/dbConfig";
import Comments from "@/Models/comments";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody=await request.json()
        const { commentId, comment, userId } = requestBody
        
        console.log("hello")
        const replyComment = await Comments.create({
            value: comment,
        })
       await Comments.updateOne({ _id: commentId }, {
           $push: {
                childId:replyComment._id
            }
       })
             console.log("comment Dtaa")
        const commentData = await Comments.findById({ _id: commentId }).populate("childId")
   
        console.log(commentData)
       

        return NextResponse.json({commentData},{status:200})

        
    } catch (error:any) {
        return NextResponse.json((error),{status:500}) 
        
    }
}

