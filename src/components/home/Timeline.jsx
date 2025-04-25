import React from "react";

const Timeline = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Timeline container */}
      <div className="flex flex-col items-center">
        {/* Timeline line with dots */}
        <div className="relative w-full flex justify-between items-center mb-16">
          <div className="absolute h-px bg-gray-200 w-full" />

          {/* Dot 1 */}
          <div className="relative z-10 w-4 h-4 rounded-full bg-purple-300 hover:bg-purple-600 transition-colors duration-300" />

          {/* Dot 2 */}
          <div className="relative z-10 w-4 h-4 rounded-full bg-purple-300 hover:bg-purple-600 transition-colors duration-300" />

          {/* Dot 3 */}
          <div className="relative z-10 w-4 h-4 rounded-full bg-purple-300 hover:bg-purple-600 transition-colors duration-300" />
        </div>

        {/* Text sections */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1 */}
          <div className="text-center px-4 group">
            <p className="text-base font-medium text-gray-500 group-hover:text-black transition-colors duration-300">
              We enable faster resolution, by reducing the number of visits
              needed to diagnose and treat most health concerns efficiently.
            </p>
          </div>

          {/* Section 2 */}
          <div className="text-center px-4 group">
            <p className="text-base font-medium text-gray-500 group-hover:text-black transition-colors duration-300">
              Receive care that is immediate, accurate, and personalized—
              accessible 24/7 from anywhere, on any device.
            </p>
          </div>

          {/* Section 3 */}
          <div className="text-center px-4 group">
            <p className="text-base font-medium text-gray-500 group-hover:text-black transition-colors duration-300">
              Our clinical staff and AI agents collaborate seamlessly to deliver
              high-quality care through both virtual and in-person visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
