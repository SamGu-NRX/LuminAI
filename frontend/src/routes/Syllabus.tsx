import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import getMode from '../utils/getMode';
import { Helmet } from 'react-helmet-async';

import AOS from 'aos';
import 'aos/dist/aos.css';

import '../styles/Syllabus.scss';

export const Route = createFileRoute('/Syllabus')({
  component: Syllabus,
});

function Syllabus() {
  var colorMode = getMode();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div data-scroll-section id='main-container'
      className={(colorMode === "dark") ? "text-white" : "text-black"}
      style={{ backgroundColor: (colorMode === 'dark') ? "#18181B" : "#f3f3f3" }}
    >
      <Helmet>
        <title>LuminAI - Syllabus</title>
      </Helmet>

      <div className="p-4 justify-center text-center"
        style={{ animation: 'textPopIn 0.7s ease-in-out' }}
      >
        <h2 className="text-2xl font-bold mb-4">Bootcamp Syllabus</h2>
        <p>Here you will find the detailed curriculum for our AI bootcamp.</p>
      </div>

      <div className="curriculum-grid">
        <div className="highlights" data-aos="fade-up">
          <h2 className="text-xl font-bold mb-2">Key Highlights</h2>
          <ul>
            <li><strong>Hands-On Learning:</strong> Each week includes practical sessions to build and implement AI models.</li>
            <li><strong>Expert Guidance:</strong> Learn from leading AI experts and guest speakers.</li>
            <li><strong>Real-World Applications:</strong> Discover how AI is applied in various industries.</li>
            <li><strong>Mentorship:</strong> Personalized guidance to help you succeed in your final project.</li>
          </ul>
        </div>

        <div className="week shadow-md" data-aos="fade-right">
          <h2 className="text-xl font-bold mb-2">Week 1: Introduction to AI</h2>
          <ul className="list-disc list-inside">
            <li>Introduction to AI & Neural Networks</li>
            <li>Overview and Hierarchy of Artificial Intelligence</li>
            <li>Machine Learning: finding patterns</li>
            <li>Neural Networks - structured like a human brain</li>
            <li>AI vs AGI</li>
            <li>Basic Programming principles</li>
            <li>Regression</li>
            <li>Supervised vs Unsupervised Learning</li>
            <li>KNNs simulation</li>
            <li>Applications of AI in daily life</li>
          </ul>
        </div>

        <div className="week shadow-md" data-aos="fade-left">
          <h2 className="text-xl font-bold mb-2">Week 2: Convolutional Neural Networks (CNNs)</h2>
          <ul className="list-disc list-inside">
            <li>Basics of Neural Networks</li>
            <li>Basic Linear Algebra + Vector arithmetic</li>
            <li>Comparison: Neural Networks and vectors</li>
            <li>Introduction to Convolutional Neural Networks (CNNS)</li>
            <li>Digit recognition + basic image classification</li>
            <li>CNNs vs RNNs</li>
            <li>Build a simple CNN model for digit recognition (MNIST dataset)</li>
          </ul>
        </div>

        <div className="week shadow-md" data-aos="fade-right">
          <h2 className="text-xl font-bold mb-2">Week 3: Object Detection with YOLOv8</h2>
          <ul className="list-disc list-inside">
            <li>Introduction to Object Detection</li>
            <li>What is object detection?</li>
            <li>Overview of YOLO (You Only Look Once)</li>
            <li>Getting Started with YOLOv8 with ultralytics</li>
            <li>Setting up ultralytics account</li>
            <li>Finding a car dataset</li>
            <li>Train and test a YOLOv8 model on a car dataset (openCV)</li>
            <li>OpenCV calculations (car speed)</li>
          </ul>
        </div>

        <div className="week shadow-md" data-aos="fade-left">
          <h2 className="text-xl font-bold mb-2">Week 4: Audio Classification</h2>
          <ul className="list-disc list-inside">
            <li>Introduction to Audio Classification</li>
            <li>What is audio classification?</li>
            <li>Applications of audio classification</li>
            <li>Preparing Audio Data</li>
            <li>Collecting and preprocessing audio data</li>
            <li>Hands-On Activity</li>
            <li>Build and train an audio classification model</li>
            <li>Audio recording, sampling, and encoding</li>
            <li>Discrete Fourier transforms and their applications</li>
            <li>Pattern recognition in audio data</li>
            <li>UIUC Guest Speaker: ML Research Experience</li>
          </ul>
        </div>

        <div className="week shadow-md" data-aos="fade-right">
          <h2 className="text-xl font-bold mb-2">Weeks 5-6: Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)</h2>
          <ul className="list-disc list-inside">
            <li>Introduction to LLMs</li>
            <li>What are Large Language Models?</li>
            <li>Applications of LLMs</li>
            <li>Introduction to RAG</li>
            <li>What is Retrieval-Augmented Generation?</li>
            <li>How RAG enhances LLMs</li>
            <li>Hands-On Activity</li>
            <li>Build a simple RAG system using an LLM (langchain)</li>
          </ul>
        </div>

        <div className="week grid-cols-1 shadow-md" data-aos="fade-left">
          <h2 className="text-xl font-bold mb-2">Week 7: Check-in (Project Mentorship)</h2>
          <ul>
            <li>Final Project & presentation: show off what you have learned! </li>
          </ul>
        </div>

       
      </div>

      <div className="navigation grid-cols-1 shadow-md mb-2" data-aos="fade-up">
          <h2>Navigate Other Bootcamps:</h2>
          <nav>
            <ul>
              <li><a href="/bootcamp1">AI Bootcamp 1</a></li>
              <li><a href="/bootcamp2">AI Bootcamp 2</a></li>
              <li><a href="/bootcamp3">AI Bootcamp 3</a></li>
            </ul>
          </nav>
        </div>

    </div>
  );
}

export default Syllabus;
