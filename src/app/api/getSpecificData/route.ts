import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {id}=requestBody
        console.log(id ,"get Specific")
        const collection = await Entertainement.findById(id).populate("replies")
        return NextResponse.json({success:true,collection},{status:200})

    } catch (error:any) {
        return NextResponse.json({messgae:error},{status:500})
        
    }
}