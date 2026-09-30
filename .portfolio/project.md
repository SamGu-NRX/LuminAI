---
# kgu.one builds this project's page from this file (https://kgu.one/projects/luminai).
# When a change alters what the project does, its results, awards, stack or links,
# update this file in the same change. Rules:
# - Facts only, each one backed by this repo, the resume or a public source.
# - No em dashes and no middle dots.
# - line: at most 120 characters, ending in a period. What someone does or gets,
#   then one mechanism. No adjectives.
# - The body opens with one paragraph of 50 to 80 words, first person: what it is,
#   who used it, the hard part, one fact. The site uses it as the summary.
# - The rest of the body is the full write-up, in plain Markdown (## and ###
#   headings, lists, emphasis, inline code, https links), at most 1,500 words.
title: LuminAI
kind: project
date: 2024-04
line: The AI bootcamp with no tuition. Six weeks of neural networks, vision and NLP for high schoolers, then a capstone.
stack: [Next.js, Supabase, Prisma]
links:
  - label: Code
    href: https://github.com/SamGu-NRX/LuminAI
---

LuminAI is a nonprofit I co-founded in April 2024 that runs free AI bootcamps for high school students. Over six weeks, students work through CNNs, RNNs, OpenCV and NLP, then build a capstone project. Cohorts reach more than 200 students across more than ten countries, and I’ve mentored over 40 capstone teams. I also built the software it runs on: the course site students learn in and the marketing site that brings them in.

## The bootcamp

LuminAI teaches AI to students who wouldn’t pay for a course, so it costs nothing. I designed and taught the six-week curriculum. Students join from more than ten countries, and the course site runs lessons asynchronously, so each student works through them on their own schedule. Students build models with TensorFlow and PyTorch, and the last stretch is a capstone. I mentored capstone teams through project design, dataset curation and the final presentation.

## The course site

To run cohorts that size, I built Lumin LMS in Next.js, Supabase and Prisma. What students and teachers get:

- sessions with video, resources and an exit-ticket quiz at the end of each one;
- assignment uploads in PDF or Word, with a grading view for teachers;
- auto-grading and submission tracking in real time;
- progress tracking and an analytics dashboard;
- student management for teachers, and one place to organize sessions, resources and materials;
- a certificate when you finish;
- a shared question bank, where an AI model rates each question’s difficulty.

The data sits in PostgreSQL behind Prisma, and Supabase handles sign-in.

It cut instructor workload by about 65% and lifted completion by about 30%. Instructors spend that time on teams instead of spreadsheets. The LMS lives in its own repository, [SamGu-NRX/Lumin-LMS](https://github.com/SamGu-NRX/Lumin-LMS).

## The front door

The repository linked on this page is the cohort marketing site, a static Next.js site on Vercel. Its README links the application form for the AI Innovate Scholars Bootcamp and the LuminAI community on Discord. It has held a click-through rate of more than 3.5% into sign-ups.
