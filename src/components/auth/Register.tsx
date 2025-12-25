'use client'

import axios from '@/lib/axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Spinner } from '../ui/spinner'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

interface RegisterForm {
    fullName: string,
    email: string,
    password: string,
    phone: string
}

const Register = () => {

     const [form, setForm] = useState<RegisterForm>({email: '', fullName: '', password: '', phone: ''})
     const router = useRouter()
     const [loading, setLoading] = useState(false)

     const [error, setError] = useState('')

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev, [name]: value
        }))
     }

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          setLoading(true)

          if(form.password.length < 6){
             setError('Password must be at least 6 characters long')
             setTimeout(() => setError(''), 3000)
             setLoading(false)
             return
          }

          try{
            const res = await axios.post('/auth/register', form)
            router.push('/features/auth/login')
          }catch(err: any){
            if (err.response?.status === 409) {
             setError('User with this email or phone already exists')
             setTimeout(() => setError(''), 3000)
              setLoading(false)
              } else {
              setError('Something went wrong. Please try again.')
              setTimeout(() => setError(''), 3000)
              setLoading(false)
           }
          }finally{
            setLoading(false)
          }
     }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 px-4">
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-800">
            Create Your Account
          </h1>
          <p className="text-slate-500 mt-2">
            Manage bookings easily and securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <input
              name='fullName'
              required
              onChange={handleChange}
              value={form.fullName}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email Address
            </label>
            <input
              name='email'
              required
              onChange={handleChange}
              value={form.email}
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Phone Number
            </label>
            <input
              name='phone'
              required
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+995 555 12 34 56"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              name='password'
              required
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

           
           {
              error.includes('Password') && (
               <div className="flex items-center mt-1 text-red-500 text-sm">
                <AiOutlineExclamationCircle className="mr-1" /> {error}
              </div>
              )
           }

           {
            error.includes('User') && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AiOutlineExclamationCircle className="mr-1" /> {error}
              </div>
            )
           }

          <button
            type="submit"
            className="w-full cursor-pointer py-3 mt-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 transition shadow-lg"
          >
            {
               loading ? <span className='flex items-center gap-2 justify-center'><Spinner/> Loading</span> : "Create Account"
            }
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already registered?
          <Link href={'/features/auth/login'} className="text-slate-800 font-medium cursor-pointer ml-1 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register