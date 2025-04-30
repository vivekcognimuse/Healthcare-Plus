"use client";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="scroll-to-top size-8 group right-8 bottom-16 rounded-32 lg:right-[3.7rem] fixed z-50 flex items-center justify-center text-2xl border-2 border-purple-500 cursor-pointer">
        <ChevronUp className="size-6 group-hover:animate-bounce text-purple-500 border-purple-500" />
      </div>
    )
  );
};

export default ScrollToTop;
