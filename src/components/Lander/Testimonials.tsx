'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';

export default function TestimonialsSection() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (testimonialsRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        testimonialsRef.current,
        { delay: 0.5, start: 'top 80%', ease: 'power3.inOut' }
      );
    }
  }, []);

  const testimonials = [
    {
      name: 'John Doe',
      role: 'AI Enthusiast',
      testimonial:
        'LuminAI Bootcamps have truly changed the way I understand AI. The hands-on approach and the support from the community are unparalleled.',
      image: '/brand-assets/testimonial1.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Data Scientist',
      testimonial:
        'The curriculum is comprehensive and up-to-date with the latest industry trends. Highly recommend to anyone looking to dive into AI.',
      image: '/brand-assets/testimonial2.jpg',
    },
    // Add more testimonials as needed
  ];

  return (
    <section ref={testimonialsRef} className="p-4 mt-8">
      <h2
        className="text-3xl font-bold text-center mb-6"
        ref={(el) => el && elementsRef.current.push(el)}
      >
        What Our Participants Say
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-sm bg-white rounded-lg shadow-md p-6"
            ref={(el) => el && elementsRef.current.push(el)}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-800">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
