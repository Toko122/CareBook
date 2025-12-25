'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthProvider'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileNavbar from './MobileNavbar'

const Navbar = () => {

    const {isLoggedIn, logout} = useAuth()
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState(false)
    const pathName = usePathname()

    const handleLogout = () => {
        logout()
        router.push('/features/auth/login')
    }

    if(pathName.startsWith('/admin')){
      return ;
    }

  return (
    <>
      <div className='bg-white w-full shadow-2xl h-[85px] fixed top-0 z-100'>
        <div className='w-full h-full flex items-center justify-between md:px-12 px-6'>
            <Link href={'/'} className='text-3xl'>CareBook</Link>

            <div className='md:flex hidden gap-6 items-center'>
               <Link href={'/'} className='hover:scale-105 transition duration-150 shrink-0 ease-in-out'>Home</Link>
               {
                isLoggedIn && <Link href={`/features/MyBooking/${localStorage.getItem('userId')}`} className='hover:scale-105 transition duration-150 shrink-0 ease-in-out'>My Booking</Link>
               }
               <Link href={'/features/services'} className='hover:scale-105 transition duration-150 shrink-0 ease-in-out'>Services</Link>
               <Link href={'/features/doctors'} className='hover:scale-105 transition duration-150 shrink-0 ease-in-out'>Doctors</Link>
               <Link href={'/features/contact'} className='hover:scale-105 transition duration-150 shrink-0 ease-in-out'>Contact</Link>
            </div>

               {
                isLoggedIn ? (
                  <Button onClick={handleLogout} className='md:flex hidden bg-black text-[16px] text-white rounded-[18px] cursor-pointer'>
                      Logout
                  </Button>
                ): (
                   <Button onClick={() => router.push('/features/auth/login')} className='md:flex hidden bg-black text-[16px] text-white rounded-[18px] cursor-pointer'>
                      Login
                   </Button>
                )
               }

              <div className='md:hidden flex'>
                 <HiOutlineMenuAlt3 onClick={() => setOpenMenu(true)} className='text-2xl cursor-pointer'/>
              </div>

        </div>
    </div>

        {
          openMenu && <MobileNavbar onClose={() => setOpenMenu(false)}/>
        }

    </>
  )
}

export default Navbar