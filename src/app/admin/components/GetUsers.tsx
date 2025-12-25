'use client'

import { Spinner } from '@/components/ui/spinner'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

interface IUser {
  _id: string
  fullName: string
  email: string
  phone: string
  role: 'user' | 'doctor' | 'admin'
  createdAt: string
}

const GetUsers = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/users/getUsers')
        setUsers(res.data.users)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 py-10">
        <Spinner /> Loading users...
      </div>
    )

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">
        Users Management
      </h2>

      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700'
                        : user.role === 'doctor'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {users.map(user => (
          <div
            key={user._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">
                {user.fullName}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  user.role === 'admin'
                    ? 'bg-red-100 text-red-700'
                    : user.role === 'doctor'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {user.role}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">📧 {user.email}</p>
            <p className="text-sm text-gray-600 mb-1">📞 {user.phone}</p>
            <p className="text-sm text-gray-500">
              🗓 Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetUsers
