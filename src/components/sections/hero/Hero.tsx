import React from "react";
import "./Hero.css";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-x-hidden">
      <img
        src="/camilo-jimenez-vGu08RYjO-s-unsplash.jpg"
        alt="Clinic"
        className="absolute inset-0 w-full h-full object-cover select-none"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <h1 className="heroHeader text-5xl text-white font-bold max-w-4xl leading-tight">
          Book Your Clinic Visit <br className="hidden sm:block" /> Fast & Easy
        </h1>

        <p className="heroSub text-[20px] text-gray-200 mt-4 sm:mt-6 max-w-2xl">
          Schedule appointments with trusted doctors in just a few clicks.
        </p>

        <div className="heroButtons mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href={'/features/services'} className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-xl text-base sm:text-lg font-medium hover:bg-teal-700 transition">
            Book Appointment
          </Link>

          <Link href={'/features/doctors'} className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white border border-white/30 rounded-xl text-base sm:text-lg hover:bg-white/20 transition">
            View Doctors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
