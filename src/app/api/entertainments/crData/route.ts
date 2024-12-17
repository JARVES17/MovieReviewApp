import { entertainemtData } from "@/types/types";
import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { writeFile } from "fs/promises";
import {NextResponse,NextRequest} from "next/server"
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises"


connect()
 
interface Results{
    public_id: string,
    [key:string]:string
    }

export async function POST(request: NextRequest) {
    
    try {
        cloudinary.config({ 
        cloud_name:process.env.NAME, 
        api_key:  process.env.API_KEY, 
        api_secret: process.env.SECRET_KEY
 });
        
        const requestBody = await request.formData()
        const name=requestBody.get("name")
        const description=requestBody.get("description")
        const isMovie=requestBody.get("isMovie")
        const file = requestBody.get("file") as File | null
        const generas = requestBody.get("genera") as string
        const retriveArr = JSON.parse(generas)
       if (!file) {
        return NextResponse.json({ message: "file not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = new Promise<Results>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            
            { folder: "movie-Image" },
            (err, result) => {
                if (err) {
                    console.log(err.message)
                    reject(err.message); // Reject if there's an error
                } else {
                    resolve(result as Results); // Resolve the result with the correct type
                }
            }
        );
        uploadStream.end(buffer); // Finish the upload process
    });
    
        const uploadResult = await result;
        
        const data=await Entertainement.create({
            name: name,
            description: description,
            isMovie: isMovie,
            generas: retriveArr,
            image:uploadResult.url,
            rating: 0,
            totalRatingCount:0
           
        })
        console.log(data)
        return NextResponse.json({success:true,message:"movie added"},{status:200})
        
    } catch (error: unknown) {
        
        console.log("File upload error",error)
        return NextResponse.json({success:false},{status:400})
        
    }
}

export async function GET() {
    try {
        let data: entertainemtData[] = await Entertainement.find()
        data=data.filter(items=>!items.isHidden)
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
export async function PUT(request: NextRequest) {
    try {
         const requestBody = await request.formData()
        const name=requestBody.get("name")
        const description=requestBody.get("description")
        const isMovie = requestBody.get("isMovie")
        const imgPath=requestBody.get("imgPath")
        const file = requestBody.get("file") as File
        const generas = requestBody.get("genera") as string
        const retriveArr = JSON.parse(generas)
        console.log("success")
      
            const bytes=await file.arrayBuffer()
            const bufferArray = Buffer.from(bytes)
             const newPath = `/upload/${file.name.replaceAll(" ","_")}`
            await writeFile(path.join(process.cwd(), "/public" + newPath), bufferArray)
            await fs.unlink("public"+imgPath)
            const newCollection = await Entertainement.updateOne({name:name},{
            description: description,
            isMovie: isMovie,
            image:newPath,
            genera: retriveArr,
            
            })
           
            return NextResponse.json({message:"Successfully updated entertainement",success:true,newCollection},{status:200})
    
        
        
        
        
        
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"cant update entertainemt"},{status:500})
        
    }
    
}

export async function DELETE(request: NextRequest) {
    try {
        const requestBody=await request.json()
        console.log(requestBody.id)
        
        await Entertainement.deleteOne({ _id: requestBody.id })
        return NextResponse.json({message:"Deleted Succesfully",success:true},{status:200})

    } catch (error:unknown) {
         console.log(error)
        return NextResponse.json({message:"cant Delete entertainemt"},{status:500})
    }
    
}
export async function PATCH(request:NextRequest) {
    try {
         const requestBody=await request.json()
        
        const { id } = requestBody
    
        const data = await Entertainement.findById({ _id:id})
        console.log(data)
        await Entertainement.updateOne({ _id:id }, {
            isHidden:!data.isHidden
        })
        return NextResponse.json({message:"Updated successfully",success:true},{status:200})
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:500})
        
    }
}