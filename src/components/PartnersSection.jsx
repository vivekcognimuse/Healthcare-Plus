import React from "react";

const partners = [
  "MedCore Solutions",
  "VitalHealth Networks",
  "ProMedics",
  "GlobalMed Partners",
];

const PartnersSection = () => (
  <section className="w-full py-16 px-4 flex flex-col items-center">
    <h2 className="h2 text-center mb-2">
      Our Partners and Insurance Providers
    </h2>
    <p className="p1 text-center mb-10 max-w-2xl">
      We collaborate with leading providers for comprehensive coverage.
    </p>
    <div className="flex flex-wrap justify-center gap-6 w-full ">
      {partners.map((name, idx) => (
        <div
          key={idx}
          className=" px-8 py-4 rounded-lg border border-gray-400 text-gray-800 text-base font-medium bg-white text-center min-w-[180px] transition-colors duration-200 hover:border-blue-500"
        >
          {name}
        </div>
      ))}
    </div>
  </section>
);

export default PartnersSection;
