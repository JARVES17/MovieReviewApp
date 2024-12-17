import { NextRequest, NextResponse } from "next/server";
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
        
    } catch (error:unknown) {
        return NextResponse.json({message:error,success:false},{status:500})
        
    }
}
export async function PUT(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const userData = getInfo(request)
        
        await User.updateOne({ _id: userData.id }, {
            $pull: {
                watchList:requestBody.id
            }
        })
        return NextResponse.json({message:"removed from your WatchList", success:true},{status:200})
        
    } catch (error:unknown) {
        return NextResponse.json({message:error,success:false},{status:500})
        
    }
}