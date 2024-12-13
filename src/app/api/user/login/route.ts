import connect from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody=await request.json()
        const { email, password } = requestBody
        const userPresent=await User.findOne({email:email})

        if (!userPresent) {
            return NextResponse.json({message:`we cannot find user with  this emial:${email}`})
        }
        const passwordCheck=password===userPresent.password?true:false
        if (!passwordCheck) {
            return NextResponse.json({message:`${userPresent.username} we think you have entered wrong password`},{status:300})
        }
        const tokenPayload = {
            id: userPresent._id,
            username: userPresent.username,
            email:userPresent.email
        }
        const token = jwt.sign(tokenPayload, process.env.HIDDEN_KEY!)
        
        const response = NextResponse.json({
            message: "welcome to MovieReviewApp",
            success: true,
            userPresent
        },{status:200})
            response.cookies.set("token",token)
        
        return response;
        
    } catch (error: any) {
        return NextResponse.json({message:"error occured while loging in"},{status:300})
    }
}