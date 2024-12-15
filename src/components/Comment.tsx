"use client"
import { userData } from '@/app/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface commentProps{
  comment: string,
  userId: string,
  id: string,
  movieId: string,
  userInfo:userData
}
export default function Comment({ comment, userId, id, movieId, userInfo }:commentProps) {

  const [commentDelte, setCommetDelete] = useState(true)
  
  const obj: { commentId: string; movieId: string } = {
    commentId: id,
    movieId: movieId
  };
  console.log(userInfo,userId)
  const deleteComment = async () => {
    try {
      const response = await axios.patch("/api/comments/add/", obj)
      
      if (response.data.success) {
        setCommetDelete(false)
        toast.success("comment deleted succesfully")
      }
    } catch (error: unknown) {
      console.log(error)
      toast.error("error while deleting comment")
      
    }
  }
  useEffect(() => {
    
  },[])
  return (
    
    <div className={`border rounded bg-[#e6e6e6]  p-2 my-5 flex flex-col justify-end  ${commentDelte?"":"hidden"}`}>
      <p className='font-semibold underline text-dark-purple'>{userId}</p>
      <p className='inline-flex ml-20 font-serif justify-between'>Comment:{comment}
        {userInfo.username===userId?
          <button className='p-2 bg-red-500 text-white border rounded-md' onClick={deleteComment}>Delete</button>:""
        }
        
      </p>
    
     
      
    </div>
    
    
  )
}

