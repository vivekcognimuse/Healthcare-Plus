"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Timer } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const MobileCardCarousel = ({ services }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [containerHeight, setContainerHeight] = useState(280); // Default height
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Calculate and set fixed height based on screen width
  useEffect(() => {
    const updateHeight = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;

        const cardHeight = Math.max(containerWidth * 0.8, 280);
        setContainerHeight(cardHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Handle card navigation
  const navigateCard = (direction) => {
    const totalCards = services.length;
    if (direction === "next") {
      setActiveCardId((prev) => (prev % totalCards) + 1);
    } else {
      setActiveCardId((prev) => (prev === 1 ? totalCards : prev - 1));
    }
  };

  // Manual touch handlers as a fallback
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;
    const touchDiff = touchStartX.current - touchEndX.current;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        // Swiped left, go to next
        navigateCard("next");
      } else {
        // Swiped right, go to prev
        navigateCard("prev");
      }
    }
  };

  // Set up swipe handlers with improved options
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateCard("next"),
    onSwipedRight: () => navigateCard("prev"),
    trackMouse: true,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
    delta: 10, // Minimum distance before a swipe is registered
    swipeDuration: 500, // Maximum time for a swipe to be registered
  });

  return (
    <div className="w-full py-8 sm:hidden relative">
      <div
        {...swipeHandlers}
        className="w-full overflow-hidden touch-manipulation"
        style={{ height: `${containerHeight}px` }}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeCardId}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full">
            {services.map(
              (service) =>
                service.id === activeCardId && (
                  <div
                    key={service.id}
                    className="w-full h-full sm:h-[60%]  rounded-2xl relative bg-[#f7f0ff] shadow-md overflow-hidden">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover rounded-2xl"
                        priority
                      />
                    )}

                    <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                      <div className="p-4 h-full rounded-2xl backdrop-blur-[30px] bg-white/20 max-w-full">
                        {/* Icon */}
                        <div className="w-12 h-12 mb-4 bg-white rounded-full flex items-center justify-center">
                          {service.icon ? (
                            <service.icon />
                          ) : (
                            <Timer className="w-8 h-8 text-red-500" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/90">{service.description}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dotted Progress Indicator */}
      <div className="flex justify-center mt-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveCardId(service.id)}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              service.id === activeCardId ? "bg-purple-500 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${service.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCardCarousel;
