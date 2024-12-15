"use client"
import { useState } from "react";
import { BsArrowLeftShort,BsSearch,BsChevronDown } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";


export default function Test() {
    const [open, setOpne] = useState<boolean>(true)
    const [subMenu, setSubMenu] = useState<boolean>(false)
    const Menu = [
        { title: "DashBoard" },
        { title: "Pages" },
        { title: "Media", spacing: true },
        {
            title: "Projects",
            subMenu: true,
            subMenuItems: [
                {title:"SubMenu1"},
                {title:"SubMenu2"},
                {title:"SubMenu3"},
            ]
        },
        { title: "Analytics" },
        { title: "InBox", spacing: true },
        { title: "Profile" },
        { title: "Setting" },
        { title: "Logout",},
        
    ]
    return (
            <div className={`bg-dark-purple h-screen p-5 pt-8 ${open?"w-72":"w-20"} duration-300 relative`}>
            <BsArrowLeftShort onClick={() => setOpne(!open)} className={`bg-white text-dark-purple text-4xl rounded-full absolute top-3 -right-5 border border-dark-purple cursor-pointer ${!open && "rotate-180"} duration-500 ease-in-out`} />
            <div className="inline-flex">
                <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"} `} />
                <h1 className={`text-white origin-left  text-2xl ${!open && "scale-0"} duration-300 `}> Reviewer</h1>
            </div>
            <div className={`flex items-center rounded-md bg-light-white mt-6 ${open ? "px-4 " : "p-2.5" } py-2`}>
                <BsSearch className={`text-white text-lg block float-left cursor-pointer `} />

                <input type="search" placeholder="Search" className={`ml-1 text-base bg-transparent w-full text-white focus:outline-none $`} />
            </div>

            <ul className="pt-2">
                {Menu.map((menu, ind) => {
                    return <div key={ind}>
                        <li  className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md  p-2 ${menu.spacing?"mt-9":"mt-2"}`}>
                            <span className="text-2xl block float-left">
                                <RiDashboardFill/>
                            </span>
                            <span className={`text-base flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                            {menu.subMenu && open && (
                                <BsChevronDown onClick={() => setSubMenu(!subMenu)} className={`${subMenu && "rotate-180"}`} />
                            )}
                        </li>
                        {menu.subMenu && subMenu && open &&(
                            <ul key={202020}>
                                {menu.subMenuItems.map((submenu) => {
                                    return <>
                                        <li key={submenu.title} className={`text-gray-300 text-sm items-center flex gap-x-4 cursor-pointer hover:bg-light-white rounded-md px-5 p-2 ${menu.spacing ? "mt-9" : "mt-2"}`}>
                                            {submenu.title}

                                        </li>
                                    </>
                                })}
                            </ul>
                        )}

                    </div>
                })}
            </ul>

            </div>
    )

}