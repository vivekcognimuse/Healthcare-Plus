"use client";

import React from "react";
import DesktopDoctorCards from "@/components/service/DesktopDoctorCards";
import TabletDoctorCards from "@/components/service/TabletDoctorCards";
import MobileDoctorCards from "@/components/service/MobileDoctorCards";
import Button from "../ui/Button";

const doctorsData = [
  {
    id: 1,
    name: "Dr. John Smith",
    role: "Cardiologist",
    specialization: "Cardiovascular Care",
    experience: "10+",
    image: "/specialists/john.webp",
  },
  {
    id: 2,
    name: "Dr. Elizabeth Taylor",
    role: "Cardiologist",
    specialization: "Echocardiography",
    experience: "20+",
    image: "/specialists/elizabeth.webp",
  },
  {
    id: 3,
    name: "Dr. Olivia Bennett",
    role: "Neurologist",
    specialization: "Epilepsy and Seizure",
    experience: "20+",
    image: "/specialists/olivia.webp",
  },
];

export default function DoctorSpecialists() {
  return (
    <div className="w-full py-12">
      {/* Desktop Layout: Side-by-side */}
      <div className="hidden lg:flex gap-8 items-center  mx-auto px-4">
        {/* Left Section - Header (35%) */}
        <div className="w-[35%] flex-shrink-0">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Doctors
          </span>
          <h2 className="h2 text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Specialists
          </h2>
          <p className="p1 mb-6">
            At HealthCare Plus, our expert doctors offer compassionate care
            across specialties, ensuring a comfortable and effective healthcare
            experience.
          </p>
          <Button className="">View All Doctors</Button>
        </div>

        {/* Right Section - Cards (65%) */}
        <div className="w-[65%] flex-shrink-0">
          <DesktopDoctorCards doctors={doctorsData} />
        </div>
      </div>

      {/* Tablet Layout: Stacked */}
      <div className="hidden md:block lg:hidden px-4">
        <div className="mb-8">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Doctors
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Specialists
          </h2>
          <p className="text-gray-600 text-base mb-6">
            At HealthCare Plus, our expert doctors offer compassionate care
            across specialties, ensuring a comfortable and effective healthcare
            experience.
          </p>
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium">
            View All Doctors
          </button>
        </div>
        <TabletDoctorCards doctors={doctorsData} />
      </div>

      {/* Mobile Layout: Stacked */}
      <div className="md:hidden px-4">
        <div className="mb-8">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Doctors
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Specialists
          </h2>
          <p className="text-gray-600 text-base mb-6">
            At HealthCare Plus, our expert doctors offer compassionate care
            across specialties, ensuring a comfortable and effective healthcare
            experience.
          </p>
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium">
            View All Doctors
          </button>
        </div>
        <MobileDoctorCards doctors={doctorsData} />
      </div>
    </div>
  );
}
