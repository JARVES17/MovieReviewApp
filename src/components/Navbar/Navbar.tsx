"use client"
import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogIn } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdSettings, IoMdHome } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdLocalMovies, MdLiveTv } from "react-icons/md";
import Link from "next/link"


export default function Navbar() {

    
    return (
        <div className={`bg-dark-purple h-screen p-5 pt-8 w-72 duration-300 fixed `}>
            <div className="inline-flex">
                <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"} `} />
                <h1 className={`text-white origin-left  text-2xl `}> Reviewer</h1>
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
                {/* <Link href="/userSetting">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <IoMdSettings />
                            </span>
                    <span className={`text-base flex-1 `}>Settings</span>
                    </li>
                </Link> */}
                <Link href="/">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                            <span className="text-2xl block float-left">
                            <IoLogIn />
                            </span>
                    <span className={`text-base flex-1 `}>LogOut</span>
                    </li>
                </Link>
        


                {/* TemP route */}
                <Link href="/addEntertainment">
                <li className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 mt-3`}>
                    <span className={`text-base flex-1 ${!open && "hidden"}`}>Add Movies and tv shows</span>
                    </li>
                </Link>
            </ul>

        </div>
    )

}