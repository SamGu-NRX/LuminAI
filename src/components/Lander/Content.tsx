import React, { useEffect, useRef, useState } from 'react';
import { fadeUp } from '@/animations/gsap';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AICurriculumSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    if (sectionRef.current) {
      fadeUp(
        elementsRef.current.filter((el) => el !== null),
        sectionRef.current,
        { delay: 0.3, start: 'top 80%', ease: 'power3.inOut' }
      );
    }
  }, []);

  const curriculumItems = [
    {
      title: "Programming Frameworks and Libraries",
      items: [
        'Convolutional Neural Networks (CNNs)',
        'Image Recognition',
        'Natural Language Processing (NLP)',
        'Reinforcement Learning (RL)',
        'Machine Learning Algorithms',
      ]
    },
    {
      title: "Mathematical Foundations",
      items: [
        'Matrices and Basic Linear Algebra',
        'Principles of Neural Networks',
        'Understanding Large Language Models (LLMs)',
      ]
    }
  ];

  return (
    <div ref={sectionRef} className="p-4 max-w-2xl mx-auto">
      <Card className="mt-4 overflow-hidden">
        <CardHeader 
          className="cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle 
            className="flex items-center justify-between"
            ref={(el) => el && elementsRef.current.push(el)}
          >
            AI Curriculum Overview
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </CardTitle>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <p 
              className="mb-4"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              Our comprehensive AI curriculum covers both programming frameworks and mathematical foundations essential for AI development.
            </p>
            {curriculumItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                <h3 
                  className="text-xl font-bold mb-2"
                  ref={(el) => el && elementsRef.current.push(el)}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center space-x-2"
                      ref={(el) => el && elementsRef.current.push(el)}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Button 
              className="mt-4 w-full"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              Explore Full Curriculum
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}