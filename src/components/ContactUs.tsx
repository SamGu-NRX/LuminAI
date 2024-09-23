import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOSInit from '@/lib/utils/aos';

const ContactSection = () => {

    <AOSInit />

    return (
      <div data-scroll-section className="flex flex-col items-start p-4 bg-black text-white space-y-4 shadow-lg">
        <p className="text-lg text-left">
          <span data-aos="fade-up" data-aos-delay="0">We collaborate with all who </span><br /> 
          <span data-aos="fade-up" data-aos-delay="100">believes in the education of our next generation. </span><br />
          <span className="font-bold" data-aos="fade-up" data-aos-delay="200"> Let&apos;s transform the future of AI together.</span>
        </p>
        <a href="mailto:theluminaiteam@gmail.com" className="flex items-center space-x-2 group">
          <span className="text-lg group-hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-delay="300">
            theluminaiteam@gmail.com
          </span>
          <svg 
            className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white group-hover:bg-transparent transition-all duration-300"></div>

        {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white group-hover:bg-transparent transition-all duration-300"></div> This is the white line that appears on the top of the page */}
      </div>
    );
  };
  
  export default ContactSection;
  