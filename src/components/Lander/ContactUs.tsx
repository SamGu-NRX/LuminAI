"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";

export default function ContactUsSection() {
  const contactRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      });
    }, observerOptions);

    const currentRef = contactRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

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

  return (
    <motion.div
      ref={contactRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="p-4 max-w-4xl mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-extrabold text-gray-800 mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            We&apos;re excited to hear from you. Let&apos;s collaborate and innovate
            together.
          </motion.p>
        </div>

        {/* Content */}
        <motion.div variants={itemVariants} className="px-6 py-6 text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Business Inquiry
            </h3>
            <p className="text-gray-700 max-w-xl mx-auto">
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
            className="group relative px-8 py-4
            bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400
          text-white font-semibold
            transition-colors duration-300 flex items-center
            justify-center mx-auto space-x-3 rounded-full
            hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600
            hover:shadow-xl"
          >
            <Send className="w-5 h-5 text-white" />
            <span>Get In Touch</span>
            <ArrowRight
              className="w-5 h-5 text-white transition-transform
                         group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
