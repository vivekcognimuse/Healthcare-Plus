import Contact from "@/components/about/Contact";
import Services from "@/components/about/Services";
import React from "react";
import AdvisoryBoard from "@/components/about/Advisory";
import RevealAnimation from "@/components/ui/revealAnimation";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className=' mt-20 md:mt-14 p-side     flex flex-col bg-[url("/assets/aboutHero.png")] bg-contain bg-no-repeat bg-top'>
      <RevealAnimation type="slide" direction="up" delay={0.5}>
        <div className=" mt-20 lg:mt-64 max-w-[1420px]  shadow-elevated rounded-32 w-full p-4 sm:p-6 md:p-10 gradient backdrop-blur-[30px] mx-auto">
          <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
            Mission & Vision
          </p>
          <p className=" text-3xl mb-8 text-black-800 leading-normal sm:text-4xl md:text-6xl">
            Making world-class healthcare
            <span className="text-black"> accessible </span> to
            <span className="text-black"> anyone, anytime, anywhere. </span>
          </p>
          <p className="text-black-800 font-light leading-normal  md:max-w-9/12 max-w-9/12 ml-auto md:text-4xl text-lg sm:text-2xl">
            We believe that
            <span className="text-black font-normal">
              {" "}
              quality and personalized healthcare should be accessible to
              everyone
            </span>
            , without barriers. Whether it&apos;s distance, time constraints, or
            a lack of medical professionals that gets in the way of your
            treatment,
            <span className="text-black font-normal">
              {" "}
              Healthcare Plus&apos;s AI agent ensures that care reaches you
            </span>
            — wherever you are, whenever you need it.
          </p>

          <Services />
          <RevealAnimation type="slide" direction="up" delay={0.5}>
            <AdvisoryBoard />
          </RevealAnimation>

          <RevealAnimation type="slide" direction="up" delay={0.5}>
            <Contact />
          </RevealAnimation>
        </div>{" "}
      </RevealAnimation>
      <Footer />
    </div>
  );
};

export default page;
