import React from "react";
import { easeIn, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
}

const Navigation: React.FC<NavProps> = ({
  onPrevious,
  onNext,
  currentIndex,
  totalItems,
}) => {
  // Variant for glowing effect
  const glowVariants = {
    initial: {
      boxShadow: "0 0 0 0 rgba(255,255,255,0.2)",
      scale: 1,
      ease: false,
    },
    hover: {
      boxShadow: "0 0 15px 5px rgba(255,255,255,0.3)",
      scale: 1.05,
      ease: false,
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px 2px rgba(255,255,255,0.1)",
      ease: false,
    },
  };

  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between items-center px-8 bg-transparent">
      {/* Previous Button */}
      <motion.button
        className="
          group relative overflow-hidden
          w-16 h-16 rounded-full
          bg-white/10 backdrop-blur-md
          flex items-center justify-center
          border border-white/20
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-white/30
        "
        onClick={onPrevious}
      //   disabled={currentIndex === 0}
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        // Animated gradient background
        style={{
          background: `
            linear-gradient(
              145deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.05) 100%
            )
          `,
          boxShadow:
            "0 4px 6px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.1)",
        }}
      >
        {/* Subtle hover effect layer */}
        <motion.div
          className="
            absolute inset-0
            bg-white/5 opacity-0
            group-hover:opacity-20
            transition-opacity duration-300
          "
        />

        <ChevronLeft
          className="
            w-8 h-8 text-white/80
            group-hover:text-white
            transition-colors duration-300
          "
        />
      </motion.button>

      {/* Next Button */}
      <motion.button
        className="
          group relative overflow-hidden
          w-16 h-16 rounded-full
          bg-white/10 backdrop-blur-md
          flex items-center justify-center
          border border-white/20
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-white/30
        "
        onClick={onNext}
      //   disabled={currentIndex === totalItems - 1}
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        // Animated gradient background
        style={{
          background: `
            linear-gradient(
              145deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.05) 100%
            )
          `,
          boxShadow:
            "0 4px 6px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.1)",
        }}
      >
        {/* Subtle hover effect layer */}
        <motion.div
          className="
            absolute inset-0
            bg-white/5 opacity-0
            group-hover:opacity-20
            transition-opacity duration-300
          "
        />

        <ChevronRight
          className="
            w-8 h-8 text-white/80
            group-hover:text-white
            transition-colors duration-300
          "
        />
      </motion.button>
    </div>
  );
};

export default Navigation;
