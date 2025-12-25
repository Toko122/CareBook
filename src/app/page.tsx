import Doctors from "@/components/sections/doctors/Doctors";
import Hero from "@/components/sections/hero/Hero";
import Service from "@/components/sections/services/Service";
import Testimonials from "@/components/sections/testimonial/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Service />
      <Doctors />
      <Testimonials />
    </div>
  );
}
