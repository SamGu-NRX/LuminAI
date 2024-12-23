"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";

import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

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

export default function ContactUsSection() {
  return (
    <FadeInWhenVisible
      as="section"
      variants={containerVariants}
      className="mx-auto my-8 w-full max-w-3xl p-4"
    >
      <motion.div
        className="relative z-10 overflow-hidden rounded-2xl border border-black/20 p-8 shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 z-0 bg-black/5 blur-xl" />
        {/* Header */}
        <div className="px-6 py-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-4xl font-extrabold text-gray-800"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-gray-700"
          >
            We&apos;re excited to hear from you. Let&apos;s collaborate and
            innovate together.
          </motion.p>
        </div>

        {/* Content */}
        <motion.div variants={itemVariants} className="px-6 py-6 text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="mb-3 text-2xl font-semibold text-blue-700">
              Business Inquiry
            </h3>
            <p className="mx-auto max-w-xl text-gray-700">
              Transform the future of AI education with us. Whether you&apos;re
              a student, educator, or business owner, we&apos;re here to help.
              We collaborate with all who believe in the education of our next
              generation. Let&apos;s transform the future of AI together.
            </p>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative mx-auto flex items-center justify-center space-x-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 hover:shadow-xl" // TODO: transition colors doesn't work
          >
            <Send className="h-5 w-5 text-white" />
            <span>Get In Touch</span>
            <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>
    </FadeInWhenVisible>
  );
}
