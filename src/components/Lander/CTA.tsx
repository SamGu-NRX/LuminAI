import React, { useState } from "react";
import { motion } from "framer-motion";

const CTAContent = {
  headline: "From Zero to AI Hero",
  subheadline: "No CS degree? No problem.",
  description:
    "Look, we get it. AI seems scary. Like 'robots taking over the world' scary. But what's scarier? Missing out on the tech revolution while your roommate makes bank as an AI engineer. Time to level up.",
  buttonText: "Hack Your Future →",
  stats: [
    {
      label: "Survival Rate",
      value: "94%",
      tooltip: "Don't worry, we haven't lost any students... yet",
    },
    {
      label: "Landing Jobs",
      value: "89%",
      tooltip: "The other 11% started their own AI companies",
    },
    {
      label: "Starting Salary",
      value: "$95K",
      tooltip: "That's a lot of instant ramen upgrades",
    },
  ],
  funFacts: [
    "No calculus required (we promise)",
    "Free energy drinks included",
    "Dress code: whatever compiles",
  ],
};

const variants = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  },
  child: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

const CTASection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <motion.div
      className="min-h-[500px] p-8 flex items-center justify-center my-8"
      initial="hidden"
      animate="visible"
      variants={variants.container}
    >
      <div
        className="relative w-full max-w-2xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Main content container */}
        <motion.div
          className="relative backdrop-blur-lg bg-black/5 border border-black/20 rounded-2xl p-8 shadow-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <motion.h2
            variants={variants.child}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700 mb-2"
          >
            {CTAContent.headline}
          </motion.h2>

          <motion.h3
            variants={variants.child}
            className="text-xl text-purple-700 mb-4"
          >
            {CTAContent.subheadline}
          </motion.h3>

          <motion.p
            variants={variants.child}
            className="text-lg text-gray-800 mb-8 max-w-xl"
          >
            {CTAContent.description}
          </motion.p>

          {/* Fun Facts */}
          <motion.div
            variants={variants.child}
            className="flex flex-wrap gap-2 mb-8"
          >
            {CTAContent.funFacts.map((fact, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-black/5 text-gray-800 rounded-full text-sm border border-black/10"
              >
                {fact}
              </span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={variants.child}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
            <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
              <span className="text-gray-200 group-hover:text-white transition duration-200">
                {CTAContent.buttonText}
              </span>
            </div>
          </motion.button>

          {/* Stats */}
          <motion.div
            variants={variants.child}
            className="grid grid-cols-3 gap-4 mt-12 text-center"
          >
            {CTAContent.stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-4 group"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="text-2xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-800">{stat.label}</div>

                {/* Tooltip */}
                {activeTooltip === index && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/90 rounded-lg text-xs text-white whitespace-nowrap">
                    {stat.tooltip}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTASection;
