import React from 'react'
import { FaUserMd, FaHeartbeat, FaTooth, FaHospital, FaAmbulance, FaStethoscope, FaSyringe, FaWheelchair, FaEye } from 'react-icons/fa'
import Link from 'next/link'

const servicesData = [
  { id: 1, title: 'General Checkup', description: 'Comprehensive health checkups for all ages.', icon: <FaUserMd size={28} /> },
  { id: 2, title: 'Cardiology', description: 'Advanced heart care services from experienced cardiologists.', icon: <FaHeartbeat size={28} /> },
  { id: 3, title: 'Dental Care', description: 'Professional dental services including cleaning and whitening.', icon: <FaTooth size={28} /> },
  { id: 4, title: 'Emergency Services', description: '24/7 emergency medical services for urgent care.', icon: <FaAmbulance size={28} /> },
  { id: 5, title: 'Surgery', description: 'Advanced surgical procedures performed by expert surgeons.', icon: <FaHospital size={28} /> },
  { id: 6, title: 'Pediatrics', description: 'Health care services for children and newborns.', icon: <FaStethoscope size={28} /> },
  { id: 7, title: 'Dermatology', description: 'Skin care services and treatments for various conditions.', icon: <FaUserMd size={28} /> },
  { id: 8, title: 'Neurology', description: 'Specialized care for brain and nervous system disorders.', icon: <FaUserMd size={28} /> },
  { id: 9, title: 'Orthopedics', description: 'Treatment for bones, joints, and musculoskeletal issues.', icon: <FaUserMd size={28} /> },
  { id: 10, title: 'Vaccination', description: 'Protective vaccines for children and adults.', icon: <FaSyringe size={28} /> },
  { id: 11, title: 'Eye Care', description: 'Comprehensive eye examinations and treatments.', icon: <FaEye size={28} /> },
  { id: 12, title: 'Rehabilitation', description: 'Physical therapy and rehabilitation services.', icon: <FaWheelchair size={28} /> },
]

const Services = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore the wide range of medical services we provide to ensure the best care for you and your family.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {servicesData.map(service => (
          <Link href={`/features/serviceBooking/${service.id}`}
            key={service.id}
            className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition">
              {service.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </Link>
        ))}
      </div>     
    </section>
  )
}

export default Services
