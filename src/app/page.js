"use client";
import About from "@/components/home/About";

import Hero from "@/components/home/Hero";
import ProblemStatement from "@/components/home/ProblemStatement";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <div className="max-w-[1480px] md:px-0 mx-auto pt-28 ">
      <Hero />
      <div className="px-4">
        <About />
        <ProblemStatement />
        <Services />
      </div>
      {/* <Contact /> */}
    </div>
  );
}
