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
      icon: Timer, // Path to your icon image
    },
    {
      id: 2,
      title: "Powered by Data",
      description:
        "Trained on the most comprehensive medical datasets to ensure precision and reliability.",
      image: image2,
      icon: Timer,
    },
    {
      id: 3,
      title: "Backed by Leaders",
      description:
        "Proudly supported by world-class investors in healthcare and technology.",
      image: image3,
      icon: Timer,
    },
  ];
  return (
    <div>
      <RevealAnimation type="slide" direction="left" delay={0.5}>
        <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
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
      <RevealAnimation type="slide" direction="up" delay={0.5}>
        <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
          Our Solution
        </p>
        <h3 className="text-black/80 leading-normal text-4xl mb-8 sm:text-5xl  md:text-6xl">
          Get A Real
          <span className="text-black"> Diagnosis</span>
        </h3>
      </RevealAnimation>
      <RevealAnimation type="slide" direction="up" delay={0.5}>
        <p className="text-black-800 font-light mb-8 md:max-w-7/12 max-w-8/12 ml-auto md:text-4xl text-lg sm:text-2xl">
          {" "}
          <span className="text-black"></span>
          Tala Health is{" "}
          <span className="text-black"> built with the patient in mind </span>,
          combining the leading
          <span className="text-black">
            {" "}
            artificial intelligence research
          </span>{" "}
          with top tier{" "}
          <span className="text-black"> human licensed clinical support </span>
        </p>{" "}
      </RevealAnimation>
    </div>
  );
};

export default Services;
