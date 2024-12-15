import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"


export const getInfo = (request)=>{
    try {
        const token = request.cookies.get("token")?.value 
    
        const userData= jwt.verify(token, process.env.HIDDEN_KEY)
        return userData
        
    } catch (error) {

        console.log(error)
        return
        
        
    }
    
}