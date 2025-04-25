import Hero from "@/components/about/Hero";
import Contact from "@/components/about/Contact";
import Services from "@/components/home/Services";
import React from "react";

const page = () => {
  return (
    <div className=' mt-20 md:mt-14  px-4 md:px-0  flex flex-col bg-[url("/assets/aboutHero.png")] bg-contain bg-no-repeat bg-top'>
      <div className=" mt-20 md:mt-[30vh] max-w-[1480px] shadow-elevated rounded-32 w-full p-4 sm:p-6 md:p-10 gradient backdrop-blur-[30px] mx-auto">
        <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
          Mission & Vision
        </p>
        <p className=" text-3xl mb-8 text-black-800 sm:text-4xl md:text-6xl">
          Making world-class healthcare
          <span className="text-black"> accessible </span> to
          <span className="text-black"> anyone, anytime, anywhere. </span>
        </p>
        <p className="text-black-800 font-light leading-tight  md:max-w-9/12 max-w-9/12 ml-auto md:text-4xl text-lg sm:text-2xl">
          We believe that
          <span className="text-black font-normal">
            {" "}
            quality and personalized healthcare should be accessible to everyone
          </span>
          , without barriers. Whether it&apos;s distance, time constraints, or a
          lack of medical professionals that gets in the way of your treatment,
          <span className="text-black font-normal">
            {" "}
            Crumpler Health&apos;s AI agent ensures that care reaches you
          </span>
          —wherever you are, whenever you need it.
        </p>

        <Services />
        <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
          Our Solution
        </p>
        <p className=" text-3xl mb-8 text-black-800 sm:text-4xl md:text-6xl">
          Get A<span className="text-black"> Real Diagnosis </span>
        </p>
        <p className="text-black-800 font-light leading-tight  md:max-w-9/12 max-w-9/12 ml-auto md:text-4xl text-lg sm:text-2xl">
          Instead of worrying over worst-case scenarios from searching your
          symptoms online,
          <span className="text-black font-normal">
            {" "}
            get a real diagnosis in minutes with Crumpler Health.
          </span>{" "}
          If you need further care, our team will seamlessly connect you to the
          <span className="text-black font-normal">
            {" "}
            right clinician, specialist, or in-person site
          </span>{" "}
          for further testing.
        </p>

        <Contact />
      </div>
    </div>
  );
};

export default page;
