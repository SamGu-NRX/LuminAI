import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Navigation from "./ShowcaseNav";
import { Button } from "@/components/ui/button";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

//TODO: add shadow to everything (not just this)

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
        (prev - 1 + bootcampModulesData.length) % bootcampModulesData.length,
    );
  };

  const currentModule = bootcampModulesData[currentModuleIndex];

  return (
    <section className="my-8 flex flex-col items-center justify-center p-4">
      <div className="relative mx-auto w-full max-w-6xl px-4">
        <motion.div
          className="relative flex min-h-[700px] w-full items-center justify-center overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id}
              className="absolute inset-0 overflow-hidden rounded-3xl bg-black"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="relative block h-full max-h-[700px] w-full overflow-hidden rounded-3xl">
                <Image
                  src={currentModule.imageUrl}
                  alt={currentModule.title}
                  fill
                  quality={90}
                  priority
                  className="h-full w-full rounded-3xl object-cover opacity-30 blur-sm"
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
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <motion.h2
                    className="flex items-center text-4xl font-bold leading-none tracking-tight sm:text-5xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {currentModule.title}
                  </motion.h2>
                  <motion.span
                    className={`relative flex w-fit items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${
                      currentModule.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-300"
                        : currentModule.difficulty === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                    }`}
                    style={{ top: "5px" }} // Adjust vertical alignment since the h2 component is not vertically centered
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {currentModule.difficulty}
                  </motion.span>
                </div>

                {/* Description */}
                <motion.p
                  className="max-w-2xl text-xl text-white/80"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {currentModule.description}
                </motion.p>

                {/* Topics */}
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {currentModule.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="mt-8 flex space-x-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                    onClick={() => {
                      /* Start Module Logic */
                    }}
                  >
                    <Play className="h-6 w-6" />
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
    </section>
  );
};

export default BootcampModuleShowcase;
