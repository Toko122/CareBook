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

  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
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

  if (!SECRET_KEY) {
    console.error("JWT environment variable is not set");
    return NextResponse.json(
      { message: "Server configuration error - JWT secret not configured" },
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", decoded.id);
    
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid token - Token expired or invalid", error: error.message },
      { status: 401, headers: corsHeaders }
    );
  }
}

export const config = {
  matcher: [
    "/api/booking/(.*)",
    "/api/users/(.*)",
  ],
};
