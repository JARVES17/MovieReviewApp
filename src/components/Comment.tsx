"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from "@/components/Comment"
import { toast } from 'sonner'

export default function Comment({ comment, childId, userId, id }: any) {

  const[childComments,setChildComments]=useState<any>()
  const[replyInput,setReplyInput]=useState(false)
  const [commentData, setCommentData] = useState({
          commentId: id,
          comment: "",
          userId:""
      })
  const AddReply = async() => {
    try {
      setReplyInput(false)
      const responseOfComments = await axios.post("/api/comments/reply/", commentData)
      setChildComments(responseOfComments.data.commentData)
      console.log(responseOfComments)
    } catch (error) {
      toast.error("Cant add Comment")
      console.log(error)
    }
    
  }
  return (
    
    <div className="border border-black my-5 flex flex-col">
      
      <p className='inline-flex'>{comment}</p>
      {/* <button className="bg-blue-500 inline-flex justify-center text-white p-2 border rounded-md w-min p-y"
        onClick={() => setReplyInput(true)}>Reply</button>  
      {replyInput && 
        (<div>
        <input className='border rounded-md border-gray-600 p-1 w-80'
          value={commentData.comment} onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}/>
        <button onClick={AddReply}>Add</button>
      </div>)
      }
     */}
      
    </div>
    
    
  )
}

