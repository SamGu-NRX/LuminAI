"use client";

import { useEffect, useRef } from "react";
import { fadeUp } from "@/animations/gsap";
import Image from "next/image";

export default function SocialsSection() {
  const socialsRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (socialsRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        socialsRef.current,
        { delay: 0.05, start: "top 90%", ease: "power3.out" },
      );
    }
  }, []);

  return (
    <section
      ref={socialsRef}
      className="mx-auto w-full max-w-[1500px] p-2 font-spartan"
    >
      <h1
        className="mb-6 mt-2 justify-center text-center text-5xl"
        ref={(el) => {
          if (el) elementsRef.current[1] = el;
        }}
      >
        Follow us on Socials
      </h1>
      <div className="mx-auto mt-3 flex max-w-6xl flex-wrap items-center justify-center p-2">
        {/* Make new discord invite link that automatically connects to "Prospective Applicant role" */}
        <a
          className="mx-2 mb-8 w-1/2 px-6 md:w-1/3 lg:w-1/5"
          href="https://discord.gg/5fnTFmbhdK"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[2] = el;
          }}
        >
          <img
            className="logo mx-auto"
            alt="LuminAI Bootcamps Discord"
            src="brand-assets\discord-logo.svg"
          />
        </a>
        <a
          className="mb-8 w-1/2 px-6 md:w-1/3 lg:w-1/5"
          href="https://instagram.com"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[3] = el;
          }}
        >
          <img
            className="logo mx-auto"
            alt="LuminAI Bootcamps Instagram"
            src="brand-assets\instagram-logo.png"
          />
        </a>
        <a
          className="mb-9 w-1/2 px-6 md:w-1/3 lg:w-1/5"
          href="https://www.linkedin.com/company/luminai-bootcamps"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[4] = el;
          }}
        >
          <img
            className="logo mx-auto scale-95 hover:scale-[112%]"
            alt="LuminAI Bootcamps LinkedIn"
            src="brand-assets\LinkedIn_Logo.svg.png"
          />
        </a>
      </div>
    </section>
  );
}
