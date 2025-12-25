import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDb()
     const { id } = await context.params

    if (!id) {
      return NextResponse.json({ message: "Booking ID is required" }, { status: 400 })
    }

    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    if (booking.status === 'pending') {
      booking.status = 'approved'
      await booking.save()
    }

    return NextResponse.json({ booking }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: 'Error accepting booking', error: err.message }, { status: 500 })
  }
}
