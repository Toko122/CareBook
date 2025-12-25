'use client'

import { Spinner } from '@/components/ui/spinner';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {

    const [form, setForm] = useState<ContactForm>({name: '', email: '', phone: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{type: 'success' | 'error'; message: string} | null>(null)
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
         const {name, value} = e.target
         setForm(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try{
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
          if(!token){
            router.push('/features/auth/login')
            return;
          }
          const res = await axios.post('/contact', form, {
             headers: {
              Authorization: `Bearer ${token}`
             }
          })
          setForm({name: '', email: '', phone: '', message: ''})
          setMessage({type: 'success', message: 'Message Sent'})
          setTimeout(() => setMessage({type: 'success', message: ''}), 1500)
        }catch(err: any){
           console.log(err);
           setMessage({type: 'error', message: err.response?.data?.message || 'Something went wrong'})
           setTimeout(() => setMessage({type: 'error', message: ''}), 1500)
        }finally{
          setLoading(false)
        }
    }


  return (
    <section className="w-full bg-gray-50 py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            Contact Our Clinic
          </h2>
          <p className="text-gray-600 mt-5 max-w-md">
            Have a question or need medical assistance?  
            Fill out the form and our medical team will contact you shortly.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm text-gray-500">📍 Address</p>
              <p className="font-medium text-gray-900">
                Batumi, Georgia
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">📞 Phone</p>
              <p className="font-medium text-gray-900">
                +995 555 123 456
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">✉️ Email</p>
              <p className="font-medium text-gray-900">
                clinic@example.com
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name='name'
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name='email'
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name='phone'
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+995 ..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name='message'
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your concern..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-teal-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-teal-700 transition"
            >
              {
                loading ? <div className='flex items-center gap-2 justify-center'><Spinner/> Loading</div> : 'Send Message'
              }
            </button>
            {message?.message && (
            <div
              className={`md:col-span-2 mt-2 p-3 rounded-lg text-white font-medium transition text-center
                ${message.type === 'success' ? 'bg-green-700' : 'bg-red-500'}`}
            >
              {message.message}
            </div>
          )}
          </form>
        </div>

      </div>
    </section>
  )
}

export default ContactForm
