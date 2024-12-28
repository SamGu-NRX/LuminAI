import React from "react";
import FAQItem from "./FAQItem";
import { FAQSectionProps } from "@/data/faq-types";
import { faqData } from "@/data/faq";

const FAQSection: React.FC<FAQSectionProps> = ({
  icon: Icon,
  title,
  questions,
  openItem,
  setOpenItem,
}) => (
  <div className="mb-12">
    <div className="mb-6 flex items-center gap-3">
      <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-2">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-2">
      {questions.map((id) => {
        const faqItem = faqData[id];
        if (!faqItem) {
          console.warn(`FAQ item with id ${id} not found`);
          return null;
        }
        return (
          <FAQItem
            key={id}
            question={faqItem.question}
            answer={faqItem.answer}
            isOpen={openItem === id}
            onClick={() => setOpenItem(openItem === id ? null : id)}
          />
        );
      })}
    </div>
  </div>
);

export default FAQSection;
