import React from "react";
import ServiceCard from "@/components/service/ServiceCard";
import Button from "@/components/ui/Button";

const services = [
  {
    iconSrc: "/services/icons/1.svg",
    backgroundImageSrc: "/services/images/1.png",
    title: "General Medicine",
    description:
      "Routine checkups, preventive care, expert guidance for health.",
    buttonText: "Explore more",
  },
  {
    iconSrc: "/services/icons/2.svg",
    backgroundImageSrc: "/services/images/2.png",
    title: "Pediatrics",
    description:
      "Compassionate medical care for infants, children, and adolescents.",
    buttonText: "Explore more",
  },
  {
    iconSrc: "/services/icons/3.svg",
    backgroundImageSrc: "/services/images/3.png",
    title: "Cardiology",
    description:
      "Specialized care for heart health, diagnostics, and long-term management.",
    buttonText: "Explore more",
  },
  {
    iconSrc: "/services/icons/4.svg",
    backgroundImageSrc: "/services/images/4.png",
    title: "Neurology",
    description:
      "Expert diagnosis and treatment of neurological conditions and disorders.",
    buttonText: "Explore more",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-16 px-4">
      <div className=" mx-auto">
        <div className="flex flex-col items-center mb-12">
          <span className="px-6 py-2 rounded-full bg-primary-10 text-primary font-medium text-base mb-4">
            Our Services
          </span>
          <h2 className="h2 text-black-custom text-center mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="p1 text-black-custom text-center mb-2 opacity-80">
            We offer a wide range of medical services to meet all your
            healthcare needs with excellence and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.title}
              {...service}
              onButtonClick={() => console.log(`Clicked ${service.title}`)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-primary text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-primary-dark transition-colors">
            View All Specialities
          </Button>
        </div>
      </div>
    </section>
  );
}
