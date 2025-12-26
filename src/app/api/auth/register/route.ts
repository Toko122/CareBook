import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

interface RegisterForm {
    fullName: string,
    email: string,
    password: string,
    phone: string
}

export async function POST(req: Request) {
      try{
        await connectDb()
        const body: RegisterForm = await req.json()
        const {fullName, email, phone, password} = body

       if (!fullName || !email || !phone || !password) {
           return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
          );
       }

        const existedUser = await User.findOne({
            $or: [{email}, {phone}]
        })

        if (existedUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 409 }
         );
       }

       const hashedPassword = await bcrypt.hash(password, 10)

       const user = await User.create({
            fullName, email, phone, password: hashedPassword
       })

       return NextResponse.json({message: 'user created', user}, {status: 201, 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
       })

      }catch(err){
       return NextResponse.json({message: 'error register user', err}, {status: 500}) 
      }
}