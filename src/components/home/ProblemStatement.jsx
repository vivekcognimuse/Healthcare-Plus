import React from "react";

const ProblemStatement = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="md:text-5xl  text-black-400 leading-tight  text-3xl sm:text-4xl">
        Today's
        <span className="text-black"> healthcare experience is broken. </span>
        It&apos;s
        <span className="text-black"> slow, costly, and fragmented </span> —
        involving endless back-and-forth between doctor&apos;s offices, urgent
        care, hospitals, labs, and specialists.
        <span className="text-black"> Patients wait weeks for answers</span>,
        only to be seen by the wrong clinician, with incomplete data
        <span className="text-black"> delaying care </span> even further.
      </p>
    </div>
  );
};

export default ProblemStatement;
