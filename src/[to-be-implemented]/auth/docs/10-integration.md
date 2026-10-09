# Auth Module Integration — how `src/[to-be-implemented]/auth` connects to the rest of the repo

> Verification basis: `main` at commit `c3b8063468e88c28060e24da1cf37db6a4e4be2a` ("chore: remove unnecessary console logs, add footer to non-lander pages"), read in full this session with `cat -n` / `grep -rn` per claim. Paths containing `[to-be-implemented]` are shell-quoted in commands; in prose they are written plainly. Claims marked **UNVERIFIED** are the only statements here not backed by a read of the named file.

---

## 1. Today: what the deployed site actually is

The App Router tree under `src/app/` is a four-route marketing site. The complete file inventory of `src/app/` (from `find src/app -type f`):

| Path | Role |
|---|---|
| `src/app/page.tsx` | root `/` lander (`"use client"`, page.tsx:2; imports only Lander/UI sections, page.tsx:5–19) |
| `src/app/about/page.tsx` | `/about` |
| `src/app/faq/page.tsx` | `/faq` |
| `src/app/programs/page.tsx` | `/programs` |
| `src/app/layout.tsx` | root layout — Google fonts + local Geist fonts (layout.tsx:16–55), metadata (layout.tsx:57–102), wraps children in `ReactLenis` (layout.tsx:110) and `BannerProvider` (layout.tsx:115) |
| `src/app/globals.css`, `src/app/favicon.ico`, `src/app/fonts/GeistVF.woff`, `src/app/fonts/GeistMonoVF.woff` | assets consumed by the layout (layout.tsx:3, layout.tsx:45–55) |

That is the entire router surface. There are:

- **No `/auth` routes** — `src/app/auth` does not exist (checked with a filesystem test; absent).
- **No API routes** — `src/app/api` does not exist (`ls src/app/api` → "No such file or directory").
- **No `/dashboard` or `/onboarding` routes** — both absent, even though `AuthForm` redirects to them (`src/components/auth/AuthForm.tsx:145,147`).

Grep confirmation that the active tree never touches auth (each ran against `src/app` and returned **zero matches**):

```text
grep -rn "next-auth" src/app      → no matches
grep -rn "AuthForm"  src/app      → no matches
grep -rn "@/schema"  src/app      → no matches
grep -rn "components/auth" src/app src/components --exclude-dir=auth → no matches
```

`next.config.mjs` has no redirects or rewrites (next.config.mjs:5–51 — only `reactStrictMode`, `swcMinify`, and an SVGR webpack rule), so nothing maps an `/auth` URL into the app either.

**Net:** the deployed site is a pure public marketing site. The auth module is invisible to Next.js routing because it lives at `src/[to-be-implemented]/` — outside `src/app/` — and nothing imports it (Section 2).

---

## 2. The shared pieces: active-tree files built for the parked feature

Three pieces of the auth feature live in the **active** tree, not in the parking lot. All three are consumed only by the parked pages:

| File | What it is | Who imports it |
|---|---|---|
| `src/components/auth/AuthForm.tsx` | `'use client'` form engine (AuthForm.tsx:2). react-hook-form + `zodResolver(schema)` (AuthForm.tsx:58–60); mode `signin` → `signIn("credentials", { redirect: false, ... })` (AuthForm.tsx:65–70); `signup` → `fetch("/api/auth/signup", { method: "POST", ... })` (AuthForm.tsx:80–86); `resetPassword` → `fetch("/api/auth/reset-password", ...)` (AuthForm.tsx:99–105); post-auth redirect via `fetch("/api/auth/session")` + `session.user.firstTime` (AuthForm.tsx:139–149); OAuth via `signIn("google" | "discord" | "github")` (AuthForm.tsx:124, 230–247). Exports default at AuthForm.tsx:257. | Only the three parked pages: `src/[to-be-implemented]/auth/login/page.tsx:4`, `register/page.tsx:4`, `reset-password/page.tsx:4` (`import AuthForm from '@/components/auth/AuthForm'`) |
| `src/components/auth/AuthButtons.tsx` | `'use client'` (AuthButtons.tsx:1); exports `GoogleSignInButton` (:20), `DiscordSignInButton` (:34), `GithubSignInButton` (:48), `EmailSignInButton` (:62) | Only `AuthForm.tsx` (`from "./AuthButtons"`, AuthForm.tsx:12–17). Grep for `AuthButtons` across `src` excluding the parked dir → this single hit |
| `src/schema/index.ts` | Zod schemas: `LoginSchema` (:11 — password `.min(1)` :15 + no-spaces `.refine` :18–20), `RegisterSchema` (:23 — `.min(8)` :37, `.max(32)` :40, no-spaces :43–45), `WaitlistSchema` (:48), `ResetSchema` (:54), `NewPasswordSchema` (:60) | Only the three parked pages: `login/page.tsx:5` (`LoginSchema`), `register/page.tsx:5` (`RegisterSchema`), `reset-password/page.tsx:5` (`ResetSchema`) — all `from '@/schema'` |

