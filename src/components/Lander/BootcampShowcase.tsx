import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Navigation from "./Nav";
import { Button } from "@/components/ui/button";

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
    setCurrentModuleIndex(
      (prev) =>
        (prev - 1 + bootcampModulesData.length) % bootcampModulesData.length
    );
  };

  const currentModule = bootcampModulesData[currentModuleIndex];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-6xl mx-auto px-4 py-16 relative">
        <motion.div
          className="relative w-full min-h-[700px] rounded-3xl overflow-hidden flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id}
              className="absolute bg-black inset-0 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="relative block w-full h-full max-h-[700px] rounded-3xl overflow-hidden">
                <Image
                  src={currentModule.imageUrl}
                  alt={currentModule.title}
                  fill
                  quality={90}
                  priority
                  className="object-cover w-full h-full opacity-30 blur-sm rounded-3xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Module Content */}
          <div className="relative z-20 flex flex-col justify-center p-12 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModule.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Title and Difficulty */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <motion.h2
                    className="text-4xl sm:text-5xl font-bold tracking-tight leading-none flex items-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {currentModule.title}
                  </motion.h2>
                  <motion.span
                    className={`relative flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold w-auto ${
                      currentModule.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-300"
                        : currentModule.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                    style={{ top: "4px" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {currentModule.difficulty}
                  </motion.span>
                </div>

                {/* Description */}
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
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {currentModule.topics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-white/10 px-3 py-1 rounded-full text-sm"
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
                    onClick={() => {
                      /* Start Module Logic */
                    }}
                  >
                    <Play className="w-6 h-6" />
                    <span className="sr-only">Start Module</span>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <Navigation
          onPrevious={prevModule}
          onNext={nextModule}
          currentIndex={currentModuleIndex}
          totalItems={bootcampModulesData.length}
        />
      </div>
    </div>
  );
};

export default BootcampModuleShowcase;
