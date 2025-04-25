"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Timeline() {
  const sectionRef = useRef(null);
  const lastY = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // ✅ Scroll lock based on intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inFocus = entry.isIntersecting;
        setIsActive(inFocus);

        const shouldLock = inFocus && !(progress === 0 || progress === 1);
        document.body.style.overflow = shouldLock ? "hidden" : "";
      },
      {
        root: null,
        threshold: 0.5, // Fires when 50% of section is visible
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      document.body.style.overflow = "";
    };
  }, [progress]);

  // ✅ Gesture-based scroll with unlock on boundaries
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (
        (scrollingUp && progress === 0) ||
        (scrollingDown && progress === 1)
      ) {
        document.body.style.overflow = "";
        return;
      }

      e.preventDefault();
      setProgress((prev) => {
        let next = prev + e.deltaY * 0.0005; // slower progress
        return Math.max(0, Math.min(1, next));
      });
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;

      if (lastY.current !== null) {
        const deltaY = lastY.current - currentY;
        const scrollingDown = deltaY > 0;
        const scrollingUp = deltaY < 0;

        if (
          (scrollingUp && progress === 0) ||
          (scrollingDown && progress === 1)
        ) {
          document.body.style.overflow = "";
          return;
        }

        e.preventDefault();
        setProgress((prev) => {
          let next = prev + deltaY * 0.0005;
          return Math.max(0, Math.min(1, next));
        });
      }

      lastY.current = currentY;
    };

    const resetTouch = () => {
      lastY.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", resetTouch);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetTouch);
    };
  }, [isActive, progress]);

  // ✅ Update which paragraph is highlighted
  useEffect(() => {
    if (progress < 0.33) {
      setActiveIndex(0);
    } else if (progress < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  }, [progress]);

  const timelineData = [
    {
      id: 1,
      headline: "We enable faster resolution,",
      content:
        "by reducing the number of visits needed to diagnose and treat most health concerns efficiently.",
    },
    {
      id: 2,
      headline: "Receive care that is",
      content:
        "immediate, accurate, and personalized— accessible 24/7 from anywhere, on any device.",
    },
    {
      id: 3,
      headline: "Our clinical staff and AI agents collaborate",
      content:
        "seamlessly to deliver high-quality care through both virtual and in-person visits.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Timeline Section */}
      <div ref={sectionRef} className="relative">
        <div className="sticky top-1/3 py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Progress Line Above Content */}
            <div className="relative w-full h-2 bg-gray-200 mb-24 rounded">
              <motion.div
                className="absolute top-0 left-0 h-full bg-purple-600 rounded origin-left"
                style={{ scaleX: progress }}
              />
              {[0, 0.5, 1].map((position, index) => {
                const dotColor =
                  progress >= position
                    ? "bg-purple-600 border-purple-600"
                    : "bg-gray-300 border-gray-300";

                return (
                  <div
                    key={index}
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 ${dotColor} transition-all`}
                    style={{
                      left: `${position * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>

            {/* Timeline Text Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {timelineData.map((item, index) => (
                <div key={item.id} className="transition-colors duration-300">
                  <p className="text-xl md:text-2xl font-normal">
                    <span
                      className={`font-bold ${
                        index === activeIndex
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}>
                      {item.headline}
                    </span>{" "}
                    <span
                      className={
                        index === activeIndex
                          ? "text-gray-800"
                          : "text-gray-400"
                      }>
                      {item.content}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content After Timeline */}
      <div className="max-w-6xl mx-auto py-32 px-6 md:px-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          About Our Approach
        </h2>
        <p className="text-xl text-gray-600">
          Our innovative healthcare model combines the best of technology and
          human expertise to deliver efficient, accurate, and personalized
          healthcare experiences.
        </p>
      </div>
    </div>
  );
}
