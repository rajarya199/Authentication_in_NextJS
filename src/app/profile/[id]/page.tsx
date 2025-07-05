import React from 'react'

const page = ({params}:any) => {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <h2 className='p-3 bg-green-500 rounded-2xl text-blacl'>
            {params.id ? `User ID: ${params.id}` : "No User ID provided"}
            </h2>    
    </div>
  )
}

export default page