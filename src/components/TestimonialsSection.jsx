import React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    image: "/testimonial/Sarah.webp",
    text: "The care I received at HealthCare Plus was exceptional. The staff was attentive, professional, and truly cared about my well-being. I couldn't have asked for better treatment.",
    name: "Sarah Johnson",
    role: "Patient",
  },
  {
    image: "/testimonial/Michael.webp",
    text: "The team at HealthCare Plus is friendly and took the time to listen. From booking to receiving results, the process was seamless. I'm grateful for the exceptional care and support",
    name: "Michael R",
    role: "Patient",
  },
  {
    image: "/testimonial/John.webp",
    text: "I've been receiving care for my chronic condition, and the experience has been excellent. The team is compassionate, professional, and always available to answer questions",
    name: "John",
    role: "Patient",
  },
];

const TestimonialCard = ({ image, text, name, role }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-xl border border-black bg-white transition-all duration-300 group hover:border-[#155DFC] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(21,93,252,0.1)_100%)] hover:shadow-[0px_4px_4px_0px_#0000001A] relative overflow-visible">
    <Image
      src={image}
      alt={name}
      width={160}
      height={160}
      className="rounded-lg object-cover w-[234px] h-[234px]"
    />
    <div className="flex-1 flex flex-col justify-center">
      <Image
        src="/testimonial/quote.svg"
        alt="Quote"
        width={50}
        height={50}
        className="absolute -top-5 right-6 md:-top-5 md:right-8 w-8 h-8 md:w-12 md:h-12 z-10"
      />
      <div className="pr-12">
        <p className="text-lg md:text-xl font-normal text-gray-800 leading-relaxed mb-4">
          "{text}"
        </p>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
          {name}
        </p>
        <p className="text-base text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timeoutRef = useRef(null);
  const slideCount = testimonials.length;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIdx, slideCount]);

  const goToSlide = (idx) => setActiveIdx(idx);
  const goNext = () => setActiveIdx((prev) => (prev + 1) % slideCount);
  const goPrev = () =>
    setActiveIdx((prev) => (prev - 1 + slideCount) % slideCount);

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
        Testimonials
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
        What Our Patients Say
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl">
        Read the experiences of our satisfied patients and their families.
      </p>
      <div className="w-full max-w-3xl relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TestimonialCard {...testimonials[activeIdx]} />
          </motion.div>
        </AnimatePresence>
        {/* Controls */}
        <div className="flex justify-center items-center mt-6 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
                activeIdx === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
