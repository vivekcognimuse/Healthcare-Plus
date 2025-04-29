// File: src/app/page.js
"use client";
import About from "@/components/home/About";

import Hero from "@/components/home/Hero";
import ProblemStatement from "@/components/home/ProblemStatement";
import Services from "@/components/home/Services";

import image1 from "@/../public/assets/1.webp";
import image3 from "@/../public/assets/2.webp";
import image2 from "@/../public/assets/3.webp";
import { Timer } from "lucide-react";
import NewsSection from "@/components/blog/NewsSection";
export default function Home() {
  const servicesData = [
    {
      id: 1,
      title: "Instant Appointments",
      description:
        "Connect with Crumpler's AI agent anytime, anywhere - 24x7 access.",
      image: "/images/patient-phone.jpg", // Path to your image
      icon: Timer, // Path to your icon image
    },
    {
      id: 2,
      title: "On-call clinicians",
      description:
        "Get support from a world-class team of licensed clinicians for any health condition.",
      image: image2,
      icon: Timer,
    },
    {
      id: 3,
      title: "Extensive clinic network",
      description:
        "Visit nearby clinics for bloodwork, diagnostics, or in-person testing - seamlessly integrated.",
      image: image3,
      icon: Timer,
    },
  ];

  return (
    <div className="max-w-[1480px] md:px-0 mx-auto pt-28 ">
      <Hero />
      <div className="px-4">
        <About />
        <ProblemStatement />
        <Services services={servicesData} />
      </div>
      {/* <Contact /> */}
      <NewsSection />
    </div>
  );
}
