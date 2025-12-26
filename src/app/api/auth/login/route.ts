import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

interface LoginForm {
    email: string,
    password: string,
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
       const body: LoginForm = await req.json()
       const { email, password} = body

       const user = await User.findOne({email})
       if(!user) return NextResponse.json({message: 'invalid email'}, {status: 409, headers: corsHeaders})

       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch) return NextResponse.json({message: 'invalid password'}, {status: 409, headers: corsHeaders})

       const token = jwt.sign({id: user._id}, process.env.JWT!, {expiresIn: '2d'})

       return NextResponse.json({message: 'user logged in', token, user}, {status: 200, headers: corsHeaders})

     }catch(err){
        return NextResponse.json({message: "error login user", err}, {status: 500, headers: corsHeaders})
     }
}