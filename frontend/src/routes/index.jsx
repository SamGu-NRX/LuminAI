import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";

import 'aos/dist/aos.css';

import ApplyButton from '../components/ApplyButton';
import '../styles/App.scss';
// import Aos from 'locomotive-aos';

import { Toaster } from 'sonner';
import showNotif from '../components/ToastNotif';
import getMode from '../utils/getMode';
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async';
import ExploreAI from '../components/ExploreAI';
import ContactUs from '../components/ContactUs';

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const colorMode = getMode();

  return (
    <div id="Home">

      {/* <Helmet>
        <title>LuminAI</title>
      </Helmet> */}

      <div
        // className={(colorMode === "dark") ? "text-white" : "text-black"}
        // style={{ backgroundColor: (colorMode === 'dark') ? "#18181B" : "#f3f3f3" }}
      >

      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <section data-scroll-section className='flex-container p-4'>
            <div className="justify-center text-center" style={{ animation: 'textPopIn 0.7s ease-in-out' }}>
              <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                Welcome to LuminAI Bootcamps.
              </div>
              <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                Empowering the next generation of AI innovators through comprehensive bootcamps
              </div>
            </div>
            <ApplyButton className="mb-4" />
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              Debug now
            </button>
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="0" className='p-4'>
            <h2 className="text-2xl font-bold mb-4" >Welcome to Lumin AI Innovate Scholars</h2>

            <p className="mb-4" data-aos-delay="100">Empowering the next generation of AI innovators through comprehensive bootcamps.</p>
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="200" 
          className="p-4 custom-grid grid-cols-1 md:grid-cols-2 gap-4 transition-all">
            <div className="custom-grid bg-gray-100 p-4 rounded shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold">Completely Free</h3>
              <p>Lumin AI Innovate Scholars is a completely free bootcamp. We believe in providing quality education to everyone without any cost at all.</p>
            </div>
            <div className="custom-grid bg-gray-100 p-4 rounded shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold">From Students, For Students</h3>
              <p>Our program is created by students who understand the challenges and needs of learning AI. We aim to make AI education accessible to all students.</p>
            </div>
            <div className="custom-grid bg-gray-100 p-4 rounded shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold">Non-Profit Organization</h3>
              <p>We are a non-profit organization dedicated to spreading knowledge and fostering innovation in the field of artificial intelligence.</p>
            </div>
            <div className="custom-grid bg-gray-100 p-4 rounded shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold">Legitimate Industry Standard AI</h3>
              <p>Our curriculum covers industry-standard AI tools and techniques, ensuring that our students are well-prepared for real-world applications.</p>
            </div>
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="300" className="mt-8 p-4" >
            <h3 className="text-xl font-bold mb-4">Programming Frameworks and Libraries</h3>
            <p>We cover popular programming frameworks and libraries such as PyTorch and TensorFlow, helping you build robust AI models.</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Convolutional Neural Networks (CNNs)</li>
              <li>Image Recognition</li>
              <li>Natural Language Processing (NLP)</li>
              <li>Reinforcement Learning (RL)</li>
              <li>Machine Learning Algorithms</li>
            </ul>
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="400" className="mt-8 p-4">
            <h3 className="text-xl font-bold mb-4">Mathematical Foundations</h3>
            <p>We also cover essential mathematical concepts that are fundamental to AI, including:</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Matrices and Basic Linear Algebra</li>
              <li>Principles of Neural Networks</li>
              <li>Understanding Large Language Models (LLMs)</li>
            </ul>
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="500" className="mt-8 p-4">
            <div className="transition-all bg-white rounded-lg custom-grid grid-cols-1 mt-8 p-4 shadow-md hover:shadow-lg">
              <h2 className="text-xl font-bold mb-2">Join us for an immersive AI learning experience!</h2>
              <p>Explore cutting-edge AI technologies, gain hands-on experience, and be part of the future of innovation.</p>
            </div>

            <div className="text-center mt-12">
              <ApplyButton />
            </div>
          </section>



          {/* <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-xl font-bold mb-2">Get notified when we launch</h2>
            <p>Sign up to receive notifications when we launch.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              data-aos="fade-up"
              data-aos-delay="700"
            />  
          </div> */}

          <section data-scroll-section data-aos="fade-up" data-aos-delay="600" className="text-center mt-12 p-4">
            <ExploreAI />
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="700" className="text-center mt-8 p-4">
            <ContactUs />  
          </section>

          <section data-scroll-section data-aos="fade-up" data-aos-delay="800" className="text-center mt-8 p-4">
            <Toaster richColors />
            <button onClick={() => showNotif('Success! Message sent.', 'success')} className="btn mt-1 p-1 border rounded">
              Show Success Toast
            </button>
            <button onClick={() => showNotif('Failed! Message not sent.', 'error')} className="btn mt-1 p-1 border rounded">
              Show Error Toast
            </button>
          </section>
        </motion.div>
      </AuroraBackground>
      </div>
    </div>
  );
}

export default Home;
