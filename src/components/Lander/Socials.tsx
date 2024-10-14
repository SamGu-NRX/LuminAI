'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';
import Image from 'next/image';

export default function SocialsSection() {
  const socialsRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (socialsRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        socialsRef.current,
        { delay: 0.05, start: 'top 90%', ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section ref={socialsRef} className="p-2 font-spartan">
      <h1
        className="mt-2 mb-6 text-center justify-center text-5xl"
        ref={(el) => {
          if (el) elementsRef.current[1] = el;
        }}
      >
        Follow us on Socials
      </h1>
      <div className="flex flex-wrap items-center justify-center max-w-6xl mx-auto p-2">
        <a
          className="w-1/2 md:w-1/3 lg:w-1/5 px-6 mb-8 mx-2"
          href="https://discord.gg/5fnTFmbhdK"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[2] = el;
          }}
        >
          <Image
            className="mx-auto logo"
            alt="LuminAI Bootcamps Discord"
            src="/brand-assets/discord-logo.svg"
            width={64}
            height={64}
          />
        </a>
        <a
          className="w-1/2 md:w-1/3 lg:w-1/5 px-6 mb-8"
          href="https://instagram.com"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[3] = el;
          }}
        >
          <Image
            className="mx-auto logo"
            alt="LuminAI Bootcamps Instagram"
            src="/brand-assets/instagram-logo.png"
            width={64}
            height={64}
          />
        </a>
        <a
          className="w-1/2 md:w-1/3 lg:w-1/5 px-6 mb-9"
          href="https://www.linkedin.com/company/luminai-bootcamps"
          target="_blank"
          ref={(el) => {
            if (el) elementsRef.current[4] = el;
          }}
        >
          <Image
            className="mx-auto logo scale-95 hover:scale-[112%]"
            alt="LuminAI Bootcamps LinkedIn"
            src="/brand-assets/LinkedIn_Logo.svg.png"
            width={64}
            height={64}
          />
        </a>
      </div>
    </section>
  );
}
