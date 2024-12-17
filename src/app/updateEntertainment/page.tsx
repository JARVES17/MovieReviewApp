"use client"

import Navbar from "@/components/Navbar/Navbar"
import { entertainemtData, userData } from "@/types/types"
import axios from "axios"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export default function UpdateEntertainement() {
    const [ismovie, setIsmovie] = useState<boolean>()
    const [selectGenras, setSeletedGeneras] = useState<string[]>([])
    const [data, setData] = useState<[entertainemtData]>()
    const [updateData, setUpdateData] = useState({
        name: "",
        description: "",
        isMovie: true,
        file: null as File | null,
        imagePath: "",
    })
    const scrollRef=useRef(null)
    const genera = [
        {
            id: 1,
            value: "Scifi"
        },
        {
            id: 2,
            value: "Thriller"
        },
        {
            id: 3,
            value: "Adventure"
        },
        {
            id: 4,
            value: "Action"
        }
    ]
   


    

    const handelUpdate = (name:string,image:string,genera:[string],description:string,isMovie:boolean) => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        setUpdateData({ ...updateData, name: name, imagePath: image,description:description })
        setSeletedGeneras(genera)
        setIsmovie(isMovie)
     
    }
    const handelUpload = async () => {
        if (!updateData.file) {
            toast.error("please select file for update")
            return
        }
        //  FormData object
        const formData = new FormData();
        formData.append(`genera`, JSON.stringify(selectGenras))
        formData.append("name", updateData.name);
        formData.append("description", updateData.description);
        formData.append("isMovie", String(updateData.isMovie));
        formData.append("file", updateData.file);
        formData.append("imgPath", updateData.imagePath)
        try {
            const response = await axios.put("/api/entertainments/crData", formData)

            if (response.data.success) {
                toast.success(response.data.message)
                setUpdateData({ name: "", description: "", isMovie: false, file: null,imagePath:""})
                setSeletedGeneras([])
                getData()
               
            }

        } catch (error: unknown) {

            console.log(error)
            toast.error("cant add movies")
        }

    }
    const handelSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectGenras.includes(e.target.value) && (e.target.value !== "Select"))
            setSeletedGeneras([...selectGenras, e.target.value])


    }
    const removeGeneraFromArray = (values: string) => {
        const newArray: string[] = selectGenras.filter((genera) => genera !== values)
        setSeletedGeneras(newArray)

    }
    const handelDelete = async (id: string) => {
        const config = {
            data: {
                id: id
            }
        }
       try {
           const response = await axios.delete("/api/entertainments/crData/", config)
           if (response.data.success) {
               getData()
               toast.success("deleted successfully")
           }
       } catch (error:unknown) {
        toast.error("error occured while deleting ")
        
       }
    }
    const handelVisible = async (id: string) => {
        
           const data= {
                id: id
            }
        
        console.log(id)
        try {
            const response = await axios.patch("/api/entertainments/crData", data)
            if (response.data.success) {
                getData()
                toast.success("updated successfully")
            }
        } catch (error: unknown) {
            toast.error("error occured while updating ")

        }
        
    }
    const handelCancel = () => {
        setUpdateData({ name: "", description: "", isMovie: false, file: null, imagePath: "" })
        setSeletedGeneras([])
    }
    
    const getData = async () => {
        try {
            const response = await axios.get("/api/entertainments/patchVisible/")
            console.log(response.data)

            setData(response.data.alldata)
        } catch (error: unknown) {
            console.log(error)
        }
    }
  
    useEffect(() => {
        setUpdateData({ ...updateData, isMovie: ismovie })
    }, [ismovie])
       useEffect(() => {
            
       
            getData()
       }, [])
   return( <div className="flex">
            <Navbar/>
            <div className="p-7 flex flex-col items-center ml-[300px] gap-5 w-full">
           <h1 className="text-3xl font-sans">Update Page</h1>
           
           <table className="table-fixed w-full">
               <thead>
                   <tr className="bg-black text-white font-semibold h-14">
                       <th>Sr.</th>
                       <th>Name</th>
                       <th>Image</th>
                       <th>Movie/TvShow</th>
                       <th>Status</th>
                       <th>Upate</th>
                       <th>Hide</th>
                       <th>Delete</th>
                   </tr>
               </thead>
               <tbody>
                   {data ? data.map((values: entertainemtData, ind: number) => {
                       return (
                           <tr key={ind} className={`text-center text-dark-purple ${ind % 2 === 0 ? "bg-[#fff3ef]" :"bg-gray-300"}`} >
                               <td>{ind+1}</td>
                               <td>{values.name}</td>
                               <td className="flex justify-center"><Image className="object-cover w-[50px] h-[60px]" src={values.image} alt={values.name} width={50} height={50} /></td>
                               <td>{values.isMovie?"Movie":"TvShow"}</td>
                               <td>{values.isHidden?"Hidden":"Visible"}</td>
                               <td><button className="text-blue-500 border-blue-500 border rounded-md p-2 "
                               onClick={()=>handelUpdate(values.name,values.image,values.genera,values.description,values.isMovie)}>Update</button></td>
                               <td><button
                                   className="text-green-500 border-green-500 border rounded-md p-2"
                                   onClick={()=>handelVisible(values._id)}
                               >{values.isHidden ? "UnHide" : "Hide"}</button></td>
                               <td><button className="text-red-500 border-red-500 border rounded-md p-2 "
                               onClick={()=>handelDelete(values._id)}>Delete</button></td>
                        
                           </tr>
                       )
                   }) :
                       <tr>
                           <td>Error</td></tr>
                   }
                   
               </tbody>
           </table>




           <div className="w-full mt-20" ref={scrollRef}>
               <h1 className='font-semibold text-4xl w-full text-center'>Update Movies</h1>
               <div className='p-7 flex flex-col gap-4'>
                   <div className='mt-7 inline-flex gap-5'>
                       <input placeholder='Enter Name' value={updateData.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} readOnly className='border rounded-md border-gray-600 p-1 w-1/2' />
                       <input type='file' className='border rounded-md border-gray-600 p-1  w-1/2' onChange={(e) => setUpdateData({ ...updateData, file: e.target.files?.[0] ?? null })} />
                   </div>
                   <div>
                       <textarea value={updateData.description} onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })} className='border rounded-md border-gray-600 p-1 w-full h-40' placeholder='Discription' />
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
    </div>
   )
}