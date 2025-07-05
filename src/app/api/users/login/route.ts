import User from'@/models/userModel'
import { connect } from '@/db/dbConfig'
import{NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest){
    try{
        //take data from user
        const reqBody= await request.json()
        const{email,password}=reqBody //extract email and password
        // console.log(reqBody);
        const user=await User.findOne({email})
        if(!user){
                    return NextResponse.json({error:"user doesnot exist"},{status:400})
        }
        console.log("user exist");
//check password
 const isvalidPassword=await bcrypt.compare(password,user.password)
    if(!isvalidPassword){
                return NextResponse.json({error:"check your crediential"},{status:400})
       
            }
//if password ok,create jwt token
const tokenData={
    id:user._id,
    email:user.email,
    username:user.username
}
const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
const response= NextResponse.json({
    message:"login successful",
    success:true,
})

//set token in cookie
response.cookies.set("token",token,{
    httpOnly:true,
})
return response
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}