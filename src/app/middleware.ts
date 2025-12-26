import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT as string;

export function middleware(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Unauthorized - No token provided" },
      { status: 401, headers: corsHeaders }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return NextResponse.json(
      { message: "Unauthorized - Invalid token format" },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
     const requestHeaders = new Headers(req.headers);
     requestHeaders.set("userId", decoded.id);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token - Token expired or invalid" },
      { status: 401, headers: corsHeaders }
    );
  }
}

export const config = {
  matcher: [
    "/api/booking/:path*",
    "/api/users/:path*",

    "/api/booking/createBooking",
    "/api/booking/getBooking",
    "/api/booking/getBooking/:path*",
    "/api/booking/accept/:path*",
    "/api/booking/cancel/:path*",
  ],
};
