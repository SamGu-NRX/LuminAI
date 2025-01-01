"use client";

import React, { useState } from "react";
import FAQSection from "./FAQSection";
import { categories } from "@/data/faq";

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="mx-auto mt-10 max-w-6xl px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Everything you need to know about the AI Innovate Scholars Bootcamp
          </p>
        </div>

        {Object.entries(categories).map(([key, category]) => (
          <FAQSection
            key={key}
            icon={category.icon}
            title={category.title}
            questions={category.questions}
            openItem={openItem}
            setOpenItem={setOpenItem}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
