import React from "react";
import { ChevronDown } from "lucide-react";
import { FAQItemProps } from "@/data/faq-types";

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => (
  <div className="border-b border-gray-100">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between py-6 text-left"
    >
      <span className="text-lg font-medium text-gray-900">{question}</span>
      <ChevronDown
        className={`transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "mb-6 max-h-96" : "max-h-0"
      }`}
    >
      <p className="text-gray-600">{answer}</p>
    </div>
  </div>
);

export default FAQItem;
