# Program History Sources (edu-apps-007, part 1 of 9)

Prepared 2026-10-09. Claims owned: C-01, C-03, C-04, C-15, C-16, C-20, C-22.
Every check in this file was performed on 2026-10-09. All web checks were read-only GET requests (no logins, no writes, no accounts touched).

## Method and conventions

- Classification words are used exactly as defined in the fleet packet: implemented, designed, historical, reported, unverified.
- Verdict convention for this file: "supported" means the cited sources contain the claim as stated. For claims classified reported, supported means Sam's own materials state the figure; it does not mean the figure is independently corroborated. "partially-supported" means sources back part of the claim but not all of it. "unsupported" means no source was found.
- Repo evidence was read in the clone at /home/user/work/edu-apps-007-program-history, branch obv/edu-apps-007--program-history, based on origin/docs/portfolio-entry at commit 533e5a836e9a594242e0115c8e38364e39ee56c7 (matches the packet base 533e5a8).
- Lumin-LMS was cloned read-only (no pushes, no commits, no setup scripts) at /home/user/work/lms-program-history. SHA inspected: 626aad3e5b7bffa9fd20de1a017ce1f9c00b2a91, which matches the lead-pinned SHA.
- Quoted snippets are verbatim except that curly apostrophes in sources are normalized to straight apostrophes.
- LinkedIn content was retrieved through Exa search snippets (LinkedIn blocks full-page fetches); each item says which retrieval form was used.

## Repo facts (recorded only, no founding inference)

- The LuminAI repo has 44 commits as of the base commit.
- Earliest (root) commit: 160b65a3b69f1c8381fe1fbe991751b55fd20ab8, dated 2024-09-20T12:35:31-05:00, subject "Initial commit from Create Next App". Recorded as a repo fact only. It postdates the claimed April 2024 founding and is not used to infer or dispute any founding date.
- Pickaxe over all refs: the string "200+" entered site copy in commits cce656f ("style: add number ticker to CTA") and 034c82e ("feat: add lenis smooth scroll, fix footer"); at the base commit, git grep for "200+" matches only .portfolio/project.md.
- Finding that adjusts the fleet's working theory for this part: the Lumin-LMS README (308 lines at the pinned SHA) contains none of the program-history or impact figures. Grep for 200, countries, capstone, 65, 30, 3.5, co-found, taught, designed, curriculum, nonprofit, CTR returns only generic LMS description lines (README.md:9 and the localhost line README.md:112). Pickaxe -S"200+" and -S"65" over all refs of README.md returns zero commits. For the claims in this file, the in-repo origin is .portfolio/project.md and the marketing-site copy, not the LMS README.
- .portfolio/project.md:2 states the page relationship used throughout this file: "kgu.one builds this project's page from this file (https://kgu.one/projects/luminai)."

## Public source log (all fetched or searched 2026-10-09)

