"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";

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

  // State to track scroll progress (0-1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for sections
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Calculate which step is active based on scroll progress
  const currentIndex = Math.min(
    Math.floor(scrollProgress * steps.length),
    steps.length - 1
  );

  // Calculate progress for each step
  const calculateStepProgress = (index) => {
    const stepStart = index / steps.length;
    const stepEnd = (index + 1) / steps.length;

    if (scrollProgress < stepStart) return 0;
    if (scrollProgress > stepEnd) return 1;

    return (scrollProgress - stepStart) / (stepEnd - stepStart);
  };

  // Function to calculate scroll progress
  const calculateScrollProgress = useCallback((section, scrollPosition) => {
    if (!section) return 0;

    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const viewportHeight = window.innerHeight;

    // Start showing the effect when the section is half visible
    const scrollStart = sectionTop - viewportHeight * 0.5;
    // Complete the effect by the time we scroll through the section
    const scrollEnd = scrollStart + sectionHeight;
    const totalScrollRange = scrollEnd - scrollStart;

    // Calculate relative scroll position
    const relativeScroll = scrollPosition - scrollStart;

    if (relativeScroll <= 0) {
      return 0;
    } else if (relativeScroll >= totalScrollRange) {
      return 1;
    } else {
      return relativeScroll / totalScrollRange;
    }
  }, []);

  // Set up scroll event listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          const newProgress = calculateScrollProgress(section, scrollY);
          setScrollProgress(newProgress);
          console.log("Scroll Progress:", newProgress);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateScrollProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative  flex flex-col h-[200vh]" // Tall section to allow scrolling
    >
      <div
        ref={contentRef}
        className="w-full sticky h-screen flex items-center justify-center top-0 ">
        {/* Desktop Timeline (horizontal) */}
        <div className="hidden md:flex md:flex-row items-start justify-between w-full mx-auto px-8">
          {steps.map((step, index) => {
            const isActive = currentIndex === index;
            const stepProgress = calculateStepProgress(index);

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Circle with connector line */}
                <div className="relative flex mt-3 h-full justify-center w-full">
                  {/* Background line */}
                  <div className="absolute top-2 left-0 right-0 h-0.5 w-full bg-gray-200 z-0"></div>

                  {/* Animated progress line */}
                  <motion.div
                    className="absolute top-2 left-0 h-0.5 bg-purple-500 z-1"
                    style={{ width: `${stepProgress * 100}%` }}></motion.div>

                  {/* Circle */}
                  <div className="relative z-10 mr-auto rounded-full shadow-lg flex items-center justify-center">
                    <div
                      className={`absolute rounded-full transition w-8 h-8 bg-purple-200 opacity-50`}></div>
                    <div
                      className={`rounded-full  w-4 h-4 transition-all duration-300  ${
                        isActive ? "scale-150 bg-purple-500" : " bg-purple-400"
                      }`}></div>
                  </div>
                </div>

                {/* Text content */}
                <div
                  className={`mt-6 ${
                    index !== steps.length - 1 ? "pr-8" : ""
                  }`}>
                  <p
                    className={`text-2xl transition-all duration-300 ${
                      isActive
                        ? "text-black  font-normal"
                        : "text-gray-400  font-normal"
                    }`}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Timeline (vertical) */}
        <div className="md:hidden flex flex-col w-full px-6">
          {steps.map((step, index) => {
            const isActive = currentIndex === index;
            const stepProgress = calculateStepProgress(index);

            return (
              <div key={index} className="flex flex-row items-start relative">
                {/* Vertical line container that spans entire height - not for last item */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                )}

                {/* Animated progress line - not for last item */}
                {index !== steps.length - 1 && (
                  <div
                    className="absolute left-2 top-8 w-0.5 bg-purple-500 z-1"
                    style={{ height: `${stepProgress * 100}%` }}></div>
                )}

                {/* Circle with glow */}
                <div className="relative z-10 mr-6">
                  <div className="rounded-full mt-2 flex items-center justify-center">
                    <div
                      className={`absolute rounded-full transition w-8 h-8 bg-purple-200 opacity-50`}></div>
                    <div
                      className={`rounded-full w-4 h-4 transition-all duration-300 ${
                        isActive ? "scale-150 bg-purple-500" : "bg-purple-400"
                      }`}></div>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 mb-16">
                  <p
                    className={`font-normal ${
                      isActive
                        ? "text-black font-medium"
                        : "text-gray-400 font-normal"
                    }`}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
