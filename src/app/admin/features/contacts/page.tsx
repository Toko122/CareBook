import React from 'react'
import GetContacts from '../../components/GetContacts'
import AdminSidebar from '../../layout/Sidebar'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="pt-20 px-4 md:pt-24 md:pl-64 md:pr-6 transition-all">
        <GetContacts />
      </main>
    </div>
  )
}

export default ContactPage
