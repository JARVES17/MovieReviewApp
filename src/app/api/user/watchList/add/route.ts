import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { getInfo } from "@/helper/userInfo";
import User from "@/Models/userModel";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json()
        const userData = getInfo(request)
        
        await User.updateOne({ _id: userData.id }, {
            $push: {
                watchList:requestBody.id
            }
        })
        return NextResponse.json({message:"added to your WatchList", success:true},{status:201})
        
    } catch (error:any) {
        return NextResponse.json({message:error,success:false},{status:500})
        
    }
}