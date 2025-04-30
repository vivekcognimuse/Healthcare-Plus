import { motion, AnimatePresence } from "framer-motion";

// ModalWrapper component that handles animations for modals
export default function ModalWrapper({ isOpen, onClose, children }) {
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

  return (
    // AnimatePresence must be outside the conditional to monitor
    // when elements are being removed from the DOM
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}>
          {/* Modal container - prevents click propagation to backdrop */}
          <motion.div
            key="modal-content"
            className="z-50 w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            {/* Your modal content goes here */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
