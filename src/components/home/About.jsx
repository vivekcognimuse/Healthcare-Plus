import React from "react";
import Timeline from "./Timeline";

const About = () => {
  return (
    <div className="flex flex-col mt-24 md:-mt-24">
      <p className=" text-4xl leading-normal  md:text-6xl text-black-800">
        We&apos;re Re- Imagining <br />{" "}
        <span className="text-black">Healthcare</span>
      </p>

      <p className="text-black-800 p-top mb-8 md:max-w-7/12 font-light max-w-8/12 ml-auto md:text-4xl text-lg sm:text-2xl">
        <span className="text-black">Crumpler Health</span> has re-imagined the
        healthcare experience with{" "}
        <span className="text-black"> AI agents complementing clinicians</span>{" "}
        in the patient journey
      </p>
      <Timeline />
    </div>
  );
};

export default About;
