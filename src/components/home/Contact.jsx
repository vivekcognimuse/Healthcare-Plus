import React from "react";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ContactContext";
import { Phone, Ambulance } from "lucide-react";

const Contact = () => {
  const { openFormModal } = useModal();
  return (
    <div className="w-full flex flex-col items-center justify-center mb-32">
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        {/* Emergency Card */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-xl border border-gray-300 bg-white min-w-[220px]">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600">
            <Ambulance className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Emergency</div>
            <div className="text-gray-700 text-base">1234-5678</div>
          </div>
        </div>

        {/* Helpline Card */}
        <div className="flex items-center gap-6 px-6 py-4 rounded-xl border border-gray-300 bg-white min-w-[320px]">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
              <div>
                <div className="font-semibold text-gray-900">Helpline</div>
                <div className="text-gray-700 text-base">+1 800-123-4567</div>
              </div>
              <div className="hidden md:block border-l border-gray-300 mx-2"></div>
              <div>
                <div className="font-semibold text-gray-900">
                  International Assistance
                </div>
                <div className="text-gray-700 text-base">+1 234-567-8910</div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Card */}
        <div className="flex items-center gap-6 px-6 py-4 rounded-xl border border-gray-300 bg-white min-w-[320px]">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-900">
              Schedule your visit today
            </div>
          </div>
          <Button
            onClick={openFormModal}
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition-colors"
          >
            Book an Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
