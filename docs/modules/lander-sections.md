# Lander Section Components (`src/components/Lander/`)

Part: `lander-sections` · Base commit: `c3b8063468e88c28060e24da1cf37db6a4e4be2a` (main)

All `file:line` references below were measured at the base commit. Working-tree
line numbers have since shifted by the JSDoc blocks added in this branch.

## How these components fit into the site

Seven of the ten files are top-level sections of the home page
(`src/app/page.tsx`), rendered in this order inside the AuroraBackground
wrapper: Hero → **Features** → **CurriculumOverview** → **Timeline** →
**BootcampShowcase** → **Testimonials** → **CTA** → (ExploreAI, commented out)
→ **ContactUs** → (Socials, commented out).

`src/app/programs/page.tsx` imports the same seven sections
(programs/page.tsx:11-21) but renders only `<SyllabusSection />`
(programs/page.tsx:40-44) — those imports are dead (see Inconsistencies #8).

Data flow: **none of the ten files imports from `src/data/`**. All content
(testimonials, stats, curriculum topics, timeline weeks, feature copy) is
hardcoded inline in each component. The `src/data/` modules (`faq.ts`,
`staff.ts`, `syllabus.ts`) are consumed by `src/components/FAQ/`,
`src/components/Staff/`, and `src/components/Syllabus/` instead (verified:
`grep -rn "from \"@/data/" src` — no Lander hits).

Several components accept **no props at all**; the only prop-dr taking
component here is `Orb` (`CTAOrbBackground/Orb.tsx`).

Shared animation helper: `FadeInWhenVisible`
(`src/utils/motion/FadeInWhenVisible.tsx`) is a generic framer-motion wrapper
that fades content up (opacity 0→1, y 40→0) when scrolled into view
(`whileInView`, `viewport={{ once: true }}`) and forwards extra MotionProps
such as `variants` to the underlying `motion.create(as)` element. Note:
`BootcampShowcase.tsx` has no `"use client"` directive of its own — it runs as
a client component only because the pages importing it are `"use client"`.

---

## BootcampShowcase.tsx

**File:** `src/components/Lander/BootcampShowcase.tsx` (209 lines at base)

**What it does.** Interactive carousel of sample bootcamp modules, rendered as
the fifth home-page section (after the Timeline). Shows one module at a time
— a `next/image` cover photo blurred to 30% opacity behind the module title,
a color-coded difficulty pill (green/yellow/red), description, topic chips,
and a play button — with `AnimatePresence` cross-fades between modules.

**Props/data flow.** No props. Module data is the hardcoded
`bootcampModulesData: BootcampModule[]` (BootcampShowcase.tsx:22, three
entries, image paths under `/images/2024-Summer-*.png`). Navigation state is
local `useState` (`currentModuleIndex`, BootcampShowcase.tsx:57).

**Key exports.**
- `BootcampModuleShowcase` — `src/components/Lander/BootcampShowcase.tsx:56`,
  default-exported at :209. Module-private: `BootcampModule` interface :12,
  `bootcampModulesData` :22.

**Importers (grep -rn "BootcampShowcase" src).**
- `src/app/page.tsx:18` — `import BootcampModuleShowcase from "@/components/Lander/BootcampShowcase"`
- `src/app/programs/page.tsx:18` — same import (unused in that page's JSX)

**External libs.** `framer-motion` (motion, AnimatePresence), `next/image`,
`lucide-react` (`Play`); internal: `./ShowcaseNav` (prev/next buttons),
`@/components/ui/button`.

**Known limitations.** The "Start Module" play button's `onClick` body is
only the comment `/* Start Module Logic */` (:185-187) — no action wired.
Leftover TODO at :9 ("add shadow to everything"). The module set is static
sample data, not sourced from `src/data/syllabus.ts`.

**Usage.**

```tsx
import BootcampModuleShowcase from "@/components/Lander/BootcampShowcase";

<BootcampModuleShowcase />
```

---

## CTA.tsx

**File:** `src/components/Lander/CTA.tsx` (200 lines at base)

**What it does.** Final home-page call-to-action card: headline/subheadline/
description copy, three "fun fact" chips, a hover-morphing CTA button
("Hack your future →" slides out, "Level Up for $0 🚀" slides in), and a
three-stat grid (Completion Rate, Success Stories, First Cohort Attendees)
whose values tick up via `NumberTicker` and expose a tooltip on hover. The
whole card sits in a `HoverBorderGradient` frame over the animated orb
backdrop (`OrbBackground`).

**Props/data flow.** No props. Copy and stats come from the module-level
`CTAContent` object (CTA.tsx:14); entrance choreography from the `variants`
object (:57) with staggered children.

**Key exports.**
- `CTASection` — `src/components/Lander/CTA.tsx:78`, default-exported at
  :200. Module-private: `CTAContent` :14, `variants` :57.

**Importers (grep).**
- `src/app/page.tsx:14` — `import CTASection from "@/components/Lander/CTA"`
- `src/app/programs/page.tsx:14` — same import (unused in that page's JSX)

**External libs.** `framer-motion`; internal: `./CTAOrbBackground/Background`,
`../ui/hover-border-gradient`, `../ui/number-ticker`, `../ui/tooltip`
(Tooltip/TooltipContent/TooltipProvider/TooltipTrigger),
`@/utils/motion/FadeInWhenVisible`.

**Known limitations.** The CTA `motion.button` (:140-155) has no `onClick` or
link — it is display-only. A TODO at :26 asks for the stats row to be
reworked (bigger font, split "%" from the value). Commented-out alternate
copy at :18-20 (old description) and :46-51 ("Average Salary" stat) is dead
content.

**Usage.**

```tsx
import CTASection from "@/components/Lander/CTA";

<CTASection />
```

---

## CTAOrbBackground/Background.tsx

**File:** `src/components/Lander/CTAOrbBackground/Background.tsx` (156 lines at base)

**What it does.** Decorative backdrop rendered inside the CTA card: three
blurred color orbs (purple top-right, blue bottom-left, indigo centered) that
drift along framer-motion keyframe paths forever. Each orb's x/y/scale/opacity
animation gets an independent random start delay (0–5 s), so the three loops
drift out of phase.

**Props/data flow.** No props. Orb configs are fixed in a `useMemo`'d array
(Background.tsx:22, empty dependency array — configs, including the random
delays, are computed once per mount); each entry is passed to `Orb` as props.

**Key exports.**
- `OrbBackground` — `src/components/Lander/CTAOrbBackground/Background.tsx:17`,
  default-exported at :156. Module-private: `OrbConfig` interface :5,
  `getRandomDelay` :19.

**Importers (grep -rn "CTAOrbBackground" src).**
- `src/components/Lander/CTA.tsx:3` — `import OrbBackground from "./CTAOrbBackground/Background"`
  (sole consumer)

**External libs.** `react` (`useMemo`); `framer-motion` transitively via `Orb`.

**Known limitations.** The `transition` field of `OrbConfig` is typed
`Record<string, any>` — looser than the `MotionProps["transition"]` that
`Orb` actually expects. Only three orbs exist; the `// Add more orbs`
comment (:113 area) marks where the array was meant to grow. Random delays
are generated per mount, so orb phases differ on every page load.

**Usage.** Not used directly — mounted by `CTA.tsx`:

```tsx
import OrbBackground from "./CTAOrbBackground/Background";

<OrbBackground />
```

---

## CTAOrbBackground/Orb.tsx

**File:** `src/components/Lander/CTAOrbBackground/Orb.tsx` (45 lines at base)

**What it does.** Renders a single blurred, absolutely-positioned circle
(`motion.div` with `rounded-full blur-xl`) animated along a framer-motion
keyframe path. Purely presentational building block for `Background.tsx`.

**Props/data flow.** Takes props (see `OrbProps`, Orb.tsx:6):
`positionClasses`, `sizeClass`, `colorClass` (Tailwind class strings merged
with `clsx`), `animationVariants` (initial/animate keyframe objects), and
`transition` (typed `MotionProps["transition"]`).

**Key exports.**
- `Orb` — `src/components/Lander/CTAOrbBackground/Orb.tsx:17`,
  default-exported at :39.
- `baseTransition` — `src/components/Lander/CTAOrbBackground/Orb.tsx:41`
  (named export): `{ ease: "easeInOut", repeat: Infinity, repeatType:
  "reverse" as const }` — the loop preset every orb property uses.

**Importers (grep).**
- `src/components/Lander/CTAOrbBackground/Background.tsx:3` —
  `import Orb, { baseTransition } from "./Orb";` (sole consumer)

**External libs.** `framer-motion` (motion, MotionProps), `clsx`.

**Known limitations.** `animationVariants` values are `Record<string, any>` —
keyframe shapes are untyped. None beyond that; the component is a small,
focused primitive.

**Usage.**

```tsx
import Orb, { baseTransition } from "./CTAOrbBackground/Orb";

<Orb
  positionClasses="-top-16 -right-20"
  sizeClass="w-40 h-40"
  colorClass="bg-purple-500/40"
  animationVariants={{ initial: { opacity: 0.2, scale: 1 }, animate: { x: [0, 60, 0] } }}
  transition={{ x: { duration: 12, ...baseTransition } }}
/>
```

---

## CurriculumOverview.tsx

**File:** `src/components/Lander/CurriculumOverview.tsx` (178 lines at base)

**What it does.** Second home-page content section: an expandable
"AI Curriculum Overview" accordion card. Clicking the header (chevron rotates
180°) animates open a panel with an intro paragraph, two curriculum groups
("Programming Frameworks and Libraries", "Mathematical Foundations") whose
list items cascade in, and a full-width "Explore Full Curriculum" button that
routes to `/programs`.

**Props/data flow.** No props. Topics are the inline `curriculumItems` array
(CurriculumOverview.tsx:50) — note it does **not** read
`src/data/syllabus.ts`. Expansion state is local `useState`
(`isExpanded`, :32); navigation via `useRouter().push("/programs")` (:33,
:167).

**Key exports.**
- `AICurriculumSection` —
  `src/components/Lander/CurriculumOverview.tsx:31` (default export).
  Module-private: `containerVariants` :11, `itemVariants` :22,
  `curriculumItems` :50.

**Importers (grep -rn "CurriculumOverview" src).**
- `src/app/page.tsx:12`
- `src/app/programs/page.tsx:12` (unused in that page's JSX)

**External libs.** `framer-motion` (motion, AnimatePresence),
`lucide-react` (ChevronDown, ChevronUp), `next/navigation` (useRouter);
internal: `@/utils/motion/FadeInWhenVisible`.

**Known limitations.** The planned GSAP entrance was abandoned mid-build:
TODO at :35 and a fully commented-out `useRef`/`useEffect`/`fadeUp` block at
:37-49 remain as dead scaffolding (the now-unused `fadeUp`/`useEffect`/
`useRef` imports were removed in this branch). Redundant restating comments
at :5 (`// Import useRouter from next/navigation`) and :33
(`// Initialize router`). Curriculum topics differ from the fuller syllabus
shown on `/programs`.

**Usage.**

```tsx
import AICurriculumSection from "@/components/Lander/CurriculumOverview";

<AICurriculumSection />
```

---

## Features.tsx

**File:** `src/components/Lander/Features.tsx` (195 lines at base)

**What it does.** First content section of the home page: a bento-style grid
of four feature tiles ("Free. As in Zero. Nada.", "Hands-On, For Real.",
"Non-Profit, Not Non-Ambitious", "Built by Students Who Get It") with
gradient icon discs, plus a centered "Start Your AI Journey Now!" button
below the grid. Tiles reveal a full-width `TransitionLink` footer on hover.

**Props/data flow.** No props. Feature copy lives in the inline `features`
array (Features.tsx:15); each entry carries its `react-icons` element,
gradient color classes, `linkText`, and `link`. `getColSpanClass` (:64)
assigns asymmetric `md:col-span-6 lg:col-span-8/4` spans by row parity.
`FeatureCard` (:86) manages per-tile `isHovered` state for the icon
scale/rotate effect.

**Key exports.**
- `LuminAIFeatures` — `src/components/Lander/Features.tsx:146`,
  default-exported at :195. Module-private: `features` :15,
  `getColSpanClass` :64, `Feature` interface :77, `FeatureCard` :86.

**Importers (grep).**
- `src/app/page.tsx:11` — `import FeaturesSection from "@/components/Lander/Features"`
- `src/app/programs/page.tsx:11` — same import (unused in that page's JSX)

**External libs.** `framer-motion`, `react-icons/fa` (FaGraduationCap,
FaHeart, FaLayerGroup), `react-icons/io5` (IoBuild); internal:
`@/utils/motion/FadeInWhenVisible`, `@/utils/TransitionLink`.

**Known limitations.** Two cards link to `"#"` (Features.tsx:20 "Learn More",
:57 "Discover How") — placeholder hrefs. The bottom "Start Your AI Journey
Now!" button (:187) has no `onClick` or link. A commented-out fifth feature
("Real Tools. Real Skills.", :38-45) is dead content; its `FaRobot` import
was removed in this branch. `Feature.icon` holds JSX elements in a data
array rather than component references.

**Usage.**

```tsx
import FeaturesSection from "@/components/Lander/Features";

<FeaturesSection />
```

---

## Testimonials.tsx

**File:** `src/components/Lander/Testimonials.tsx` (95 lines at base)

**What it does.** "What Our Participants Say" section: two testimonial cards
in an `md:grid-cols-2` grid, each with an initials avatar, name, role, and
quote, staggered in via the shared `FadeInWhenVisible` container variants and
lifting slightly on hover.

**Props/data flow.** No props. Testimonials are the inline `testimonials`
array (Testimonials.tsx:31) with two real entries (Diyorbek Komilov, Jeeval
Shah) plus hardcoded `initials` for the avatar.

**Key exports.**
- `TestimonialsSection` — `src/components/Lander/Testimonials.tsx:30`
  (default export). Module-private: `containerVariants` :9, `itemVariants`
  :21.

**Importers (grep).**
- `src/app/page.tsx:13` — `import TestimonialsSection from "@/components/Lander/Testimonials"`
- `src/app/programs/page.tsx:13` — same import (unused in that page's JSX)

**External libs.** `framer-motion`; internal:
`@/utils/motion/FadeInWhenVisible`.

**Known limitations.** Only two testimonials, hardcoded; cards are keyed by
array `index`. Card layout depends on an even count for the 2-column grid.

**Usage.**

```tsx
import TestimonialsSection from "@/components/Lander/Testimonials";

<TestimonialsSection />
```

---

## Test_alt.tsx

**File:** `src/components/Lander/Test_alt.tsx` (95 lines at base)

**What it does.** An alternate testimonial section: placeholder-named entries
("John Doe", "Jane Smith") in glassmorphism cards (inline
`background`/`backdropFilter`/`border` styles), each with a five-star
`FaStar` row and optional avatar images (the `image` field is `false` for
both entries, so the `next/image` avatar never renders). Animation is a GSAP
scroll-triggered `fadeUp` over collected element refs instead of
framer-motion.

**Props/data flow.** No props. Data is an inline `testimonials` array
(Test_alt.tsx:22). Element refs accumulate in `elementsRef`
(:10) via ref callbacks (:47, :58) and are fed to
`fadeUp` from `@/utils/animations/gsap` in a mount-time `useEffect` (:12-19).

**Key exports.**
- `TestimonialsSection` — `src/components/Lander/Test_alt.tsx:8` (default
  export). **Same export symbol as `Testimonials.tsx:30`** — only one of the
  two can be imported under a given name in a page, and nothing imports this
  file at all.

**Importers (grep -rn "Test_alt" src).** **None.** No file under `src/`
imports `Test_alt` — the only matches for the string are the filename
itself. Confirmed unused at the base commit.

**External libs.** `gsap` (via `@/utils/animations/gsap`), `next/image`,
`react-icons/fa` (FaStar).

**Known limitations.** Dead file — kept as a variant, per repo convention
nothing references it. The ref-callback pattern (:47, :58) pushes to
`elementsRef.current` on every mount and ignores `null` on unmount, so any
re-mount would append duplicate elements (double-staggered animations).
Placeholder testimonial copy; stars are hardcoded to five.

**Usage.** No usage exists. If ever adopted:

```tsx
import TestimonialsSection from "@/components/Lander/Test_alt";

<TestimonialsSection />
```

---

## Timeline.tsx

**File:** `src/components/Lander/Timeline.tsx` (135 lines at base)

**What it does.** Third content section: "Your AI Journey" — a vertical
center-line timeline of four weekly entries (AI Fundamentals, Computer
Vision, NLP, Reinforcement Learning), each with a week badge, title,
description, and a highlighted "Project:" callout. Cards sit alternately
left/right of the line (row / row-reverse, plus the odd-row overlap via
`md:mt-[-6rem]`), and slide in from their side when scrolled into view.

**Props/data flow.** No props. Weeks come from the inline `timelineData`
array (Timeline.tsx:10) — not from `src/data/syllabus.ts`. Each
`TimelineItem` (:64) uses `useInView` from `react-intersection-observer`
(:71, `triggerOnce: true`, threshold 0.1) to trigger its framer-motion
entrance; `cn` from `@/lib/shadcn/utils` merges the overlap class.

**Key exports.**
- `Timeline` — `src/components/Lander/Timeline.tsx:37`, default-exported at
  :135. Module-private: `timelineData` :10, `TimelineItem` :64.

**Importers (grep).**
- `src/app/page.tsx:19` — `import Timeline from "@/components/Lander/Timeline"`
- `src/app/programs/page.tsx:21` — same import (unused in that page's JSX)

**External libs.** `framer-motion`, `react-intersection-observer`;
internal: `@/lib/shadcn/utils` (cn), `@/utils/motion/FadeInWhenVisible`.

**Known limitations.** The slide distances are hardcoded pixel offsets
(`x: -360 → -300` / `360 → 300`, Timeline.tsx:76-77) rather than animating to
`x: 0` — the resting offset that produces the alternating layout is coupled
to those magic numbers. Week content is a static summary that can drift from
the real syllabus on `/programs`. Cards keyed by array `index`.

**Usage.**

```tsx
import Timeline from "@/components/Lander/Timeline";

<Timeline />
```

---

## ContactUs.tsx

**File:** `src/components/Lander/ContactUs.tsx` (88 lines at base)

**What it does.** Last home-page section: a centered "Contact Us" card with a
"Business Inquiry" blurb and a gradient pill "Get In Touch" button (send icon
left, arrow that nudges right on hover). The card scales slightly on hover
and sits over a blurred backdrop layer.

**Props/data flow.** No props. Entirely static copy inline in the JSX;
entrances use the module-level `containerVariants`/`itemVariants`
(ContactUs.tsx:8, :20) passed through `FadeInWhenVisible` and
`motion.*` `variants`.

**Key exports.**
- `ContactUsSection` — `src/components/Lander/ContactUs.tsx:29` (default
  export).

**Importers (grep).**
- `src/app/page.tsx:16` — `import ContactUsSection from "@/components/Lander/ContactUs"`
- `src/app/programs/page.tsx:16` — same import (unused in that page's JSX)

**External libs.** `framer-motion`, `lucide-react` (Send, ArrowRight);
internal: `@/utils/motion/FadeInWhenVisible`.

**Known limitations.** The "Get In Touch" button (:81 area) has no `onClick`,
link, or mailto — display-only. The TODO at :78 records that the intended
color transition doesn't work (`// TODO: transition colors doesn't work`).

**Usage.**

```tsx
import ContactUsSection from "@/components/Lander/ContactUs";

<ContactUsSection />
```

---

## Inconsistencies found

Evidence for each item was gathered with `grep -rn` / `grep -n` at the base
commit unless noted. Items marked **FIXED** were corrected in this branch;
items marked **REPORT ONLY** were left untouched (not owned, or a
rename/delete would be required).

1. **`Test_alt.tsx` is an unused file — REPORT ONLY (per task instruction, not
   deleted).** `grep -rn "Test_alt" src` returns zero importers; its default
   export `TestimonialsSection` (Test_alt.tsx:8) duplicates the export name
   of `Testimonials.tsx:30`, making the filename the only distinguishing
   signal. It is a GSAP-based alternate with placeholder content ("John
   Doe"/"Jane Smith"). Candidate for deletion in a dedicated cleanup.

2. **Unused imports in six owned files — FIXED** (import-line-only edits):
   - `BootcampShowcase.tsx:4` — `ChevronLeft`, `ChevronRight` imported from
     `lucide-react`, never referenced (prev/next chevrons live in
     `ShowcaseNav.tsx`).
   - `BootcampShowcase.tsx:7` — `FadeInWhenVisible` imported, never
     referenced (section has its own `motion.div whileInView`).
   - `CTA.tsx:1` — `useState` imported, never referenced.
   - `CurriculumOverview.tsx:3` — `useEffect`, `useRef` imported, referenced
     only inside the commented-out GSAP block (:37-49).
   - `CurriculumOverview.tsx:6` — `fadeUp` imported, referenced only in a
     comment (:35) and commented code (:42).
   - `Features.tsx:9` — `FaRobot` imported, referenced only in the
     commented-out feature block (:49).
   - `Testimonials.tsx:3` — `useState`, `useRef` imported, never referenced.
   - `Testimonials.tsx:5` — `Quote` imported, never referenced (avatars are
     initials in a span, not a quote icon).
   - `Timeline.tsx:7` — `FadeInFromLeft` imported, never referenced (cards
     slide via `motion.div x` + `useInView`).

3. **Non-functional buttons in owned files — REPORT ONLY** (fixing them needs
   product decisions about destinations):
   - `BootcampShowcase.tsx:185-187` — "Start Module" play button, `onClick`
     body is only `/* Start Module Logic */`.
   - `CTA.tsx:140-155` — primary CTA button ("Hack your future →") has no
     `onClick` or `href`.
   - `Features.tsx:187` — "Start Your AI Journey Now!" button has no
     `onClick` or link.
   - `ContactUs.tsx:81` — "Get In Touch" button has no `onClick`/mailto;
     TODO at :78 also notes its color transition doesn't work.

4. **Placeholder links — REPORT ONLY.** `Features.tsx:20` ("Learn More") and
   `Features.tsx:57` ("Discover How") point at `"#"`, feeding
   `TransitionLink href="#"` at :135.

5. **Dead commented-out content in owned files — REPORT ONLY** (kept to
   preserve author intent; removal is a safe follow-up):
   - `CTA.tsx:18-20` alternate description copy; `CTA.tsx:46-51` commented
     "Average Salary" stat.
   - `Features.tsx:38-45` commented-out fifth feature ("Real Tools. Real
     Skills.").
   - `CurriculumOverview.tsx:35` TODO + `:37-49` commented GSAP
     `useRef`/`useEffect`/`fadeUp` block — the abandoned animation approach.

6. **Open TODOs in owned files — REPORT ONLY.** `BootcampShowcase.tsx:9`
   ("add shadow to everything"), `CTA.tsx:26` (stats typography rework),
   `ContactUs.tsx:78` (broken color transition), `CurriculumOverview.tsx:35`
   (GSAP fadeUp never implemented).

7. **Redundant restating comments — REPORT ONLY.**
   `CurriculumOverview.tsx:5` (`// Import useRouter from next/navigation`)
   and `:33` (`// Initialize router`) restate the adjacent code;
   `Test_alt.tsx:6` (`// Import star icon`) likewise.

8. **Dead Lander imports on `/programs` — REPORT ONLY (not an owned file).**
   `src/app/programs/page.tsx:11-21` imports seven Lander sections
   (FeaturesSection, AICurriculumSection, TestimonialsSection, CTASection,
   ContactUsSection, BootcampModuleShowcase, Timeline) but renders only
   `<SyllabusSection />` (:40-44); the file's first line
   (`/* eslint-disable @typescript-eslint/no-unused-vars */`) silences the
   warnings those imports would raise. In practice all seven Lander sections
   render only on the home page.

9. **Inline magic style workaround — REPORT ONLY.**
   `BootcampShowcase.tsx:105` applies `style={{ top: "5px" }}` with the
   comment "Adjust vertical alignment since the h2 component is not
   vertically centered" — a fragile pixel-nudge instead of flex alignment.

10. **Timeline slide offsets are magic numbers — REPORT ONLY.**
    `Timeline.tsx:76-77` animate `x` from ±360 to ±300 instead of to 0; the
    ±300 resting offset is load-bearing for the alternating card layout, so
    any container-width change silently breaks centering.

11. **Untyped animation configs — REPORT ONLY.** `Orb.tsx:8-11`
    (`animationVariants: Record<string, any>`) and `Background.tsx:13-15`
    (`transition: Record<string, any>`) bypass framer-motion's `MotionProps`
    typing; `Background.tsx` also hand-rolls its own config type instead of
    reusing `OrbProps`.

## Fixes made in this branch

Comment-only and import-only changes; no renames, deletions, formatting
runs, or dependency changes:

- Added TSDoc to all 11 exported symbols that lacked one:
  `BootcampModuleShowcase`, `CTASection`, `OrbBackground`, `Orb`,
  `baseTransition`, `AICurriculumSection`, `LuminAIFeatures`,
  `TestimonialsSection` (Testimonials.tsx), `TestimonialsSection`
  (Test_alt.tsx), `Timeline`, `ContactUsSection`.
- Removed the nine provably-unused imports listed in Inconsistency #2.

## Verification

Run on the branch after all edits (pnpm 9.15.9, Node 20):

| Command | Result |
| --- | --- |
| `pnpm lint` | exit 0 — same pre-existing warnings as base (all in unowned files: `@next/next/no-img-element` in another module, `react-hooks/exhaustive-deps` in `src/components/ui/hover-border-gradient.tsx:57:6`) |
| `npx tsc --noEmit` | exit 0 |
| `pnpm build` (`next build`) | exit 0 — 8/8 static pages generated, same route table as base |

All three checks were also run on the clean base commit before editing:
lint exit 0, tsc exit 0, build exit 0 — no baseline failures existed.
