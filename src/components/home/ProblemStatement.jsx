import React from "react";
import { EnhancedTextReveal } from "../ui/TextReveal";

const ProblemStatement = () => {
  const healthcareText =
    "Today's healthcare experience is broken. It's slow, costly, and fragmented — involving endless back-and-forth between doctor's offices, urgent care, hospitals, labs, and specialists. Patients wait weeks for answers, only to be seen by the wrong clinician, with incomplete data delaying care even further.";

  // List of phrases that should be emphasized (in full black)
  const emphasisPhrases = [
    "healthcare experience is broken",
    "slow, costly, and fragmented",
    "Patients wait weeks for answers",
    "delaying care",
  ];

  return (
    <div className="w-full">
      <EnhancedTextReveal
        text={healthcareText}
        emphasisWords={emphasisPhrases}
      />
    </div>
  );
};

export default ProblemStatement;
