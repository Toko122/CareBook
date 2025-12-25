import React from 'react'
import GetUsers from '../../components/GetUsers'
import AdminSidebar from '../../layout/Sidebar'

const AdminUsers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="pt-20 px-4 md:pt-24 md:pl-64 md:pr-6 transition-all">
        <GetUsers />
      </main>
    </div>
  )
}

export default AdminUsers
