import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { getInfo } from "@/helper/userInfo";
import User from "@/Models/userModel";

connect()   
export async function GET(request: NextRequest) {
    try {
   
        const userData = getInfo(request)
        let user = await User.findById({ _id: userData.id })
        if (user.watchList.length === 0) {
            return NextResponse.json({message:"no Movies are added", success:false},{status:300})
        }

         user=await User.findById({ _id: userData.id}).populate("watchList")
     
        const alldata = user.watchList
      
        return NextResponse.json({message:"watchListData", success:true,alldata},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message,success:false},{status:300})
        
    }
}