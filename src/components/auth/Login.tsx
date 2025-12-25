'use client'

import axios from '@/lib/axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineUser, AiOutlineLock, AiOutlineExclamationCircle } from 'react-icons/ai'
import { Spinner } from '../ui/spinner'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthProvider'
import { useRouter } from 'next/navigation'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

interface LoginForm {
    email: string,
    password: string
}

const Login = () => {
 
    const [form, setForm] = useState<LoginForm>({email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
          ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try{
          const res = await axios.post('/auth/login', form)
          login(res.data.token, res.data.user._id)
          router.push('/')
        }catch(err: any){
           if(err.response.status === 409 && err.response.data.message === 'invalid email'){
              setError(err.response.message || 'invalid email')
           }else if(err.response.status === 409 && err.response.data.message === 'invalid password'){
              setError(err.response.message || 'invalid password')
           }
           setTimeout(() => setError(''), 3000)
        }finally{
          setLoading(false)
        }
    }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 px-4">
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-200 p-8 transition-all duration-300">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back
          </h1>
          <p className="text-indigo-600 mt-2">
            Sign in to manage your bookings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <label className="block text-sm font-medium text-indigo-700 mb-1">Email Address</label>
            <input
              name='email'
              onChange={handleChange}
              value={form.email}
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-indigo-300 bg-indigo-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-10"
            />
            <AiOutlineUser className="absolute right-3 top-[38px] text-indigo-400" />
          </div>

          <div className="relative">
  <label className="block text-sm font-medium text-indigo-700 mb-1">
    Password
  </label>
  <input
    name="password"
    onChange={handleChange}
    value={form.password}
    type={showPassword ? 'text' : 'password'}
    placeholder="••••••••"
    className="w-full px-4 py-3 rounded-xl border border-indigo-300 bg-indigo-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-10"
  />
  {
    showPassword ? (
      <FaRegEye onClick={() => setShowPassword(false)} className="absolute cursor-pointer right-3 top-[40px] text-indigo-400" />
    ) : (
      <FaRegEyeSlash onClick={() => setShowPassword(true)} className="absolute cursor-pointer right-3 top-[40px] text-indigo-400" />
    )
  }
</div>

<div className="flex justify-end -mt-2">
  <Link
    href="/features/auth/forgot-password"
    className="text-sm text-indigo-600 hover:text-indigo-900 hover:underline transition"
  >
    Forgot password?
  </Link>
</div>

           {
            error && (
               <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AiOutlineExclamationCircle className="mr-1" /> {error}
               </div>
            )
           }

          <button
            type="submit"
            className="w-full cursor-pointer py-3 mt-4 rounded-xl bg-indigo-900 text-white font-medium hover:bg-indigo-950 transition shadow-lg"
          >
            {
              loading ? <span className='flex items-center justify-center gap-2'><Spinner/> Loading</span> : 'Sign In'
            }
          </button>

          <p className="text-center text-sm text-indigo-600 mt-6">
            Don't have an account?
            <Link href={'/features/auth/register'} className="text-indigo-900 font-medium cursor-pointer ml-1 hover:underline">
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Login