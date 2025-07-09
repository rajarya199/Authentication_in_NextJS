"use client"
import React,{useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { menuItem } from '@/constants'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useUser } from "@/context/UserContext";

const Navbar = () => {
    const router = useRouter()
  const { user, setUser } = useUser();

   const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
       const logout=async()=>{
        try{
            await axios.get('/api/users/logout')
            toast.success("Logout successful")
            router.push("/login")
            setUser(null)
        }
        catch(error:any){
            console.error("Error during logout:", error)
            toast.error(error.message)
        }
    }
  return (
    <>
        <nav className=" shadow-sm sticky top-0 z-50 bg-black    border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <span className="ml-2 text-xl bg-gradient-to-r font-bold bg-clip-text  from-purple-600 to-indigo-600 dark:from-purple-400  dark:to-pink-500 text-transparent">
              NextAuth
            </span>
          </div>

              {/* Middle: Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItem.map((item,index)=>(
                <Link href={item.path} key={index} className="text-slate-200 hover:text-purple-600  px-3 py-2 rounded-md text-sm font-medium">
              {item.label}
            </Link>
            ))}
          </div>
          {/* Right side: Login, Sign Up, ThemeSwitcher */}

                    <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
  {!user ? (
        <>
          <Link href="/login">
            <button className="text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-black px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition">
              SignUp
            </button>
          </Link>
        </>
      ) : (
        <button
          onClick={logout}
          className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition"
        >
          Logout
        </button>
      )}

          </div>
              <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>

          </div>



</div>
</div>

                {/* Mobile menu */}

{isMenuOpen && (
  <div className="md:hidden bg-black border-t border-gray-700 ">
    <div className="px-2 pt-2 pb-3 space-y-1">
      {menuItem.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="block text-slate-200 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
       <div className="flex flex-col space-y-2 px-3 pb-4 border-t border-gray-700">
    
    {!user ?(<>
      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
        <button className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
          Login
        </button>
      </Link>
       
      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
        <button className="w-full text-black px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition">
          Sign Up
        </button>
      </Link>
    </>):(<button onClick={logout} className="w-full text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
          Logout
        </button>)}
    
       
    </div>
    </div>
   
  </div>
)}

</nav>
    </>
  )
}

export default Navbar