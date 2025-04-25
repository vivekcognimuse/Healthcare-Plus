import CareerForm from "@/components/career/CareerForm";
import React from "react";

const page = () => {
  return (
    <div className='mt-10 flex flex-col bg-[url("/assets/careerHero.png")] bg-contain bg-no-repeat bg-top'>
      <CareerForm />
    </div>
  );
};

export default page;
