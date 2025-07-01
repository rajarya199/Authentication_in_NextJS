import User from'@/models/userModel'
import { connect } from '@/db/dbConfig'
import{NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/utils/mailer'
connect()
export async function POST(request:NextRequest){
    try{
  const reqBody= await request.json()
  const{username,email,password}=reqBody
  //validate
  console.log(reqBody);
  const user=await User.findOne({email})
  if(user){
    return NextResponse.json({error:"User already exists"},{status:400})
  }
const salt= await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt)
 const newUser=new User({
    username,
    email,
    password:hashedPassword
})
const savedUser=await newUser.save()
console.log(savedUser)

//send verification email 
await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})
return NextResponse.json({
  message:"User created successfully",
success:true,
savedUser},
  {status:201})
    }
    catch(error:any){
              console.error(error)

        return NextResponse.json({error:error.message},{status:500})
    }

}

