"use client"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
export default function Rating({rating,setRating}) {
    return (
        <div className="flex items-center gap-2">
            {[...Array(5)].map((start, ind) => {
                const currentRate=ind+1
                return <div key={ind}>
                    
                    <label htmlFor={`rate-${currentRate}`}  className="relative cursor-pointer ">
                        <input type="radio" id={`rate-${currentRate}`} value={currentRate} className="absolute opacity-0"
                        onClick={()=>setRating(currentRate)} />
                        
                        <FaStar className="text-gray-400" size={40} key={ind} color={(currentRate <=  rating) ? "yellow" : "gray"}
                        />
                    </label>
               

                   
                </div>
            })}
            <button className="text-gray-400" onClick={() => setRating(null)}>Reset</button>
           
         
        </div>
    )
}