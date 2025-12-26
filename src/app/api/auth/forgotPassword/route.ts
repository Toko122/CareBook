import nodemailer from 'nodemailer';
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import crypto from 'crypto'
import User from '@/models/user';

interface ForgotPasswordForm {
     email: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
     try{ 
        await connectDb()
        const body: ForgotPasswordForm = await req.json()
        const {email} = body

         const user = await User.findOne({ email })
          if (!user) {
           return NextResponse.json(
           { message: 'User with this email does not exist' },
           { status: 404, headers: corsHeaders }
          )
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: process.env.EMAIL,
               pass: process.env.PASS
            }
        })

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenUrl = `https://care-book-92s3-cshzd7ukg-toko122s-projects.vercel.app/features/auth/reset-password/${resetToken}`
        const resetTokenExpire = Date.now() + 1000 * 60 * 15

        user.resetToken = resetToken,
        user.resetTokenExpire = resetTokenExpire
        await user.save()
        
        const mailOptions = {
  from: `"Support Team" <${process.env.EMAIL}>`,
  to: email,
  subject: 'Reset Your Password',
  html: `
    <div style="background:#f3f4f6;padding:40px 0;font-family:Arial,sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.08);overflow:hidden;">
        
        <div style="background:#4f46e5;padding:24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">
            Password Reset
          </h1>
        </div>

        <div style="padding:32px;color:#1f2937;">
          <p style="font-size:16px;line-height:1.6;margin-bottom:20px;">
            Hello 👋
          </p>

          <p style="font-size:15px;line-height:1.6;margin-bottom:24px;">
            We received a request to reset your password.  
            Click the button below to set a new password.
          </p>

          <div style="text-align:center;margin:32px 0;">
            <a href="${resetTokenUrl}" 
              style="
                background:#4f46e5;
                color:#ffffff;
                padding:14px 28px;
                border-radius:12px;
                text-decoration:none;
                font-weight:600;
                display:inline-block;
              ">
              Reset Password
            </a>
          </div>

          <p style="font-size:14px;color:#6b7280;line-height:1.6;">
            If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <p style="font-size:14px;color:#6b7280;margin-top:24px;">
            This link will expire in <strong>15 minutes</strong>.
          </p>
        </div>

        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </div>

      </div>
    </div>
  `
}
      await transporter.sendMail(mailOptions)
      
      return NextResponse.json({message: 'email sent'}, {status: 200, headers: corsHeaders})
     }catch(err: any){
        return NextResponse.json({message: 'error sending email for change password', error: err.message}, {status: 500, headers: corsHeaders})
     }
}