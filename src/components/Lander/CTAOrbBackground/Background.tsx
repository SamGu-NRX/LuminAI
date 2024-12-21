// OrbBackground.tsx
import { useMemo } from "react";
import Orb, { baseTransition } from "./Orb";

interface OrbConfig {
  id: number;
  positionClasses: string;
  sizeClass: string;
  colorClass: string;
  animationVariants: {
    initial: Record<string, any>;
    animate: Record<string, any>;
  };
  transition: Record<string, any>;
}

const OrbBackground: React.FC = () => {
  // Helper function to generate random delays rounded to two decimal places
  const getRandomDelay = () => parseFloat((Math.random() * 5).toFixed(2));

  // Define orb configurations
  const orbs: OrbConfig[] = useMemo(
    () => [
      {
        id: 1,
        positionClasses: "-top-16 -right-20",
        sizeClass: "w-40 h-40",
        colorClass: "bg-purple-500/40",
        animationVariants: {
          initial: { opacity: 0.2, scale: 1 },
          animate: {
            x: [0, 30, -20, 40, 0],
            y: [0, -25, 15, -35, 0],
            scale: [1, 1.2, 0.8, 1.25, 1],
            opacity: [0.5, 0.6, 0.5, 0.6, 0.5],
          },
        },
        transition: {
          x: {
            duration: 12,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          y: {
            duration: 14,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          scale: {
            duration: 10,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          opacity: {
            duration: 10,
            delay: getRandomDelay(),
            ...baseTransition,
          },
        },
      },
      {
        id: 2,
        positionClasses: "-bottom-20 -left-20",
        sizeClass: "w-40 h-40",
        colorClass: "bg-blue-500/40",
        animationVariants: {
          initial: { opacity: 0.2, scale: 1 },
          animate: {
            x: [0, -25, 35, -20, 0],
            y: [0, 30, -25, 20, 0],
            scale: [1, 0.85, 1.25, 1, 1],
            opacity: [0.5, 0.6, 0.5, 0.6, 0.5],
          },
        },
        transition: {
          x: {
            duration: 10,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          y: {
            duration: 13,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          scale: {
            duration: 11,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          opacity: {
            duration: 11,
            delay: getRandomDelay(),
            ...baseTransition,
          },
        },
      },
      {
        id: 3,
        positionClasses: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        sizeClass: "w-32 h-32",
        colorClass: "bg-indigo-500/40",
        animationVariants: {
          initial: { opacity: 0.1, scale: 1 },
          animate: {
            x: [0, 15, -25, 10, 0],
            y: [0, -15, 25, -10, 0],
            scale: [1, 1.25, 0.75, 1.15, 1],
            opacity: [0.5, 0.6, 0.5, 0.6, 0.5],
          },
        },
        transition: {
          x: {
            duration: 15,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          y: {
            duration: 16,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          scale: {
            duration: 14,
            delay: getRandomDelay(),
            ...baseTransition,
          },
          opacity: {
            duration: 14,
            delay: getRandomDelay(),
            ...baseTransition,
          },
        },
      },
      // Add more orbs
    ],
    []
  );

  return (
    <>
      {orbs.map((orb) => (
        <Orb
          key={orb.id}
          positionClasses={orb.positionClasses}
          sizeClass={orb.sizeClass}
          colorClass={orb.colorClass}
          animationVariants={orb.animationVariants}
          transition={orb.transition}
        />
      ))}
    </>
  );
};

export default OrbBackground;
