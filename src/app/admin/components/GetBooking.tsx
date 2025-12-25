'use client'

import { Spinner } from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { SplineIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface IBooking {
  _id: string
  serviceId: number
  userId: string | null
  fullName: string
  email: string
  phone: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'cancelled'
}

const GetBooking = () => {
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBookingStatus = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/booking/getBooking')
        setBookings(res.data.bookings)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookingStatus()
  }, [])

  const handleAccept = async (bookingId: string) => {
     setLoading(true)
     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
     if(!token){
        router.push('/features/auth/login')
        return;
     }
    try {
      await axios.put(`/booking/accept/${bookingId}`)
      setBookings(prev =>
        prev.map(booking =>
          booking._id === bookingId ? { ...booking, status: 'approved' } : booking
        )
      )
    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const handleReject = async (bookingId: string) => {
     setLoading(true)
    try {
      await axios.put(`/booking/cancel/${bookingId}`)
      setBookings(prev =>
        prev.map(booking =>
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      )
    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  if (loading) return <div className='flex items-center justify-center gap-2'><Spinner /> Loading...</div>

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">
        Bookings Management
      </h2>

      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{booking.fullName}</td>
                <td className="px-6 py-4 text-gray-600">{booking.email}</td>
                <td className="px-6 py-4 text-gray-600">{booking.phone || '—'}</td>
                <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                <td className="px-6 py-4 text-gray-600">{booking.time}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    booking.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status === 'approved' ? 'Approved' : booking.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(booking._id)} className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                        Approve
                      </button>
                      <button onClick={() => handleReject(booking._id)} className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border rounded-xl p-4 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{booking.fullName}</h3>
              <span className={`px-3 py-1 text-xs rounded-full ${
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                booking.status === 'approved' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {booking.status === 'approved' ? 'Approved' : booking.status === 'cancelled' ? 'Cancelled' : 'Pending'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">📧 {booking.email}</p>
            <p className="text-sm text-gray-600 mb-1">📞 {booking.phone || '—'}</p>
            <p className="text-sm text-gray-600 mb-1">📅 {booking.date}</p>
            <p className="text-sm text-gray-600 mb-4">⏰ {booking.time}</p>
            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => handleAccept(booking._id)} className="flex-1 cursor-pointer py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  {loading ? <div className='flex gap-2 items-center justify-center'><Spinner /> Loading</div> : 'Approve'}
                </button>
                <button onClick={() => handleReject(booking._id)} className="flex-1 cursor-pointer py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                   {loading ? <div className='flex gap-2 items-center justify-center'><Spinner /> Loading</div> : 'Reject'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetBooking
