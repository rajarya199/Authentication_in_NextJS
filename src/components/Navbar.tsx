"use client"
import React,{useState} from 'react'
import { menuItem } from '@/constants'
import { MenuIcon, XIcon } from 'lucide-react'

import Link from 'next/link';
const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
   <Link href="/login">
    <button className="text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
      Login
    </button>
  </Link>
  <Link href="/signup">
    <button className="text-black px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition">
      Sign Up
    </button>
  </Link>
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

                {/* Mobile menu */}


</div>
</div>
</nav>
    </>
  )
}

export default Navbar