import { entertainemtData } from "@/app/types/types";
import connect from "@/dbConfig/dbConfig";
import Entertainement from "@/Models/entertainmentModel";
import { writeFile } from "fs/promises";
import {NextResponse,NextRequest} from "next/server"
import path from "path";

connect()


export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.formData()
        const name=requestBody.get("name")
        const description=requestBody.get("description")
        const isMovie=requestBody.get("isMovie")
        const file = requestBody.get("file") as File
        const generas = requestBody.get("genera") as string
        const retriveArr=JSON.parse(generas)
        
        
        const arr:string[]=[]
       retriveArr.forEach((element:{value:string}) => {
            arr.push(element.value)
        });
   
        const collection=await Entertainement.findOne({name:name})

        if (collection) {
            return NextResponse.json({success:false,message:`This Movie ${name} already Present on Website`},{status:300})
        }

        const bytes=await file.arrayBuffer()
        const buffer=Buffer.from(bytes)

        const uploadPath = `public/upload/${file.name.replaceAll(" ", "_")}`
        await writeFile(path.join(process.cwd(), uploadPath), buffer)

        const getPath=`/upload/${file.name.replaceAll(" ", "_")}`
        
        const newCollection = await Entertainement.create({
            name: name,
            description: description,
            isMovie: isMovie,
            image: getPath,
            genera: arr,
            rating: 0,
            totalRatingCount:0
            
        })
        return NextResponse.json({
            success: true, message: "added successfully",
           newCollection
       },{status:200})
        
    } catch (error:unknown) {
        return NextResponse.json({sucess:false,message:"error occured while adding in entertaiment model",error:error},{status:300})
        
    }
}

export async function GET() {
    try {
        const data:entertainemtData[] = await Entertainement.find()
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