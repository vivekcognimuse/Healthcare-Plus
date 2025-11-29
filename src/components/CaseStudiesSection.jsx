import React from "react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    image: "/case-studies/telehealth.png",
    title: "Transforming Patient Care with Telehealth",
    date: "13 March, 2025",
    category: "Telehealth",
    author: "Team",
    summary:
      "We developed a telehealth platform that allowed remote consultations, reducing clinic visits by 30% and boosting patient satisfaction.",
    link: "/case-studies/telehealth",
  },
  {
    image: "/case-studies/patient-portal.png",
    title: "Building a Comprehensive Patient Portal",
    date: "1 March, 2025",
    category: "Telehealth",
    author: "Team",
    summary:
      "Our custom patient portal integrated EHR systems, allowing patients to manage appointments, records, and prescriptions online, boosting engagement by 35%.",
    link: "/case-studies/patient-portal",
  },
];

const CaseStudyCard = ({
  image,
  title,
  date,
  category,
  author,
  summary,
  link,
}) => (
  <div className="flex flex-col rounded-2xl bg-white border border-gray-200 p-0 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
    <Image
      src={image}
      alt={title}
      width={320}
      height={180}
      className="w-full h-[180px] object-cover rounded-t-2xl"
    />
    <div className="p-5 flex flex-col flex-1">
      <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
        <span>{category}</span>
        <span>/</span>
        <span>{date}</span>
        <span className="ml-auto">by {author}</span>
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-base mb-4 flex-1">{summary}</p>
      <Link
        href={link}
        className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto hover:underline"
      >
        Read More
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  </div>
);

const CaseStudiesSection = () => (
  <section className="w-full py-16 px-4 flex flex-col items-center">
    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4 self-start">
      Case Studies
    </span>
    <div className="flex flex-col md:flex-row w-full  gap-8">
      <div className="flex-1 min-w-[260px] flex flex-col justify-center">
        <h2 className="h2 text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Latest Reads
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Explore how our innovative healthcare solutions have transformed
          patient care, streamlined operations, and enhanced outcomes across
          various medical sectors.
        </p>
        <Link
          href="/case-studies"
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition-colors"
        >
          View All Case Studies
        </Link>
      </div>
      <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs, idx) => (
          <CaseStudyCard key={idx} {...cs} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;
