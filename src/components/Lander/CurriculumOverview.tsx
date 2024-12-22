"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fadeUp } from "@/animations/gsap";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import FadeInWhenVisible from "../motion/FadeInWhenVisible";

// Shared Variants for Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

export default function AICurriculumSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter(); // Initialize router

  // TODO: Implement GSAP fadeUp animation

  // const sectionRef = useRef(null);
  // const elementsRef = useRef([]);

  // useEffect(() => {
  //   if (sectionRef.current) {
  //     fadeUp(
  //       elementsRef.current.filter((el) => el !== null),
  //       sectionRef.current,
  //       { delay: 0.3 }
  //     );
  //   }
  // }, []);

  const curriculumItems = [
    {
      title: "Programming Frameworks and Libraries",
      items: [
        "Convolutional Neural Networks (CNNs)",
        "Image Recognition",
        "Natural Language Processing (NLP)",
        "Reinforcement Learning (RL)",
        "Machine Learning Algorithms",
      ],
    },
    {
      title: "Mathematical Foundations",
      items: [
        "Matrices and Basic Linear Algebra",
        "Principles of Neural Networks",
        "Understanding Large Language Models (LLMs)",
      ],
    },
  ];

  return (
    <FadeInWhenVisible
      as="section"
      transition={containerVariants}
      className="p-4 max-w-6xl mx-auto my-8"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white/20 rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
      >
        {/* Header */}
        <motion.div
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          className="px-6 py-5 flex items-center justify-between cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            AI Curriculum Overview
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronUp className="text-blue-600" size={24} />
            ) : (
              <ChevronDown
                className="text-gray-600 group-hover:text-blue-600 transition-colors"
                size={24}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  duration: 0.3,
                  delayChildren: 0.2,
                  staggerChildren: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.2 },
              }}
              className="px-6 py-6 bg-gray-50"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-700 mb-6"
              >
                Our comprehensive AI curriculum covers both programming
                frameworks and mathematical foundations essential for AI
                development.
              </motion.p>

              {curriculumItems.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.2, duration: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1, duration: 0.3 }}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/programs")} // Navigate to /programs
                className="mt-4 w-full py-3 bg-blue-500 text-white rounded-xl
                           hover:bg-blue-600 transition-colors duration-300
                           flex items-center justify-center space-x-2"
              >
                <span>Explore Full Curriculum</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeInWhenVisible>
  );
}
