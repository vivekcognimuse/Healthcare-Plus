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
        className="absolute pt-0 inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Hero-bg.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      {/* Mobile overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 md:bg-transparent z-[1]" />

      <div className="absolute top-[30%] md:top-[35%] left-0 right-0 px-4 lg:px-16 z-[2]">
        <BoxReveal duration={0.5}>
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white text-center md:text-left">
            Quality healthcare, <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            made accessible & personal
          </h1>
        </BoxReveal>
      </div>

      <RevealAnimation direction="up" type="slide" delay={2}>
        <div className="absolute bottom-[12%] md:bottom-[25%] left-0 right-0 px-4 lg:px-16 z-[2]">
          {/* Mobile: Compact stacked form */}
          <div className="md:hidden">
            <div
              className="p-3 rounded-xl w-full max-w-sm mx-auto space-y-2"
              style={{
                background: "#FFFFFF33",
                backdropFilter: "blur(28.1px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Compact form fields */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <svg
                    className="w-3 h-3 text-white"
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
                  <span className="text-xs text-white font-medium">
                    Hospital
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <svg
                    className="w-3 h-3 text-white"
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
                  <span className="text-xs text-white font-medium">
                    Speciality
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <svg
                    className="w-3 h-3 text-white"
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
                  <span className="text-xs text-white font-medium">Doctor</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors">
                  <svg
                    className="w-3 h-3 text-white"
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
                  <span className="text-xs text-white font-medium">Date</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  openFormModal();
                }}
                className="w-full py-2 text-sm font-semibold mt-2"
              >
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Desktop: Horizontal form */}
          <div
            className="hidden md:flex py-4 px-6 flex-row gap-3 items-center rounded-2xl w-full mx-auto max-w-6xl"
            style={{
              background: "#FFFFFF33",
              backdropFilter: "blur(28.1px)",
              border: "1px solid",
              borderImageSource:
                "linear-gradient(90.38deg, rgba(255, 255, 255, 0.3) 1.13%, rgba(255, 255, 255, 0.3) 97.97%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 cursor-pointer hover:bg-white/10 rounded-lg md:rounded-full transition-colors flex-1 md:flex-none">
              <svg
                className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0"
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
              <span className="text-xs md:text-base text-white font-medium truncate">
                Select Hospital
              </span>
              <svg
                className="w-3 md:w-4 h-3 md:h-4 text-white flex-shrink-0 ml-auto"
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

            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 cursor-pointer hover:bg-white/10 rounded-lg md:rounded-full transition-colors flex-1 md:flex-none">
              <svg
                className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0"
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
              <span className="text-xs md:text-base text-white font-medium truncate">
                Select Speciality
              </span>
              <svg
                className="w-3 md:w-4 h-3 md:h-4 text-white flex-shrink-0 ml-auto"
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

            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 cursor-pointer hover:bg-white/10 rounded-lg md:rounded-full transition-colors flex-1 md:flex-none">
              <svg
                className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0"
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
              <span className="text-xs md:text-base text-white font-medium truncate">
                Select Doctor
              </span>
              <svg
                className="w-3 md:w-4 h-3 md:h-4 text-white flex-shrink-0 ml-auto"
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

            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 cursor-pointer hover:bg-white/10 rounded-lg md:rounded-full transition-colors flex-1 md:flex-none">
              <svg
                className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0"
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
              <span className="text-xs md:text-base text-white font-medium truncate">
                Select Date
              </span>
              <svg
                className="w-3 md:w-4 h-3 md:h-4 text-white flex-shrink-0 ml-auto"
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
              className="whitespace-nowrap px-3 md:px-8 py-2 text-xs md:text-base w-full md:w-auto mt-2 md:mt-0"
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
