"use client";

import { useEffect, useRef } from "react";
import { fadeUp } from "@/animations/gsap";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; // Import star icon

export default function TestimonialsSection() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (testimonialsRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        testimonialsRef.current,
        { delay: 0.3 }
      );
    }
  }, []);

  const testimonials = [
    {
      name: "John Doe",
      role: "AI Enthusiast",
      testimonial:
        "LuminAI Bootcamps have truly changed the way I understand AI. The hands-on approach and the support from the community are unparalleled.",
      // image: "/brand-assets/testimonial1.jpg",
      image: false,
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      testimonial:
        "The curriculum is comprehensive and up-to-date with the latest industry trends. Highly recommend to anyone looking to dive into AI.",
      // image: "/brand-assets/testimonial2.jpg",
      image: false,
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
            className="max-w-sm p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            ref={(el) => el && elementsRef.current.push(el)}
            style={{
              background: "rgba(255, 255, 255, 0.4)", // Glassmorphism effect
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="flex items-center mb-4">
              {testimonial.image && typeof testimonial.image === "string" && (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-black">
                  {testimonial.name}
                </h3>
                <p className="text-slate-800">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-slate-900 mb-4">{testimonial.testimonial}</p>
            <div className="flex items-center text-yellow-400">
              {/* Display 5-star rating */}
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}