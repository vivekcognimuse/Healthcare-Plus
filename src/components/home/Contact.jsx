import React from "react";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ContactContext";

const Contact = () => {
  const { openFormModal } = useModal();
  return (
    <div className="flex flex-col mb-32 items-center justify-center">
      <p className="text-black-600 text-center font-light mb-8 text-3xl sm:text-5xl lg:text-6xl">
        Ready to <span className="text-black"> take control </span> of your
        health?
      </p>
      <Button
        onClick={() => {
          openFormModal();
        }}>
        Join the Waitlist
      </Button>
    </div>
  );
};

export default Contact;
