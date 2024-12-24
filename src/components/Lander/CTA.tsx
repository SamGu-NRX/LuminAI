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
import NumberTicker from "../ui/number-ticker";

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
      value: 80, // TODO: add ticking number effect, separate "%" and value (font size much larger)
      valueLabel: "%",
      tooltip: "No quitters yet… but hey, there's always tomorrow!",
    },
    {
      label: "Success Stories",
      value: 89,
      valueLabel: "%",
      tooltip:
        "The other 11%? They launched their own startups. Maybe you’ll hire us someday.",
    },
    {
      label: "First Cohort Attendees",
      value: 200,
      valueLabel: "+",
      tooltip: "Good stuff right here",
    },
    // {
    //   label: "Average Salary",
    //   value: "$95K",
    //   tooltip:
    //     "Enough to upgrade from instant noodles to artisanal ramen (don’t @ us).",
    // },
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
      className="relative mx-auto my-8 flex w-full max-w-3xl items-center justify-center rounded-2xl"
    >
      <HoverBorderGradient
        containerClassName="rounded-2xl group-hover:scale-[102%] shadow-xl group-hover:shadow-2xl"
        as="div"
        className="flex items-center justify-center overflow-hidden bg-white text-black transition-all dark:bg-black dark:text-white"
      >
        <motion.div
          className="relative min-h-[500px] rounded-2xl"
          initial="hidden"
          animate="visible"
          variants={variants.container}
        >
          {/* Blurred background as a sibling (instead of wrapping the content) */}

          <OrbBackground />

          {/* Main content container (no blur here) */}
          <div className="relative z-10 overflow-hidden rounded-2xl p-8 transition duration-300">
            {/* BLur Overlay */}
            <div className="absolute inset-0 z-0 bg-black/5 blur-xl" />
            {/* Header */}
            <motion.h2
              variants={variants.child}
              className="mb-2 bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-4xl font-bold text-transparent"
            >
              {CTAContent.headline}
            </motion.h2>

            <motion.h3
              variants={variants.child}
              className="mb-4 text-xl text-purple-700"
            >
              {CTAContent.subheadline}
            </motion.h3>

            <motion.p
              variants={variants.child}
              className="mb-8 max-w-xl text-lg text-gray-800"
            >
              {CTAContent.description}
            </motion.p>

            {/* Fun Facts */}
            <motion.div
              variants={variants.child}
              className="mb-8 flex flex-wrap gap-2"
            >
              {CTAContent.funFacts.map((fact, index) => (
                <span
                  key={index}
                  className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm text-gray-800"
                >
                  {fact}
                </span>
              ))}
            </motion.div>

            <motion.button
              variants={variants.child}
              className="group/modal-btn relative left-2 flex justify-center rounded-md bg-black text-center text-black dark:bg-white dark:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-40 blur transition duration-500 group-hover/modal-btn:opacity-100" />
              <div className="relative flex items-center overflow-hidden rounded-lg bg-black px-8 py-4 text-lg leading-none">
                <span className="text-center text-white transition duration-500 group-hover/modal-btn:translate-x-60">
                  {CTAContent.buttonText}
                </span>
                <div className="absolute inset-0 z-20 flex -translate-x-60 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0">
                  {CTAContent.buttonHoverText}
                </div>
              </div>
            </motion.button>

            {/* Stats */}
            <TooltipProvider>
              <motion.div
                variants={variants.child}
                className="mb-4 mt-8 grid grid-cols-3 gap-4 text-center transition duration-300"
              >
                {CTAContent.stats.map((stat, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="relative p-6 text-center">
                        <div className="mb-2 flex items-baseline justify-center">
                          <p className="bg-gradient-to-tr from-purple-400/75 via-pink-500/75 to-red-500/75 bg-clip-text backdrop-blur-lg text-5xl font-bold tracking-[-0.12em] text-transparent dark:from-blue-400/75 dark:via-teal-500/75 dark:to-green-500/75">
                            <NumberTicker value={stat.value} />
                          </p>
                          <span className="ml-1 text-2xl font-medium text-gray-600 dark:text-gray-400">
                            {stat.valueLabel}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    </TooltipTrigger>

                    {/* TooltipContent defines the content of the tooltip */}
                    <TooltipContent
                      side="bottom" // Adjust the position as needed (top, bottom, left, right)
                      align="center" // Adjust the alignment as needed (start, center, end)
                      className="-mt-2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-2 text-xs text-white"
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
