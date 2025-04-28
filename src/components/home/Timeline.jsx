import React from "react";

const Timeline = () => {
  // Hardcoded content from the images
  const steps = [
    {
      text: "We enable faster resolution, by reducing the number of visits needed to diagnose and treat most health concerns efficiently.",
    },
    {
      text: "Receive care that is immediate, accurate, and personalized— accessible 24/7 from anywhere, on any device.",
    },
    {
      text: "Our clinical staff and AI agents collaborate seamlessly to deliver high-quality care through both virtual and in-person visits.",
    },
  ];

  return (
    <div className="w-full ">
      {/* Desktop Timeline (horizontal) */}
      <div className=" hidden md:flex md:flex-row flex-col items-start justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Circle with connector line */}
            <div className="relative flex mt-3  h-full justify-center w-full">
              <div className="absolute top-2 left-3 md:left-0 right-0 md:h-0.5 w-0.5 md:w-full h-full bg-gray-200 z-0"></div>
              <div className="relative z-10  mr-auto rounded-full shadow-lg flex items-center justify-center">
                <div className="absolute size-8 rounded-full bg-purple-200 opacity-50"></div>
                <div className="size-4 rounded-full bg-purple-600"></div>
              </div>
            </div>

            {/* Text content */}
            <div className={`mt-6 ${index !== steps.length - 1 ? "pr-8" : ""}`}>
              <p
                className={`text-lg font-normal ${
                  index === 0 ? "text-black" : "text-black"
                } `}>
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Timeline (vertical) */}
      <div className="md:hidden flex flex-col w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-start relative">
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            )}

            {/* Circle with glow */}
            <div className="relative   z-10 mr-6">
              <div className=" rounded-full mt-2  flex items-center justify-center">
                <div className="absolute size-8 rounded-full bg-purple-200 opacity-50"></div>
                <div className="size-4 rounded-full bg-purple-600"></div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1  mb-8">
              <p
                className={` font-normal ${
                  index === 0 ? "text-black" : "text-black"
                } font-medium`}>
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
