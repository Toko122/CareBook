'use client'

import { Spinner } from '@/components/ui/spinner'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

interface IContact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'new' | 'read'
  createdAt: string
}

const GetContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('/contact/getContacts')
        setContacts(res.data.contacts)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10">
        <Spinner /> Loading contacts...
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        No contact messages found
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">
        Contact Messages
      </h2>

      <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contacts.map(contact => (
              <tr
                key={contact._id}
                className={`hover:bg-gray-50 transition ${
                  contact.status === 'new' ? 'bg-blue-50/40' : ''
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {contact.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {contact.email}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {contact.phone || '—'}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {contact.message}
                </td>
                
                <td className="px-6 py-4 text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="lg:hidden space-y-4">
        {contacts.map(contact => (
          <div
            key={contact._id}
            className={`border rounded-xl p-4 shadow-sm bg-white ${
              contact.status === 'new' ? 'border-blue-300' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">
                {contact.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  contact.status === 'new'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {contact.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              📧 {contact.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              📞 {contact.phone || '—'}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              🗓 {new Date(contact.createdAt).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
              {contact.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetContacts
