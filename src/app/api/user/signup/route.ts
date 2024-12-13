import User from "@/Models/userModel"
import connect from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"


connect()

export async function POST(request: NextRequest) {
    try {
        const requestbody=await request.json()
        const{username,email,password}=requestbody

        const userPresent=await User.findOne({email:email})

        if (userPresent) {
            return NextResponse.json({message:`user is already Present with this email:${email}`},{status:300})
        }
        const user = await User.create({
            username: username,
            email: email,
            password:password
            
        })

        return NextResponse.json({
            message: "welcome to MoVieApp",
            success: true,
            user
        },{status:201})
        
    } catch (error:any) {
        return NextResponse.json({message:"error Occured while Signup"},{status:300})
        
    }
}