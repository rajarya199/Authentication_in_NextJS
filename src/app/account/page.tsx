"use client"
import React from 'react'
import { useUser } from "@/context/UserContext";

const AccountPage = () => {
      const { user } = useUser();

  if (!user) return <p>Loading user...</p>;
  return (
    <div>
 <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user.username} 👋</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user._id}</p>
    </div>
    </div> 
  )
}

export default AccountPage