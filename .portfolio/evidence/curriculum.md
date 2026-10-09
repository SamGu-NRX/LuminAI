# LMS Curriculum Evidence

Fleet packet edu-apps-007, part 3 of 9 (curriculum). Checks performed 2026-10-09. Read-only session: no database access, no installs, no external URL fetches, no live-site requests. Lumin-LMS contains setup.sh and setup.bat at the repo root; neither was run.

Commit SHAs read at:
- LuminAI: short 533e5a8 = 533e5a836e9a594242e0115c8e38364e39ee56c7 (branch docs/portfolio-entry base commit for this part)
- Lumin-LMS: short 626aad3 = 626aad3e5b7bffa9fd20de1a017ce1f9c00b2a91 (matches the lead pinned SHA)

Each evidence line cites the repo, file path with line numbers, an exact quoted snippet, and the short SHA defined above. Negative findings are stated in the notes with the exact grep performed.

## Session enumeration, Lumin-LMS src/data/session-content.json at 626aad3

The file defines exactly 6 session objects with sequenceOrder 1 through 6. No other session content source exists in the repo. Every "videoUrl" value is an example.com placeholder. Of the 22 resource entries, 20 point to real external domains and 2 point to example.com placeholders in Session 5. External link liveness was not tested.

| Seq | Title (line) | videoUrl (line) | Resources (lines) |
| --- | --- | --- | --- |
| 1 | Session 1: Introduction to Artificial Intelligence and Neural Networks (5) | example.com placeholder (15) | 4, all real domains (71 to 92) |
| 2 | Session 2: Convolutional Neural Networks and Computer Vision (96) | example.com placeholder (106) | 3, all real domains (162 to 178) |
| 3 | Session 3: Object Detection with YOLOv8 (182) | example.com placeholder (192) | 3, all real domains (247 to 263), includes "OpenCV Tutorial" (259) |
| 4 | Session 4: Audio Classification and Processing (267) | example.com placeholder (277) | 3, all real domains (328 to 344) |
| 5 | Session 5: Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) (349) | example.com placeholder (359) | 5 (415 to 441): 3 real domains, 2 example.com placeholders (434, 439) |
| 6 | Session 6: Project Mentorship and Final Presentations (445) | example.com placeholder (455) | 4, all real domains (511 to 532) |

Each session also carries a description, 5 objectives, and an exitTicket with 7 questions mixing multiple-choice, open-ended, fill-in-the-blank, true-false, and scenario-based types.

The JSON reaches a database only through a manual import script:

- Lumin-LMS src/scripts/import/session-content.ts:17 (at 626aad3): ` * Reads session data from ../../data/session-content.json, upserts a single "AI Innovate Scholars" course,`
- Lumin-LMS src/scripts/import/session-content.ts:28 (at 626aad3): `      title: "AI Innovate Scholars",`
- Lumin-LMS src/scripts/import/session-content.ts:29 (at 626aad3): `      description: "2025 Spring Cohort",`

No npm script in the Lumin-LMS package.json invokes this import script.

## C-02 six-week curriculum: CNNs, RNNs, OpenCV, NLP, capstone

- classification: implemented
- verdict: partially-supported
- evidence:
  - Lumin-LMS src/data/session-content.json:3 (at 626aad3): `"sequenceOrder": 1,`
  - Lumin-LMS src/data/session-content.json:444 (at 626aad3): `"sequenceOrder": 6,`
  - Lumin-LMS src/data/session-content.json:96 (at 626aad3): `"Session 2: Convolutional Neural Networks and Computer Vision",`
  - Lumin-LMS src/data/session-content.json:182 (at 626aad3): `"Session 3: Object Detection with YOLOv8",`
  - Lumin-LMS src/data/session-content.json:349 (at 626aad3): `"Session 5: Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)",`
  - Lumin-LMS src/data/session-content.json:445 (at 626aad3): `"Session 6: Project Mentorship and Final Presentations",`
  - Lumin-LMS src/data/session-content.json:473 (at 626aad3): `"Reflect on a major challenge you faced during your capstone project and how you overcame it."`
  - Lumin-LMS src/data/session-content.json:259 (at 626aad3): `"title": "OpenCV Tutorial",`
  - Lumin-LMS src/data/session-content.json:261 (at 626aad3): `"link": "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html"`
  - Lumin-LMS src/data/session-content.json:15 (at 626aad3): `"videoUrl": "https://www.example.com/sessions/session-1/video.mp4",`
  - Lumin-LMS src/data/session-content.json:434 (at 626aad3): `"link": "https://example.com/rag-systems"`
  - LuminAI src/components/Lander/CurriculumOverview.tsx:54 (at 533e5a8): `"Convolutional Neural Networks (CNNs)",`
  - LuminAI src/components/Lander/CurriculumOverview.tsx:56 (at 533e5a8): `"Natural Language Processing (NLP)",`
  - LuminAI src/components/Lander/CurriculumOverview.tsx:57 (at 533e5a8): `"Reinforcement Learning (RL)",`
  - LuminAI src/components/Lander/CurriculumOverview.tsx:66 (at 533e5a8): `"Understanding Large Language Models (LLMs)",`
  - LuminAI src/components/Lander/CurriculumOverview.tsx:131 (at 533e5a8): `Our comprehensive AI curriculum covers both programming` (the sentence continues on lines 132 to 133: `frameworks and mathematical foundations essential for AI` `development.`)
- sources:
  - https://github.com/SamGu-NRX/Lumin-LMS
  - https://github.com/SamGu-NRX/LuminAI
