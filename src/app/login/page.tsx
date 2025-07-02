"use client"
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios'
const SigninPage = () => {
    const router=useRouter()
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
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800'>
        <h1>{isLoading ?"Processing":"Login"}</h1>
        <hr />
       
         <label htmlFor="email">email</label>
        <input
        className='p-2 bg-amber-50 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id="email"
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})} 
        type="text"
        placeholder='email' />
           <label htmlFor="password">Password</label>
        <input
        className='p-2 bg-amber-50 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id="password"
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})} 
        type="password"
        placeholder='password' />
        <button
        onClick={onlogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
            {buttonDisabled ?"No login":"Login"}
        </button>
        <Link href='/signup'>
        Register Here
        </Link>
        </div>
  )
}

export default SigninPage