**Bundle verdict: none of it ships.** Next.js only bundles what is reachable from entries under `src/app/`. The chain to these files is: `src/app` → (nothing). Verified:

1. No `src/app` file references `next-auth`, `AuthForm`, or `@/schema` (greps in Section 1).
2. No `src/app` or `src/components` file (outside the `auth` dir itself) imports `components/auth` — grep returned zero matches.
3. `layout.tsx` imports only fonts, `@/context/BannerContext` (layout.tsx:4), `@/utils/lenis` (layout.tsx:13), and Vercel analytics (layout.tsx:11–12) — no session provider, no auth context.
4. No file anywhere in `src/` imports from the parked directory (`grep -rn "to-be-implemented" src` → zero matches), so the parked pages cannot pull the shared pieces into a route either.

So `AuthForm.tsx`, `AuthButtons.tsx`, and `schema/index.ts` are dead weight in the deployed bundle graph — active-tree code written for a feature whose pages are parked.

Adjacent relic, same pattern: `src/context/AuthProvider.tsx` is an entirely commented-out Firebase-era provider (AuthProvider.tsx:6, :36, :73) whose only reference in the tree is a commented import in AuthForm.tsx:10.

---

## 3. Sibling parked modules the auth flow would hand off to

All under `src/[to-be-implemented]/`. One verified line each — note the split between **live code that is merely unimported** and **fully commented relics**:

- **`Dashboard/Dashboard.tsx`** — live code (not commented): default-exports a `Dashboard` component (Dashboard.tsx:53) rendering a hardcoded "LuminAI Innovate Scholars (Summer 2024)" progress card and a `DueSection` (Dashboard.tsx:13, :27); imports `@heroicons/react/24/solid` (Dashboard.tsx:2, a real dependency, package.json:12). No file outside the parked dir imports it (name-grep over `src/app`, `src/components`, `src/context`, `src/hooks`, `src/lib`, `src/data` → no import hits).
- **`Dashboard/Sidebar.tsx`** — live code: default-exports `Sidebar` (Sidebar.tsx:43), heroicons + `next/image` (Sidebar.tsx:2–10) with a placeholder avatar `src="/path-to-avatar.png"` (Sidebar.tsx:26). Unimported.
- **`Dashboard/TodoList.tsx`** — live code: default-exports `TodoList` (TodoList.tsx:74) with hardcoded todo items (TodoList.tsx:5–17) and inline `Announcements`/`RecentFeedback` stubs (TodoList.tsx:52, :65). Unimported.
- **`generateEnrollmentLink.ts`** — 100% commented out (all 15 lines): a Firebase relic importing `../firebaseConfig` and `uuid` (generateEnrollmentLink.ts:1–2), minting `https://your-domain.com/enroll?token=${token}` links (generateEnrollmentLink.ts:12). Neither import target exists in the repo.
- **`SendEnrollmentLink.tsx`** — 100% commented out (all 33 lines): a form that would call `generateEnrollmentLink(email)` (SendEnrollmentLink.tsx:2, :9).
- **`Inquiry.tsx`** — 100% commented out (all 36 lines): imports the **existing** `@/components/ContactForm` (Inquiry.tsx:5 — the one live-tree module on this list) plus `@tanstack/react-router` (Inquiry.tsx:6) and `react-helmet-async` (Inquiry.tsx:7), neither of which is in package.json.

The handoff edge that exists in code is one string: after sign-in, `AuthForm` routes to `"/dashboard"` (AuthForm.tsx:147) or `"/onboarding"` (AuthForm.tsx:145) — the student-portal surface those three Dashboard components were drawn for. Neither route exists today (Section 1).

---

## 4. Intended-but-unwired contracts

### 4.1 Root route constants vs the parked middleware

`index.ts` (repo root) exports exactly the four constants a NextAuth middleware needs:

