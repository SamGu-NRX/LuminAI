"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaHeart,
  FaLayerGroup,
  FaRobot,
} from "react-icons/fa";
import { IoBuild } from "react-icons/io5";
import FadeInWhenVisible from "../motion/FadeInWhenVisible";

const features = [
  {
    title: "Free. As in Zero. Nada.",
    content:
      "Yep, you read that right. Our AI bootcamp costs you nothing but your time. Because who needs money when you truly want to educate everyone? We don't gatekeep knowledge behind a paywall.",
    linkText: "Learn More",
    link: "#",
    icon: <FaGraduationCap />,
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "Hands-On, For Real.",
    content:
      "Spare us the fluff. You’ll actually get your hands dirty with real AI tools.",
    linkText: "Curriculum Details",
    link: "/programs",
    icon: <IoBuild />,
    color: "from-indigo-500 to-cyan-600",
  },
  {
    title: "Non-Profit, Not Non-Ambitious",
    content:
      "We're not in it for the money. We're here to revolutionize AI education. Join us, unless you hate progress.",
    linkText: "Our Mission",
    link: "/about",
    icon: <FaLayerGroup />,
    color: "from-green-500 to-emerald-600",
  },
  // {
  //   title: "Real Tools. Real Skills.",
  //   content:
  //     "Forget outdated textbooks. We're all about hands-on with the latest AI tech. Get ready to actually know what you're doing.",
  //   linkText: "Curriculum Details",
  //   link: "/programs",
  //   icon: <FaRobot />,
  //   color: "from-indigo-500 to-cyan-600",
  // },

  {
    title: "Built by Students Who Get It",
    content:
      "We know the struggle. That's why we crafted a bootcamp that doesn't suck. Learn AI from people who actually understand you.",
    linkText: "Discover How",
    link: "#",
    icon: <FaHeart />,
    color: "from-pink-500 to-rose-600",
  },
];

const getColSpanClass = (index: number) => {
  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  if (isEvenRow) {
    return index % 2 === 0
      ? "md:col-span-6 lg:col-span-8"
      : "md:col-span-6 lg:col-span-4";
  } else {
    return index % 2 === 0
      ? "md:col-span-6 lg:col-span-4"
      : "md:col-span-6 lg:col-span-8";
  }
};

interface Feature {
  title: string;
  content: string;
  linkText: string;
  link: string;
  icon: React.ReactElement;
  color: string;
}

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;
  const colSpanClass = getColSpanClass(index);

  return (
    <motion.div
      className={`
        group relative overflow-hidden rounded-2xl p-6
        bg-white/10 backdrop-blur-lg border border-white/20
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        hover:shadow-2xl
        hover:scale-105
        min-h-[20rem] transform
        ${colSpanClass}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div
        className={`
          absolute inset-0 opacity-20
          bg-gradient-to-br ${feature.color}
          transition-opacity duration-500
          group-hover:opacity-40
          group-hover:scale-110
        `}
      />

      <div className="flex h-full flex-col justify-between p-5 transition-transform transform-gpu duration-300 group-hover:-translate-y-3 z-20">
        {/* Icon */}
        <div className="relative z-10 mb-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            className={`
            w-16 h-16 rounded-full
            bg-gradient-to-br ${feature.color}
            flex items-center justify-center
            text-white shadow-lg
          `}
          >
            {React.cloneElement(Icon, { className: "w-8 h-8" })}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-2 flex-grow">
          <h3 className="text-2xl font-bold text-black/90">{feature.title}</h3>
          <p className="text-md text-black/70">{feature.content}</p>
        </div>
      </div>

      <div
        className="
          absolute bottom-0 left-0 top-auto w-full translate-y-full transform-gpu opacity-0
          transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100
          z-20
        "
      >
        <a
          href={feature.link}
          className="
      gradient-border
      flex items-center justify-center bg-black py-2.5 text-sm uppercase text-white
    "
        >
          {feature.linkText}
        </a>
      </div>
    </motion.div>
  );
};

const LuminAIFeatures = () => {
  return (
    <FadeInWhenVisible
      as="section"
      className="w-full py-4 bg-transparent backdrop-blur-lg rounded-2xl overflow-hidden my-8 mt-24"
    >
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The One AI Bootcamp You Must Need
          </motion.h2>
          <motion.p
            className="text-xl text-black/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join us if you&apos;re ready to learn AI without mortgaging your
            future. We promise not to bore you to death.
          </motion.p>
        </div>

        <motion.div
          className="grid w-full auto-rows-[20rem] grid-cols-1 gap-5 md:grid-cols-12 relative min-h-[20rem] overflow-hidden"
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="
              bg-gradient-to-r from-purple-600 to-blue-500
              text-white font-bold py-3 px-8 rounded-full
              hover:scale-105 transition-transform duration-300
              shadow-lg hover:shadow-xl
            "
          >
            Start Your AI Journey Now!
          </button>
        </motion.div>
      </div>
    </FadeInWhenVisible>
  );
};

export default LuminAIFeatures;
