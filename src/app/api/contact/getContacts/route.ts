import connectDb from "@/lib/connectDb";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
     try{
       await connectDb()
       const contacts = await Contact.find().sort({createdAt: -1})
       return NextResponse.json({contacts}, {status: 200})
     }catch(err: any){
        return NextResponse.json({message: 'error getting contacts', error: err.message}, {status: 500})
     }
}