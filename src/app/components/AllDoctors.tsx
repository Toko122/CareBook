import React from 'react'

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
  {
    id: 4,
    name: 'Dr. James Anderson',
    specialty: 'Neurologist',
    image: '/Headshot photographer Toronto, Ontario.jpg',
  },
  {
    id: 5,
    name: 'Dr. Emily Johnson',
    specialty: 'Pediatrician',
    image: '/Smiling Female Doctor With Stethoscope Isolated On Transparent Background, Doctor, Woman, Medical PNG Transparent Image and Clipart for Free Download.jpg',
  },
  {
    id: 6,
    name: 'Dr. Daniel Martinez',
    specialty: 'Orthopedic Surgeon',
    image: '/download (3).jpg',
  },
  {
    id: 7,
    name: 'Dr. Olivia Smith',
    specialty: 'Dermatologist',
    image: '/Nurse Images - Free Download on Freepik.jpg',
  },
  {
    id: 8,
    name: 'Dr. Robert Wilson',
    specialty: 'ENT Specialist',
    image: '/download (4).jpg',
  },
  {
    id: 9,
    name: 'Dr. Isabella Garcia',
    specialty: 'Gynecologist',
    image: '/Nurse Images - Free Download on Freepik.jpg',
  },
]

const AllDoctors = () => {
  return (
    <section className="w-full bg-gray-50 py-24 px-4">

      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Our Medical Team
        </h1>
        <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
          Meet our team of highly qualified and experienced doctors who are
          committed to your health and well-being.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
          >
            <div className="overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

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
    </section>
  )
}

export default AllDoctors
