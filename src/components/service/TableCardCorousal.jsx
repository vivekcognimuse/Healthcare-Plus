"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Timer } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const TabletCardCarousel = ({ services }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [positions, setPositions] = useState({
    left: services.length, // Start with last card on left
    center: 1, // Start with first card in center
    right: 2, // Start with second card on right
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerHeight, setContainerHeight] = useState(320);
  const containerRef = useRef(null);

  // Calculate card width percentages - Increased center card by 10%
  const widths = {
    left: "25%",
    center: "55%", // Increased from 50% to 55%
    right: "25%",
  };

  // Calculate dimensions based on container width
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Adjust calculation to account for new 55% center card width
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

  // Get card data by position
  const getCardData = (position) => {
    const cardId = positions[position];
    return services.find((service) => service.id === cardId);
  };

  // Handle slide next
  const slideNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Calculate new positions
    const newPositions = {
      left: positions.center, // Current center moves to left
      center: positions.right, // Current right moves to center
      right: positions.right === services.length ? 1 : positions.right + 1, // Get next card or loop to beginning
    };

    setPositions(newPositions);
    setActiveCardId(newPositions.center);

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle slide previous
  const slidePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Calculate new positions
    const newPositions = {
      left: positions.left === 1 ? services.length : positions.left - 1, // Get previous card or loop to end
      center: positions.left, // Current left moves to center
      right: positions.center, // Current center moves to right
    };

    setPositions(newPositions);
    setActiveCardId(newPositions.center);

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Set up swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: slideNext,
    onSwipedRight: slidePrev,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
    delta: 10,
    swipeDuration: 500,
  });

  // Jump to a specific card
  const jumpToCard = (cardId) => {
    if (isAnimating || cardId === positions.center) return;
    setIsAnimating(true);

    // Determine if we should go forward or backward
    const goForward = shouldMoveForward(
      positions.center,
      cardId,
      services.length
    );

    // Calculate new positions
    let newPositions;
    if (goForward) {
      // Calculate the card that should be on the right
      const rightCard = cardId === services.length ? 1 : cardId + 1;

      newPositions = {
        left: positions.center, // Current center moves to left
        center: cardId, // Target card becomes center
        right: rightCard, // Next card becomes right
      };
    } else {
      // Calculate the card that should be on the left
      const leftCard = cardId === 1 ? services.length : cardId - 1;

      newPositions = {
        left: leftCard, // Previous card becomes left
        center: cardId, // Target card becomes center
        right: positions.center, // Current center moves to right
      };
    }

    setPositions(newPositions);
    setActiveCardId(cardId);

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Helper function to determine if we should move forward or backward
  const shouldMoveForward = (current, target, total) => {
    if (target > current) {
      return target - current <= total / 2;
    } else {
      return current - target > total / 2;
    }
  };

  return (
    <div className="w-full py-8 hidden md:block lg:hidden">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "auto",
        }}>
        <div
          {...swipeHandlers}
          className="flex justify-between gap-8 w-full h-full relative">
          {/* Left Card */}
          <motion.div
            key={`left-${positions.left}`}
            className="relative rounded-2xl cursor-pointer h-full bg-[#f7f0ff] shadow-md overflow-hidden"
            style={{ width: widths.left, zIndex: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={slidePrev}>
            {getCardData("left") && (
              <div className="relative z-10 h-full p-6 flex flex-col justify-between rounded-2xl">
                <div className="p-4 h-full rounded-2xl w-full">
                  {/* Icon */}
                  <div className="w-12 h-12 mb-4 bg-white rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-800 truncate">
                    {getCardData("left").title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 line-clamp-3">
                    {getCardData("left").description}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Center Card */}
          <motion.div
            key={`center-${positions.center}`}
            className="relative rounded-2xl cursor-pointer h-full"
            style={{ width: widths.center, zIndex: 10 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            {getCardData("center") && (
              <>
                {/* Background image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {getCardData("center").image && (
                    <Image
                      src={getCardData("center").image}
                      alt={getCardData("center").title}
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between rounded-2xl">
                  <div className="p-4 h-full rounded-2xl max-w-[50%] backdrop-blur-[30px] bg-white/20">
                    {/* Icon */}
                    <div className="w-12 h-12 mb-4 bg-white rounded-full flex items-center justify-center">
                      <Timer className="w-8 h-8 text-red-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {getCardData("center").title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90">
                      {getCardData("center").description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Right Card */}
          <motion.div
            key={`right-${positions.right}`}
            className="relative rounded-2xl cursor-pointer h-full bg-[#f7f0ff] shadow-md overflow-hidden"
            style={{ width: widths.right, zIndex: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={slideNext}>
            {getCardData("right") && (
              <div className="relative z-10 h-full p-6 flex flex-col justify-between rounded-2xl">
                <div className="p-4 h-full rounded-2xl w-full">
                  {/* Icon */}
                  <div className="w-12 h-12 mb-4 bg-white rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-800 truncate">
                    {getCardData("right").title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 line-clamp-3">
                    {getCardData("right").description}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sliding Animation Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 20 }}>
          {/* When sliding next */}
          {isAnimating && (
            <>
              {/* Left card slides off */}
              <motion.div
                key={`slide-left-${positions.left}`}
                className="absolute left-0 top-0 h-full bg-[#f7f0ff] rounded-2xl overflow-hidden"
                style={{ width: widths.left, zIndex: 1 }}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                {/* Content is invisible, just for animation */}
              </motion.div>

              {/* Center card slides to left */}
              <motion.div
                key={`slide-center-to-left-${positions.center}`}
                className="absolute left-0 top-0 h-full overflow-hidden"
                style={{
                  width: widths.center,
                  marginLeft: widths.left,
                  marginRight: widths.right,
                  zIndex: 10,
                }}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: `-${widths.center}`, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                {/* Content is invisible, just for animation */}
              </motion.div>

              {/* Right card slides to center */}
              <motion.div
                key={`slide-right-to-center-${positions.right}`}
                className="absolute right-0 top-0 h-full overflow-hidden"
                style={{ width: widths.right, zIndex: 1 }}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: `-${widths.right}`, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                {/* Content is invisible, just for animation */}
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Simple Dotted Progress Indicator */}
      <div className="flex justify-center mt-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => jumpToCard(service.id)}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              service.id === activeCardId ? "bg-purple-500 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${service.id}`}
          />
        ))}
      </div>

      {/* Simple navigation buttons */}
      <div className="flex justify-between mt-4 px-4">
        <button
          onClick={slidePrev}
          className="bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full text-purple-800 transition-colors duration-300"
          aria-label="Previous slide">
          ← Prev
        </button>
        <button
          onClick={slideNext}
          className="bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full text-purple-800 transition-colors duration-300"
          aria-label="Next slide">
          Next →
        </button>
      </div>
    </div>
  );
};

export default TabletCardCarousel;
