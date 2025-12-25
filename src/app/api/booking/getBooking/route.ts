import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
     try{
       await connectDb()

       const bookings = await Booking.find().sort({createdAt: -1})
       return NextResponse.json({bookings}, {status: 200})
     }catch(err: any){
        return NextResponse.json({message: "error getting bookings", error: err.message}, {status: 500})
     }
}