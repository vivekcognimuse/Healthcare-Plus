"use client";

import React, { useState } from "react";

const DesktopDoctorCards = ({ doctors }) => {
  const [activeCardId, setActiveCardId] = useState(2);

  return (
    <div className="w-full">
      <div className="flex justify-center items-stretch w-full mx-auto gap-4 h-[500px]">
        {doctors.map(
          ({ id, name, role, specialization, experience, image }) => {
            const isActive = id === activeCardId;

            return (
              <div
                key={id}
                className={`
                  relative rounded-2xl cursor-pointer  bg-none overflow-hidden  h-full
                  transition-all duration-500 ease-in-out
                  ${isActive ? "z-10 flex-[1.8]" : "z-0 flex-1"}
                `}
                onMouseEnter={() => setActiveCardId(id)}
              >
                {/* Image Section */}
                <div
                  className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#e8e5f1] transition-all duration-500 ${
                    isActive ? "h-[75%]  mb-[-2px]" : "h-full "
                  }`}
                  style={isActive ? { zIndex: 1 } : {}}
                >
                  {image && (
                    <img
                      src={image}
                      alt={name}
                      className={`w-full h-full object-cover ${
                        isActive ? "rounded-t-2xl" : "rounded-2xl"
                      }`}
                    />
                  )}
                </div>

                {/* Info Section only for active card, flush with image, no gap */}
                {isActive && (
                  <div
                    className="relative bg-[#e8e5f1] p-4 flex flex-col justify-between transition-all duration-500 h-[25%] rounded-2xl border-2 border-[#e8e5f1]"
                    style={{ marginTop: 0, zIndex: 2 }}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 transition-all duration-300 text-lg">
                          {name}
                        </h3>
                        <svg
                          className="w-5 h-5 text-gray-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {role}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">
                          Specialization: {specialization}
                        </p>
                        <p className="text-xs text-gray-600">
                          Years of Experience: {experience}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default DesktopDoctorCards;
