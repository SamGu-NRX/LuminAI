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
        { delay: 0.6, start: 'top 80%', ease: 'power3.inOut' }
      );
    }
  }, []);

  return (
    <section ref={ctaRef} className="mt-8 p-4 text-center">
      <div
        className="transition-all bg-white rounded-lg custom-grid grid-cols-1 mt-8 p-4 shadow-md hover:shadow-lg"
        ref={(el) => el && elementsRef.current.push(el)}
      >
        <h2 className="text-2xl font-bold mb-2">
          Ready to Start Your AI Journey?
        </h2>
        <p className="mb-4">
          Join us for an immersive AI learning experience and be part of the
          future of innovation.
        </p>
        <ApplyButton />
      </div>
    </section>
  );
}
