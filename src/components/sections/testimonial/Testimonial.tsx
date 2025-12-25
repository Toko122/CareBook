import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    role: 'Patient',
    feedback:
      'Amazing service! Booking my appointment was so fast and easy. The doctor was very professional.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'David Smith',
    role: 'Patient',
    feedback:
      'Highly recommend this clinic. The staff is friendly and the process is seamless.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    role: 'Patient',
    feedback:
      'I love the online booking system. It saved me so much time and the doctors are great.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Patient',
    feedback:
      'Professional and caring doctors. Easy to schedule appointments online. Very convenient!',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
]

const Testimonials = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Patients Say
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Read real feedback from our patients who trust us for their medical care.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
          >
            <FaQuoteLeft className="text-teal-600 mb-4" size={24} />

            <p className="text-gray-700 flex-1">{testimonial.feedback}</p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
