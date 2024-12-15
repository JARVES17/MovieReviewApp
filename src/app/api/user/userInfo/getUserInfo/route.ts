import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { getInfo } from "@/helper/userInfo";
import User from "@/Models/userModel";
import { JwtPayload } from "jsonwebtoken";

connect()   
export async function GET(request: NextRequest) {
    try {
       
        const userData:JwtPayload= getInfo(request)
       
        const userDtata = await User.findById({ _id: userData.id })
      
        return NextResponse.json({message:"watchListData", success:true,userDtata},{status:200})
        
    } catch (error:unknown) {
        return NextResponse.json({message:error,success:false},{status:300})
        
    }
}

export async function PUT(request:NextRequest) {
    try {
        const userData:JwtPayload  = getInfo(request)
        const requestBody = await request.json()
        const { userName, name, password } = requestBody
        
        await User.updateOne({ _id: userData.id }, {
            username: userName,
            password: password,
            name:name
        })
        const user = await User.findById(userData.id)
        return NextResponse.json({message:"updated Successfully",user,success:true},{status:200})
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"error while updating user"},{status:300})
    }
}