- `publicRoutes` — index.ts:2–4 (note: contains a stray double comma at index.ts:3, making the array sparse — `'/api/uploadthing', , "/tutoring"`)
- `authRoutes` — index.ts:7–13: `/auth/login`, `/auth/register`, `/auth/error`, `/auth/reset`, `/auth/new-password`
- `apiAuthPrefix = "/api/auth"` — index.ts:17
- `DEFAULT_LOGIN_REDIRECT = "/"` — index.ts:20

`src/[to-be-implemented]/utils/middleware.ts` is the designed consumer: it imports `DEFAULT_LOGIN_REDIRECT`, `apiAuthPrefix`, `authRoutes`, `publicRoutes` from `@/index` (middleware.ts:3–8), wraps `NextAuth(authConfig)` (middleware.ts:10), redirects logged-in users off auth routes to `DEFAULT_LOGIN_REDIRECT` (middleware.ts:28–33), and bounces unauthenticated traffic to `/auth/register` (middleware.ts:35–37) with the standard matcher (middleware.ts:43–45).

**Why it is unwired, verified:**

1. Every line of middleware.ts is commented out (all 45 lines).
2. It is not a Next middleware location — Next loads `middleware.ts` at repo root or `src/`; both are absent (filesystem check: `middleware.ts` absent, `src/middleware.ts` absent).
3. Its first import, `authConfig from "@/auth.config"` (middleware.ts:1), targets a file that does not exist (`auth.config.ts` absent at root and under src).
4. `@/index` does resolve to the root `index.ts` via the second tsconfig path entry — tsconfig.json:29–34 sets `"@/*": ["./src/*", "./*"]` — so the constants are reachable once the middleware itself is restored.

**Drift between the constants and the pages as parked:** `authRoutes` lists `/auth/reset` (index.ts:11) but the page directory is `src/[to-be-implemented]/auth/reset-password/` — restored as-is it would serve `/auth/reset-password`, a path absent from `authRoutes`. The login page's own "Forgot password?" link already points to `/auth/reset-password` (login/page.tsx:12). Related paths referenced by the parked code that appear in **no** constants list and have no page: `/auth/new-verification` (publicRoutes has it at index.ts:3; mail.ts links to it at mail.ts:13), `/auth/new-password` (mail.ts:34), `/onboarding` (AuthForm.tsx:145).

### 4.2 Mail and token utilities vs their missing modules

`src/[to-be-implemented]/utils/mail.ts` (all 43 lines commented) is written against modules that do not exist in the repo:

- `import ResetPassword from "@/emails/reset-password"` — mail.ts:1; `import LinkEmail from "@/emails/verify-email"` — mail.ts:2. **`src/emails/` does not exist.**
- `import { render } from "@react-email/components"` — mail.ts:3 — **not in package.json** (checked dependencies list, package.json:11–43).
- `import { Resend } from "resend"` — mail.ts:4 — **not in package.json**. Uses `process.env.RESEND_API_KEY` (mail.ts:6) and a hard-coded audience id (mail.ts:24).
- Its two exports, `sendVerificationEmail` (mail.ts:9) and `sendPasswordResetEmail` (mail.ts:30), are exactly the calls a restored `/api/auth/signup` and `/api/auth/reset-password` handler would need.

`src/[to-be-implemented]/utils/tokens.ts` (all 56 lines commented):

- `import { getVerificationTokenByEmail } from '@/data/verification-token'` — tokens.ts:1 — **absent** (`src/data/` holds only faq/staff/syllabus data).
- `import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'` — tokens.ts:4 — **absent**.
- `import { db } from '@/lib/db'` — tokens.ts:2 — **absent** (`src/lib/` contains only `shadcn/utils.ts`).
- `import { v4 as uuidv4 } from 'uuid'` — tokens.ts:3 — **uuid is not in package.json**.

`src/[to-be-implemented]/utils/db.ts` (all 10 lines commented) is the Prisma client singleton the tokens reference: `import { PrismaClient } from '@prisma/client'` (db.ts:2), `export const db = globalThis.prisma || new PrismaClient()` (db.ts:8). **`@prisma/client` is not in package.json**, and there is no `prisma/` schema directory at the repo root.

### 4.3 The `/api/auth/session` + `firstTime` contract

Client side, the contract is explicit: `AuthForm`'s `handlePostAuth` fetches `/api/auth/session` (AuthForm.tsx:140) and branches on `session.user.firstTime` → `"/onboarding"`, else `"/dashboard"` (AuthForm.tsx:144–148).

Server side, the producer is absent at every layer:

