'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineMail, AiOutlineCheckCircle } from 'react-icons/ai'
import { Spinner } from '../ui/spinner'
import axios from '@/lib/axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
     try{
        const res = await axios.post('/auth/forgotPassword', {
            email: email
        })
        setSuccess(true)
        setTimeout(() => {
      setSuccess(false)
    }, 1500)
     }catch(err: any){
        console.log(err);
     }finally{
        setLoading(false)
     }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-200 p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">
            Forgot Password
          </h1>
          <p className="text-indigo-600 mt-2 text-sm">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center text-center py-8">
            <AiOutlineCheckCircle className="text-green-500 text-5xl mb-4" />
            <p className="text-indigo-900 font-medium">
              Reset link sent successfully
            </p>
            <p className="text-sm text-indigo-600 mt-1">
              Please check your email inbox
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="relative">
              <label className="block text-sm font-medium text-indigo-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border border-indigo-300 bg-indigo-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-10"
              />
              <AiOutlineMail className="absolute right-3 top-[38px] text-indigo-400" />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-xl bg-indigo-900 text-white font-medium hover:bg-indigo-950 transition shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
