import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"


export const getInfo = (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value 
    
        const userData= jwt.verify(token, process.env.HIDDEN_KEY)
        return userData
        
    } catch (error:unknown) {

        console.log(error)
        return
        
        
    }
    
}