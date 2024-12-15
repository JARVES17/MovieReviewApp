import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {id}=requestBody
        console.log(id ,"get Specific")
        let collection = await Entertainement.findById(id)
        if (collection.replies.length === 0) {
            return NextResponse.json({success:true,collection},{status:200})
        }
         collection=await Entertainement.findById(id).populate("replies")
        return NextResponse.json({success:true,collection},{status:200})

    } catch (error:any) {
        return NextResponse.json({messgae:error},{status:300})
        
    }
}
export async function PUT(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {id,rating}=requestBody
        console.log(requestBody)
        const data = await Entertainement.findById({ _id: id })
        let paresVal = parseFloat(rating)
        console.log(typeof(rating))
        await Entertainement.updateOne({ _id: id }, {
            rating: data.rating+paresVal,
            totalRatingCount:parseFloat(data.totalRatingCount)+1,
        })
        return NextResponse.json({success:true,message:"Your rating added succesfully"},{status:200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({messgae:error},{status:300})
        
    }
}