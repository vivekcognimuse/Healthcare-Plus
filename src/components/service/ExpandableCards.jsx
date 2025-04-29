"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Timer } from "lucide-react";
const ExpandableCards = ({ services }) => {
  // State to track the active card
  const [activeCardId, setActiveCardId] = useState(1);

  // Handle click on a card
  const handleCardClick = (id) => {
    setActiveCardId(id);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {services.map((service) => {
          const isActive = service.id === activeCardId;

          return (
            <motion.div
              key={service.id}
              className={`
                relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500
                ${isActive ? "z-10 md:w-1/2" : "z-0 md:w-1/4"}
              `}
              onClick={() => handleCardClick(service.id)}
              layout
              transition={{
                layout: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}>
              {/* Background for active state */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}>
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                  )}
                </motion.div>
              )}

              {/* Content container with conditional background */}
              <motion.div
                className={`relative z-10 h-72 p-6 flex flex-col justify-between
                  ${!isActive ? "bg-[#f7f0ff]" : " "}
                  rounded-2xl shadow-md transition-all duration-300
                `}>
                <div
                  className={` p-4  h-full rounded-32   ${
                    isActive
                      ? "max-w-[50%] backdrop-blur-[30px] bg-white/20"
                      : "max-w-full"
                  }`}>
                  {/* Icon */}
                  <div className="w-12 h-12 mb-4 bg-white rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isActive ? "text-white" : "text-gray-800"
                    }`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${
                      isActive ? "text-white/90" : "text-gray-600"
                    }`}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandableCards;
