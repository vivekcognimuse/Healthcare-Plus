import React from "react";
import Button from "@/components/ui/Button";
import BoxReveal from "../ui/HeroReveal";
import RevealAnimation from "../ui/revealAnimation";
import { useModal } from "@/context/ContactContext";

const Hero = () => {
  const { openFormModal } = useModal();
  return (
    <div className="">
      <BoxReveal duration={0.5}>
        <h1 className=" text-black-800 px-4 lg:px-0   md:text-9xl text-5xl   mt-4 -z-0  sm:text-6xl font-normal ">
          The Future of <br /> Healthcare is Here
        </h1>
      </BoxReveal>
      <RevealAnimation direction="up" type="slide" delay={2}>
        <div className="bg-[url('/assets/heroImage.webp')]   pt-8 bg-center  px-4 lg:px-0   sm:w-full flex flex-col justify-between z-10 h-[70vh] bg-cover md:bg-contain bg-no-repeat md:bg-right">
          <div className="md:py-12 p-4  mt-24 sm:mt-16 md:mt-28 bg-white-100/20 flex flex-col md:flex-row gap-y-4 items-center backdrop-blur-md shadow-elevated  rounded-32 gap-x-8  justify-center">
            <p className="text-xl px-4 gap-8 font-normal  text-center">
              Tala Health is coming soon — be the first to know when we launch
              near you
            </p>
            <Button
              onClick={() => {
                openFormModal();
              }}>
              Join the Waitlist
            </Button>
          </div>
        </div>{" "}
      </RevealAnimation>
    </div>
  );
};

export default Hero;
