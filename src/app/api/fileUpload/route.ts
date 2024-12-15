import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


export async function POST(request: NextRequest) {
    try {
    
        const requestBody = await request.formData()
        const file: File | null = requestBody.get("file") as File
        console.log(file)
        if (!file) {
            return NextResponse.json({ message: "file not uploded" }, { status: 300 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
       
        const fileName = file.name.replaceAll(" ", "_")
        await writeFile(path.join(process.cwd(), "public/upload/" + fileName), buffer)

        return NextResponse.json({ success: true, message: "file Upload sucessfully" }, { status: 200 })
       
    } catch (error: unknown) {
        return NextResponse.json({ message: error })
    }

}