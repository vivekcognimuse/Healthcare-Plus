"use client";
import Footer from "@/components/Footer";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";

import Hero from "@/components/home/Hero";
import ProblemStatement from "@/components/home/ProblemStatement";
import Services from "@/components/home/Services";
import InsuranceMarquee from "@/components/ui/imageMarquee";
import RevealAnimation from "@/components/ui/revealAnimation";

export default function Home() {
  return (
    <div className="max-w-[1480px] md:px-0 mx-auto pt-28 ">
      <Hero />
      <div className="px-4">
        <About />
        <ProblemStatement />
        <RevealAnimation type="slide" direction="up">
          <div className="   max-w-[1480px] shadow-elevated rounded-32 w-full p-4 sm:p-6 md:p-10 gradient backdrop-blur-[30px] mx-auto">
            <Services />
            <RevealAnimation type="slide" direction="up" delay={0.5}>
              <InsuranceMarquee />
            </RevealAnimation>
            <RevealAnimation type="slide" direction="up" delay={0.5}>
              <Contact />
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
      <Footer />
    </div>
  );
}
