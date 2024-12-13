"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface entertainemtData {
    id: string,
    name: string,
    description: string,
  url: string,
  genera:string[]
}
const Structure = ({ id, name, description, url }: entertainemtData) => {
    const router = useRouter()
    const handelRedirect = () => {
        router.push(`/detail/${id}`)
    }
  return (
      <div >
          
      <Image src={url} alt={name} width={200} height={500} onClick={handelRedirect}
        className='w-[200px] h-[300px] object-cover  cursor-pointer hover:scale-105 duration-200' />
      <div className='text-center mt-2 font-mono '>{name}</div>
      
          
      
    </div>
  )
}

export default Structure