import connectDb from "@/lib/connectDb";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT as string;

export async function GET(req: Request) {
  try {

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
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
        { status: 401 }
      );
    }

    await connectDb();

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error getting bookings", error: err.message },
      { status: 500 }
    );
  }
}
