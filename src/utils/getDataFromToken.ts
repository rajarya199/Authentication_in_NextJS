
import{NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const getDataFromToken=async(request:NextRequest)=>{
    try{
    const token=request.cookies.get("token")?.value ||""
   const decodedToken:any= jwt.verify(token,process.env.TOKEN_SECRET!)
   return decodedToken.id
    }
    catch(error:any){
        console.error("Error in getDataFromToken:", error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}