import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

interface PasswordForm {
    password: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, context: {params: Promise<{id: string}>}) {
     try{
        await connectDb()
        const body: PasswordForm = await req.json()
        const {password} = body

        const {id} = await context.params
         
        if (!password || password.length < 6) {
         return NextResponse.json(
            { message: "Password must be at least 8 characters" },
            { status: 400, headers: corsHeaders }
          );
        }
        const user = await User.findOne({
            resetToken: id,
            resetTokenExpire: {$gt: Date.now()}
        })
         
         if (!user) {
         return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 400, headers: corsHeaders }
        );
       }

       const hashedPassword = await bcrypt.hash(password, 10)
       user.password = hashedPassword;
       user.resetToken = undefined;
       user.resetTokenExpire = undefined;
      await user.save()

        return NextResponse.json(
            { message: 'Password reset successful' },
            { status: 200, headers: corsHeaders }
        )

     }catch(err: any){
         return NextResponse.json({message: "error reset password", error: err.message}, {status: 500, headers: corsHeaders})
     }
}