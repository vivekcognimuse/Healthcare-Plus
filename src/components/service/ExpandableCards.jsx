"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
const ExpandableCards = ({ services }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  const calculateFlexBasis = (isActive, totalCards) => {
    const totalInactiveParts = totalCards - 1;
    const totalParts = 2 + totalInactiveParts;
    const scaleFactor = 0.95;

    if (isActive) {
      return `${(2 / totalParts) * 98 * scaleFactor}%`;
    } else {
      return `${(1 / totalParts) * 98 * scaleFactor}%`;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalCards = services.length;
        const totalParts = 2 + (totalCards - 1);

        const effectiveWidth = containerWidth - (services.length - 1) * 32;
        const inactiveCardWidth = (effectiveWidth / totalParts) * 0.95;
        const cardHeight = Math.max(inactiveCardWidth * 1.5, 224);

        setContainerHeight(cardHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [services.length]);

  return (
    <div className="w-full hidden lg:block py-8">
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row justify-around  w-full mx-auto min-h-80"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "auto",
        }}>
        {services.map(({ id, title, description, image, iconSrc }) => {
          const isActive = id === activeCardId;
          const flexBasis = calculateFlexBasis(isActive, services.length);

          return (
            <motion.div
              key={id}
              className={`
                relative rounded-32 cursor-pointer  h-full
                transition-all duration-700
                ${isActive ? "z-10" : "z-0"}
              `}
              style={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: flexBasis,
              }}
              onMouseEnter={() => setActiveCardId(id)}
              layout
              transition={{
                layout: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              }}>
              {/* Background for active state */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-32 overflow-hidden"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}>
                  {image && (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover object-left rounded-32"
                      priority
                    />
                  )}
                </motion.div>
              )}

              {/* Content container with conditional background */}
              <motion.div
                className={`
                  relative z-10 h-full p-4 flex flex-col w-fit justify-between
                  ${!isActive ? "bg-white" : ""} 
                  rounded-32 shadow-elevated transition-all duration-700
                `}>
                <div
                  className={`
                    p-4  h-full rounded-32  w-fit
                    ${
                      isActive
                        ? "max-w-[50%] overflow-hidden backdrop-blur-[30px] bg-black/25"
                        : "max-w-[100%]"
                    }
                  `}>
                  {/* Dynamic Icon */}
                  <div
                    className={`w-12 h-12 mb-4  border border-white rounded-full flex items-center justify-center ${
                      isActive ? "bg-transparent" : "bg-black"
                    }`}>
                    {Icon && (
                      <Icon icon={iconSrc} className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={` mb-4  font-base text-4xl  ${
                      isActive ? "text-white " : "text-gray-800 "
                    }`}>
                    {title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-lg font-light ${
                      isActive ? "text-white/90" : "text-gray-600"
                    }`}>
                    {description}
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
