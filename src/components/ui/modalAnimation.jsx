"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

// ModalWrapper component that handles animations for modals
export default function ModalWrapper({ isOpen, onClose, children }) {
  const contentRef = useRef(null);

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.8,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // Custom bezier curve for smooth easing
      },
    },
  };

  // Add event listeners for wheel events
  useEffect(() => {
    const handleWheel = (e) => {
      // This prevents the wheel event from propagating to parent elements
      e.stopPropagation();

      // Let the default scroll behavior continue
      // This is key - we're not preventing default, just stopping propagation
    };

    const contentElement = contentRef.current;
    if (contentElement && isOpen) {
      contentElement.addEventListener("wheel", handleWheel, { passive: true });

      return () => {
        contentElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isOpen]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Add styles to body to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore scrolling when component unmounts
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[999] h-screen  flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}>
          {/* Modal container - prevents click propagation to backdrop */}
          <motion.div
            key="modal-content"
            className="z-50 max-w-full max-h-screen w-full flex items-center justify-center py-6 "
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            {/* Scrollable content container */}
            <div
              ref={contentRef}
              className="max-h-screen overflow-y-auto w-full ">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
