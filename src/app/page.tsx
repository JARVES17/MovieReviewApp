"use client"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function LoginpPage() {
  const routeTo = useRouter()
  const [showPass, setShowPass] = useState<boolean>(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/user/login", user)
      console.log(response)
      if (response.data.success) {
        routeTo.push("/profile")
        toast.success(response.data.message)
      }

    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)


    }
  }
  return (
    <div className="flex items-center justify-center gap-2 min-h-screen bg-gray-100">
      <div className=" shadow-2xl flex flex-col gap-4 items-center w-96 h-96 my-1 ">
        <h1 className="text-gray-500  text-2xl mt-2">LoginPage</h1>
        <div className="text-left text-gray-500 ">No Account,
          <Link href="/signup">
            <span className="underline ml-1 text-cyan-700  hover:text-cyan-900">Create Account</span>
          </Link>
        </div>
        <div className="w-[80%] flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-500">Email</label>
          <input id="email"
            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })} />

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
          <input id="password"
            className="rounded border-gray-300 border focus:outline-none p-2 text-black "
            placeholder="Password"
            type={showPass ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })} />

        </div>
        <div className="flex w-full justify-around items-center">
          <button onClick={onLogin} className="bg-blue-600 text-white w-1/4 border rounded-md p-2 hover:bg-blue-800">Login</button>
          <Link href='/signup'>
            <span className="underline ml-1 text-cyan-700 hover:text-cyan-900">Forgot Password?</span>
          </Link>


        </div>
        <div className="flex justify-around w-full">
          <Link href="/signup">
            <span className="underline ml-1 text-cyan-700  hover:text-cyan-900">Can't Sign In?</span>
          </Link>
          <Link href="/signup">
            <span className="underline ml-1 text-cyan-700  hover:text-cyan-900">Forgot Username?</span>
          </Link>


        </div>

      </div>





    </div>
  )
}