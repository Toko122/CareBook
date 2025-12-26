import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
      try{
        await connectDb()
        const userId = req.headers.get("userId");
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const bookings = await Booking.find({userId}).sort({createdAt: -1})

        if (!bookings) {
           return NextResponse.json(
           { message: "Booking not found" },
           { status: 404 }
         );
        }

        return NextResponse.json({bookings}, {status: 200})

      }catch(err: any){
         return NextResponse.json({message: 'error getting booking by id', error: err.message}, {status: 500})
      }
}