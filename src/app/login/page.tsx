"use client"
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { useUser } from "@/context/UserContext";
const SigninPage = () => {
    const router=useRouter()
      const { fetchUser } = useUser()
    const[isLoading,setIsLoading]=useState(false)
    const[buttonDisabled,setButtonDisabled]=useState(false)
    const[user,setUser]=useState({
        email:"",
    password:""
    })
    const onlogin=async()=>{
        try{
            setIsLoading(true)
         const response=await axios.post("/api/users/login",user)
toast.success("login successfully")
router.push("/profile")
await fetchUser(); // ✅ update context with fresh user data
         console.log("signin sucessful",response.data)
        }
        catch(error:any){
            console.error("Error during signin:", error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {isLoading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6 border-gray-300" />

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-amber-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-amber-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <button
          onClick={onlogin}
          disabled={buttonDisabled}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300"
          }`}
        >
          {buttonDisabled ? "No login" : "Login"}
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className='text-amber-500 hover:text-amber-600 font-medium transition'>
            
              Register Here
            
          </Link>
        </p>
      </div>
    </div>
  
  )
}

export default SigninPage