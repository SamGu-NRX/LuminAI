import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Module data type
interface BootcampModule {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  topics: string[];
}

// Sample bootcamp modules data
const bootcampModulesData: BootcampModule[] = [
  {
    id: 1,
    title: "AI Fundamentals",
    description:
      "Explore the core concepts of Artificial Intelligence and machine learning foundations",
    difficulty: "Beginner",
    imageUrl: "/images/2024-Summer-5.png",
    topics: ["AI History", "Machine Learning Basics", "Ethical AI"],
  },
  {
    id: 2,
    title: "Neural Networks Deep Dive",
    description:
      "Advanced exploration of neural network architectures and deep learning principles",
    difficulty: "Intermediate",
    imageUrl: "/images/2024-Summer-1.png",
    topics: ["Perceptrons", "Backpropagation", "Activation Functions"],
  },
  {
    id: 3,
    title: "AI in Real-World Applications",
    description:
      "Practical applications of AI across various industries and cutting-edge technologies",
    difficulty: "Advanced",
    imageUrl: "/images/2024-Summer-3.png",
    topics: [
      "Computer Vision",
      "Natural Language Processing",
      "AI in Healthcare",
    ],
  },
];

const BootcampModuleShowcase: React.FC = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const nextModule = () => {
    setCurrentModuleIndex((prev) => (prev + 1) % bootcampModulesData.length);
  };

  const prevModule = () => {
    setCurrentModuleIndex((prev) =>
      prev === 0 ? bootcampModulesData.length - 1 : prev - 1
    );
  };

  const currentModule = bootcampModulesData[currentModuleIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 relative">
      <motion.div
        className="relative w-full h-[700px] rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Glassmorphic Overlay (Uncomment if needed) */}
        {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10"></div> */}

        {/* Module Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule.id}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentModule.imageUrl}
              alt={currentModule.title}
              layout="fill"
              priority
              quality={90}
              className="object-cover opacity-30 blur-sm"
            />
          </motion.div>
        </AnimatePresence>

        {/* Module Content */}
        <div className="relative z-20 flex flex-col justify-center h-full p-12 pl-24 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <motion.h2
                  className="text-5xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {currentModule.title}
                </motion.h2>
                <motion.span
                  className={`
                    px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      currentModule.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-300"
                        : currentModule.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {currentModule.difficulty}
                </motion.span>
              </div>

              <motion.p
                className="text-xl max-w-2xl text-white/80"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {currentModule.description}
              </motion.p>

              {/* Topics */}
              <motion.div
                className="flex flex-wrap space-x-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {currentModule.topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex space-x-4 mt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <button
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => {
                    /* Start Module Logic */
                  }}
                  aria-label="Start Module"
                  tabIndex={0}
                >
                  <Play className="w-6 h-6 text-white" />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation Buttons Positioned Absolutely */}
      {/* Left Navigation Button */}
      <motion.button
        className="absolute left-8 top-1/2 transform z-30
             bg-white/10 hover:bg-white/20 backdrop-blur-md
             rounded-full p-3 transition-all duration-300 w-14 h-14
             flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
        onClick={prevModule}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous Module"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        className="absolute left-auto right-8 top-1/2 transform z-30
             bg-white/10 hover:bg-white/20 backdrop-blur-md
             rounded-full p-3 transition-all duration-300 w-14 h-14
             flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
        onClick={nextModule}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next Module"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};

export default BootcampModuleShowcase;
