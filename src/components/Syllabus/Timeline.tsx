"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Your AI Journey
        </h2>
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center mb-8 ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-1/2 px-4">
        <div className="glassmorphism p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">
            Week {item.week}: {item.title}
          </h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <p className="text-blue-500 font-semibold">Project: {item.project}</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default Timeline;
