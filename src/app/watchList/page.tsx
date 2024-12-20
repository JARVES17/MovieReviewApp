"use client"
import Navbar from '@/components/Navbar/Navbar'
import Structure from '@/components/Structure'
import { entertainemtData } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function WatchList() {
    const [responseData, setResponseData] = useState<[entertainemtData]>()
    console.log(responseData,"response")    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("/api/user/watchList/getWatchlist")
                
                console.log(response.data.alldata)
                setResponseData(response.data.alldata)
            } catch (error: unknown) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (    
        <>
            <div className="flex relative ">
                <Navbar />
                <div className="p-7 flex flex-wrap gap-[100px] float-right flex-grow overflow-auto ml-[300px]">
                    {responseData ? (responseData.filter((values) => values.isHidden===false).map((entertain, index) => {
                        return <Structure key={index} name={entertain.name} genera={entertain.genera} description={entertain.description} url={entertain.image} id={entertain._id} />

                    })) :
                        <p>No data found</p>
                    }


                </div>
            </div>
        </>
    );
}
