// Orb.tsx
import React from "react";
import { motion, MotionProps } from "framer-motion";
import clsx from "clsx";

interface OrbProps {
  positionClasses: string;
  sizeClass: string;
  colorClass: string;
  animationVariants: {
    initial: Record<string, any>;
    animate: Record<string, any>;
  };
  transition: MotionProps["transition"];
}

const Orb: React.FC<OrbProps> = ({
  positionClasses,
  sizeClass,
  colorClass,
  animationVariants,
  transition,
}) => {
  return (
    <motion.div
      className={clsx(
        "absolute rounded-full blur-xl",
        positionClasses,
        sizeClass,
        colorClass
      )}
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      transition={transition}
    />
  );
};

export default Orb;

export const baseTransition = {
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse" as const,
};
