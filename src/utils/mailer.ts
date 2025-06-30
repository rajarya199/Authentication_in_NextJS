import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
export const sendEmail=async({email,emailType,userId}:any)=>{
try{
 const hashedToken= await bcrypt.hash(userId.toString(),10)
if(emailType==='VERIFY'){
  // Update the user with the verification token and expiry
 await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}) 
} else if(emailType=="RESET"){
   await User.findByIdAndUpdate(userId,{forgetPasswordToken:hashedToken,forgetPasswordTokenExpiry:Date.now()+3600000}) 
}
// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions={
     from: 'rajan@aryal.com',
    to: email,
    subject: emailType==='VERIFY' ?'Verify your email':"Reset your Password",
    text: "Hello world?", 
    html: emailType === 'VERIFY' 
    ? `<p>Hello,</p>
       <p>Please verify your email by clicking the link below:</p>
       <p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify Email</a></p>
       <p>If you did not request this, please ignore this email.</p>
       <p>Or copy and paste this URL into your browser:<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    : `<p>Hello,</p>
       <p>You requested to reset your password. Click the link below to proceed:</p>
       <p><a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Reset Password</a></p>
       <p>If you did not request this, please ignore this email or contact support.</p>
        <p>Or copy and paste this URL into your browser:<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`
}
 const mailResponse=await transporter.sendMail(mailOptions)
 return mailResponse
}
catch(error:any){
    throw new Error(error.message)
}
}