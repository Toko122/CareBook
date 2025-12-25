import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";


export async function PUT(req: Request, context: {params: Promise<{id: string}>}) {
     try{
       await connectDb()
       const {id: paramsId} = await context.params
       const body = await req.json().catch(() => {})
       const id = paramsId || body?.id

       if (!id) {
        return NextResponse.json({ message: "Booking ID is required" }, { status: 400 })
       }

       const booking = await Booking.findById(id)
       if (!booking) {
        return NextResponse.json({ message: "Booking not found" }, { status: 404 })
       }

       if(booking.status === 'pending'){
          booking.status = 'cancelled'
          await booking.save()
       }
       return NextResponse.json({ booking }, { status: 200 })
     }catch(err: any){
        return NextResponse.json({messsage: "error canceling booking", error: err.message}, {status:500})
     }
}