import React, { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can easily book an appointment online through our website by selecting a doctor, choosing an available time slot, and confirming your details. Alternatively, you can contact our support team for assistance.",
  },
  {
    question: "Do you offer online/virtual consultations?",
    answer:
      "Yes, we provide telehealth services for remote consultations. You can schedule a virtual appointment through our website or by contacting our team.",
  },
  {
    question: "How can I access my medical records and test results?",
    answer:
      "You can access your medical records securely through our Patient Portal. Log in with your registered email or phone number to view your appointment history, test results, and prescriptions.",
  },
  {
    question: "What services do you provide?",
    answer:
      "We offer a wide range of healthcare services including general medicine, emergency care, pediatrics, cardiology, neurology, and more.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major insurance providers. Please contact us or check our website for a full list of accepted insurance plans.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
        Quick Answers
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Find answers to common questions.
      </p>
      <div className="flex flex-col md:flex-row w-full  gap-8">
        {/* Image Container */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <Image
            src="/faq-group.webp"
            alt="Healthcare Team"
            width={500}
            height={550}
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>

        {/* FAQ Container */}
        <div className="w-full md:w-1/2 flex flex-col ">
          <div className="flex flex-col gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-blue-50  border border-blue-200"
              >
                <button
                  className="w-full text-left px-6 py-6 font-medium text-gray-900 flex items-center cursor-pointer justify-between focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  {faq.question}
                  <span
                    className={`ml-2 transition-transform duration-200 ${
                      openIdx === idx ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openIdx === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-6 pb-4 text-gray-700 text-base animate-fadeIn"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
