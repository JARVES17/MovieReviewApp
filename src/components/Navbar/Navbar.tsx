"use client"
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { IoLogIn, IoAddCircle } from "react-icons/io5";
import { IoMdSettings, IoMdHome } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import Link from "next/link"
import { toast } from "sonner";
import axios from "axios";
import { entertainemtData, userDataInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import { GrDocumentUpdate } from "react-icons/gr";


export default function Navbar() {

    const router=useRouter()
    const [data, setData] = useState<[entertainemtData]>()
    const [inputSearch, setInputSearch] = useState("")
    const[userData,setUSerData]=useState<userDataInterface>()
    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value)
    }
    const getData = async () => {
        try {
          const response = await axios.get("/api/entertainments/crData/")
            if (response.data.success) {
                setData(response.data.alldata)
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error("Failed to featch Data")
            
        }
    }
    
    const getUserData = async() => {
        try {
            const responseofuser = await axios.post("/api/user/userInfo/getUserInfo")
            setUSerData(responseofuser.data.user)
        } catch (error: unknown) {
            console.log(error)
            console.log("cant run fucntion")
        }
    }
    
    useEffect(() => {
        getUserData()
        getData()
    },[])
    
    return (
       

        
        <div className={`bg-dark-purple h-screen p-5 pt-8 w-72 duration-300 fixed `}>
            <div className="inline-flex">
                <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500"} `} />
                <h1 className={`text-white origin-left  text-2xl `}> Reviewer</h1>
            </div>

            <div className={`flex items-center rounded-md bg-light-white mt-6 relative py-2`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer ml-2`} />

                <input 
                    className={`ml-1 text-base bg-transparent w-full text-white focus:outline-none $`}
                    type="Search" placeholder="Search"
                    onChange={(e) => handelSearch(e)} />
                <div className="fixed top-[138px] w-[245px]">
                    {data && inputSearch!==""? data.filter((value) => value.name.toLowerCase().includes(inputSearch.toLowerCase())).map((value,ind) => {
                        return <div key={ind} className=" flex flex-col text-black bg-white p-3 ">
                            <button onClick={()=>router.push(`detail/${value._id}`)}> {value.name}</button>
                           
                        </div>
                    }):<div></div>}
                    
                </div>
            </div>
            
            <ul className="pt-2">
                
                <Link href="/home">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <IoMdHome />
                            </span>
                    <span className={`text-base `}>Home</span>
                    </li>
                </Link>
                <Link href="/movies">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <MdLocalMovies />
                            </span>
                    <span className={`text-base flex-1 `}>Movies</span>
                    </li>
                </Link>
                <Link href="/tvShow">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <MdLiveTv />
                            </span>
                    <span className={`text-base flex-1 `}>TvShow</span>
                    </li>
                </Link>
                <Link href="/watchList">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <FaBookmark />
                            </span>
                    <span className={`text-base flex-1 `}>WatchList</span>
                    </li>
                </Link>
                <Link href="/userSetting">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <IoMdSettings />
                            </span>
                    <span className={`text-base flex-1 `}>Settings</span>
                    </li>
                </Link>
                
        
                <Link href="/">
                    <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                        <span className="text-2xl block float-left">
                            <IoLogIn />
                        </span>
                        <span className={`text-base flex-1 `}>LogOut</span>
                    </li>
                </Link>

                {userData && userData.isAdmin ?
                
                    <div>
                       
                           
                    
                        <Link href="/addEntertainment">
                            <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                                <span className="text-2xl block float-left">
                                    <IoAddCircle />
                                </span>
                                <span className={`text-base flex-1`}>Add </span>
                            </li>
                        </Link>
                        <Link href="/updateEntertainment">
                            <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                                <span className="text-2xl block float-left">
                                    <GrDocumentUpdate />
                                </span>
                                <span className={`text-base flex-1`}>Update</span>
                            </li>
                        </Link>
           </div>:""
                }
               
                
            </ul>

            </div>
       
    )

}