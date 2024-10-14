'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';
import ApplyButton from '../ApplyButton';

export default function CTASection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (ctaRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        ctaRef.current,
        { delay: 0.1 }
      );
    }
  }, []);

  return (
    <section ref={ctaRef} className="mt-8 p-4 text-center">
      <div
        className="transition-all bg-white rounded-lg custom-grid grid-cols-1 mt-8 p-4 shadow-md hover:shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2"
            ref={(el) => {
              if (el) elementsRef.current[1] = el;
            }}>
          Ready to Start Your AI Journey?
        </h2>
        <p className="mb-4"
          ref={(el) => {
            if (el) elementsRef.current[2] = el;
          }}
        >
          Join us for an immersive AI learning experience and be part of the
          future of innovation.
        </p>
        <ApplyButton ref={(el) => {
              if (el) elementsRef.current[3] = el;
            }}
        />
      </div>
    </section>
  );
}
