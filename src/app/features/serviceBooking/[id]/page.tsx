'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import { Spinner } from '@/components/ui/spinner'

const servicesData = [
  { id: 1, title: 'General Checkup', description: 'Comprehensive health checkups for all ages.' },
  { id: 2, title: 'Cardiology', description: 'Advanced heart care services from experienced cardiologists.' },
  { id: 3, title: 'Dental Care', description: 'Professional dental services including cleaning and whitening.' },
  { id: 4, title: 'Emergency Services', description: '24/7 emergency medical services for urgent care.' },
  { id: 5, title: 'Surgery', description: 'Advanced surgical procedures performed by expert surgeons.' },
  { id: 6, title: 'Pediatrics', description: 'Health care services for children and newborns.' },
  { id: 7, title: 'Dermatology', description: 'Skin care services and treatments for various conditions.' },
  { id: 8, title: 'Neurology', description: 'Specialized care for brain and nervous system disorders.' },
  { id: 9, title: 'Orthopedics', description: 'Treatment for bones, joints, and musculoskeletal issues.' },
  { id: 10, title: 'Vaccination', description: 'Protective vaccines for children and adults.' },
  { id: 11, title: 'Eye Care', description: 'Comprehensive eye examinations and treatments.' },
  { id: 12, title: 'Rehabilitation', description: 'Physical therapy and rehabilitation services.' },
]

interface BookingForm {
  serviceId: number;
  userId: string | null
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

const ServiceBooking = () => {
  const params = useParams()
  const serviceId = params?.id ? Number(params.id) : 0
  const service = servicesData.find(s => s.id === serviceId)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
  const router = useRouter()

  const [form, setForm] = useState<BookingForm>({
    serviceId: serviceId,
    userId: userId,
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
       const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      await axios.post('/booking/createBooking', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlert({ type: 'success', message: 'Booking successful!' })
      setForm({ ...form, fullName: '', email: '', phone: '', date: '', time: '' })

    } catch (err: any) {

      if (err.response?.status === 409) {
        setAlert({ type: 'error', message: 'This time slot is already booked. Please choose another time.' })
      } else if (err.response?.status === 401) {
         router.push("/features/auth/login");
    }

    } finally {

      setLoading(false)
      setTimeout(() => setAlert(null), 3000)
      
    }
  }

  if (!service) return <div className="p-10 text-center text-gray-500">Service not found</div>

  return (
    <section className="w-full bg-gray-50 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
          <p className="text-gray-600 mt-3">{service.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 cursor-pointer py-4 text-white rounded-xl font-medium transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Spinner /> Loading
              </span>
            ) : (
              'Book Appointment'
            )}
          </button>

          {alert && (
            <div
              className={`md:col-span-2 mt-2 p-3 rounded-lg text-white font-medium transition text-center
                ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {alert.message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default ServiceBooking
