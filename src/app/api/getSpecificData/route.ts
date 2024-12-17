import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {id}=requestBody
        let collection = await Entertainement.findById({ _id: id })
     
        if (collection.replies.length === 0) {
            return NextResponse.json({success:true,collection},{status:200})
        }
        collection = await Entertainement.findById({_id:id}).populate("replies")
       
        return NextResponse.json({success:true,collection},{status:200})

    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({messgae:error},{status:300})
        
    }
}
export async function PUT(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {id,rating}=requestBody
      
        const data = await Entertainement.findById({ _id: id })
        const paresVal = parseFloat(rating)
      
        await Entertainement.updateOne({ _id: id }, {
            rating: data.rating+paresVal,
            totalRatingCount:parseFloat(data.totalRatingCount)+1,
        })
        return NextResponse.json({success:true,message:"Your rating added succesfully"},{status:200})

    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({messgae:error},{status:300})
        
    }
}