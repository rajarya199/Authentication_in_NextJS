import React from 'react'
import { menuItem } from '@/constants'
import Link from 'next/link';
const Navbar = () => {
  return (
    <>
        <nav className=" shadow-sm sticky top-0 z-50     border-b border-gray-500">
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
          </div>
</div>
</nav>
    </>
  )
}

export default Navbar