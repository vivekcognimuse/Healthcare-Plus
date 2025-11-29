import React, { useState } from "react";
import Image from "next/image";

export default function ServiceCard({
  iconSrc,
  backgroundImageSrc,
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-3xl overflow-hidden h-full min-h-[400px] group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(178.44deg, rgba(0, 0, 0, 0) 25.18%, #000000 98.68%)",
        }}
      />
      {/* Icon at top-left corner */}
      <div className="absolute top-6 left-6 z-30">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white group-hover:bg-blue-600 transition-colors duration-300">
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={28}
            height={28}
            className="w-10 h-10"
          />
        </div>
      </div>
      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="h3  text-white leading-tight mb-2">{title}</h3>
        {/* Description */}
        <p className="p2 text-white  font-normal opacity-90 mb-2">
          {description}
        </p>
        {/* Button - Visible only on hover */}
        {buttonText && (
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <button
              onClick={onButtonClick}
              className="st inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-full transition-colors duration-200"
            >
              {buttonText}
              <span className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
