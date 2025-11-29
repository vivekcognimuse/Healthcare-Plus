// ===== TabletDoctorCards.jsx =====
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const TabletDoctorCards = ({ doctors }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [positions, setPositions] = useState({
    left: doctors.length,
    center: 1,
    right: 2,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerHeight, setContainerHeight] = useState(320);
  const containerRef = useRef(null);

  const widths = {
    left: "25%",
    center: "55%",
    right: "25%",
  };

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const effectiveWidth = containerWidth - (3 - 1) * 32;
        const inactiveCardWidth = effectiveWidth * 0.25;
        const cardHeight = Math.max(inactiveCardWidth * 1.3, 280);
        setContainerHeight(cardHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const getCardData = (position) => {
    const cardId = positions[position];
    return doctors.find((doctor) => doctor.id === cardId);
  };

  const slideNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newPositions = {
      left: positions.center,
      center: positions.right,
      right: positions.right === doctors.length ? 1 : positions.right + 1,
    };

    setPositions(newPositions);
    setActiveCardId(newPositions.center);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newPositions = {
      left: positions.left === 1 ? doctors.length : positions.left - 1,
      center: positions.left,
      right: positions.center,
    };

    setPositions(newPositions);
    setActiveCardId(newPositions.center);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const jumpToCard = (cardId) => {
    if (isAnimating || cardId === positions.center) return;
    setIsAnimating(true);

    const goForward =
      cardId > positions.center
        ? cardId - positions.center <= doctors.length / 2
        : positions.center - cardId > doctors.length / 2;

    let newPositions;
    if (goForward) {
      const rightCard = cardId === doctors.length ? 1 : cardId + 1;
      newPositions = {
        left: positions.center,
        center: cardId,
        right: rightCard,
      };
    } else {
      const leftCard = cardId === 1 ? doctors.length : cardId - 1;
      newPositions = {
        left: leftCard,
        center: cardId,
        right: positions.center,
      };
    }

    setPositions(newPositions);
    setActiveCardId(cardId);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full hidden md:block lg:hidden">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "auto",
        }}
      >
        <div className="flex justify-between gap-8 w-full h-full relative">
          {/* Left Card */}
          <motion.div
            key={`left-${positions.left}`}
            className="relative rounded-3xl cursor-pointer h-full overflow-hidden shadow-md"
            style={{ width: widths.left, zIndex: 1 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={slidePrev}
          >
            {getCardData("left") && (
              <>
                <div className="absolute inset-0">
                  <img
                    src={getCardData("left").image}
                    alt={getCardData("left").name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-[#e8e5f1] rounded-2xl p-3">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {getCardData("left").name}
                    </h3>
                    <p className="text-sm text-gray-700 truncate">
                      {getCardData("left").role}
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Center Card */}
          <motion.div
            key={`center-${positions.center}`}
            className="relative rounded-3xl h-full overflow-hidden shadow-lg"
            style={{ width: widths.center, zIndex: 10 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {getCardData("center") && (
              <>
                <div className="absolute inset-0">
                  <img
                    src={getCardData("center").image}
                    alt={getCardData("center").name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-[#e8e5f1] rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getCardData("center").name}
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
                      {getCardData("center").role}
                    </p>
                    <p className="text-xs text-gray-600">
                      Specialization: {getCardData("center").specialization}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Years of Experience: {getCardData("center").experience}
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Right Card */}
          <motion.div
            key={`right-${positions.right}`}
            className="relative rounded-3xl cursor-pointer h-full overflow-hidden shadow-md"
            style={{ width: widths.right, zIndex: 1 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={slideNext}
          >
            {getCardData("right") && (
              <>
                <div className="absolute inset-0">
                  <img
                    src={getCardData("right").image}
                    alt={getCardData("right").name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-[#e8e5f1] rounded-2xl p-3">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {getCardData("right").name}
                    </h3>
                    <p className="text-sm text-gray-700 truncate">
                      {getCardData("right").role}
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4">
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => jumpToCard(doctor.id)}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              doctor.id === activeCardId ? "bg-purple-500 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${doctor.id}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 px-4">
        <button
          onClick={slidePrev}
          className="bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full text-purple-800 transition-colors duration-300"
          aria-label="Previous slide"
        >
          ← Prev
        </button>
        <button
          onClick={slideNext}
          className="bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full text-purple-800 transition-colors duration-300"
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default TabletDoctorCards;
