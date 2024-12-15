"use client"
import { useState } from "react"
import {toast} from "sonner"
import axios from "axios"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Link from "next/link"
import {useRouter} from "next/navigation"

export default function SignupPage() {
    const routeTo = useRouter()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [reEnterPass,setreEnterPass]=useState("")
    const [user, setUser] = useState({
        username: "",
        name:"",
        email:"",
        password:"",
    })

    const onSinup = async () => {
        try {
            const response = await axios.post("/api/user/signup",user)
            console.log(response)
            if (response.data.success) {
                toast.success(`${response.data.user.username} you have successfully signed up`)
                routeTo.push("/")
            }
            
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message)
            
            
        }        
    }
    return (
        <div className="flex items-center justify-center gap-2 min-h-screen bg-gray-100">
            <div className=" shadow-2xl flex flex-col gap-4 items-center w-96 py-5 my-1 ">
                <h1 className="text-gray-500  text-2xl mt-2">SignUp</h1>
                <div className="text-left text-gray-500 ">Already Account,
                    <Link href="/login">
                        <span className="underline ml-1 text-cyan-700  hover:text-cyan-900">Login</span>
                    </Link>
                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <label htmlFor="email" className="text-gray-500">Email</label>
                    <input id="email"
                        className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                        placeholder="Email*"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />

                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <label htmlFor="name" className="text-gray-500">Name</label>
                    <input id="name"
                        className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                        placeholder="Name*"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })} />

                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <label htmlFor="UserName" className="text-gray-500">UserName</label>
                    <input id="UserName"
                        className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                        placeholder="UserName*"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })} />

                </div>


                <div className="w-[80%] flex flex-col gap-1">
                    <div className="flex justify-between">
                        <label htmlFor="password" className="text-gray-500 ">Password</label>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FaEyeSlash className="text-cyan-700" /> :
                                    <FaEye className="text-cyan-700" />
                                }
                            </button>

                            <span className="text-cyan-700">Show Password</span>
                        </div>

                    </div>
                    <input id="password*"
                        className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                        placeholder="Password"
                        type={showPass ? "text" : "password"}
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />

                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <div className="flex justify-between">
                        <label htmlFor="reEnter" className="text-gray-500 ">Re-Enter Password</label>
                        

                    </div>
                    <input id="reEnter"
                        className="rounded border-gray-300 border focus:outline-none p-2 text-black "
                        placeholder="Re-Enter Password*"
                        type={showPass ? "text" : "password"}
                        value={reEnterPass}
                        onChange={(e) => setreEnterPass(e.target.value)} />
                    <span className="text-red-600">{reEnterPass!==user.password?"Password not matched":""}</span>

                </div>
                <div className="flex w-full justify-around items-center">
                    <button onClick={onSinup} className="bg-blue-600 text-white w-1/4 border rounded-md p-2 hover:bg-blue-800">SignUp</button>
                </div>
                
            </div>





        </div>

    )
}