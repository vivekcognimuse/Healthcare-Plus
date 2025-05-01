import CareerForm from "@/components/careers/CareerForm";
import Footer from "@/components/Footer";
import RevealAnimation from "@/components/ui/revealAnimation";
import React from "react";

const page = () => {
  return (
    <>
      <div className='mt-10 flex flex-col bg-[url("/assets/careerHero.png")] p-side bg-cover bg-no-repeat bg-top'>
        <RevealAnimation type="slide" direction="up" delay={0.5}>
          <CareerForm />
        </RevealAnimation>
      </div>
      <Footer />
    </>
  );
};

export default page;
