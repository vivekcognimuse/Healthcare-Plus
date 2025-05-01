// InsuranceMarquee.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

// Import the logo images
import img1 from "@/../public/assets/trustees/1.png";
import img2 from "@/../public/assets/trustees/2.png";
import img3 from "@/../public/assets/trustees/3.png";
import img4 from "@/../public/assets/trustees/4.png";
import img5 from "@/../public/assets/trustees/5.png";
import img6 from "@/../public/assets/trustees/6.png";

const InsuranceMarquee = () => {
  // State for container width and hover status
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Ref for the container element
  const containerRef = useRef(null);

  // Animation controls for more precise management
  const controls = useAnimationControls();

  // Set up array of imported images
  const logos = [
    { id: 1, name: "Logo 1", image: img1 },
    { id: 2, name: "Logo 2", image: img2 },
    { id: 3, name: "Logo 3", image: img3 },
    { id: 4, name: "Logo 4", image: img4 },
    { id: 5, name: "Logo 5", image: img5 },
    { id: 6, name: "Logo 6", image: img6 },
  ];

  // Duplicate the logos to create a seamless loop
  const duplicatedLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ]; // Triple to ensure smooth loop

  // Calculate container width on mount and window resize
  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        // We divide by 3 because we have three sets of logos
        setContainerWidth(containerRef.current.scrollWidth / 3);
      }
    };

    // Initial calculation
    calculateWidth();

    // Set up resize listener
    window.addEventListener("resize", calculateWidth);

    // Clean up
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Control the animation based on container width and hover state
  useEffect(() => {
    if (containerWidth === 0) return;

    // If currently hovered, stop animation
    if (isHovered) {
      controls.stop();
    } else {
      // Otherwise, run the animation
      controls.start({
        x: -containerWidth,
        transition: {
          duration: 15, // Fixed speed
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }, [controls, containerWidth, isHovered]);

  return (
    <div className="relative w-full my-32 py-12 overflow-hidden ">
      {/* Heading */}
      <h2 className="text-3xl font-normal text-center mb-12 text-gray-800">
        Trusted by Leading Insurers
      </h2>

      {/* Container for the marquee with relative positioning */}
      <div
        className="relative flex items-center justify-center w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Left blur/fade effect */}
        <div
          className="absolute left-0 z-10 h-full pointer-events-none"
          style={{
            width: "40px",
            background:
              "linear-gradient(to right, #F7F0FE, rgba(247, 240, 254, 0.8), rgba(247, 240, 254, 0))",
          }}
          aria-hidden="true"
        />

        {/* Marquee animation container */}
        <motion.div
          ref={containerRef}
          className="flex items-center"
          animate={controls}
          initial={{ x: 0 }}>
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-12 flex items-center justify-center">
              <div className="size-12 flex items-center justify-center">
                <Image
                  src={logo.image}
                  alt={`${logo.name} - Insurance partner logo`}
                  width={40}
                  height={40}
                  className="object-contain transition-all duration-300 hover:scale-110"
                  priority={index < 6} // Prioritize loading the first set of logos
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right blur/fade effect */}
        <div
          className="absolute right-0 z-10 h-full w-20 pointer-events-none lg:bg-[linear-gradient(to_left,white,rgba(255,255,255,0.8),rgba(255,255,255,0))] bg-[linear-gradient(to_left,#F7F0FE,rgba(255,255,255,0.8),rgba(255,255,255,0))]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default InsuranceMarquee;
