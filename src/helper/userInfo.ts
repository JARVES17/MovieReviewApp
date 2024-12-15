import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest } from "next/server"


export const getInfo = (request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value 
    
        const userData= jwt.verify(token, process.env.HIDDEN_KEY) as JwtPayload
        return userData
        
    } catch (error) {

        console.log(error)
        return
        
        
    }
    
}