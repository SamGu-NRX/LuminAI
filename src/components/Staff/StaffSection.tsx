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
      className="mt-10 overflow-hidden rounded-2xl bg-gray-50/20 px-8 pb-20 pt-10 shadow-lg backdrop-blur-md"
    >
      <motion.div
        className="mx-auto max-w-6xl px-4"
        // style={{ opacity, y }}
      >
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Meet Our Team
          </h2>
          <div className="mx-auto mb-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="text-xl text-gray-600">The minds behind the machines</p>
        </motion.div>

        <StaffGrid />
      </motion.div>
    </FadeInWhenVisible>
  );
};

export default StaffSection;
