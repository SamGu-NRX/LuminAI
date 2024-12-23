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
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";
import { TransitionLink } from "@/utils/TransitionLink";

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
      className={`group relative flex min-h-[20rem] transform flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${colSpanClass} `}
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
        className={`absolute inset-0 bg-gradient-to-br opacity-20 ${feature.color} transition-opacity duration-500 group-hover:scale-110 group-hover:opacity-40`}
      />

      <div className="z-20 flex h-full transform-gpu flex-col justify-between p-5 transition-transform duration-300 group-hover:-translate-y-3">
        {/* Icon */}
        <div className="relative z-10 mb-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            className={`h-16 w-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}
          >
            {React.cloneElement(Icon, { className: "w-8 h-8" })}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow space-y-2">
          <h3 className="text-2xl font-bold text-black/90">{feature.title}</h3>
          <p className="text-md text-black/70">{feature.content}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 top-auto z-20 w-full translate-y-full transform-gpu opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <TransitionLink
          href={feature.link}
          className="gradient-border flex items-center justify-center bg-black py-2.5 text-sm uppercase text-white"
        >
          {feature.linkText}
        </TransitionLink>
      </div>
    </motion.div>
  );
};

const LuminAIFeatures = () => {
  return (
    <FadeInWhenVisible
      as="section"
      className="my-8 mt-24 w-full overflow-hidden rounded-2xl bg-transparent py-4 backdrop-blur-lg"
    >
      <div className="container mx-auto space-y-10 px-4">
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-4xl font-bold text-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The One AI Bootcamp You Must Need
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-xl text-black/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join us if you&apos;re ready to learn AI without mortgaging your
            future. We promise not to bore you to death.
          </motion.p>
        </div>

        <motion.div
          className="relative grid min-h-[20rem] w-full auto-rows-[20rem] grid-cols-1 gap-5 overflow-hidden md:grid-cols-12"
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            Start Your AI Journey Now!
          </button>
        </motion.div>
      </div>
    </FadeInWhenVisible>
  );
};

export default LuminAIFeatures;