- https://kgu.one/projects/luminai (GET, full fetch): live portfolio page, title "LuminAI, by Sam Gu". Contains "A free AI bootcamp I co-founded, and the course site and grader it runs on.", the date label "Apr 2024", and "Cohorts run past 200 students across more than ten countries, and I mentored over 40 capstone teams." This is Sam's own page (the site renders .portfolio/project.md), so it is Sam-side, not independent.
- https://forms.gle/RYGHkuvyyzgru3Qh9 (GET): resolves. Title: "AI Innovate Scholars Bootcamp - Summer 2024". Body: "Thank you for showing interest in our Summer 2024 bootcamp! Applications have closed but be on the lookout for winter cohort applications (early 2025)!" Program-owned artifact; confirms a Summer 2024 cohort and a planned winter cohort.
- https://discord.com/invite/LuminAI (GET, also curl from the sandbox): the URL resolves with HTTP 200, but the served page is Discord's generic JavaScript shell (og:title "Discord - Group Chat That's All Fun & Games"). A control GET of a deliberately invalid invite also returned HTTP 200, so the status code does not distinguish valid from invalid. Result: the invite URL resolves, but whether the invite is active could not be determined from a read-only GET. Recorded as not determinable, not as confirmation.
- https://lumin-ai.org (GET, curl and full fetch): the domain does not serve verifiable content as of 2026-10-09. curl exits with code 60 (TLS certificate verification failure); the full fetch returned only a "Redirecting..." placeholder.
- https://lumin-ai.org.cutestat.com/ (GET): third-party stats mirror of the program domain. Preserved page title "LuminAI | Free AI & ML Bootcamps for Students" and description "Join LuminAI's free nonprofit AI bootcamps and revolutionize your future." WHOIS as mirrored: Creation Date 2025-01-01T22:55:57Z, registrar CloudFlare, Registrant Organization "LuminAI Bootcamps", Registrant State/Province TX, Country US. Per the packet, the WHOIS creation date is recorded as a domain fact only and is not used as a founding date or as proof of ownership beyond what the record itself says.
- https://deepenrich.com/company/d9f8/luminai-bootcamps-0011exz3f (GET): auto-generated aggregator profile: "Type nonprofit", "Founded 2024", "Company Size 2-10", industry education. The same page shows impossible filler (a "Revenue 25M" line for a free bootcamp), so this source is treated as weak, likely scraped from LinkedIn, and is never the sole basis for a classification.
- https://linkedin.com/in/s-gu (Exa search snippets, retrieved 2026-10-09): "CS @ UT | Researcher | Co-Founder of LuminAI Bootcamps"; role entry "Co-Founder - LuminAI Bootcamps (Current) Apr 2024 - Present"; "Led instruction for 200+ students from 10+ countries."; "LuminAI Bootcamps is a nonprofit organization." Sam-side self-published source on a third-party platform.
- https://linkedin.com/company/luminai-bootcamps (Exa search snippet): "Type: Nonprofit", "Founded Year: 2024", "LuminAI Bootcamps is a nonprofit organization." Organization page; still Sam-side.
- https://www.linkedin.com/posts/jainish-patel-h_are-you-a-high-schooler-and-interested-in-activity-7187279196425977856-B75O (Exa search snippet, post dated 2024-04-20): "join the AI Innovate Scholars Bootcamp! The bootcamp is for students, by students." plus "Deadline is June 15th to apply." and an application link. Third-party post by Jainish Patel (an instructor-adjacent account, not Sam Gu). This is the only independent, dated, public item placing the program's recruiting in April 2024.
- https://www.linkedin.com/in/tiffany-duong-750561309 (Exa search snippet): "LuminAI Student - LuminAI Bootcamps Jun 2024 - Oct 2024 (4 months)"; "AI Learning program taught by college alumnis". Third-party participant record.
- https://www.linkedin.com/in/durdona-a-a6319b284 (Exa search snippet): "LuminAI Summer 2024 AI Innovate Scholars bootcamp winner" and a partially visible candidate count ("out of 1 ...00 candidates"). The number is garbled in the snippet and is not used as a figure.
- https://www.linkedin.com/in/jishnu-ganisetti (Exa search snippet): "Website Developer - LuminAI Bootcamps". Third-party team record.
- https://www.linkedin.com/in/mahinoor-5852642bb (Exa search snippet): "Participated in the LuminAI Bootcamp, where I gained hands-on experience with Deep Learning, Convolutional Neural Networks (CNNs), and deep neural networks." Third-party participant record consistent with the claimed CNN curriculum topic.
- Nonprofit registry checks: web search across IRS Tax Exempt Organization Search pages, GuideStar/Candid, and general registries found no record for "LuminAI Bootcamps". The IRS TEOS tool is a JavaScript app that could not be queried with read-only GET fetches, so absence of a found record is not evidence of absence; recorded as "no public registry record found; direct registry query unavailable".
- Name collisions found and excluded as unrelated to this program: Georgia Tech/KSU "LuminAI" AI dance installation (NSF and ACM papers, research.gatech.edu), luminai.com (AI platform for health system operations), devpost.com/software/luminai (a Feb 2024 project by a University of Waterloo student), "LuminAi Research", "Lumin-AI" (luminaico), luminlearning.org, ilumineducation.com, lucid-education.com. None of these is the bootcamp.

## C-01 nonprofit co-founded 2024-04
- classification: historical
- verdict: partially-supported
- evidence:
  - LuminAI .portfolio/project.md:15 (at 533e5a8): "date: 2024-04"
  - LuminAI .portfolio/project.md:23 (at 533e5a8): "LuminAI is a nonprofit I co-founded in April 2024 that runs free AI bootcamps for high school students."
  - LuminAI README.md:30 (at 533e5a8): "LuminAI is a **nonprofit organization** dedicated to making AI education accessible to all."
  - kgu.one (web, 2026-10-09): "A free AI bootcamp I co-founded, and the course site and grader it runs on." with the date label "Apr 2024"
  - Jainish Patel LinkedIn post (web, snippet, dated 2024-04-20): "join the AI Innovate Scholars Bootcamp! The bootcamp is for students, by students." and "Deadline is June 15th to apply."
  - Sam Gu LinkedIn (web, snippet): "Co-Founder - LuminAI Bootcamps (Current) Apr 2024 - Present"
  - deepenrich.com (web, 2026-10-09): "Type nonprofit" and "Founded 2024"
