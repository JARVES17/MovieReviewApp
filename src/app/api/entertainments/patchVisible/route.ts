import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { entertainemtData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET() {
    try {
        const data: entertainemtData[] = await Entertainement.find()
        
        if (!data) {
            return NextResponse.json({success:false,message:"Something Went Wrong Try again later"},{status:404})
        }
        
       
        return NextResponse.json({
            success: true,
            alldata:data,
        },{status:200})
    } catch (error:unknown) {
        return NextResponse.json({error},{status:400})
        
    }
}