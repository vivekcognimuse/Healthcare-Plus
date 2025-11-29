import React from "react";
import Button from "@/components/ui/Button";
import BoxReveal from "../ui/HeroReveal";
import RevealAnimation from "../ui/revealAnimation";
import { useModal } from "@/context/ContactContext";

const Hero = () => {
  const { openFormModal } = useModal();
  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-hidden">
      <div
        className="absolute pt-0 inset-0 bg-top bg-cover z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Hero-bg.png')",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      <div className="absolute top-[35%] left-0 right-0 px-4 lg:px-16">
        <BoxReveal duration={0.5}>
          <h1 className="h1 hero-title text-white">
            Quality healthcare, <br /> made accessible & personal
          </h1>
        </BoxReveal>
      </div>

      <RevealAnimation direction="up" type="slide" delay={2}>
        <div className="absolute bottom-[25%] left-0 right-0 px-4 lg:px-16">
          <div
            className="md:py-4 py-3 px-4 md:px-6 flex flex-col md:flex-row gap-3 items-center rounded-2xl justify-between w-full  mx-auto"
            style={{
              background: "#FFFFFF33",
              backdropFilter: "blur(28.1px)",
              border: "1px solid",
              borderImageSource:
                "linear-gradient(90.38deg, rgba(255, 255, 255, 0.3) 1.13%, rgba(255, 255, 255, 0.3) 97.97%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black-300 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm md:text-base text-white font-medium">
                Select Hospital
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-300"></div>

            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black-300 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm md:text-base text-white font-medium">
                Select Speciality
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-300"></div>

            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black-300 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm md:text-base text-white font-medium">
                Select Doctor
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-300"></div>

            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black-300 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm md:text-base text-white font-medium">
                Select Date
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <Button
              onClick={() => {
                openFormModal();
              }}
              className="whitespace-nowrap px-6 md:px-8"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </RevealAnimation>
    </div>
  );
};

export default Hero;
