"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

// Define the props for the component
interface FadeInWhenVisibleProps<T extends keyof JSX.IntrinsicElements = "div">
  extends MotionProps {
  children: ReactNode;
  as?: T;
  initial?: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  transition?: MotionProps["transition"];
  viewport?: MotionProps["viewport"];
}

// Create the FadeInWhenVisible component with a generic type
export default function FadeInWhenVisible<
  T extends keyof JSX.IntrinsicElements = "div"
>({
  children,
  as = "div" as T, // Default to 'div' if 'as' is not provided
  initial = { opacity: 0.0, y: 40 },
  whileInView = { opacity: 1, y: 0 },
  transition = { delay: 0.2, duration: 0.7, ease: "easeInOut" },
  viewport = { once: true },
  ...motionProps
}: FadeInWhenVisibleProps<T>) {
  // Use 'as' directly since it's now constrained to valid HTML elements
  const Component = motion(as) as React.ElementType;

  return (
    <Component
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      {...motionProps} // Spread any additional motion props
    >
      {children}
    </Component>
  );
}
