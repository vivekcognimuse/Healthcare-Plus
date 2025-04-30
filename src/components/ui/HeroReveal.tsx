"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const BoxReveal = ({
  children,
  width = "fit-content",
  duration = 0.5,
  delay = 0.25,
  direction = "up", // "up", "down", "left", "right"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Set animation direction
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 50, x: 0 };
      case "down":
        return { y: -50, x: 0 };
      case "left":
        return { x: 50, y: 0 };
      case "right":
        return { x: -50, y: 0 };
      default:
        return { y: 50, x: 0 };
    }
  };

  const animationVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeOut",
        }}>
        {children}
      </motion.div>
    </div>
  );
};

export default BoxReveal;
