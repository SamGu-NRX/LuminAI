import { WeekModule } from "./syllabus-types";

export const syllabusData: WeekModule[] = [
  {
    id: 1,
    week: 1,
    title: "Introduction to Artificial Intelligence and Neural Networks",
    wittyTitle: "AI 101: From 'Hello World' to 'Hello, AI'",
    subtitle: "Foundations of Modern AI",
    wittySubtitle: "Spoiler: It’s Not About Teaching Robots to Love (Yet!)",
    description:
      "Get ready to unravel the mysteries of machine learning and neural networks in a fun, hands-on way. We’ll cover the groundwork that’s powering everything from your smartphone’s face recognition to Netflix’s recommendations—no Skynet required!",
    duration: "20 hours",
    learningObjectives: [
      {
        title: "AI Fundamentals",
        description:
          "Understanding core AI concepts and their real-world applications",
        topics: [
          "Definition and scope of Artificial Intelligence",
          "Overview and Hierarchy of Artificial Intelligence",
          "Types of Machine Learning",
          "Supervised vs Unsupervised Learning",
          "Basic Neural Network Architecture",
          "Introduction to Deep Learning",
          "Distinguishing AI vs. AGI",
          "Practical Applications of AI in Daily Life",
        ],
      },
      {
        title: "Mathematical Foundations",
        description: "Essential mathematical concepts for AI development",
        topics: [
          "Linear Algebra Basics",
          "Vector Operations",
          "Matrix Mathematics",
          "Basic Statistics and Probability",
          "Calculus Fundamentals",
          "Introduction to Regression and Clustering",
        ],
      },
      {
        title: "Programming Fundamentals",
        description: "Core programming concepts essential for AI development",
        topics: [
          "Fundamental Programming Principles",
          "Abstraction in Programming",
          "Control Structures",
          "Data Types and Structures",
          "Functions and Modules",
        ],
      },
      {
        title: "Machine Learning Basics",
        description:
          "Introduction to key machine learning concepts and algorithms",
        topics: [
          "Understanding Patterns in Data",
          "k-Nearest Neighbors (k-NN) Algorithm",
          "Introduction to Classification and Regression",
          "Evaluating Machine Learning Models",
        ],
      },
    ],
    project: {
      title: "Build Your First Neural Network",
      description:
        "Create a simple neural network from scratch using Python and NumPy to classify handwritten digits—say hello to your first AI creation!",
      objectives: [
        "Implement forward propagation",
        "Calculate loss functions",
        "Perform backpropagation",
        "Train on MNIST dataset",
        "Evaluate model performance",
      ],
      technologies: ["Python", "NumPy", "Matplotlib", "Jupyter Notebook"],
      difficulty: "Beginner",
    },
    resources: [
      {
        title: "Neural Networks from Scratch",
        url: "https://example.com/neural-networks",
        type: "documentation",
        description: "Comprehensive guide to building neural networks",
      },
      {
        title: "Introduction to Machine Learning",
        url: "https://example.com/intro-ml",
        type: "video",
        description: "Video series covering machine learning basics",
      },
      {
        title: "Linear Algebra for Machine Learning",
        url: "https://example.com/linear-algebra-ml",
        type: "article",
        description: "Article explaining key linear algebra concepts for ML",
      },
    ],
  },
  {
    id: 2,
    week: 2,
    title: "Convolutional Neural Networks and Computer Vision",
    wittyTitle: "Teaching Computers to See",
    subtitle: "Advanced Deep Learning Architectures",
    wittySubtitle:
      "Making Machines Judge Your Selfies (So You Can Blame the Algorithm)",
    description:
      "Dive deep into the neural nets that power image recognition, selfie filters, and more. We’ll compare different architectures, train our model to spot objects, and ensure it can find your friend who always hides when it’s time to take a group photo.",
    duration: "25 hours",
    learningObjectives: [
      {
        title: "CNN Architecture",
        description: "Understanding the building blocks of CNNs",
        topics: [
          "Convolutional Layers",
          "Pooling Layers",
          "Activation Functions",
          "Batch Normalization",
          "Transfer Learning",
          "Comparing Neural Networks and Vectors",
          "Understanding Weights & Biases",
        ],
      },
      {
        title: "Computer Vision Fundamentals",
        description: "Core concepts in computer vision",
        topics: [
          "Image Processing Basics",
          "Feature Detection",
          "Object Recognition",
          "Image Segmentation",
          "Real-time Processing",
        ],
      },
      {
        title: "Advanced Neural Network Concepts",
        description:
          "Exploring different types of neural networks and their applications",
        topics: [
          "CNNs vs. RNNs",
          "Training Strategies for CNNs",
          "Loss Functions for Image-based Tasks",
          "Regularization Techniques",
          "Data Augmentation for Computer Vision",
        ],
      },
    ],
    project: {
      title: "Build an Image Classification System",
      description:
        "Implement a CNN-based image classification system using PyTorch to (somewhat) accurately label images, so your computer can finally tell cats and dogs apart.",
      objectives: [
        "Set up a PyTorch environment",
        "Implement a CNN architecture",
        "Train on CIFAR-10 dataset",
        "Implement data augmentation techniques",
        "Evaluate and improve model performance",
      ],
      technologies: ["Python", "PyTorch", "torchvision", "NumPy", "Matplotlib"],
      difficulty: "Intermediate",
    },
    resources: [
      {
        title: "Convolutional Neural Networks Explained",
        url: "https://example.com/cnn-explained",
        type: "video",
        description:
          "In-depth video series on CNN architectures and applications",
      },
      {
        title: "PyTorch Documentation",
        url: "https://pytorch.org/docs/stable/index.html",
        type: "documentation",
        description: "Official PyTorch documentation for deep learning",
      },
      {
        title: "Computer Vision Techniques",
        url: "https://example.com/cv-techniques",
        type: "article",
        description:
          "Comprehensive article on modern computer vision techniques",
      },
    ],
  },
  {
    id: 3,
    week: 3,
    title: "Object Detection with YOLOv8",
    wittyTitle: "YOLO: You Only Look Once (But the AI is Always Watching)",
    subtitle: "Real-time Object Detection",
    wittySubtitle: "Finally, An AI That Can Help You Find Your Keys (Probably)",
    description:
      "Learn how YOLOv8 spots and labels objects in real time with near-magical accuracy. Perfect for everything from self-driving cars to security cams—and yes, maybe even finding your missing stuff.",
    duration: "22 hours",
    learningObjectives: [
      {
        title: "Object Detection Fundamentals",
        description:
          "Understanding the basics of object detection and its challenges",
        topics: [
          "Introduction to Object Detection",
          "Defining Object Detection",
          "Challenges in Object Detection",
          "Evaluation Metrics for Object Detection",
          "Overview of Popular Object Detection Algorithms",
        ],
      },
      {
        title: "YOLO Architecture",
        description: "Deep dive into the YOLO (You Only Look Once) approach",
        topics: [
          "Overview of the YOLO Approach",
          "Evolution from YOLOv1 to YOLOv8",
          "YOLOv8 Architecture Details",
          "Anchor-Free Detection",
          "Multi-Scale Feature Fusion",
        ],
      },
      {
        title: "Practical Implementation",
        description: "Hands-on experience with YOLOv8",
        topics: [
          "Setting Up Ultralytics YOLOv8",
          "Data Preparation for Object Detection",
          "Training YOLOv8 on Custom Datasets",
          "Fine-tuning Pre-trained Models",
          "Deploying YOLOv8 Models",
        ],
      },
    ],
    project: {
      title: "Real-time Car Detection and Speed Estimation",
      description:
        "Develop a system using YOLOv8 and OpenCV to detect cars and estimate their speed. Because who doesn’t want to know how fast the pizza delivery guy is going?",
      objectives: [
        "Set up YOLOv8 environment",
        "Prepare and annotate a car dataset",
        "Train YOLOv8 on the custom car dataset",
        "Implement real-time detection using OpenCV",
        "Develop speed estimation algorithm",
        "Create a user interface for the detection system",
      ],
      technologies: ["Python", "YOLOv8", "OpenCV", "Ultralytics", "NumPy"],
      difficulty: "Advanced",
    },
    resources: [
      {
        title: "YOLOv8 Documentation",
        url: "https://docs.ultralytics.com/",
        type: "documentation",
        description: "Official documentation for YOLOv8 by Ultralytics",
      },
      {
        title: "Object Detection Techniques",
        url: "https://example.com/object-detection",
        type: "video",
        description:
          "Comprehensive video course on modern object detection techniques",
      },
      {
        title: "OpenCV Tutorial",
        url: "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html",
        type: "documentation",
        description:
          "Official OpenCV tutorials for image processing and computer vision",
      },
    ],
  },
  {
    id: 4,
    week: 4,
    title: "Audio Classification and Processing",
    wittyTitle: "Bionic Ears: Teaching AI to Listen (When Nobody Else Does)",
    subtitle: "Sound Analysis and Classification",
    wittySubtitle:
      "Making Machines Understand Your Mumbling Better Than Your Friends Do",
    description:
      "Ever wonder how Siri or Alexa figures out what you just yelled across the room? In this module, we’ll break down how machines process audio signals and learn to classify everything from music genres to random noises.",
    duration: "24 hours",
    learningObjectives: [
      {
        title: "Audio Processing Fundamentals",
        description:
          "Understanding the basics of digital audio and signal processing",
        topics: [
          "Introduction to Digital Audio",
          "Audio Recording, Sampling, and Encoding",
          "Time Domain vs Frequency Domain",
          "Fourier Transforms and Their Applications",
          "Audio Feature Extraction Techniques",
        ],
      },
      {
        title: "Machine Learning for Audio",
        description: "Applying machine learning techniques to audio data",
        topics: [
          "Audio Classification Overview",
          "Preparing Audio Data for ML Models",
          "Feature Engineering for Audio",
          "Deep Learning Architectures for Audio (CNNs, RNNs)",
          "Transfer Learning in Audio Classification",
        ],
      },
      {
        title: "Practical Audio Classification",
        description: "Hands-on experience with audio classification tasks",
        topics: [
          "Dataset Preparation for Audio Classification",
          "Building and Training Audio Classification Models",
          "Evaluating Audio Classification Models",
          "Real-time Audio Classification",
          "Handling Imbalanced Audio Datasets",
        ],
      },
    ],
    project: {
      title: "Multi-class Audio Event Detection System",
      description:
        "Create a model that recognizes multiple environmental sounds in real time. Finally, an AI that knows when someone is crunching chips too loudly in the library!",
      objectives: [
        "Prepare a diverse environmental sound dataset",
        "Implement audio preprocessing and feature extraction",
        "Design and train a deep learning model for audio classification",
        "Develop a real-time audio classification interface",
        "Optimize the model for edge deployment",
        "Evaluate and analyze model performance",
      ],
      technologies: ["Python", "librosa", "TensorFlow", "Keras", "PyAudio"],
      difficulty: "Intermediate",
    },
    resources: [
      {
        title: "Audio Signal Processing for Machine Learning",
        url: "https://example.com/audio-ml",
        type: "video",
        description:
          "Comprehensive course on audio processing for machine learning applications",
      },
      {
        title: "librosa Documentation",
        url: "https://librosa.org/doc/latest/index.html",
        type: "documentation",
        description:
          "Official documentation for the librosa audio processing library",
      },
      {
        title: "Deep Learning for Audio Classification",
        url: "https://example.com/dl-audio",
        type: "article",
        description:
          "In-depth article on applying deep learning to audio classification tasks",
      },
      {
        title: "Audio ML Research Insights",
        url: "https://example.com/audio-ml-research",
        type: "video",
        description:
          "Guest lecture from UIUC researcher on latest audio ML techniques",
      },
    ],
  },
  {
    id: 5,
    week: "5-6",
    title:
      "Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)",
    wittyTitle: "Beyond ‘U Up?’: AI Chatbots That Are Actually Interesting",
    subtitle: "Advanced Natural Language Processing",
    wittySubtitle:
      "Teaching Machines to Write Your Essays (But Don't Tell Your Professor)",
    description:
      "Step into the realm of chatbots and advanced language models that can write poems, debate philosophy, and cite references—just don’t let them do your entire homework unless you want to watch them flex more knowledge than you asked for.",
    duration: "40 hours",
    learningObjectives: [
      {
        title: "Large Language Models Fundamentals",
        description: "Understanding the architecture and capabilities of LLMs",
        topics: [
          "Introduction to Large Language Models",
          "Transformer Architecture Deep Dive",
          "Pre-training and Fine-tuning Strategies",
          "Prompt Engineering Techniques",
          "Ethical Considerations in LLM Development and Use",
        ],
      },
      {
        title: "Retrieval-Augmented Generation",
        description: "Enhancing LLM capabilities with external knowledge",
        topics: [
          "Introduction to Retrieval-Augmented Generation",
          "Vector Databases and Embeddings",
          "Information Retrieval Techniques",
          "Integrating External Knowledge with LLMs",
          "Evaluating RAG Systems",
        ],
      },
      {
        title: "Practical LLM and RAG Implementation",
        description:
          "Hands-on experience with building LLM-powered applications",
        topics: [
          "Setting Up LLM Environments (Hugging Face, OpenAI)",
          "Fine-tuning LLMs on Domain-Specific Data",
          "Building a RAG Pipeline",
          "Optimizing RAG for Accuracy and Efficiency",
          "Deploying LLM-powered Applications",
        ],
      },
    ],
    project: {
      title: "Intelligent Document Q&A System",
      description:
        "Develop a question-answering system that references huge piles of documents—like having your very own AI research assistant on speed dial.",
      objectives: [
        "Set up a vector database for document storage",
        "Implement document ingestion and embedding generation",
        "Integrate an LLM for question understanding and answer generation",
        "Develop a RAG pipeline for accurate information retrieval",
        "Create a user-friendly interface for asking questions",
        "Implement result explanation and source citation features",
      ],
      technologies: [
        "Python",
        "LangChain",
        "Hugging Face Transformers",
        "FAISS",
        "Streamlit",
      ],
      difficulty: "Advanced",
    },
    resources: [
      {
        title: "Hugging Face Transformers Documentation",
        url: "https://huggingface.co/docs/transformers/index",
        type: "documentation",
        description:
          "Official documentation for the Hugging Face Transformers library",
      },
      {
        title: "LangChain Documentation",
        url: "https://python.langchain.com/en/latest/",
        type: "documentation",
        description: "Official documentation for the LangChain framework",
      },
      {
        title: "Building RAG Systems",
        url: "https://example.com/rag-systems",
        type: "video",
        description:
          "In-depth tutorial on building Retrieval-Augmented Generation systems",
      },
      {
        title: "Ethics in AI and Language Models",
        url: "https://example.com/ai-ethics",
        type: "article",
        description:
          "Comprehensive article on ethical considerations in AI and LLM development",
      },
    ],
  },
  {
    id: 6,
    week: 7,
    title: "Project Mentorship and Final Presentations",
    wittyTitle:
      "Final Boss Level: From ‘It’s Alive!’ to ‘I Should Patent This!’",
    subtitle: "Applying Your Skills in Real-World Projects",
    wittySubtitle:
      "Time to Flaunt Your AI Skills (No World Dominations Plans Allowed)",
    description:
      "Capstone time! Bring everything you’ve learned together to solve a real-world problem and show off your creation. Whether it’s a chatbot that complains about Mondays or an app that detects sarcasm (good luck), we’re here to mentor you through it.",
    duration: "30 hours",
    learningObjectives: [
      {
        title: "Project Planning and Management",
        description: "Learn to plan and manage AI projects effectively",
        topics: [
          "Defining Project Scope and Objectives",
          "Choosing Appropriate AI Techniques",
          "Project Timeline and Milestone Planning",
          "Risk Assessment and Mitigation Strategies",
          "Ethical Considerations in AI Projects",
        ],
      },
      {
        title: "Advanced AI Techniques",
        description: "Explore cutting-edge AI techniques for your projects",
        topics: [
          "Ensemble Methods in Machine Learning",
          "Generative AI Applications",
          "Reinforcement Learning Basics",
          "Explainable AI (XAI) Techniques",
          "AI in Edge Computing",
        ],
      },
      {
        title: "Presentation and Communication Skills",
        description:
          "Develop skills to effectively communicate your AI projects",
        topics: [
          "Crafting Compelling AI Project Narratives",
          "Data Visualization for AI Results",
          "Presenting Technical Concepts to Non-Technical Audiences",
          "Creating Engaging AI Demos",
          "Handling Q&A Sessions Effectively",
        ],
      },
    ],
    project: {
      title: "Capstone AI Project",
      description:
        "Identify a real-world problem, solve it with AI, and present your solution like a pro. If your project doesn’t cure boredom or feed your dog, at least it’ll polish your résumé!",
      objectives: [
        "Identify a significant problem that can be addressed with AI",
        "Design and implement an AI solution using appropriate techniques",
        "Collect and preprocess relevant data",
        "Train and optimize your AI model",
        "Develop a user interface or API for your solution",
        "Prepare a professional presentation and demonstration",
        "Document your project thoroughly",
      ],
      technologies: [
        "Python",
        "Choice of ML/DL Frameworks",
        "Data Visualization Tools",
        "Version Control (Git)",
      ],
      difficulty: "Advanced",
    },
    resources: [
      {
        title: "Effective Technical Presentations",
        url: "https://example.com/tech-presentations",
        type: "video",
        description: "Course on delivering impactful technical presentations",
      },
      {
        title: "AI Project Management Best Practices",
        url: "https://example.com/ai-project-management",
        type: "article",
        description: "Comprehensive guide on managing AI projects effectively",
      },
      {
        title: "GitHub Student Developer Pack",
        url: "https://education.github.com/pack",
        type: "github",
        description: "Free developer tools and services for students",
      },
      {
        title: "AI Ethics Guidelines",
        url: "https://example.com/ai-ethics-guidelines",
        type: "documentation",
        description: "Ethical guidelines for AI development and deployment",
      },
    ],
  },
];
