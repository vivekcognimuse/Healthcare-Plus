"use client";
import React from "react";
import ExpandableCards from "../service/ExpandableCards";
import image1 from "@/../public/assets/home1.webp";
import image3 from "@/../public/assets/home2.jpg";
import image2 from "@/../public/assets/home3.webp";
import {
  Calendar,
  CalendarRange,
  Headphones,
  Hospital,
  Timer,
} from "lucide-react";

import MobileCardCarousel from "../service/mblCardCarousal";
import TabletCardCarousel from "../service/TableCardCorousal";
import RevealAnimation from "../ui/revealAnimation";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Instant Appointments",
      description:
        "Connect with Tala's AI agent anytime, anywhere - 24x7 access.",
      image: image1, // Path to your image
      iconSrc: "teenyicons:appointments-outline", // Path to your icon image
    },
    {
      id: 2,
      title: "On-call clinicians",
      description:
        "Get support from a world-class team of licensed clinicians for any health condition.",
      image: image2,
      iconSrc: "vaadin:headphones",
    },
    {
      id: 3,
      title: "Extensive clinic network",
      description:
        "Visit nearby clinics for bloodwork, diagnostics, or in-person testing - seamlessly integrated.",
      image: image3,
      iconSrc: "uis:clinic-medical",
    },
  ];
  return (
    <div className="">
      <RevealAnimation type="slide" direction="left" delay={0.5}>
        <h3 className="text-black/80 leading-normal text-4xl mb-8 sm:text-5xl  md:text-6xl">
          Patient First, <br /> Prioritizing
          <span className="text-black"> You</span>
        </h3>{" "}
      </RevealAnimation>
      <RevealAnimation type="slide" direction="right" delay={0.5}>
        <p className="text-black-800  font-light mb-8 md:max-w-7/12 max-w-8/12 ml-auto md:text-4xl text-lg sm:text-2xl">
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
        </p>
      </RevealAnimation>
      <RevealAnimation type="slide" direction="up" delay={0.5}>
        <ExpandableCards services={servicesData} />
        <MobileCardCarousel services={servicesData} />
        <TabletCardCarousel services={servicesData} />
      </RevealAnimation>
    </div>
  );
};

export default Services;
