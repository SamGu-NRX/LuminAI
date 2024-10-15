'use client';

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';
import { Toaster } from 'sonner';
import showNotif from '@/components/ToastNotif';

export default function ContactUsSection() {
  const contactRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (contactRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        contactRef.current,
        { delay: 0.5 }
      );
    }
  }, []);

  return (
    <div ref={contactRef} className="text-center mt-8 p-4">
      <h2
        className="text-3xl font-bold mb-4"
        ref={(el) => el && elementsRef.current.push(el)}
      >
        Contact Us
      </h2>
      <p ref={(el) => el && elementsRef.current.push(el)}>
        Have any questions? We&apos;d love to hear from you!
      </p>
      {/* Contact form or contact information */}
      <Toaster richColors />
      <button
        onClick={() => showNotif('Success! Message sent.', 'success')}
        className="btn mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Show Success Toast
      </button>
      <button
        onClick={() => showNotif('Failed! Message not sent.', 'error')}
        className="btn mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Show Error Toast
      </button>
    </div>
  );
}
