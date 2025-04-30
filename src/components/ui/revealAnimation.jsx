"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Animation variants
const animations = {
  fade: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for buttery smoothness
      },
    },
  },

  slide: {
    hidden: (direction) => ({
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      opacity: 0,
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth motion
      },
    },
  },

  scale: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
      },
    },
  },

  blur: {
    hidden: {
      filter: "blur(8px)",
      opacity: 0,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
};

const RevealAnimation = ({
  children,
  type = "fade",
  direction = "up",
  delay = 0,
  duration,
  className = "",
  once = true,
  fallback = true,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Select animation variant based on type prop
  const variant = animations[type] || animations.fade;

  // Custom transition overrides if provided
  const customTransition = duration ? { duration } : {};

  useEffect(() => {
    // Set mounted state to true to avoid hydration issues
    setIsMounted(true);

    // Create intersection observer for viewport detection
    if (ref) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update state when visibility changes
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start("visible");
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
            controls.start("hidden");
          }
        },
        {
          threshold: 0.1, // Trigger when at least 10% is visible
          rootMargin: "10px",
        }
      );

      observer.observe(ref);
      return () => observer.disconnect();
    }
  }, [controls, once, ref]);

  // Handle initial animation when component mounts
  useEffect(() => {
    if (isMounted && (isVisible || fallback)) {
      controls.start("visible");
    }
  }, [controls, isVisible, isMounted, fallback]);

  // Fallback rendering for SSR and initial load
  if (!isMounted && fallback) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={setRef}
      className={className}
      initial="hidden"
      animate={controls}
      custom={direction}
      variants={variant}
      transition={{
        delay,
        ...customTransition,
      }}
      {...props}>
      {children}
    </motion.div>
  );
};

export default RevealAnimation;
