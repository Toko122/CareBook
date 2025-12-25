'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { AiOutlineLock, AiOutlineCheckCircle } from 'react-icons/ai'
import { Spinner } from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { useParams, useRouter } from 'next/navigation'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const {id} = useParams()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
     try{
        const res = await axios.post(`/auth/resetPassword/${id}`, {
            password: password
        })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 1500)
        router.push('/features/auth/login')
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
            Reset Password
          </h1>
          <p className="text-indigo-600 mt-2 text-sm">
            Enter your new password
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center text-center py-8">
            <AiOutlineCheckCircle className="text-green-500 text-5xl mb-4" />
            <p className="text-indigo-900 font-medium">
              Password updated successfully
            </p>
            <p className="text-sm text-indigo-600 mt-1">
              You can now sign in with your new password
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="relative">
              <label className="block text-sm font-medium text-indigo-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-indigo-300 bg-indigo-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-10"
              />
              <AiOutlineLock className="absolute right-3 top-[38px] text-indigo-400" />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-xl bg-indigo-900 text-white font-medium hover:bg-indigo-950 transition shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
