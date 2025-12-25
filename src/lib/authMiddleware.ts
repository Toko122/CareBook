import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.JWT as string

export async function authMiddleware(req: Request) {

     const authHeader = req.headers.get('Authorization')
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
     }

    const token = authHeader.split(' ')[1]

      try{
        const decoded = jwt.verify(token, SECRET_KEY) as {id: string}
        req.headers.set('userId', decoded.id)
        return decoded
      }catch(err){
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
      }
}