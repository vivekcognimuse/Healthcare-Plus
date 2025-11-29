// ===== MobileDoctorCards.jsx =====
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileDoctorCards = ({ doctors }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [containerHeight, setContainerHeight] = useState(280);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const navigateCard = (direction) => {
    const totalCards = doctors.length;
    if (direction === "next") {
      setActiveCardId((prev) => (prev % totalCards) + 1);
    } else {
      setActiveCardId((prev) => (prev === 1 ? totalCards : prev - 1));
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const touchDiff = touchStartX.current - touchEndX.current;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        navigateCard("next");
      } else {
        navigateCard("prev");
      }
    }
  };

  return (
    <div className="w-full md:hidden relative">
      <div
        className="w-full overflow-hidden touch-manipulation"
        style={{ height: `${containerHeight}px` }}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeCardId}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {doctors.map(
              (doctor) =>
                doctor.id === activeCardId && (
                  <div
                    key={doctor.id}
                    className="w-full h-full rounded-3xl relative overflow-hidden shadow-lg"
                  >
                    <div className="absolute inset-0">
                      {doctor.image && (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-[#e8e5f1] rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {doctor.name}
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
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          {doctor.role}
                        </p>
                        <p className="text-xs text-gray-600">
                          Specialization: {doctor.specialization}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Years of Experience: {doctor.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4">
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => setActiveCardId(doctor.id)}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              doctor.id === activeCardId ? "bg-purple-500 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${doctor.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileDoctorCards;
