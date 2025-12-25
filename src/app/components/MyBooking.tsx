'use client'

import React, { useEffect, useState } from 'react'
import { FaUserMd, FaHeartbeat, FaTooth, FaHospital, FaAmbulance, FaStethoscope, FaSyringe, FaWheelchair, FaEye } from 'react-icons/fa'
import { CalendarDays, Clock, User, Phone, Mail } from 'lucide-react'
import axios from '@/lib/axios'
import { Spinner } from '@/components/ui/spinner'

const servicesData = [
  { id: 1, title: 'General Checkup', description: 'Comprehensive health checkups for all ages.', icon: <FaUserMd size={28} /> },
  { id: 2, title: 'Cardiology', description: 'Advanced heart care services from experienced cardiologists.', icon: <FaHeartbeat size={28} /> },
  { id: 3, title: 'Dental Care', description: 'Professional dental services including cleaning and whitening.', icon: <FaTooth size={28} /> },
  { id: 4, title: 'Emergency Services', description: '24/7 emergency medical services for urgent care.', icon: <FaAmbulance size={28} /> },
  { id: 5, title: 'Surgery', description: 'Advanced surgical procedures performed by expert surgeons.', icon: <FaHospital size={28} /> },
  { id: 6, title: 'Pediatrics', description: 'Health care services for children and newborns.', icon: <FaStethoscope size={28} /> },
  { id: 7, title: 'Dermatology', description: 'Skin care services and treatments for various conditions.', icon: <FaUserMd size={28} /> },
  { id: 8, title: 'Neurology', description: 'Specialized care for brain and nervous system disorders.', icon: <FaUserMd size={28} /> },
  { id: 9, title: 'Orthopedics', description: 'Treatment for bones, joints, and musculoskeletal issues.', icon: <FaUserMd size={28} /> },
  { id: 10, title: 'Vaccination', description: 'Protective vaccines for children and adults.', icon: <FaSyringe size={28} /> },
  { id: 11, title: 'Eye Care', description: 'Comprehensive eye examinations and treatments.', icon: <FaEye size={28} /> },
  { id: 12, title: 'Rehabilitation', description: 'Physical therapy and rehabilitation services.', icon: <FaWheelchair size={28} /> },
]

interface BookingForm {
  _id: string
  serviceId: number
  fullName: string
  email: string
  phone: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'cancelled'
  createdAt: string
}

const MyBooking = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
  const [bookings, setBookings] = useState<BookingForm[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/booking/getBookingById/${userId}`)
        setBookings(res.data.bookings)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [userId])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 gap-2"><Spinner /> Loading bookings...</div>
  if (bookings.length === 0) return <div className="min-h-screen flex items-center justify-center text-gray-500">No bookings found</div>

  return (
    <section className="w-full bg-gradient-to-b from-teal-50 to-white min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">All your medical appointments in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((booking) => {

              const service = servicesData.find(s => s.id === booking.serviceId)
               
              return(
                <div key={booking._id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-lg">🩺</div>
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-semibold text-gray-900">{service ? service.title : booking.serviceId}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'approved' ? 'bg-green-100 text-green-700'
                    : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                  }`}>{booking.status}</span>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3"><CalendarDays className="text-teal-600 w-5 h-5" /><span>{booking.date}</span></div>
                  <div className="flex items-center gap-3"><Clock className="text-teal-600 w-5 h-5" /><span>{booking.time}</span></div>
                  <div className="flex items-center gap-3"><User className="text-teal-600 w-5 h-5" /><span>{booking.fullName}</span></div>
                  <div className="flex items-center gap-3"><Mail className="text-teal-600 w-5 h-5" /><span>{booking.email}</span></div>
                  <div className="flex items-center gap-3"><Phone className="text-teal-600 w-5 h-5" /><span>{booking.phone}</span></div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t text-sm text-gray-500">Created on {new Date(booking.createdAt).toLocaleDateString()}</div>
            </div>
              )

          })}
        </div>
      </div>
    </section>
  )
}

export default MyBooking
