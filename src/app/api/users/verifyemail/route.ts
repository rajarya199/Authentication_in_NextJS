import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();
export async function POST(request:NextRequest){
    try{
        //take data from user
        const reqBody=await request.json()
        const{token}=reqBody; //extract token
        console.log(token)

        //find user with token and check if token is not expired
   const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

   if(!user){
    return NextResponse.json({
        error: "Invalid or expired token",
    },{status: 400});
   }
   console.log(user)
    //update user to verified
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
     await user.save()

    return NextResponse.json({
        message: "Email verified successfully",
        success:true,
    },{status: 200});
    
    }
    catch(error:any){
        return NextResponse.json({
            error: error.message,
    },{status: 500});
}
}