// components/AdvisoryBoard.js
"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ADVISORS } from "@/constants";

const AdvisoryBoard = () => {
  return (
    <section className="py-16 ">
      <p className="w-fit mb-4 font-light px-4 py-1 bg-black text-white rounded-32">
        Backed by the Best
      </p>
      <h3 className=" text-3xl mb-8 text-black leading-normal sm:text-4xl md:text-6xl">
        Advisory <br />
        <span className="text-black/80 font-light"> Board </span>
      </h3>
      <div className="flex flex-wrap justify-center gap-8">
        {ADVISORS.map((advisor) => (
          <AdvisorCard key={advisor.id} advisor={advisor} />
        ))}
      </div>
    </section>
  );
};

const AdvisorCard = ({ advisor }) => {
  return (
    <motion.div
      className="relative overflow-hidden hover:scale-105 transition rounded-32 w-64 cursor-pointer"
      whileHover="hover"
      initial="initial">
      {/* Image container with hover effect */}
      <motion.div
        className="rounded-xl   shadow-md"
        variants={{
          hover: { scale: 1.05 },
          initial: { scale: 1 },
        }}
        transition={{ duration: 0.3 }}>
        <div className="relative  h-72 w-full">
          <Image
            src={advisor.image}
            alt={advisor.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl  bg-red-500"
          />
        </div>
      </motion.div>

      {/* Info card that appears on hover */}
      <motion.div
        className="absolute -bottom-4 left-0 right-0 bg-white/20 backdrop-blur-[30px] p-3 rounded-lg shadow-lg"
        variants={{
          hover: { opacity: 1, y: -10 },
          initial: { opacity: 0, y: 16 },
        }}
        transition={{ duration: 0.3 }}>
        <h3 className=" text-center font-medium text-lg">{advisor.name}</h3>
        <p className="text-black/80 font-light text-sm text-center">
          {advisor.title}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AdvisoryBoard;
