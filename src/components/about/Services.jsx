"use client";
import React from "react";
import ExpandableCards from "../service/ExpandableCards";
import image1 from "@/../public/assets/1.webp";
import image3 from "@/../public/assets/2.webp";
import image2 from "@/../public/assets/3.webp";
import { Timer } from "lucide-react";
import Contact from "./Contact";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Instant Appointments",
      description:
        "Connect with Crumpler's AI agent anytime, anywhere - 24x7 access.",
      image: image1, // Path to your image
      icon: Timer, // Path to your icon image
    },
    {
      id: 2,
      title: "On-call clinicians",
      description:
        "Get support from a world-class team of licensed clinicians for any health condition.",
      image: image2,
      icon: Timer,
    },
    {
      id: 3,
      title: "Extensive clinic network",
      description:
        "Visit nearby clinics for bloodwork, diagnostics, or in-person testing - seamlessly integrated.",
      image: image3,
      icon: Timer,
    },
  ];
  return (
    <div>
      <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
        Expertise
      </p>
      <h3 className="text-black/80 leading-normal text-4xl mb-8 sm:text-5xl  md:text-6xl">
        Scientific and Medical
        <span className="text-black"> Experience.</span>
      </h3>

      <ExpandableCards services={servicesData} />

      <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
        Our Solution
      </p>
      <h3 className="text-black/80 leading-normal text-4xl mb-8 sm:text-5xl  md:text-6xl">
        Get A Real
        <span className="text-black">Diagnosis</span>
      </h3>

      <p className="text-black-800  font-light mb-8 md:max-w-7/12 max-w-8/12 ml-auto md:text-4xl text-lg sm:text-2xl">
        {" "}
        <span className="text-black"></span>
        Crumpler Health is{" "}
        <span className="text-black"> built with the patient in mind </span>,
        combining the leading
        <span className="text-black">
          {" "}
          artificial intelligence research
        </span>{" "}
        with top tier{" "}
        <span className="text-black"> human licensed clinical support </span>
      </p>
    </div>
  );
};

export default Services;
