// src/components/CrumplerHealthForm.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ContactContext";
import { useContactForm } from "@/hooks/useContactForm";
import ModalWrapper from "@/components/ui/modalAnimation";

const CrumplerHealthForm = () => {
  const { showFormModal, closeFormModal, openSuccessModal } = useModal();
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit(
      // Success callback
      () => {
        // You can add API call here to send data
        console.log("Form submitted successfully:", formData);
        openSuccessModal();
      },
      // Error callback
      (formErrors) => {
        console.log("Form has errors:", formErrors);
        // Additional error handling if needed
      }
    );
  };

  if (!showFormModal) return null;

  return (
    <ModalWrapper isOpen={showFormModal} onClose={closeFormModal}>
      <div className="fixed inset-0 bg-[url('/assets/contactImage.webp')] bg-cover bg-no-repeat bg-center bg-opacity-30 z-[999]">
        <div className="w-full h-full flex items-center justify-center bg-white/40 backdrop-blur-[30px]">
          <div className="p-8 max-w-[1480px] w-full mx-auto rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="Tala Health logo"
                  className="h-6 w-fit"
                />
              </div>
              <button
                onClick={closeFormModal}
                className="text-black/80 cursor-pointer">
                <X size={24} />
              </button>
            </div>

            <p className="text-black/80 mb-4">
              Be the first to know when Tala Health launches near you.
            </p>

            <h2 className="text-4xl text-black/80 font-light mb-8">
              We're not live in your region yet — join our wait-list to{" "}
              <span className="font-normal text-black">stay in the loop</span>
            </h2>

            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-black/80 font-normal mb-4">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tia"
                    className={`w-full border-b ${
                      errors.firstName ? "border-red-500" : "border-black-700"
                    } pb-2 focus:outline-none focus:border-purple-500`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-black/80 font-normal mb-4">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Michael"
                    className={`w-full border-b ${
                      errors.lastName ? "border-red-500" : "border-black-700"
                    } pb-2 focus:outline-none focus:border-purple-500`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="organization"
                    className="block  text-black/80 font-normal mb-4">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Meta"
                    className="w-full border-b border-black-700 pb-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block  text-black/80 font-normal mb-4">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tiamichael@meta.com"
                    className={`w-full border-b ${
                      errors.email ? "border-red-500" : "border-black-700"
                    } pb-2 focus:outline-none focus:border-purple-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block  text-black/80 font-normal mb-4">
                  Inquiry Type
                </label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <label className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="general"
                        checked={formData.inquiryType === "general"}
                        onChange={handleChange}
                        className="appearance-none h-5 w-5 border border-black-700 rounded-full  checked:bg-purple-500"
                      />
                    </div>
                    <span className="ml-2 text-black/80">
                      General information
                    </span>
                  </label>
                  <label className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="press"
                        checked={formData.inquiryType === "press"}
                        onChange={handleChange}
                        className="appearance-none h-5 w-5 border border-black-700 rounded-full  checked:bg-purple-500"
                      />
                    </div>
                    <span className="ml-2 text-black/80">Press</span>
                  </label>
                  <label className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="careers"
                        checked={formData.inquiryType === "careers"}
                        onChange={handleChange}
                        className="appearance-none h-5 w-5 border border-black-700 rounded-full  checked:bg-purple-500"
                      />
                    </div>
                    <span className="ml-2 text-black/80">Careers</span>
                  </label>
                  <label className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="partnerships"
                        checked={formData.inquiryType === "partnerships"}
                        onChange={handleChange}
                        className="appearance-none h-5 w-5 border border-black-700 rounded-full  checked:bg-purple-500"
                      />
                    </div>
                    <span className="ml-2 text-black/80">Partnerships</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block  text-black/80 font-normal mb-4">
                  Your Message
                </label>
                <input
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Let us know how we can help..."
                  className={`w-full border-b ${
                    errors.message ? "border-red-500" : "border-black-700"
                  } pb-2 focus:outline-none focus:border-purple-500`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="mb-8  flex items-center ">
                <label className="flex items-center cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="updates"
                      checked={formData.updates}
                      onChange={handleChange}
                      className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500 "
                    />
                    {formData.updates && (
                      <div className="absolute   top-1.5 left-1 flex items-center justify-center">
                        <svg
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 4L4 7L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="ml-2 text-black/80 ">
                    Keep me updated on product news and features via email
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Join the Wait-list"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CrumplerHealthForm;
