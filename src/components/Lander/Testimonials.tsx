"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

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
      name: "Diyorbek Komilov",
      role: "High School Senior",
      testimonial:
        "LuminAI Bootcamps have truly changed the way I understand AI. The hands-on approach and the support from the community are unparalleled.",
      initials: "DK",
    },
    {
      name: "Jeeval Shah",
      role: "Computer Engineering, University Student",
      testimonial:
        "Although I’ve been learning AI/ML for months, I always struggled with Neural Networks. This course explained them brilliantly. While it’s accessible to those with some experience, beginners in Python might find the first week challenging. That said, the high standards set by the bootcamp ensure a rewarding learning journey. Highly recommend it for anyone looking to dive into AI.",
      initials: "JS",
    },
  ];

  return (
    <FadeInWhenVisible
      as="section"
      variants={containerVariants}
      className="mx-auto mt-8 max-w-5xl p-4"
    >
      <motion.h2
        variants={itemVariants}
        className="mb-12 text-center text-3xl font-bold text-gray-800"
      >
        What Our Participants Say
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.15)",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6"
          >
            <div className="relative z-10 mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-semibold text-blue-600">
                  {testimonial.initials}
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <p className="relative z-10 text-gray-700">
              {testimonial.testimonial}
            </p>
          </motion.div>
        ))}
      </div>
    </FadeInWhenVisible>
  );
}
