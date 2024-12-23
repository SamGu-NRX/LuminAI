"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import StaffGrid from "./StaffGrid";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

const StaffSection: React.FC = () => {
  // const { scrollYProgress } = useScroll();
  // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  // const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <FadeInWhenVisible
      as="section"
      className="pb-20 pt-10 mt-10 px-8 bg-gray-50/20 overflow-hidden shadow-lg backdrop-blur-md rounded-2xl"
    >
      <motion.div
        className="max-w-6xl mx-auto px-4"
        // style={{ opacity, y }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600">The minds behind the machines</p>
        </motion.div>

        <StaffGrid />
      </motion.div>
    </FadeInWhenVisible>
  );
};

export default StaffSection;
