import { v2 as cloudinary } from 'cloudinary';
import { NextRequest,NextResponse } from 'next/server';

 cloudinary.config({ 
        cloud_name: process.env.NAME, 
        api_key:  process.env.API_KEY, 
        api_secret: process.env.SECRET_KEY
 });
interface result{
    public_id: string,
    [key:string]:any
    }

export async function POST(request:NextRequest) {
    try {
        
        const requestBody = await request.formData()
        const name=requestBody.get("name")
        const description=requestBody.get("description")
        const isMovie=requestBody.get("isMovie")
        const file = requestBody.get("file") as File
        const generas = requestBody.get("genera") as string
        const retriveArr = JSON.parse(generas)
        

        
    } catch (error:unknown) {
        console.log("File upload error",error)
        return NextResponse.json({success:false},{status:400})
        
    }
}