- sources:
  - https://kgu.one/projects/luminai
  - https://www.linkedin.com/posts/jainish-patel-h_are-you-a-high-schooler-and-interested-in-activity-7187279196425977856-B75O
  - https://linkedin.com/in/s-gu
  - https://deepenrich.com/company/d9f8/luminai-bootcamps-0011exz3f
- notes: Moved out of pure reported because an independent, dated third-party source (the Patel post of 2024-04-20, under the exact program name) places the bootcamp's recruiting in April 2024, and Sam's LinkedIn carries the structured role date "Apr 2024 - Present". Still Sam-attested: the "co-founded" framing, the exact founding month, and nonprofit legal status. No public registry record was found (IRS TEOS could not be queried directly; GuideStar/Candid and general searches returned nothing for "LuminAI Bootcamps"); the only "nonprofit" statements are Sam-side self-descriptions and an aggregator that appears to scrape them. The LuminAI repo's root commit (2024-09-20) is recorded as a repo fact and is not used to infer or dispute founding. Name-collision LuminAI projects were excluded.

## C-03 200+ students across 10+ countries
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:23 (at 533e5a8): "Cohorts reach more than 200 students across more than ten countries, and I've mentored over 40 capstone teams."
  - LuminAI .portfolio/project.md:27 (at 533e5a8): "Students join from more than ten countries"
  - kgu.one (web, 2026-10-09): "Cohorts run past 200 students across more than ten countries, and I mentored over 40 capstone teams."
  - Sam Gu LinkedIn (web, snippet): "Led instruction for 200+ students from 10+ countries."
- sources:
  - https://kgu.one/projects/luminai
  - https://linkedin.com/in/s-gu
- notes: Every source stating the figure is Sam-authored (portfolio file, live portfolio page, LinkedIn). No independent source gives a student or country count. Third-party profiles (Tiffany Duong, Jun-Oct 2024; Durdona A., Summer 2024; Mahinoor) confirm individual students existed and that topics match the claimed curriculum, but provide no totals; Durdona's partially visible candidate count is garbled and is not used. The figure is plausible but only Sam can substantiate it; kept and labeled reported per the packet.

## C-04 mentored 40+ capstone teams
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:23 (at 533e5a8): "I've mentored over 40 capstone teams."
  - LuminAI .portfolio/project.md:27 (at 533e5a8): "I mentored capstone teams through project design, dataset curation and the final presentation."
  - kgu.one (web, 2026-10-09): "I mentored over 40 capstone teams."
- sources:
  - https://kgu.one/projects/luminai
- notes: No public source states a team count. The capstone is a consistent element of the program's public descriptions, and third-party student profiles describe the program, but the 40+ figure rests only on Sam's statements.

## C-15 instructor workload cut about 65%
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:43 (at 533e5a8): "It cut instructor workload by about 65% and lifted completion by about 30%."
- sources:
  - n/a
- notes: Internal program figure. It does not appear in the Lumin-LMS README at the pinned SHA or anywhere in that README's history (pickaxe over all refs returns nothing), and no public source states it. Only Sam can substantiate it; kept and labeled reported.

## C-16 completion lifted about 30%
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:43 (at 533e5a8): "It cut instructor workload by about 65% and lifted completion by about 30%."
- sources:
  - n/a
- notes: Same status as C-15: internal figure, absent from the LMS README and its history, no public source. Only Sam can substantiate it.

## C-20 CTR above 3.5% into sign-ups
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:47 (at 533e5a8): "It has held a click-through rate of more than 3.5% into sign-ups."
- sources:
  - n/a
- notes: Marketing-analytics figure. The site carries analytics instrumentation (commit 4db64ca "feat: optimizing SEO, adding vercel analytics."), but the metric itself is private and no public source can show it. The figure's only home is the portfolio write-up added in 533e5a8. Only Sam can substantiate it.

## C-22 Sam designed and taught the curriculum
- classification: reported
- verdict: supported
- evidence:
  - LuminAI .portfolio/project.md:27 (at 533e5a8): "I designed and taught the six-week curriculum."
  - kgu.one (web, 2026-10-09): "A free AI bootcamp I co-founded, and the course site and grader it runs on."
  - Sam Gu LinkedIn (web, snippet): "Led instruction for 200+ students from 10+ countries."
- sources:
  - https://kgu.one/projects/luminai
  - https://linkedin.com/in/s-gu
- notes: Founder-attested statement. Third-party records are consistent with it but do not name Sam as designer or instructor: Tiffany Duong's profile says "AI Learning program taught by college alumnis", and Mahinoor's describes CNN and deep learning content matching the claimed curriculum. Kept and labeled reported.
