import CareerForm from "@/components/careers/CareerForm";
import React from "react";

const page = () => {
  return (
    <div className='mt-10 flex flex-col bg-[url("/assets/careerHero.png")] bg-cover bg-no-repeat bg-top'>
      <CareerForm />
    </div>
  );
};

export default page;
