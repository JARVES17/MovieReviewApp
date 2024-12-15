import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const getInfo = (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value 
    
        const userData:string|JwtPayload= jwt.verify(token, process.env.HIDDEN_KEY)
        return userData
        
    } catch (error:unknown) {
       return NextResponse.json({ message: "token cant verify", success: false,error }, { status: 300 })
        
        
    }
    
}