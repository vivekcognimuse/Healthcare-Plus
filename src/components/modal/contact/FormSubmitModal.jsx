"use client";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ContactContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/../public/logo.svg";
import { X } from "lucide-react";
import ModalWrapper from "@/components/ui/modalAnimation";
const SubmitModal = () => {
  const { showSuccessModal, closeSuccessModal } = useModal();

  if (!showSuccessModal) return null;

  return (
    <ModalWrapper isOpen={showSuccessModal} onClose={closeSuccessModal}>
      <div className="fixed inset-0 bg-[url('/assets/contactImage.webp')]   bg-cover bg-no-repeat bg-center  bg-opacity-30  z-[999]">
        <div className="w-full h-full flex items-center justify-center bg-white/60 backdrop-blur-[30px]">
          <div className=" p-8 max-w-[1420px] w-full mx-auto rounded-lg ">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Image
                  src={logo}
                  className="h-6 w-fit"
                  alt="Healthcare Plus logo"
                />
              </div>
              <button onClick={closeSuccessModal} className="text-gray-700">
                <X size={24} />
              </button>
            </div>

            <h2 className="text-3xl text-gray-800 font-medium mb-4">
              Thanks for reaching out!
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Your message has been received — a member of our team will be in
              touch soon.
            </p>
            <Link href="/">
              <Button onClick={closeSuccessModal} className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>{" "}
    </ModalWrapper>
  );
};

export default SubmitModal;
