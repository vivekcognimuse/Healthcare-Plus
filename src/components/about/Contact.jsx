import React from "react";
import Button from "@/components/ui/Button";

const Contact = () => {
  return (
    <div className="flex flex-col my-32 items-center justify-center">
      <p className="text-black-600 text-center font-light mb-8 text-3xl sm:text-5xl lg:text-6xl">
        Join us in delivering
        <span className="text-black"> better health </span>
      </p>
      <Button>Become a Partner</Button>
    </div>
  );
};

export default Contact;
