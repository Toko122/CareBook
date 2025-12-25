import React from 'react'
import Link from 'next/link'

const doctors = [
  {
    id: 1,
    name: 'Dr. Anna Williams',
    specialty: 'Cardiologist',
    image: '/bermix-studio-ODM_VsTM2QQ-unsplash.jpg',
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    specialty: 'General Physician',
    image: '/usman-yousaf-pTrhfmj2jDA-unsplash.jpg',
  },
  {
    id: 3,
    name: 'Dr. Sophia Clark',
    specialty: 'Dental Specialist',
    image: '/humberto-chavez-FVh_yqLR9eA-unsplash.jpg',
  },
]

const Doctors = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Meet Our Doctors
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Our experienced doctors are dedicated to providing the best medical
          care for you and your family.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {doctors.map(doctor => (
          <div
            key={doctor.id}
            className="bg-white cursor-pointer rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {doctor.name}
              </h3>

              <p className="text-teal-600 font-medium mt-2">
                {doctor.specialty}
              </p>

            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link
          href="/features/doctors"
          className="px-10 py-4 bg-teal-600 text-white rounded-xl text-lg font-medium hover:bg-teal-700 transition"
        >
          View All Doctors
        </Link>
      </div>
    </section>
  )
}

export default Doctors
