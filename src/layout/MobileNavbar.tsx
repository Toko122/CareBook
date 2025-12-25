'use client'

import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import { IoMdClose } from "react-icons/io"
import Link from 'next/link'
import { useAuth } from '@/lib/AuthProvider'
import { useRouter } from 'next/navigation'

interface CloseProps {
  onClose: () => void
}

const MobileNavbar = ({ onClose }: CloseProps) => {

  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement | null>(null)

  const handleLogout = () => {
    logout()
    onClose()
    router.push('/features/auth/login')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            onClose()
        }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className="min-h-screen w-full bg-[rgba(0,0,0,0.5)] fixed inset-0 z-[100]">
      
      <div ref={modalRef} className="sidebar h-full w-[260px] bg-black fixed z-[101] py-6 px-5 flex flex-col gap-10 shadow-2xl">
        
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-bold tracking-wide text-white"
          >
            CareBook
          </Link>

          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-[22px] text-white hover:rotate-90 transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link onClick={onClose} href="/" className="text-white text-[16px] hover:translate-x-2 transition">
            Home
          </Link>

          {isLoggedIn && (
            <Link onClick={onClose} href={`/features/MyBooking/${localStorage.getItem('userId')}`} className="text-white text-[16px] hover:translate-x-2 transition">
              My Booking
            </Link>
          )}

          <Link onClick={onClose} href="/features/services" className="text-white text-[16px] hover:translate-x-2 transition">
            Services
          </Link>

          <Link onClick={onClose} href="/features/doctors" className="text-white text-[16px] hover:translate-x-2 transition">
            Doctors
          </Link>

          <Link onClick={onClose} href="/features/contact" className="text-white text-[16px] hover:translate-x-2 transition">
            Contact
          </Link>
        </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full cursor-pointer py-2.5 rounded-xl bg-white text-black text-[16px] font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onClose()
                router.push('/features/auth/login')
              }}
              className="cursor-pointer w-full py-2.5 rounded-xl bg-white text-black text-[16px] font-medium"
            >
              Login
            </button>
          )}

      </div>
    </div>
  )
}

export default MobileNavbar
