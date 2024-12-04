"use client";

import { useState, useRef } from "react";
import * as m from "framer-motion/m";
import { Quote } from "lucide-react";

// Shared Variants for Animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};


export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      role: "AI Enthusiast",
      testimonial:
        "LuminAI Bootcamps have truly changed the way I understand AI. The hands-on approach and the support from the community are unparalleled.",
      initials: "JD",
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      testimonial:
        "The curriculum is comprehensive and up-to-date with the latest industry trends. Highly recommend to anyone looking to dive into AI.",
      initials: "JS",
    },
  ];

  return (
    <m.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 mt-8 max-w-5xl mx-auto"
    >
      <m.h2
        variants={itemVariants}
        className="text-3xl font-bold text-center mb-12 text-gray-800"
      >
        What Our Participants Say
      </m.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <m.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.15)",
            }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden transition-all duration-300"
          >
            {/* <Quote
              className="absolute top-4 left-4 text-blue-100 opacity-50"
              size={48}
            /> */}
            <div className="flex items-center mb-4 relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-semibold text-xl">
                  {testimonial.initials}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <p className="text-gray-700 relative z-10">
              {testimonial.testimonial}
            </p>
          </m.div>
        ))}
      </div>
    </m.section>
  );
}
