import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface BookingForm {
    serviceId: number,
    userId: string
    fullName: string
    email: string
    phone: string
    date: string
    time: string
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

         const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
        }

         await connectDb()
         const body: BookingForm = await req.json()
         const {serviceId, fullName, email, phone, time, date} = body

         if (!serviceId || !fullName || !email || !phone || !date || !time) {
           return NextResponse.json({ message: "All fields are required" }, { status: 400, headers: corsHeaders })
         }

         const existedBooking = await Booking.findOne({serviceId, time, date})
         if (existedBooking) {
          return NextResponse.json({ message: "This time slot is already booked. Please choose another time." }, { status: 409, headers: corsHeaders })
         }

        const newBooking = await Booking.create({
            serviceId, fullName, email, phone, date, time, userId: new mongoose.Types.ObjectId(userId!)
        })
        return NextResponse.json({ message: "Booking successful", booking: newBooking }, { status: 201, headers: corsHeaders })
    
    }catch(err: any){
        return NextResponse.json({ message: "Booking failed", error: err.message }, { status: 500, headers: corsHeaders })
     }
}