import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        const response=NextResponse.json({message:"logout successfully",success:true})
        response.cookies.set("token","", { httpOnly: true })
        return response;
        
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"error in logout", success:true},{status:500})
        
    }
}