import React, { useState } from "react";
import { motion } from "framer-motion";
import OrbBackground from "./CTAOrbBackground/Background";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

const CTAContent = {
  headline: "From Zero to AI Hero",
  subheadline: "Got Homework? Yeah, Join the Club.",
  description:
    "AI might sound like sci-fi, but guess what? It’s here, it’s free, and you can learn it before your next midterm. Why wait till college to build robots that (hopefully) won’t overthrow humanity? Join our AI bootcamp and make your future self proud.",
  // description:
  //   "Look, we get it. AI seems scary. Like 'robots taking over the world' scary. But what's scarier? Missing out on the tech revolution while your roommate makes bank as an AI engineer. Time to level up.",
  buttonText: "Hack your future →",
  buttonHoverText: "Level Up for $0 🚀",
  stats: [
    {
      label: "Completion Rate",
      value: "90+%", // add ticking number effect, separate "%" and value (font size much larger)
      tooltip: "No quitters yet… but hey, there's always tomorrow!",
    },
    {
      label: "Success Stories",
      value: "89%",
      tooltip:
        "The other 11%? They launched their own startups. Maybe you’ll hire us someday.",
    },
    {
      label: "Average Salary",
      value: "$95K",
      tooltip:
        "Enough to upgrade from instant noodles to artisanal ramen (don’t @ us).",
    },
  ],
  funFacts: [
    "Taught by students, not weird, out-of-touch geniuses",
    "Energy drink budget: unlimited (ask nicely)",
    "Dress code: if you can code in it, we’re cool with it",
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
  return (
    <FadeInWhenVisible
      as="section"
      className="relative w-full max-w-3xl mx-auto rounded-2xl my-8 justify-center flex items-center"
    >
      <HoverBorderGradient
        containerClassName="rounded-2xl group-hover:scale-[102%] shadow-xl group-hover:shadow-2xl"
        as="div"
        className=" dark:bg-black bg-white text-black dark:text-white flex items-center transition-all overflow-hidden justify-center"
      >
        <motion.div
          className="min-h-[500px] relative rounded-2xl "
          initial="hidden"
          animate="visible"
          variants={variants.container}
        >
          {/* Blurred background as a sibling (instead of wrapping the content) */}

          <OrbBackground />

          {/* Main content container (no blur here) */}
          <div className="relative z-10 p-8 rounded-2xl overflow-hidden transition duration-300">
            {/* BLur Overlay */}
            <div className="absolute inset-0 z-0 bg-black/5 blur-xl" />
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

            <motion.button
              variants={variants.child}
              className="relative group/modal-btn rounded-md text-black dark:text-white text-center bg-black dark:bg-white flex justify-center left-2 "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-40 group-hover/modal-btn:opacity-100 transition duration-500" />
              <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center overflow-hidden text-lg">
                <span className="group-hover/modal-btn:translate-x-60 text-white text-center transition duration-500">
                  {CTAContent.buttonText}
                </span>
                <div className="-translate-x-60 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                  {CTAContent.buttonHoverText}
                </div>
              </div>
            </motion.button>

            {/* Stats */}
            <TooltipProvider>
              <motion.div
                variants={variants.child}
                className="grid grid-cols-3 gap-4 mt-8 mb-4 text-center transition duration-300"
              >
                {CTAContent.stats.map((stat, index) => (
                  <Tooltip key={index}>
                    {/* TooltipTrigger wraps the element that will trigger the tooltip */}
                    <TooltipTrigger asChild>
                      <div className="relative p-4">
                        <div className="text-2xl font-bold text-black mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-800">
                          {stat.label}
                        </div>
                      </div>
                    </TooltipTrigger>

                    {/* TooltipContent defines the content of the tooltip */}
                    <TooltipContent
                      side="bottom" // Adjust the position as needed (top, bottom, left, right)
                      align="center" // Adjust the alignment as needed (start, center, end)
                      className="-mt-2 px-3 py-2 bg-black/90 rounded-lg text-xs text-white whitespace-nowrap"
                    >
                      {stat.tooltip}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            </TooltipProvider>
          </div>
        </motion.div>
      </HoverBorderGradient>
    </FadeInWhenVisible>
  );
};

export default CTASection;
