"use client"
import React,{useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const ProfilePage = () => {
    const router=useRouter()
    const[data,setData]=useState("nothing")
    const getUserDetails=async()=>{
        const res=await axios.post("/api/users/about")
        console.log(res.data.data._id)
        setData(res.data.data._id)
    }

    const logout=async()=>{
        try{
            await axios.get('/api/users/logout')
            toast.success("Logout successful")
            router.push("/login")
        }
        catch(error:any){
            console.error("Error during logout:", error)
            toast.error(error.message)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1>Profile</h1>
       <h2>{data==="nothing" ? "no data":
        <Link href={`/profile/${data}`} >
            {data}
        </Link>
        }</h2>
         <button className=' mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        onClick={getUserDetails}>
           Get user Detail
        </button>
        <button className=' mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}>
            logout

        </button>
    </div>
  )
}

export default ProfilePage