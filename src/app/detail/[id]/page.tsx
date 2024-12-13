"use client"

import Comment from "@/components/Comment"
import Navbar from "@/components/Navbar/Navbar"
import Comments from "@/Models/comments"
import StarRatings from 'react-star-ratings'
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"


interface entertainemtData {
    _id: string,
    name: string,
    description: string,
    image: string,
    genera: [string],
   comment:[string]

}
interface commentArray{
   
        id: string,
        commets: string,
        userId: string,
    childId: string,
    genera:string[],
    
}

export default function DeatilSpecific({ params }: any) {
    const { id }: any = React.use(params)
    const objId = {
        id: id
    }
    const [data, setData] = useState<entertainemtData>()
    const[rating,setRating]=useState()
    const [addComment, setADdComment] = useState<Boolean>(false)
    const [getcommentData, setGetCommentData] = useState<any>()
    const [commentData, setCommentData] = useState({
        movieId: id,
        comment: "",
        userId:""
    })


    console.log(data)
    const AddComment = async() => {
        try {
            const responseOfComments = await axios.post("/api/comments/add", commentData)
            const allComments = responseOfComments.data.getData.replies
            setGetCommentData(allComments)

            setADdComment(!addComment)
        } catch (error) {
            toast.error("Cant add Comment")
            console.log(error)
        }
    }   
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post("/api/getSpecificData/", objId)
                setData(response.data.collection)
                setGetCommentData(response.data.collection.replies)
                console.log(response)
            } catch (error:any) {
                console.log(error)
            }
        }
        getData()
    },[])

    return <div className="flex">
        <Navbar/>
        <div className="p-7 flex flex-col items-center   ml-[300px] gap-5">
            <h1 className="text-3xl font-mono">{data?.name}</h1>

            {data && (<Image src={data.image} alt={data.name} width={400} height={800} />)}
            <div className="flex gap-5">
                <button className="bg-orange-400 p-2 border rounded-md text-white font-semibold">Watch Now</button>
                <button className="bg-blue-700 p-2 border rounded-md text-white font-semibold">Add to watchList</button>
                
            </div>
            <StarRatings starRatedColor="orange" value={rating} changeRating={(newRating) =>setRating(newRating)}   />
            <div className="flex flex-col items-center justify-center gap-3">
                <p className="font-serif text-justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.description}</p>
                <div className="flex justify-center">
                    {addComment?
                        <div className="flex flex-col w-full items-center gap-4">
                            <input className="border rounded-md border-gray-600 p-1 w-80" placeholder="add comment" onChange={(e) => setCommentData({...commentData,comment:e.target.value})}/>
                            <div className="flex justify-center gap-5">
                            <button className=" bg-blue-500 text-white p-2 border rounded-md" onClick={AddComment}>Add</button>
                                <button className=" bg-blue-500 text-white p-2 border rounded-md" onClick={()=>setADdComment(false)}>cancel</button>
                            </div>
                            
                    </div>:
                    <button className="bg-blue-500 text-white p-2 border rounded-md" onClick={()=>setADdComment(true)}>Add Comment</button>}
                   
                </div>
                {getcommentData && (
                    <div className="w-full">
                        {getcommentData.map((values: any, ind: number) => <Comment key={ind} id={values._id} comment={values.value} userId={values.userId} childId={values.childId} />)}
                    </div>

                )}
            </div>
            
        </div>
    </div>

    
    

}