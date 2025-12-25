import React from 'react'
import { FaUserMd, FaHeartbeat, FaTooth } from 'react-icons/fa'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: 'General Checkup',
    description:
      'Comprehensive health checkups to monitor your overall well-being and detect issues early.',
    icon: <FaUserMd size={32} />,
  },
  {
    id: 2,
    title: 'Cardiology',
    description:
      'Advanced heart care services provided by experienced cardiology specialists.',
    icon: <FaHeartbeat size={32} />,
  },
  {
    id: 3,
    title: 'Dental Care',
    description:
      'Professional dental services including cleaning, whitening, and oral health care.',
    icon: <FaTooth size={32} />,
  },
]

const Service = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
      
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Medical Services
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We provide a wide range of medical services to ensure quality care for
          every patient.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <Link href={`/features/serviceBooking/${service.id}`}
            key={service.id}
            className="group cursor-pointer bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition">
              {service.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {service.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link
          href="/features/services"
          className="px-10 py-4 bg-teal-600 text-white rounded-xl text-lg font-medium hover:bg-teal-700 transition"
        >
          View All Services
        </Link>
      </div>
    </section>
  )
}

export default Service