1. `/api/auth/session` is served by the NextAuth catch-all handler — but `src/[to-be-implemented]/api/auth/[...nextauth]/route.ts` is two commented lines importing `handlers` from `"@/../auth"` (route.ts:1–2), and the repo-root `auth` module it names **does not exist** (`auth.ts`/`auth.tsx` absent at root).
2. `firstTime` is not a NextAuth built-in — it would have to be added by a session callback (`callbacks: { session(...) }`) in a NextAuth config. **No NextAuth config exists anywhere in the repo**: `auth.ts`, `auth.config.ts` absent; the nearest thing, `src/[to-be-implemented]/services/auth.ts`, is a commented-out Vite/react-router relic using `import.meta.env.VITE_DISCORD_CLIENT_ID` (auth.ts:2) and a GitHub Pages Discord redirect (auth.ts:3).

So even if the client half ran today, the session response would carry no `user.firstTime` field — the branch at AuthForm.tsx:144 would always fall through to `/dashboard`, which is also unrouted.

### 4.4 Dependency ledger (package.json, verified by full read)

- **Client half — present:** `next-auth@5.0.0-beta.25` (package.json:30), `react-hook-form` (:33), `@hookform/resolvers` (:13), `zod` (:42), `sonner` (:38), `framer-motion` (:25), `react-icons` (:34), `lucide-react` (:28), `@heroicons/react` (:12).
- **Server half — absent:** `@prisma/client` / `prisma`, `resend`, `@react-email/*`, `uuid` — none appear in package.json:11–43.
- **Scripts** (package.json:5–10): `dev`, `build`, `start`, `lint` (`next lint`). No test script.

---

## 5. Data flow once implemented — hop by hop

The intended loop for a student signing in, with each hop marked **EXISTS** (code in tree, active) / **PARKED** (code in tree, commented or unrouted) / **MISSING** (must be authored):

1. **Browser → `/auth/login` page.** Page exists as `src/[to-be-implemented]/auth/login/page.tsx` rendering `<AuthForm mode="signin" schema={LoginSchema}>` (login/page.tsx:9) — **PARKED** (not under `src/app`, so unreachable). Server side of this hop — moving/keeping the pages in the App Router tree — **MISSING**.
2. **Page → AuthForm.** Import of `@/components/auth/AuthForm` + `@/schema` (login/page.tsx:4–5) — **EXISTS** (both files present; this is the only segment fully wired today).
3. **AuthForm → NextAuth.** `signIn("credentials", { redirect: false, email, password })` (AuthForm.tsx:66–69) posts to `/api/auth/*` — client half **EXISTS**; server half **MISSING**: the catch-all route handler is two commented lines (route.ts:1–2) and the `@/../auth` config it imports does not exist.
4. **NextAuth → Prisma.** `authorize` against the database via `db` from `@/lib/db` (db.ts:8) — **MISSING**: db.ts fully commented, `@prisma/client` and `prisma` not installed, no schema directory.
5. **NextAuth → session callback → `user.firstTime`.** **MISSING**: no auth config exists anywhere, so nothing decorates the session object (Section 4.3).
6. **AuthForm → session check.** `fetch("/api/auth/session")` then branch on `firstTime` (AuthForm.tsx:140–148) — client half **EXISTS**; endpoint it calls is dead until hops 3–5 are restored.
7. **Redirect → `/onboarding` or `/dashboard`.** Client logic **EXISTS** (AuthForm.tsx:145,147); the routes themselves **MISSING** — the Dashboard/Sidebar/TodoList components for that surface sit unimported in the parking lot (Section 3).
8. **Signup / reset-password fan-out.** `fetch POST /api/auth/signup` (AuthForm.tsx:80) and `/api/auth/reset-password` (AuthForm.tsx:99) — client half **EXISTS**; handlers **MISSING**; their designed internals are parked as commented code: token minting in tokens.ts:7,35 (needs `@/data/*` tables + `@/lib/db`) and delivery in mail.ts:9,30 (needs `src/emails/*`, `@react-email/components`, `resend`, `RESEND_API_KEY`).
9. **OAuth.** `signIn("google" | "discord" | "github")` from the three social buttons (AuthForm.tsx:230–247) — client half **EXISTS**; provider configuration on the server **MISSING** (no auth config file; middleware would also need `authConfig` at `@/auth.config`, middleware.ts:1).

**The one-line summary:** every arrow whose tail is the browser has working code in the tree; every arrow whose head is a server (route handler, database, email, session decoration) is parked or missing. Restoring the flow is a server-side re-wiring job plus three routing fixes — expose the pages under `src/app`, revive `route.ts`/`auth` config and middleware, and reconcile `/auth/reset` (index.ts:11) with `/auth/reset-password` (the real page path).
