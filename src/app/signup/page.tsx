"use client"
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios'
const SignupPage = () => {
    const router=useRouter()
    const[isLoading,setIsLoading]=useState(false)
    const[buttonDisabled,setButtonDisabled]=useState(false)
    const[user,setUser]=useState({
        username:"",
        email:"",
    password:""
    })
    const onsignup=async()=>{
        try{
            setIsLoading(true)
         const response=await axios.post("/api/users/signup",user)
toast.success("Signup successful, please check your email to verify your account")
router.push("/login")
         console.log("signup sucessful",response.data)
        }
        catch(error:any){
            console.error("Error during signup:", error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.username.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {isLoading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-6 border-gray-300" />

        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="User name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <button
          onClick={onsignup}
          disabled={buttonDisabled}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300"
          }`}
        >
          {buttonDisabled ? "No signUp" : "Signup"}
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-500 hover:text-amber-600 font-medium transition">
            Visit login page
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage