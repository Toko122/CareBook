import { authMiddleware } from "@/lib/authMiddleware";
import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
      try{
        await connectDb()
        const authResult = await authMiddleware(req)
        if (authResult instanceof NextResponse) return authResult
        const userId= authResult.id

        if (!userId) {
         return NextResponse.json(
          { message: "Booking ID is required" },
          { status: 400 }
         );
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