"use client"
import Navbar from '@/components/Navbar/Navbar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AddEntertainement() {
    const router = useRouter()
    const genera = [
        {
            id: 1,
            value:"Scifi"
        },
        {
            id: 2,
            value:"Thriller"
        },
        {
            id: 3,
            value:"Adventure"
        },
        {
            id: 4,
            value:"Action"
        }
    ]
    const [ismovie, setIsmovie] = useState<boolean>(true)
    const [selectGenras, setSeletedGeneras] = useState<string[]>([])
    const [data, setdata] = useState({
        name: "",
        description: "",
        isMovie: true,
        file: null as File | null ,
    })
    console.log(data)

    useEffect(() => {
        setdata({...data,isMovie:ismovie})
    }, [ismovie])
    
    const handelUpload = async () => {
        
        if (!data.file) {
            toast.error("Please Select File to upload")
            return;
        }

        //  FormData object
        const formData = new FormData();
        formData.append(`genera`, JSON.stringify(selectGenras))
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("isMovie", String(data.isMovie)); 
        formData.append("file", data.file); 
        try {
            const response = await axios.post("/api/entertainments/crData", formData)
        
            if (response.data.success) {
                toast.success(response.data.message)
                setdata({ name: "", description: "", isMovie: false, file: null })
                setSeletedGeneras([])
            }
            
        } catch (error: unknown) {
            
            console.log(error)
            toast.error("cant add movies")
        }
        
    }
    const handelSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectGenras.includes(e.target.value) && (e.target.value !== "Select"))
        setSeletedGeneras([...selectGenras,e.target.value])
       
        
    }
    const removeGeneraFromArray = (values: string) => {
        const newArray:string[] = selectGenras.filter((genera) => genera !== values)
        setSeletedGeneras(newArray)
        
    }
    const handelCancel = ()=>{
        router.push("/home")
    }

    return (
        <div className="flex w-full ">
            <Navbar />
            <div className="p-7 flex flex-col  justify-center h-screen  float-right flex-grow pl-[300px]">
                <h1 className='font-semibold text-4xl inline-flex justify-center'>Add Movies</h1>
                <div className='p-7 flex flex-col gap-4'>
                    <div className='mt-7 inline-flex gap-5'>
                        <input placeholder='Enter Name' value={data.name} onChange={(e)=>setdata({...data,name:e.target.value})} className='border rounded-md border-gray-600 p-1 w-1/2' />
                        <input type='file' className='border rounded-md border-gray-600 p-1  w-1/2' onChange={(e)=>setdata({...data,file:e.target.files?.[0] ?? null })} />
                    </div>
                    <div>
                        <textarea value={data.description} onChange={(e) => setdata({ ...data, description: e.target.value })} className='border rounded-md border-gray-600 p-1 w-full h-40' placeholder='Discription' />
                    </div>
                    <div className=' h-10 shadow-gray-600 flex justify-around '>
                        <div className='w-1/3'>
                            <button className={`text-white font-semibold ${ismovie ? "bg-blue-500" : "bg-red-600"} w-20 p-2 border rounded-md`}
                                onClick={() => setIsmovie(!ismovie)}>{ismovie ? "Movie" : "TvShow"}</button>
                       </div>
                        <div className='w-1/3'>
                            <select className='border border-black rounded-md h-full w-50' onChange={(e) => handelSelection(e)} >
                                <option>Select</option>
                                {genera.map((generas) => {
                                    return <option key={generas.id}>{generas.value}</option>
                                })}
                            </select>
                       </div>
                        <div className='w-1/3 flex gap-3'>
                            {setSeletedGeneras && selectGenras.map((values) => {
                                return <div key={values} className='flex bg-gray-400 shadow-slate-500 w-1/4 items-center justify-center border rounded-md gap-2'>
                                    <span className='text-white'>{values}  </span>
                                    <button onClick={() => removeGeneraFromArray(values)} className='text-red-200'>X</button>
                                </div>
                            })}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="inline-flex justify-around">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white border rounded-md p-2" onClick={handelUpload}>Upload</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white border rounded-md p-2" onClick={handelCancel}>Cancel</button>
                       
                    </div>
                    
                </div>
                
            </div>
        </div>

    )
}
