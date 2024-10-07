'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';

export default function ExploreAISection() {
  const exploreRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (exploreRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        exploreRef.current,
        { delay: 0.1, start: 'top 80%', ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section ref={exploreRef} className="text-center mt-12 p-4">
      <h2
        className="text-3xl font-bold mb-4"
        ref={(el) => {
          if (el) elementsRef.current[1] = el;
        }}
      >
        Explore AI with Us
      </h2>
      <p 
        ref={(el) => {
          if (el) elementsRef.current[1] = el;
        }}
      >
        Dive deep into the world of Artificial Intelligence with our expert-led
        courses and workshops.
      </p>
      {/* Add more content or images as needed */}
    </section>
  );
}
