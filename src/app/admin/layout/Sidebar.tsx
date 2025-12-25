'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { FcBusinessContact } from 'react-icons/fc'

const menu = [
  { title: 'Dashboard', href: '/admin/features/dashboard', icon: LayoutDashboard },
  { title: 'Bookings', href: '/admin/features/bookings', icon: CalendarCheck },
  { title: 'Users', href: '/admin/features/users', icon: Users },
  { title: 'Contacts', href: '/admin/features/contacts', icon: FcBusinessContact },
]

const AdminSidebar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const [bookings, setBookings] = useState(0)
  const [users, setUsers] = useState(0)
  const [contacts, setContacts] = useState(0)

  useEffect(() => {
    axios.get('/booking/getBooking').then(res => {
      setBookings(res.data.bookings.length)
    })
    axios.get('/users/getUsers').then(res => {
      setUsers(res.data.users.length)
    })
    axios.get('/contact/getContacts').then(res => {
      setContacts(res.data.contacts.length)
    })
  }, [])

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] text-white flex items-center justify-between px-4 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
        <Link href={'/'} className="font-bold text-lg">CareBook</Link>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f172a] text-white flex flex-col z-50
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >

        <div className="px-6 py-5 text-2xl font-bold border-b border-slate-700 flex justify-between items-center">
          <Link href="/">CareBook</Link>
          <button onClick={() => setOpen(false)} className="md:hidden cursor-pointer">
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map(item => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="flex-1">{item.title}</span>

                {item.title === 'Bookings' && bookings > 0 && (
                  <Badge value={bookings} />
                )}
                {item.title === 'Users' && users > 0 && (
                  <Badge value={users} />
                )}
                {item.title === 'Contacts' && contacts > 0 && (
                  <Badge value={contacts} />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="px-6 py-4 border-t border-slate-700 text-sm text-slate-400">
          Logged in as <br />
          <span className="text-white font-medium">Admin</span>
        </div>
      </aside>
    </>
  )
}

const Badge = ({ value }: { value: number }) => (
  <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
    {value}
  </span>
)

export default AdminSidebar
