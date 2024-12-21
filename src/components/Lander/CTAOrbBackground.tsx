import { motion } from "framer-motion";

// Floating orb animation variants
const floatingOrbVariants = {
  animate: {
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

const OrbBackground = () => {
  return (
    <>
      {/* Top right orb */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
        variants={floatingOrbVariants}
        animate={{
          x: [0, 20, -10, 15, 0],
          y: [0, -15, 10, -20, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Bottom left orb */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"
        variants={floatingOrbVariants}
        animate={{
          x: [0, -15, 20, -10, 0],
          y: [0, 20, -15, 10, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Center orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"
        variants={floatingOrbVariants}
        animate={{
          x: [0, 10, -15, 5, 0],
          y: [0, -10, 15, -5, 0],
          scale: [1, 1.15, 0.85, 1.1, 1],
          opacity: [0.1, 0.15, 0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default OrbBackground;
