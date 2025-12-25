'use client'

import React, { useEffect, useState, useMemo } from 'react'
import axios from '@/lib/axios'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { PieChart, Pie, Cell, Label } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

interface IUser {
  _id: string
  fullName: string
  email: string
  phone: string
  role: 'user' | 'doctor' | 'admin'
  createdAt: string
}

interface IContact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

interface IBooking {
  _id: string
  fullName: string
  email: string
  phone: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'cancelled'
}

export default function AdminDashboardCharts() {
  const [users, setUsers] = useState<IUser[]>([])
  const [contacts, setContacts] = useState<IContact[]>([])
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)
      try {
        const [usersRes, contactsRes, bookingsRes] = await Promise.all([
          axios.get('/users/getUsers'),
          axios.get('/contact/getContacts'),
          axios.get('/booking/getBooking')
        ])
        setUsers(usersRes.data.users)
        setContacts(contactsRes.data.contacts)
        setBookings(bookingsRes.data.bookings)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const usersData = useMemo(() => [
    { name: 'User', value: users.filter(u => u.role === 'user').length, color: '#3b82f6' },
    { name: 'Doctor', value: users.filter(u => u.role === 'doctor').length, color: '#8b5cf6' },
    { name: 'Admin', value: users.filter(u => u.role === 'admin').length, color: '#f43f5e' },
  ], [users])

  const contactsData = useMemo(() => [
    { name: 'Contacts', value: contacts.length, color: '#22c55e' } // სტატუსები ამოშლილია
  ], [contacts])

  const bookingsData = useMemo(() => [
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#fbbf24' },
    { name: 'Approved', value: bookings.filter(b => b.status === 'approved').length, color: '#34d399' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#f87171' }
  ], [bookings])

  const renderPieChart = (data: { name: string; value: number; color: string }[], label: string) => {
    const total = data.reduce((acc, item) => acc + item.value, 0)
    return (
      <Card className="max-w-sm mx-auto mb-6">
        <CardHeader>
          <CardTitle>{label}</CardTitle>
          <CardDescription>Total: {total}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-center"
                      >
                        <tspan x={viewBox.cx} y={viewBox.cy} className="text-2xl font-bold fill-foreground">
                          {total}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="text-sm fill-muted-foreground">
                          {label}
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </CardContent>
        <CardFooter className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          Overview of {label.toLowerCase()}
        </CardFooter>
      </Card>
    )
  }

  if (loading) return <div className="flex justify-center py-24 items-center gap-2"><Spinner /> Loading dashboard...</div>

  return (
    <div className="p-4 lg:p-6 flex flex-wrap gap-6 justify-center">
      {renderPieChart(usersData, 'Users')}
      {renderPieChart(contactsData, 'Contacts')}
      {renderPieChart(bookingsData, 'Bookings')}
    </div>
  )
}
