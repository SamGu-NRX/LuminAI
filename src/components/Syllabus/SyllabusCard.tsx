"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const syllabusData = [
  {
    week: 1,
    title: "Introduction to AI",
    content: [
      "Introduction to AI and Neural Networks",
      "Overview and Hierarchy of Artificial Intelligence",
      "Machine Learning: Understanding Patterns",
      "Neural Networks: Structured Like the Human Brain",
      "Distinguishing AI vs. AGI",
      "Fundamental Programming Principles (Abstraction & Control Structures)",
      "Basic Linear Algebra and Vector Arithmetic",
      "Introduction to Regression and Clustering",
      "Supervised vs. Unsupervised Learning",
      "Exploring the k-NN Algorithm",
      "Practical Applications of AI in Daily Life",
    ],
  },
  {
    week: 2,
    title: "Convolutional Neural Networks (CNNs)",
    content: [
      "Review of Neural Networks",
      "Introduction to Convolutional Neural Networks (CNNs)",
      "Comparing Neural Networks and Vectors",
      "Understanding Weights & Biases",
      "Activation Functions",
      "Training and Loss Functions",
      "CNNs vs. RNNs",
      "Hands-On: Building a CNN Model for Digit Classification (MNIST)",
      "Hands-On: Building a CNN Model for Image Classification (CIFAR-10)",
    ],
  },
  {
    week: 3,
    title: "Object Detection with YOLOv8",
    content: [
      "Introduction to Object Detection",
      "Defining Object Detection",
      "Overview of the YOLO Approach",
      "Getting Started with YOLOv8 (Ultralytics)",
      "Setting Up an Ultralytics Account",
      "Sourcing a Car Dataset",
      "Training and Testing a YOLOv8 Model on a Car Dataset (OpenCV)",
      "Utilizing OpenCV for Car Speed Calculations",
    ],
  },
  {
    week: 4,
    title: "Audio Classification",
    content: [
      "Introduction to Audio Classification",
      "Defining Audio Classification",
      "Applications of Audio Classification",
      "Preparing Audio Data",
      "Collecting and Preprocessing Audio Data",
      "Hands-On: Building and Training an Audio Classification Model",
      "Audio Recording, Sampling, and Encoding",
      "Discrete Fourier Transforms and Their Applications",
      "Pattern Recognition in Audio Data",
      "Guest Speaker Session: ML Research Insights (UIUC)",
    ],
  },
  {
    week: 5,
    title:
      "Weeks 5-6: Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)",
    content: [
      "Introduction to Large Language Models (LLMs)",
      "Defining Large Language Models",
      "Exploring Applications of LLMs",
      "Introduction to Retrieval-Augmented Generation (RAG)",
      "Defining Retrieval-Augmented Generation",
      "How RAG Enhances LLM Capabilities",
      "Hands-On: Building a Simple RAG System Using LangChain",
    ],
  },
  {
    week: 6,
    title: "Week 7: Check-In (Project Mentorship)",
    content: [
      "Final Project & Presentation: Demonstrating Your Acquired Skills",
    ],
  },
];

export default function SyllabusContent() {
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <div className="bg-white/10 backdrop-blur-sm min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h1>
        <span className="text-4xl font-bold text-gray-900">AI Innovate Scholars</span>
        <span className="text-4xl font-bold text-blue-500"> Syllabus</span>
      </h1>
      <div className="max-w-4xl w-full bg-white/20 border border-gray-200 shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Course Syllabus
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weeks</h2>
            <div className="flex flex-col space-y-2">
              {syllabusData.map((week) => (
                <motion.button
                  key={week.week}
                  className={`text-left w-full py-2 px-3 rounded transition-colors ${
                    activeWeek === week.week
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveWeek(week.week)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {week.title.startsWith("Weeks 5-6:")
                    ? "Weeks 5-6"
                    : week.title.startsWith("Week 7:")
                    ? "Week 7"
                    : `Week ${week.week}`}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="md:w-2/3">
            <motion.div
              key={activeWeek}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {syllabusData[activeWeek - 1].title}
              </h2>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {syllabusData[activeWeek - 1].content.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
