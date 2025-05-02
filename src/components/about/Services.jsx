"use client";
import React from "react";
import ExpandableCards from "../service/ExpandableCards";
import image1 from "@/../public/assets/about1.webp";
import image2 from "@/../public/assets/about2.webp";
import image3 from "@/../public/assets/about3.webp";
import { Timer } from "lucide-react";

import RevealAnimation from "../ui/revealAnimation";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Built by Experts",
      description:
        "Developed by top AI scientists and clinicians using cutting-edge medical research.",
      image: image1, // Path to your image
      iconSrc: "simple-icons:buildkite", // Path to your icon image
    },
    {
      id: 2,
      title: "Powered by Data",
      description:
        "Trained on the most comprehensive medical datasets to ensure precision and reliability.",
      image: image2,
      iconSrc: "fluent:data-area-20-filled",
    },
    {
      id: 3,
      title: "Backed by Leaders",
      description:
        "Proudly supported by world-class investors in healthcare and technology.",
      image: image3,
      iconSrc: "fluent-mdl2:party-leader",
    },
  ];
  return (
    <div>
      <RevealAnimation type="slide" direction="left" delay={0.5}>
        <p className="w-fit mb-4 mt-16 font-light px-4 py-1 bg-black text-white rounded-32">
          Expertise
        </p>
        <h3 className="text-black/80 leading-normal text-4xl mb-8 sm:text-5xl  md:text-6xl">
          Scientific and Medical
          <span className="text-black"> Experience.</span>
        </h3>
      </RevealAnimation>
      <RevealAnimation type="slide" direction="up" delay={0.5}>
        <ExpandableCards services={servicesData} />
      </RevealAnimation>
      <RevealAnimation type="slide" direction="left" delay={0.5}>
        <p className="w-fit mb-4 font-light px-4 mt-12 py-1 bg-black text-white rounded-32">
          Our Solution
        </p>
        <p className=" text-3xl mb-8 text-black-800 sm:text-4xl md:text-6xl">
          Get A<span className="text-black"> Real Diagnosis </span>
        </p>{" "}
      </RevealAnimation>
      <RevealAnimation type="slide" direction="right" delay={0.5}>
        <p className="text-black-800 font-light leading-normal  md:max-w-9/12 max-w-9/12 ml-auto md:text-4xl text-lg sm:text-2xl">
          Instead of worrying over worst-case scenarios from searching your
          symptoms online,
          <span className="text-black font-normal">
            {" "}
            get a real diagnosis in minutes with Tala Health.
          </span>{" "}
          If you need further care, our team will seamlessly connect you to the
          <span className="text-black font-normal">
            {" "}
            right clinician, specialist, or in-person site
          </span>{" "}
          for further testing.
        </p>{" "}
      </RevealAnimation>
    </div>
  );
};

export default Services;
