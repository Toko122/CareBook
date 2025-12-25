import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">CareBook</h3>
          <p className="text-gray-400">
            Book your clinic visits easily and get the best healthcare services from verified doctors.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-teal-500 transition">Home</Link>
            </li>
            <li>
              <Link href="/features/services" className="hover:text-teal-500 transition">Services</Link>
            </li>
            <li>
              <Link href="/features/doctors" className="hover:text-teal-500 transition">Doctors</Link>
            </li>
            <li>
              <Link href="/features/contact" className="hover:text-teal-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
          <p className="text-gray-400">123 Healthcare St, City, Country</p>
          <p className="text-gray-400 mt-1">Email: info@carebook.com</p>
          <p className="text-gray-400 mt-1">Phone: +123 456 7890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-teal-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-teal-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-teal-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-teal-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CareBook. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
