import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT as string;

interface BookingForm {
  serviceId: number;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authHeader.split(" ")[1];
    let userId: string;

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
      userId = decoded.id;
    } catch {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401, headers: corsHeaders }
      );
    }

    await connectDb();

    const body: BookingForm = await req.json();
    const { serviceId, fullName, email, phone, date, time } = body;

    if (!serviceId || !fullName || !email || !phone || !date || !time) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const existedBooking = await Booking.findOne({ serviceId, date, time });
    if (existedBooking) {
      return NextResponse.json(
        { message: "This time slot is already booked. Please choose another time." },
        { status: 409, headers: corsHeaders }
      );
    }

    const newBooking = await Booking.create({
      serviceId,
      fullName,
      email,
      phone,
      date,
      time,
      userId: new mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json(
      { message: "Booking successful", booking: newBooking },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Booking failed", error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
