import React from "react";
import Button from "@/components/ui/Button";

const Hero = () => {
  return (
    <div>
      <h1 className=" text-black-800 md:text-9xl text-5xl mt-4 -z-0  sm:text-6xl font-normal leading-[1.2em]">
        The Future of <br /> Healthcare is Here
      </h1>
      <div className="bg-[url('/assets/heroImage.webp')] -mt-8 pt-8 bg-center -mx-4 sm:mx-0 w-[calc(100%+32px)] px-8 lg:px-0 sm:w-full flex flex-col justify-between z-10 h-[70vh] bg-cover md:bg-contain bg-no-repeat md:bg-right">
        <div className="md:py-12 py-4  mt-24 sm:mt-16 md:mt-28 bg-white-100/20 flex flex-col md:flex-row gap-y-4 items-center backdrop-blur-md shadow-elevated  rounded-32 gap-x-8  justify-center">
          <p className="text-xl gap-8 font-normal  text-center">
            Crumpler Health is coming soon — be the first to know when we launch
            near you
          </p>
          <Button>Join the Waitlist</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
