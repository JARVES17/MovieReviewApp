"use client"

import Comment from "@/components/Comment"
import Navbar from "@/components/Navbar/Navbar"
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import Rating from "@/components/Rating"
import { commentArray, entertainemtData, userData } from "@/app/types/types"

interface DetailSpecificProps {
    params: {
        id: string|any; 
    };
}

export default function DeatilSpecific({ params }: DetailSpecificProps) {
    const { id }=params
    console.log(typeof(id),"id")
    const [userData, setUserData] = useState<userData>()
    const [added, setAdded] = useState(false)
    const [data, setData] = useState<entertainemtData>()
    const[rating,setRating]=useState()
    const [addComment, setADdComment] = useState<boolean>(false)
    const [getcommentData, setGetCommentData] = useState<[commentArray]>()
    const [commentData, setCommentData] = useState({
        movieId: id,
        comment: "",
        userId:""
    })
    const objId = {
        id: id,
        rating: rating
    }
   

 
    const AddComment = async() => {
        try {
            const responseOfComments = await axios.post("/api/comments/add", commentData)
            const allComments = responseOfComments.data.getData.replies
            setGetCommentData(allComments)

            setADdComment(!addComment)
        } catch (error: unknown) {
            toast.error("Cant add Comment")
            console.log(error)
        }
    }   
    const addToWatchList = async () => {
        try {
            const response = await axios.post("/api/user/watchList/add", objId)
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
                setAdded(true)
            }
              
            
        } catch (error: unknown) {
            console.log(error)
            toast.error("Cant add to watchList")
        }
    }
   
 
    const getData = async () => {
        try {
            const response = await axios.post("/api/getSpecificData/", objId)

            setData(response.data.collection)
            setGetCommentData(response.data.collection.replies)
           
        } catch (error: unknown) {
            console.log(error)
        }
    }
    const getUserData = async () => {
        try {
            const responseofuser = await axios.get("/api/user/userInfo/getUserInfo")
            setUserData(responseofuser.data.userDtata)
        } catch (error: unknown) {
            console.log(error)
        }
    }
    const updateRating = async () => {
        try {
            const response = await axios.put("/api/getSpecificData/", objId)
            if (response.data.success) {
                toast.success(response.data.message)
                getData()
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error("cant update Rating")

        }

    }

    useEffect(() => {
        
        getUserData()
        
        getData()
    }, [])

    return <div className="flex">
        <Navbar/>
        <div className="p-7 flex flex-col items-center ml-[300px] gap-5 w-full">
            <h1 className="text-3xl font-mono">{data?.name}</h1>

            {data && (<Image src={data.image} alt={data.name} width={400} height={800} />)}
            <div className="flex gap-5">
                <button className="bg-orange-400 p-2 border rounded-md text-white font-semibold">Watch Now</button>

                {userData && (userData.watchList.includes(id) ||added) ? <button className="bg-blue-700 p-2 border rounded-md text-white font-semibold" onClick={addToWatchList}>Remove</button> :
                    <button className="bg-blue-700 p-2 border rounded-md text-white font-semibold" onClick={addToWatchList}>Add to watchList </button>
                }
               
                
                
            </div>
            <div className="flex gap-2">
                <button onClick={updateRating} className="text-gray-400">Add</button>
                <Rating setRating={setRating} rating={rating} />
            </div>
            <p>{(data?.rating / data?.totalRatingCount) || 0}</p>
            <div className="flex flex-col items-center justify-center w-full gap-3">
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
                        {commentData && getcommentData.map((values: commentArray|any , ind: number) => <Comment userInfo={userData} key={ind} id={values._id} movieId={data._id} comment={values.value} userId={values.UserName}  />)}
                    </div>

                )}
            </div>
            
        </div>
    </div>

    
    

}