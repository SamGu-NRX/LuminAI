"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import ApplyButton from "../ApplyButton";
import { fadeUp } from "@/animations/gsap";

export default function HeroSection() {
  const glowAnimation = useAnimation();
  const [startTyping, setStartTyping] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setStartTyping(true);
    }, 750);

    const glowTimer = setTimeout(() => {
      glowAnimation
        .start({
          textShadow: ["0 0 0px #62ff62", "0 0 3px #62ff62"],
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        })
        .then(() => {
          glowAnimation.start({
            textShadow: [
              "0 0 3px #62ff62",
              "0 0 20px #62ff62",
              "0 0 3px #62ff62",
            ],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        });
    }, 700);

    // GSAP fadeUp animation
    if (heroRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        heroRef.current,
        { delay: 0.05 }
      );
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(glowTimer);
    };
  }, [glowAnimation]);

  return (
    <div ref={heroRef} className="flex-container p-4 mx-auto items-center">
      <div
        className="overflow-hidden flex flex-col items-center justify-center text-center w-full mx-auto"
        style={{ animation: "textPopIn 0.7s ease-in-out" }}
      >
        <div className="text-4xl md:text-6xl font-bold dark:text-white text-center p-4 max-w-5xl">
          Meet{" "}
          <span
            className="text-blue-600"
            ref={(el) => {
              if (el) elementsRef.current[1] = el;
            }}
          >
            {startTyping && (
              <Typewriter
                words={[
                  "LuminAI Bootcamps.",
                  "cutting-edge research opportunities.",
                  "professionals from prestigious universities.",
                  "the next generation of AI innovators.",
                ]}
                loop={0}
                cursor
                cursorColor="black"
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={70}
                delaySpeed={5000}
              />
            )}
          </span>
        </div>
        <div
          className="transition-shadow text-xl mt-3 mb-1 font-extralight font md:text-3xl dark:text-neutral-200 p-4 max-w-4xl"
          ref={(el) => {
            if (el) elementsRef.current[2] = el;
          }}
        >
          <motion.span animate={glowAnimation} className="font-light">
            Empowering
          </motion.span>{" "}
          the{" "}
          <motion.span animate={glowAnimation} className="font-light">
            next generation
          </motion.span>{" "}
          of AI innovators through{" "}
          <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            free and comprehensive
          </span>{" "}
          bootcamps.
        </div>
      </div>
      <ApplyButton />
    </div>
  );
}
