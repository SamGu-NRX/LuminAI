import { BookOpen, Clock, BadgeIcon, Code, MessageCircle } from "lucide-react";
import { CategoryType, FAQDataType } from "./faq-types";

export const categories: CategoryType = {
  basics: {
    icon: BookOpen,
    title: "Program Basics",
    questions: [1, 2, 3, 4],
  },
  structure: {
    icon: Clock,
    title: "Structure & Commitment",
    questions: [5, 6, 7],
  },
  certification: {
    icon: BadgeIcon,
    title: "Certification & Credits",
    questions: [8, 9, 10],
  },
  technical: {
    icon: Code,
    title: "Technical Details",
    questions: [11, 12],
  },
  support: {
    icon: MessageCircle,
    title: "Support & More",
    questions: [13, 14],
  },
};

export const faqData: FAQDataType = {
  1: {
    question: "What is the AI Innovate Scholars Bootcamp?",
    answer:
      "The AI Innovate Scholars Bootcamp is our philanthropic gift to humanity (minus the dramatic flair). In simpler terms, it's a free, comprehensive program designed to teach anyone—especially high school and university students—the fundamentals of AI and Machine Learning. We cover real AI topics, like building CNNs, playing with YOLOv8 in OpenCV, and even exploring large language models (the fancy term for the chatbots you love to annoy).",
  },
  2: {
    question: "How much does it cost to enroll?",
    answer:
      "The base program is absolutely free. Yes, you read that right—there's no hidden catch, no locked modules behind a paywall, and certainly no overdue library fees. If cost is your main concern, you can rest easy.",
  },
  3: {
    question: "Wait, so why would I pay for anything?",
    answer:
      "We offer an optional paid verified certificate for those who need something tangible to wave around during important meetings, job interviews, or to show grandma that all those late nights on the computer actually meant something. This verified certificate serves as proof that you successfully completed our online course—a nice perk for your professional or academic portfolio.",
  },
  4: {
    question: "How is the bootcamp structured?",
    answer:
      "Our curriculum is thoughtfully designed and includes: Foundational AI Concepts, CNNs and RNNs, OpenCV + YOLOv8, NLP and LLMs, and Upcoming Advanced Topics. Because the AI realm never stops evolving.",
  },
  5: {
    question: "Who teaches these sessions?",
    answer:
      "LuminAI Bootcamps is made by students, for students. The sessions are created and led by students who survived the AI learning journey themselves. In other words, we know exactly where novices might stumble, and how to make tricky topics less intimidating for beginners. We also host guest speakers from both industry and research realms to share their wisdom (and perhaps some shameless self-promotion).",
  },
  6: {
    question: "What's the commitment level required?",
    answer:
      'We recommend setting aside a modest chunk of time each week (think of it as "Netflix, but you\'re actually learning something new"). Since the bootcamp is project-based, your completed projects will reflect your effort. The more you put in, the more your future AI overlords will reward you.',
  },
  7: {
    question: "Do I need any prior experience?",
    answer:
      'Not necessarily! A basic familiarity with programming (e.g., knowing which side of the keyboard is up) is helpful, but we do our best to get everyone up to speed. If you can google "python install," you\'re halfway there.',
  },
  8: {
    question: "How do I enroll?",
    answer:
      "We make enrollment as painless as possible. Just visit our website, follow the sign-up instructions, and rejoice in the fact that you're joining a community set on making AI accessible to everyone.",
  },
  9: {
    question: "Is there any official academic credit?",
    answer:
      "Our bootcamp itself is not for official academic credit (we're not your university registrar). However, if your institution recognizes external programs, the verified certificate could be a neat addition to your portfolio. Some employers and schools love seeing proven dedication to self-learning.",
  },
  10: {
    question: "What happens after I complete the bootcamp?",
    answer:
      "Upon completion, you'll have the foundational knowledge and hands-on experience to tackle further AI projects, research opportunities, and maybe even contribute to open-source AI frameworks. As for your newly honed AI superpowers, please use them responsibly—world domination is so passé.",
  },
  11: {
    question: "Can I get support if I'm stuck?",
    answer:
      'Absolutely. We have a dedicated community forum and support channels where you can ask questions and help others who are equally "enthusiastic" about debugging. Consider it your personal 24/7 therapy for all AI-related frustrations.',
  },
  12: {
    question: "How do I get the verified certificate?",
    answer:
      'Once you finish all the course requirements, you can purchase the optional verified certificate. Instantly transform yourself from "just another AI dabbler" into "credentialed AI scholar." Impress your employer, your professor, or your cat—whoever is easiest to impress.',
  },
  13: {
    question: "Do you have any other bootcamps or courses?",
    answer:
      "Yes, stay tuned. Our team of AI-savvy ninjas is constantly plotting the next big free course, possibly in reinforcement learning or beyond. We'll keep you posted on the newest developments, but for now, the AI Innovate Scholars Bootcamp is our pride and joy.",
  },
  14: {
    question: "I have more questions. Where do I go?",
    answer:
      'If these FAQs didn\'t address your burning concerns, head over to our contact page, forum, or just shout into the Twitterverse. We promise to respond faster than you can say "hyperparameter tuning."',
  },
};
