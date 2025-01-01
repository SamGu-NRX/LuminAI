"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/shadcn/utils";
import FadeInFromLeft from "@/utils/motion/FadeInFromLeft";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

const timelineData = [
  {
    week: 1,
    title: "AI Fundamentals",
    description: "Dive into the basics of AI and machine learning.",
    project: "Build a simple neural network",
  },
  {
    week: 2,
    title: "Computer Vision",
    description: "Explore image recognition and processing techniques.",
    project: "Develop an object detection app",
  },
  {
    week: 3,
    title: "Natural Language Processing",
    description: "Understand and implement NLP algorithms.",
    project: "Create a chatbot with sentiment analysis",
  },
  {
    week: 4,
    title: "Reinforcement Learning",
    description: "Learn how AI agents make decisions.",
    project: "Train an AI to play a simple game",
  },
];

const Timeline = () => {
  return (
    // ↓ 1) Make the container’s padding smaller
    <FadeInWhenVisible as="section" className="rounded-2xl pb-6 pt-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center text-4xl font-light tracking-tight text-gray-900"
        >
          Your AI Journey
        </motion.h2>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50" />

          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

const TimelineItem = ({
  item,
  index,
}: {
  item: { week: number; title: string; description: string; project: string };
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="mb-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -360 : 360 }}
        animate={inView ? { opacity: 1, x: index % 2 === 0 ? -300 : 300 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex items-center justify-center gap-4 ${
          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Content Card */}
        <div className="w-5/12">
          <motion.div
            className={cn(
              "rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_50px_-15px_rgba(0,0,0,0.15)]",
              index !== 0 ? "md:mt-[-6rem]" : "",
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
              Week {item.week}
            </span>
            <h3 className="mb-4 text-2xl font-medium text-gray-900">
              {item.title}
            </h3>
            <p className="mb-4 text-gray-600">{item.description}</p>
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <p className="text-sm font-medium text-blue-800">
                Project: {item.project}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Node */}
        <div className="relative flex h-6 w-6 items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            className="absolute h-3 w-3 rounded-full bg-blue-500"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute h-4 w-4 rounded-full bg-blue-200"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-6 w-6 rounded-full bg-blue-100"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
