// File: src/app/page.js
"use client";

import Footer from "@/components/Footer";

import Contact from "@/components/home/Contact";

import Hero from "@/components/home/Hero";


import ServicesSection from "@/components/service/ServicesSection";
import Specialists from "@/components/home/Specialists";

import RevealAnimation from "@/components/ui/revealAnimation";
import TestimonialsSection from "@/components/TestimonialsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import PartnersSection from "@/components/PartnersSection";
import FAQSection from "@/components/FAQSection";
export default function Home() {
  return (
    <>
      {/* Full-bleed hero outside of the centered container */}
      <Hero />

      <div className=" max-w-[1420px] mx-auto pt-28 p-side">
        <RevealAnimation type="slide" direction="up">
          <ServicesSection />
          <Specialists />
          <TestimonialsSection />
          <CaseStudiesSection />
          <PartnersSection />
          <FAQSection />
          <RevealAnimation type="slide" direction="up" delay={0.5}>
            <Contact />
          </RevealAnimation>
        </RevealAnimation>
      </div>

      <Footer />
    </>
  );
}
