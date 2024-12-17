import connect from "@/dbConfig/dbConfig"
import User from "@/Models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect()


export  async function GET() {
    try {
        const allUsers = await User.find()
        if (!allUsers) {
            return NextResponse.json({message:"Cant get user data"},{status:400})
        }

        return NextResponse.json({message:"user Data",allUsers},{status:200})
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"error in get user"},{status:500})
        
    }
}
export  async function PATCH(request:NextRequest) {
    try {
        const requestBody=await request.json()
        const { id } = requestBody
        const getUser=await User.findById({_id:id})
          await User.updateOne({ _id: id }, {
            isBlocked:!getUser.isBlocked
         })

        return NextResponse.json({message:"user updated ",success:true},{status:200})
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"error in get user"},{status:500})
        
    }
}