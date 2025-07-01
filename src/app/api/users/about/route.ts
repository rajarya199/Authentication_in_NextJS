import User from'@/models/userModel'
import { connect } from '@/db/dbConfig'
import{NextRequest,NextResponse } from 'next/server'

connect()
import { getDataFromToken } from '@/utils/getDataFromToken'
export async function POST(request:NextRequest){
    try{
        //extract data from token
        const userID=await getDataFromToken(request)
        const user=await User.findOne({_id:userID}).select("-password")
        if(!user){
            return NextResponse.json({error:"user not found"},{status:404})
        }
        return NextResponse.json({
            message:"user found",
            success:true,
            data:user,
        })
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}