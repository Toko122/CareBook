import connectDb from '@/lib/connectDb'
import Contact from '@/models/contact'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, { status: 204, headers: corsHeaders })
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectDb()

    const body: ContactForm = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      )
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL!,
        pass: process.env.PASS!,
      },
    })

    await transporter.sendMail({
      from: `"Clinic Contact" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: 'New Contact Message 🩺',
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ''}
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201, headers: corsHeaders }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Error sending message', error: err.message },
      { status: 500, headers: corsHeaders }
    )
  }
}
