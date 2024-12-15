import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const getInfo = (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value 
        if (token === "")
            return NextResponse.json({ message: "Cant get token", success: false }, { status: 300 })
        const userData:any = jwt.verify(token, process.env.HIDDEN_KEY)
       
        if (!userData)
            return NextResponse.json({ message: "token cant verify", success: false }, { status: 300 })
        
        console.log(userData)
        return userData
        
    } catch (error:any) {
        throw new Error(error)
        
    }
    
}