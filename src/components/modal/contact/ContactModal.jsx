"use client";
import { useState, useEffect, useRef } from "react";
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

  const modalContentRef = useRef(null);
  const firstInputRef = useRef(null);
  const formRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    organization: useRef(null),
    email: useRef(null),
    inquiryTypes: {
      general: useRef(null),
      press: useRef(null),
      careers: useRef(null),
      partnerships: useRef(null),
    },
    message: useRef(null),
    updates: useRef(null),
    submitButton: useRef(null),
  };

  // Add scrollbar styles to head
  useEffect(() => {
    // Create style element for scrollbar styling
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .modal-scrollbar::-webkit-scrollbar {
        width: 10px;
        background-color: rgba(0, 0, 0, 0.05);
      }
      .modal-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      .modal-scrollbar::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      .modal-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Move focus to first form element when modal opens
  useEffect(() => {
    if (showFormModal && formRefs.firstName.current) {
      setTimeout(() => {
        formRefs.firstName.current.focus();
      }, 100);
    }
  }, [showFormModal]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close modal on Escape
      if (e.key === "Escape") {
        closeFormModal();
        return;
      }

      // Up/Down/Left/Right navigation between form elements
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); // Prevent default scrolling behavior

        // Define the navigation order
        const navigationOrder = [
          formRefs.firstName.current,
          formRefs.lastName.current,
          formRefs.organization.current,
          formRefs.email.current,
          formRefs.inquiryTypes.general.current,
          formRefs.inquiryTypes.press.current,
          formRefs.inquiryTypes.careers.current,
          formRefs.inquiryTypes.partnerships.current,
          formRefs.message.current,
          formRefs.updates.current,
          formRefs.submitButton.current,
        ];

        // Filter out any null refs
        const validElements = navigationOrder.filter((el) => el !== null);

        // Find current active element index
        const currentIndex = validElements.findIndex(
          (el) => el === document.activeElement
        );
        if (currentIndex === -1) return;

        let nextIndex;

        // Determine next element based on arrow key
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % validElements.length;
        } else {
          nextIndex =
            (currentIndex - 1 + validElements.length) % validElements.length;
        }

        // Focus the next element
        validElements[nextIndex].focus();
      }
    };

    if (showFormModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showFormModal, closeFormModal]);

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

        // Focus on first field with error
        const firstErrorField = Object.keys(formErrors)[0];
        if (firstErrorField && formRefs[firstErrorField]?.current) {
          formRefs[firstErrorField].current.focus();
        }
      }
    );
  };

  if (!showFormModal) return null;

  return (
    <ModalWrapper isOpen={showFormModal} onClose={closeFormModal}>
      <div ref={modalContentRef} className="w-full">
        <div className="w-full bg-[url('/assets/contactImage.webp')] bg-cover bg-no-repeat bg-center">
          <div className="w-full bg-white/60 backdrop-blur-[30px] min-h-screen flex items-center justify-center">
            <div className="p-8 max-w-[1420px] w-full mx-auto rounded-lg my-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Image
                    src={logo}
                    alt="Healthcare Plus logo"
                    className="h-6 w-fit"
                  />
                </div>
                <button
                  onClick={closeFormModal}
                  className="text-black/80 cursor-pointer"
                  aria-label="Close form"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-black/80 mb-4">
                Be the first to know when Healthcare Plus launches near you.
              </p>

              <h2
                id="form-heading"
                className="text-4xl text-black/80 font-light mb-8"
              >
                We're not live in your region yet — join our wait-list to{" "}
                <span className="font-normal text-black">stay in the loop</span>
              </h2>

              <form
                onSubmit={onSubmit}
                aria-labelledby="form-heading"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-black/80 font-normal mb-4"
                    >
                      First Name
                    </label>
                    <input
                      ref={formRefs.firstName}
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
                      aria-required="true"
                      aria-invalid={errors.firstName ? "true" : "false"}
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                    />
                    {errors.firstName && (
                      <p
                        id="firstName-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-black/80 font-normal mb-4"
                    >
                      Last Name
                    </label>
                    <input
                      ref={formRefs.lastName}
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
                      aria-required="true"
                      aria-invalid={errors.lastName ? "true" : "false"}
                      aria-describedby={
                        errors.lastName ? "lastName-error" : undefined
                      }
                    />
                    {errors.lastName && (
                      <p
                        id="lastName-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-black/80 font-normal mb-4"
                    >
                      Organization
                    </label>
                    <input
                      ref={formRefs.organization}
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
                      className="block text-black/80 font-normal mb-4"
                    >
                      Email
                    </label>
                    <input
                      ref={formRefs.email}
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
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <fieldset>
                    <legend className="block text-black/80 font-normal mb-4">
                      Inquiry Type
                    </legend>
                    <div
                      className="flex flex-wrap gap-4 mt-2"
                      role="radiogroup"
                    >
                      <label className="flex items-center">
                        <div className="relative">
                          <input
                            ref={formRefs.inquiryTypes.general}
                            type="radio"
                            name="inquiryType"
                            id="inquiryType-general"
                            value="general"
                            checked={formData.inquiryType === "general"}
                            onChange={handleChange}
                            className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500"
                            aria-checked={formData.inquiryType === "general"}
                          />
                        </div>
                        <span className="ml-2 text-black/80">
                          General information
                        </span>
                      </label>
                      <label className="flex items-center">
                        <div className="relative">
                          <input
                            ref={formRefs.inquiryTypes.press}
                            type="radio"
                            name="inquiryType"
                            id="inquiryType-press"
                            value="press"
                            checked={formData.inquiryType === "press"}
                            onChange={handleChange}
                            className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500"
                            aria-checked={formData.inquiryType === "press"}
                          />
                        </div>
                        <span className="ml-2 text-black/80">Press</span>
                      </label>
                      <label className="flex items-center">
                        <div className="relative">
                          <input
                            ref={formRefs.inquiryTypes.careers}
                            type="radio"
                            name="inquiryType"
                            id="inquiryType-careers"
                            value="careers"
                            checked={formData.inquiryType === "careers"}
                            onChange={handleChange}
                            className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500"
                            aria-checked={formData.inquiryType === "careers"}
                          />
                        </div>
                        <span className="ml-2 text-black/80">Careers</span>
                      </label>
                      <label className="flex items-center">
                        <div className="relative">
                          <input
                            ref={formRefs.inquiryTypes.partnerships}
                            type="radio"
                            name="inquiryType"
                            id="inquiryType-partnerships"
                            value="partnerships"
                            checked={formData.inquiryType === "partnerships"}
                            onChange={handleChange}
                            className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500"
                            aria-checked={
                              formData.inquiryType === "partnerships"
                            }
                          />
                        </div>
                        <span className="ml-2 text-black/80">Partnerships</span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-black/80 font-normal mb-4"
                  >
                    Your Message
                  </label>
                  <input
                    ref={formRefs.message}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Let us know how we can help..."
                    className={`w-full border-b ${
                      errors.message ? "border-red-500" : "border-black-700"
                    } pb-2 focus:outline-none focus:border-purple-500`}
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="mb-8 flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        ref={formRefs.updates}
                        type="checkbox"
                        id="updates"
                        name="updates"
                        checked={formData.updates}
                        onChange={handleChange}
                        className="appearance-none h-5 w-5 border border-black-700 rounded-full checked:bg-purple-500"
                        aria-checked={formData.updates}
                      />
                      {formData.updates && (
                        <div className="absolute top-1.5 left-1 flex items-center justify-center">
                          <svg
                            width="12"
                            height="9"
                            viewBox="0 0 12 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
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
                    <span className="ml-2 text-black/80">
                      Keep me updated on product news and features via email
                    </span>
                  </label>
                </div>

                <Button
                  ref={formRefs.submitButton}
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Join the Wait-list"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CrumplerHealthForm;
