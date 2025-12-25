import React from 'react'
import AdminDashboardCharts from '../../components/charts/PieChart'
import AdminSidebar from '../../layout/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="pt-20 px-4 md:pt-24 md:pl-64 md:pr-6 transition-all">
         <AdminDashboardCharts />
      </main>
    </div>
  )
}

export default AdminDashboard