- notes: Classification is implemented because six sessions of substantive curriculum content (descriptions, objectives, exit tickets, resources) exist at the pinned commit; this is not placeholder scaffold text. Verdict is partially-supported because of topic gaps. (1) RNNs: grep -rni "recurrent\|RNN" across Lumin-LMS src and prisma returned zero hits at 626aad3, so no session covers recurrent networks. (2) OpenCV: appears only as a Session 3 resource link, never as a session topic or objective. (3) NLP: the literal term appears nowhere in Lumin-LMS (grep -rni "natural language\|NLP", zero hits); the closest content is Session 5 on LLMs and RAG, while the site overview lists "Natural Language Processing (NLP)" and "Understanding Large Language Models (LLMs)" as separate items. (4) "Six weeks": the word "week" appears nowhere in Lumin-LMS src or prisma (grep -rni "\bweek", zero hits); six sessions with sequenceOrder 1 to 6 is the only basis, and one session per week is an interpretation, not a stated fact in the code. (5) All six videoUrl values are example.com placeholders (lines 15, 106, 192, 277, 359, 455), and Session 5 carries two example.com resource links (434, 439); the remaining 20 resource links point to real external domains (YouTube, Coursera, PyTorch docs, OpenCV docs, librosa, TensorFlow, Hugging Face, LangChain, Forbes, GitHub Education); link liveness was not tested. (6) The content reaches a database only via the manual import script, which no npm script invokes; no database could be inspected, so deployment of this content is not verifiable from GitHub. (7) Site mismatch: the site overview promises Reinforcement Learning (RL) (line 57), which has no session anywhere in the LMS content, and never mentions RNNs, OpenCV, YOLOv8, audio, or a capstone; the project.md line 23 wording "CNNs, RNNs, OpenCV and NLP" overstates RNN and OpenCV coverage relative to both the LMS content and the site's own curriculum list.

## C-21 async self-paced student learning

- classification: implemented
- verdict: supported
- evidence:
  - Lumin-LMS prisma/schema.prisma:132 (at 626aad3): `model SessionProgress {`
  - Lumin-LMS prisma/schema.prisma:136 (at 626aad3): `isCompleted  Boolean   @default(false)`
  - Lumin-LMS prisma/schema.prisma:138 (at 626aad3): `lastAccessedAt DateTime @default(now())`
  - Lumin-LMS prisma/schema.prisma:144 (at 626aad3): `@@unique([studentId, sessionId])`
  - Lumin-LMS prisma/schema.prisma:93 (at 626aad3): `videoUrl             String?`
  - Lumin-LMS src/components/sessions/VideoPlayer.tsx:18 (at 626aad3): ` * @param onComplete - Optional callback invoked once when playback reaches 90% of the video's duration.`
  - Lumin-LMS src/app/sessions/[id]/page.tsx:18 (at 626aad3): ` * Fetches the current user and session data, initializes progress state (video completed, exit ticket completed, discussion unlocked),`
  - Lumin-LMS src/app/sessions/[id]/page.tsx:175 (at 626aad3): `<span className="text-sm">Video completed</span>`
  - Lumin-LMS src/app/dashboard/page.tsx:70 (at 626aad3): `progress = await db.sessionProgress.findMany({`
  - Lumin-LMS src/app/dashboard/page.tsx:121 (at 626aad3): `completed: progress.length,`
  - LuminAI .portfolio/project.md:27 (at 533e5a8): `the course site runs lessons asynchronously, so each student works through them on their own schedule.`
- sources:
  - https://github.com/SamGu-NRX/Lumin-LMS
- notes: Progress is tracked per student per session (unique pair of studentId and sessionId). The dashboard computes course progress by counting that student's sessionProgress rows and picks the next session lacking a progress row (dashboard/page.tsx line 119 comment). Completion is driven by the student's own video playback (90 percent callback) and exit ticket, not by any scheduled event. Negative finding: grep -rni "zoom\|webinar\|meeting" across Lumin-LMS src and prisma hits only Tailwind animation utility class strings in src/components/ui (no meeting integration of any kind); grep -rni "schedul" hits only one unrelated feature description string at src/data/index.tsx:49. There is no calendar, live session, or cohort scheduling code at 626aad3. isLockedByDefault (prisma/schema.prisma:99, default true) is referenced nowhere in app code, so sequential locking is not enforced in the UI; this does not affect the async verdict. Caveat: this classifies the LMS code; because the video URLs are placeholders, delivery in a real deployment is not verifiable from GitHub.

## C-05 cross check: LMS stack Next.js, Supabase, Prisma

Record for the part that owns C-05; the packet asked this part to cross check the LMS package.json and record exact lines.

- classification: implemented
- verdict: supported
- evidence:
  - Lumin-LMS package.json:2 (at 626aad3): `"name": "ai-bootcamp-lms",`
  - Lumin-LMS package.json:28 (at 626aad3): `"@prisma/client": "6.1.0",`
  - Lumin-LMS package.json:56 (at 626aad3): `"@supabase/ssr": "^0.5.2",`
  - Lumin-LMS package.json:65 (at 626aad3): `"next": "^14.2.22",`
  - Lumin-LMS middleware.ts:4 (at 626aad3): `import { updateSession } from "@/lib/supabase/middleware";`
- sources:
  - https://github.com/SamGu-NRX/Lumin-LMS
- notes: All three stack components are declared in package.json and wired into app code at 626aad3: the root middleware calls the Supabase session middleware (middleware.ts line 4), src/lib/supabase/client.ts, src/lib/supabase/server.ts, and src/lib/supabase/middleware.ts exist, and src/lib/prisma.ts plus src/actions/auth.ts reference the Prisma client (file-level grep). Final classification and verdict for C-05 belong to its owning part.
