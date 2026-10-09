# edu-apps-007 part: site-features (LuminAI bootcamp site feature map)

Part 2 of 9, fleet packet edu-apps-007. All checks dated 2026-10-09.

- LuminAI inspected at commit 533e5a836e9a594242e0115c8e38364e39ee56c7 (base of origin/docs/portfolio-entry, called "533e5a8" below), branch obv/edu-apps-007--site-features.
- Lumin-LMS inspected read-only at 626aad3e5b7bffa9fd20de1a017ce1f9c00b2a91 (matches the lead's pin). Nothing was committed, pushed, or opened in Lumin-LMS.
- README.md blob hash at 533e5a8: 9c80b3f4790aea49c04aed0368dbc59e036c7192.
- Web checks were read-only GET requests only, on three public URLs.

## Build checks (2026-10-09, pnpm 9.15.9 via corepack, inside my clone only)

- pnpm install: clean, 4.5s. pnpm-lock.yaml came out unchanged (empty git diff); git checkout -- pnpm-lock.yaml was still run before committing as the brief requires.
- pnpm lint: exit 0, 0 errors, 4 warnings: no-img-element at src/components/Lander/Socials.tsx:44, 58, 72; react-hooks/exhaustive-deps at src/components/ui/hover-border-gradient.tsx:57.
- npx tsc --noEmit: exit 0, no type errors.
- NEXT_TELEMETRY_DISABLED=1 pnpm build: exit 0. Compiled successfully, generated 5 prerendered static pages: / (59.7 kB), /_not-found (876 B), /about (1.64 kB), /faq (4.03 kB), /programs (169 kB), all marked "(Static) prerendered as static content". No missing env var errors: the build needed no next-auth or Supabase variables. Build is NOT blocked-local. No .env file was created and no secrets were added.

## Routed app map (src/app)

The Next.js App Router routes exactly four pages plus not-found, confirmed by the build output:

- / : the lander. src/app/page.tsx:21-62. Renders in order: Navbar (31), Hero (44), Features (45), CurriculumOverview (46), Timeline (47), BootcampShowcase (48), Testimonials (49), CTA (50), ContactUs (52), then Footer (59). ApplicationBanner is imported (8) but its usage is commented out (24-27). ExploreAISection (imported 15, commented usage 51) and SocialsSection (imported 10, commented usage 53) are dormant.
- /about : staff page. src/app/about/page.tsx:13-33 renders StaffSection (25) from src/components/Staff and src/data/staff.ts:4-19, which names three co-founders: "Sam Gu", "Co-Founder & Lead Developer" (4-5); "Aarav Minocha", "Co-Founder & Lead Instructor" (11-12); "Jainish Patel", "Co-Founder & Lead Instructor" (18-19).
- /faq : src/app/faq/page.tsx:12-32 renders FAQ (24) from src/components/FAQ with data in src/data/faq.ts. The FAQ copy describes a purchasable certificate: "you can purchase the optional verified certificate" (faq.ts:91, question at faq.ts:89). Context for C-12, owned by another part.
- /programs : src/app/programs/page.tsx:24-55 renders SyllabusSection (46) from src/components/Syllabus with data in src/data/syllabus.ts. It imports Hero, Features, CurriculumOverview, Testimonials, CTA, ExploreAI, ContactUs and Socials (9-18) but renders none of them except SyllabusSection; those imports are unused.
- layout.tsx: metadata title "LuminAI | Free AI & ML Bootcamps for Students" (58), openGraph url "https://luminaibootcamps.vercel.app" (81), ReactLenis root (111), children wrapped in BannerProvider (115), Vercel Analytics and SpeedInsights rendered (117-118, imported at 11-12).

There is no /apply, /contact, /login, /register or /dashboard route in the routed app. The Navbar's Contact item is commented out (Navbar.tsx:51-52) and the Footer's Contact link is commented out (Footer.tsx:27).

## Lander components (src/components/Lander), line cites at 533e5a8

| Component | What it does and state |
|---|---|
| Hero.tsx (130 ln) | Typewriter headline, words include "LuminAI Bootcamps." (90-93). Renders ApplyButton (import 6, usage 126). |
| ApplyButton.tsx (46 ln) | "Join our AI Revolution" shimmer button (22-26) opens a confirm modal ("You are about to leave LuminAI. Do you want to proceed?", 37), then navigates to https://forms.gle/RaW38zynf2p515Ua8 (14). Live on / via Hero. |
| Features.tsx (195 ln) | Four marketing cards: "Free. As in Zero. Nada." (17), "Hands-On, For Real." (26), "Non-Profit, Not Non-Ambitious" (35), "Built by Students Who Get It" (54). Static copy, no data source. |
| CurriculumOverview.tsx (178 ln) | Static curriculum cards: "Programming Frameworks and Libraries" (52) listing "Image Recognition" (55) and "Machine Learning Algorithms" (58); "Mathematical Foundations" (62) listing "Matrices and Basic Linear Algebra" (64) and "Principles of Neural Networks" (65). |
| Timeline.tsx (135 ln) | Four-week schedule: week 1 "AI Fundamentals" (12-13), week 2 "Computer Vision" (18-19), week 3 "Natural Language Processing" (24-25), week 4 "Reinforcement Learning" (30-31), each with a project. The site shows four weeks while the portfolio line says six weeks (C-02 context, other part). |
| BootcampShowcase.tsx (209 ln) | Module cards "AI Fundamentals" (25), "Neural Networks Deep Dive" (34), "AI in Real-World Applications" (43) with topic chips. |
| Testimonials.tsx (95 ln) | Two hardcoded testimonials: "Diyorbek Komilov", "High School Senior" (33-34); "Jeeval Shah", "Computer Engineering, University Student" (40-41). |
| CTA.tsx (200 ln) | Headline "From Zero to AI Hero" (15). Hardcoded stats: "Completion Rate" 80 (25-26), "Success Stories" 89 (31-32), "First Cohort Attendees" 200 (38-39), each with a jokey tooltip. Fun fact line 51: "Taught by students, not weird, out-of-touch geniuses". These site figures have no source in the repo; the 200 stat is site copy that parallels C-03 (other part). |
| Socials.tsx (81 ln) | Discord https://discord.gg/5fnTFmbhdK (38), Instagram https://instagram.com (52, bare placeholder), LinkedIn https://www.linkedin.com/company/luminai-bootcamps (66). Comment at 35: "Make new discord invite link that automatically connects to 'Prospective Applicant role'". NOT rendered: usage commented out at page.tsx:53. |
| Navbar.tsx (235 ln) | Links: Home "/" (36-37), About Us "/about" (41-42), Programs "/programs" (46-47), FAQ "/faq" (56-57); Contact item commented out (51-52). |
| Footer.tsx (122 ln) | Nav links (24-28, Contact commented at 27); socials Facebook (32), Twitter (33), Instagram (34), LinkedIn (37). Handles differ from the README: footer twitter.com/LuminAIBootcamps vs README "@LuminAI_Bootcamps" (README.md:88); footer linkedin.com/company/LuminAI-Bootcamps vs README "linkedin.com/company/luminai-bootcamps" (README.md:89). |

## Contact components

- Lander/ContactUs.tsx (88 ln), used on / (page.tsx:16, 52) and imported on /programs: "Contact Us" section whose "Get In Touch" button (73-83) has NO onClick, href, or form submit. The button does nothing. No working contact form exists in the routed app.
- ContactUs.tsx at src/components root (39 ln): static section with "mailto:theluminaiteam@gmail.com" (12). Not imported anywhere in the routed app (grep over src/app and src/components, 2026-10-09).
- ContactForm.tsx (216 ln): the entire component is commented out ("// const ContactForm = () => {" at 10, "// export default ContactForm;" at 216). Its only references are commented imports in the parked Inquiry.tsx (src/[to-be-implemented]/Inquiry.tsx:5 and 28).

## ApplicationBanner and context providers

- ApplicationBanner.tsx (85 ln): dismissible top banner; when a link prop is given it renders an "Apply Now" button that navigates to it (58-68). Dormant: usage is commented out in all four pages (page.tsx:24-27, about:16-19, faq:15-18, programs:27-30). The commented usage passed text "Last-minute call for our 2024 summer application!" and link https://forms.gle/RaW38zynf2p515Ua8 (page.tsx:25-26).
- BannerContext.tsx (45 ln): active provider wrapping the whole app (layout.tsx:115). It only tracks banner visibility and height.
- AuthProvider.tsx (96 ln): orphaned. layout.tsx never wraps it, and the only reference in the repo is a commented import in src/components/auth/AuthForm.tsx:10. The auth UI in src/components/auth/ (AuthButtons.tsx, AuthForm.tsx) is rendered by nothing in src/app.

## Parked section: src/[to-be-implemented]/ (18 files)

The directory is literally named "[to-be-implemented]". It is not under src/app, so Next.js does not route it, and a repo-wide grep (2026-10-09, at 533e5a8) finds zero imports of anything inside it from src/app, src/components, src/context, src/utils, src/hooks, src/lib, src/data, or src/schema. Contents: Dashboard (Dashboard.tsx, Sidebar.tsx, TodoList.tsx), Inquiry.tsx, SendEnrollmentLink.tsx, api/auth/[...nextauth]/route.ts, auth/login/page.tsx, auth/register/page.tsx, auth/reset-password/page.tsx, generateEnrollmentLink.ts, services (AuthCallback.ts, api.ts, auth.ts, directus.ts, emailService.ts), utils (db.ts, mail.ts, middleware.ts, tokens.ts). This section is explicitly named to-be-implemented and is not part of the routed app. It is the only place next-auth v5 (package.json dependency 5.0.0-beta.25) is wired.

## public/ assets (site content paths)

- about/: AaravMinocha.jpg, JainishPatel.jpg, SamGu.jpg
- brand-assets/: LinkedIn_Logo.svg.png, discord-logo.svg, instagram-logo.png
- black-luminai-logo.svg, gradient-luminai-logo.svg
- images/: 2024-Summer-1.png, 2024-Summer-2.png, 2024-Summer-3.png, 2024-Summer-4.png, 2024-Summer-5.png

The five 2024 summer photos and three staff headshots are the only photographic content in the repo; the rest are logos.

## .portfolio/project.md screenshot check

Checked 2026-10-09 at 533e5a8: .portfolio/project.md is 47 lines and references no screenshots, images, or .png/.jpg files (grep -in "screenshot|png|jpg|image" over the file returns zero matches). The portfolio page is text and links only.

## README claims that are marketing copy, not implementation

- Nonprofit: README.md:30 "LuminAI is a **nonprofit organization** dedicated to making AI education accessible to all." Marketing copy. No incorporation or registration artifact exists in the repo. The layout keywords repeat "Nonprofit" (layout.tsx:71).
- Why Join Us bullets (README.md:38-41): "Hands-on Experience" (38), "Expert Mentorship" with "Learn from AI professionals and researchers." (39), "Interactive Projects" (40), "Networking Opportunities" (41). Marketing promises with no backing in either repo. The site's own copy cuts against the mentorship framing: "Taught by students, not weird, out-of-touch geniuses" (CTA.tsx:51), and staff.ts lists student co-founders as lead instructors (staff.ts:11-19).
- "How It's Made" tech table (README.md:57-61) claims Node.js, Express.js, Supabase, and Auth.js. package.json has next-auth 5.0.0-beta.25 and @supabase/supabase-js but no express dependency, and all auth code is parked. README.md:63 itself concedes: "Note: This is currently a static site." The build result (four static routes, no env vars needed) is consistent with that.

## C-18 README links apply form

- classification: implemented
- verdict: supported
- evidence:
  - LuminAI README.md:6 (at 533e5a8): "<a href=\"https://forms.gle/RYGHkuvyyzgru3Qh9\" style=\"font-size:1.2em; color:#4F46E5;\">Apply for the AI Innovate Scholars Bootcamp</a>"
  - LuminAI README.md:48 (at 533e5a8): "<a href=\"https://forms.gle/RYGHkuvyyzgru3Qh9\" style=\"font-size:1.5em; color:#4F46E5;\"><strong>👉 Apply Today! 👈</strong></a>"
- sources:
  - https://github.com/SamGu-NRX/LuminAI/blob/docs/portfolio-entry/README.md
  - Liveness, 2026-10-09, read-only GET: https://forms.gle/RYGHkuvyyzgru3Qh9 returns HTTP 200 and redirects to https://docs.google.com/forms/d/e/1FAIpQLScgaqAX1NTQQ9suaPTOWZl6eYvBdHqdf1KbsDMYV-3ixB4EDg/closedform
- notes: The README does link the apply form, at lines 6 and 48. Two gaps for the catalog: (1) as of 2026-10-09 the link resolves to a closed-form page ("closedform" in the final URL), so the hyperlink works but the form is not accepting responses; (2) the site's own apply button uses a different short link, https://forms.gle/RaW38zynf2p515Ua8 (ApplyButton.tsx:14), which on 2026-10-09 resolved to the same underlying form URL. The Lumin-LMS README, inspected read-only at 626aad3e5b7bffa9fd20de1a017ce1f9c00b2a91, contains no forms.gle link at all, so this claim maps to the LuminAI README, not the LMS README. The lead's hint "near line 13" corresponds to the README's video block; the verified locations are lines 6 and 48. Classification note: the claim's subject is the README file itself, so the README is direct evidence of the claim, not marketing backing for a product behavior.

## C-19 README links Discord

- classification: implemented
- verdict: supported
- evidence:
  - LuminAI README.md:87 (at 533e5a8): "- **Discord**: [Join our Discord](https://discord.com/invite/LuminAI)"
- sources:
  - https://github.com/SamGu-NRX/LuminAI/blob/docs/portfolio-entry/README.md
  - Liveness, 2026-10-09, read-only GET: https://discord.com/invite/LuminAI returns HTTP 200
- notes: The README link is present at line 87. Invite validity beyond HTTP 200 was not verifiable (the invite page requires a browser session), so liveness is recorded as "resolves with 200" only. Three Discord references disagree: README.md:87 (discord.com/invite/LuminAI), the dormant Socials component (discord.gg/5fnTFmbhdK, Socials.tsx:38, commented out of the home page at page.tsx:53), and the Lumin-LMS README (line 289, inspected at 626aad3e5b7bffa9fd20de1a017ce1f9c00b2a91), which links bare "https://discord.gg" with no invite code. The footer has no Discord link (Footer.tsx:32-37).

## Gaps

- Whether the Google Form accepts responses was not verifiable: on 2026-10-09 it resolved to a closedform URL, and the form body was not inspected further, keeping web checks to read-only GETs.
- Whether the Discord invite is still valid was not verifiable beyond HTTP 200.
- C-20 (CTR above 3.5%) is owned by another part; noting only that @vercel/analytics is wired in (layout.tsx:11-12 and 117) and no analytics figures exist in the repo.
