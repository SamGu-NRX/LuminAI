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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={contactRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative max-w-4xl mx-auto p-8 bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5
        opacity-70 pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10 text-white text-center">
        <motion.h2
          variants={itemVariants}
          className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent
          bg-gradient-to-r from-white via-white/90 to-white/70"
        >
          Contact Us
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg mb-8 text-white/80 max-w-2xl mx-auto"
        >
          We're excited to hear from you. Let's collaborate and innovate
          together.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-3xl font-semibold mb-4 text-white/90">
            Business Inquiry
          </h3>
          <p className="text-white/70 max-w-xl mx-auto">
            Transform the future of AI education with us.

            We collaborate with all who believe in the education of our next generation. Let&apos;s
            transform the future of AI together.
          </p>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-white/20 hover:bg-white/30
          backdrop-blur-md rounded-full text-white font-semibold
          transition-all duration-300 ease-in-out flex items-center
          justify-center mx-auto space-x-3 hover:shadow-xl"
        >
          <Send className="w-5 h-5 mr-3 text-white/80 group-hover:animate-pulse" />
          Get In Touch
          <ArrowRight
            className="ml-3 w-5 h-5 text-white/80 transition-transform
            group-hover:translate-x-1"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
