"use client"
import Navbar from '@/components/Navbar/Navbar'
import axios from 'axios'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Setting() {
    
    const [userData, setUserData] = useState({
        name: "",
        userName: "",
        password: "",
        email:"",
    })
    const getUserData = async () => {
        try {
            const response = await axios.get("/api/user/userInfo/getUserInfo")
            if (response.data.success) {
                const data = response.data.userDtata
                setUserData({ name: data.name, email: data.email, userName: data.username, password: data.password })
            }
           
       } catch (error) {
        toast.error(error.data.message)
        
       }
    }
    const updateUser = async () => {
        try {
            const response = await axios.put("/api/user/userInfo/getUserInfo", userData)
            if(response.data.success) {
                toast.success(response.data.message)
                const data = response.data.userDtata
                setUserData({ name: data.name, email: data.email, userName: data.username, password: data.password })
            }
            
        } catch (error:unknown) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getUserData()
    },[])
    return (
        <div className="flex ">
            <Navbar />
            
            <div className=" ml-[300px] flex flex-col  h-screen w-full items-center">
                <div className='w-1/2 flex justify-center h-full gap-3 flex-col items-center'>

                    <h1 className="text-2xl font-semibold">User Setting Page</h1>
                    <div className="w-[80%] flex flex-col gap-1">
                        <label htmlFor="email" className="text-gray-500">Email</label>
                        <input id="email" readOnly
                            value={userData.email}
                            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                            placeholder="Email"
                            
                            />

                    </div>
                    <div className="w-[80%] flex flex-col gap-1">
                        <label htmlFor="UserName" className="text-gray-500">UserName</label>
                        <input id="UserName"
                            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                            placeholder="Change UserName"
                            value={userData.userName}
                            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            />

                    </div>
                    <div className="w-[80%] flex flex-col gap-1">
                        <label htmlFor="Name" className="text-gray-500">Name</label>
                        <input id="Name"
                            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                            placeholder="Change Name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            />

                    </div>
                    <div className="w-[80%] flex flex-col gap-1">
                        <label htmlFor="password" className="text-gray-500">Password</label>
                        <input id="password"
                            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                            placeholder="Change Password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />

                    </div>
                
                        <div className="flex gap-5 w-1/2 justify-between mt-3">
                            <button className="bg-orange-400 p-2 border rounded-md text-white font-semibold" onClick={updateUser}>Save</button>
                        <Link href="/home">
                            <button className="bg-blue-700 p-2 border rounded-md text-white font-semibold">Cancel</button>
                        </Link>

                        </div>
                    
                </div>
              
       
                    
                
            </div>
        </div>

    )
}
