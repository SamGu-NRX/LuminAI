'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (featuresRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        featuresRef.current,
        { delay: 0.2, start: 'top 80%', ease: 'power3.inOut' }
      );
    }
  }, []);

  const features = [
    {
      title: 'Completely Free',
      content:
        'LuminAI Innovate Scholars is a completely free bootcamp. We believe in providing quality education to everyone without any cost at all.',
    },
    {
      title: 'From Students, For Students',
      content:
        'Our program is created by students who understand the challenges and needs of learning AI. We aim to make AI education accessible to all students.',
    },
    {
      title: 'Non-Profit Organization',
      content:
        'We are a non-profit organization dedicated to spreading knowledge and fostering innovation in the field of artificial intelligence.',
    },
    {
      title: 'Industry-Standard AI',
      content:
        'Our curriculum covers industry-standard AI tools and techniques, ensuring that our students are well-prepared for real-world applications.',
    },
  ];

  return (
    <section
      ref={featuresRef}
      className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all"
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className="custom-grid bg-gray-100 p-4 rounded shadow-md hover:shadow-lg"
          ref={(el) => el && elementsRef.current.push(el)}
        >
          <h3 className="text-xl font-bold">{feature.title}</h3>
          <p>{feature.content}</p>
        </div>
      ))}
    </section>
  );
}
