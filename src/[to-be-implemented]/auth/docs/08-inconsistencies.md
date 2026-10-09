# 08 — Inconsistencies audit of the parked auth path

Part 08 of 10 · branch `obv/gend-luminai-src-to-be-implemented-auth--08-inconsistencies` · base `main` @ `c3b8063` · audited 2026-10-09.

**Method.** Every claim below was verified in this clone at `c3b8063` by reading the cited file with `cat -n` this session; quoted lines are verbatim. "Missing" claims were checked with shell probes (`ls`, `find src -type f`, `grep -rn`). Nothing outside `src/[to-be-implemented]/auth/` was edited — findings about those files are reported as `file:line` references only, per scope.

**A note on why all of this is still commented code.** `tsconfig.json:36-43` includes `**/*.ts` and `**/*.tsx` (parked files ARE typechecked), and `next.config.mjs` sets no `typescript.ignoreBuildErrors`. The parked files import packages that are not dependencies (`react-router-dom`, `axios`, `uuid`, `resend`, `@prisma/client`, `@react-email/components`, `firebase` — none in `package.json:11-42`; `next-auth 5.0.0-beta.25` IS, at `package.json:30`). So the commented state is load-bearing: uncommenting any of it breaks `next build`. The inconsistencies below are recorded so the re-bolt fixes them rather than re-freezes them.

---

## TL;DR

| ID | Lens | Where | One-line summary |
|---|---|---|---|
| I1 | names vs behavior | `index.ts:3` | elided `, ,` element leaves a hole (sparse array) in `publicRoutes` |
| I2 | names vs reality | `index.ts:3` | `publicRoutes` lists routes with no page in `src/app`, incl. a `:param` pattern `.includes()` can never match |
| I3 | names vs names | `index.ts:11` | `authRoutes` says `/auth/reset`; the page directory, the login page link, and the API path all say `reset-password` |
| I4 | names vs reality | `index.ts:3,10,12`, `utils/mail.ts:13,34` | `/auth/new-verification`, `/auth/error`, `/auth/new-password` are referenced but no pages exist; email links are hardcoded to `localhost:3000` |
| I5 | names vs behavior | `utils/middleware.ts:34-36`, `index.ts:19-20`, `AuthForm.tsx:139-149` | three disagreeing redirect stories; a comment in middleware even contradicts its own line of code |
| I6 | types vs behavior | `AuthForm.tsx:40-45` vs `:209` | `FieldValues` types `password` as required, but the field is not rendered in reset mode |
| I7 | comments vs code | `api/auth/[...nextauth]/route.ts:1`, `context/AuthProvider.tsx:7` | both import `@/../auth`; root `auth.ts` does not exist |
| I8 | comments vs code | `services/auth.ts:1-8` | header says `src/services/auth.js`; body is Vite-era Discord OAuth aimed at a GitHub Pages URL |
| I9 | comments vs code | `services/AuthCallback.ts:1-14` | header says `src/pages/AuthCallback.js`; body is react-router-dom + axios + a placeholder backend URL |
| I10 | comments vs code | `utils/db.ts:1-2` | header says `lib/prisma.ts`; imports `@prisma/client`, which is not a dependency |
| I11 | comments vs code | `utils/middleware.ts:1,8` | imports `@/auth.config` (missing anywhere) and `@/index` (resolves only via the tsconfig fallback; `src/index.ts` does not exist) |
| I12 | comments vs code | `AuthForm.tsx:19` vs `:139-149` | TODO promises server-side redirects; code does client `router.push`, incl. a commented `/confirm-email` route that does not exist |
| I13 | dead code | `AuthForm.tsx:6,11,21,26,37,47,50` | six unused imports/vars/props, incl. a Node builtin (`callbackify`) inside a `'use client'` file; masked by eslint `no-unused-vars` being off |
| I14 | dead code | `schema/index.ts:48,60` | `WaitlistSchema` and `NewPasswordSchema` are exported but never imported anywhere |
| I15 | dead code | `context/AuthProvider.tsx` | active-tree file marked deprecated, 100% commented Firebase-era code, never mounted |
| I16 | divergent definitions | `schema/index.ts:13-20,35-45,60-69` | three different password policies; register caps at 32 chars, the new-password schema does not |
| I17 | divergent definitions | `AuthForm.tsx`, `context/AuthProvider.tsx`, `services/auth.ts`, `utils/mail.ts:1-4`, `services/emailService.ts:1` | remains of multiple auth/email stacks (NextAuth beta, Firebase, manual Discord OAuth, Resend vs emailjs); only NextAuth is installed |

Adjacent (outside the auth path, reported not fixed): `tsconfig.json:41-42` includes two files that do not exist; the stale-header pattern repeats in `Dashboard/Dashboard.tsx:1`, `services/api.ts:1`, `services/directus.ts:1-3`, `generateEnrollmentLink.ts:1-2`.

---

## (a) Names vs behavior / names vs reality

### I1 — `publicRoutes` contains an elided element (sparse array hole)

`index.ts:2-4`:

```ts
export const publicRoutes = [
    "/", '/api/webhook', "/coaching", "/courses", '/roadmap', "/auth/new-verification", '/api/uploadthing', , "/tutoring", '/courses/:courseId/info'
    ]
```

Line 3 contains `'/api/uploadthing', , "/tutoring"` — a double comma. The array literal therefore has 10 slots with a **hole** at index 7 (`publicRoutes.length === 10`). `Array.prototype.includes` treats holes as `undefined`, so `publicRoutes.includes(undefined)` would be `true`. The parked middleware passes `nextUrl.pathname` (a string) at `utils/middleware.ts:19` (`const isPublicRoute = publicRoutes.includes(nextUrl.pathname);`), so the hole is latent today — but any future `.includes(someVar)` where `someVar` can be `undefined` silently matches every missing route.

**Proposed fix:** delete the extra comma (one-character fix in root `index.ts:3`).

### I2 — `publicRoutes` lists routes that have no pages (stale pre-pivot list)

Verified contents of `src/app` (`ls src/app`): `about/`, `faq/`, `programs/`, `page.tsx`, `layout.tsx`, `fonts/`, `globals.css`, `favicon.ico`. There is **no** `src/app/api` directory at all (verified via `find src -type f`).

`index.ts:3` therefore lists nine entries of which only `"/"` resolves to a real page:

| Entry in `publicRoutes` (`index.ts:3`) | Page in `src/app`? |
|---|---|
| `/` | yes (`src/app/page.tsx`) |
| `/api/webhook` | no — no `src/app/api` exists |
| `/coaching` | no |
| `/courses` | no |
| `/roadmap` | no |
| `/auth/new-verification` | no (see I4) |
| `/api/uploadthing` | no — no `src/app/api` exists |
| *(hole — I1)* | — |
| `/tutoring` | no |
| `/courses/:courseId/info` | no — also a `:param` **pattern**, which `publicRoutes.includes(nextUrl.pathname)` (`utils/middleware.ts:19`) can never match, because `pathname` is a literal like `/courses/foo/info` |

**Inconsistency:** the route list describes the pre-pivot product (coaching/courses/roadmap/tutoring); the current site is the static marketing site (about/faq/programs). The list is dead weight with live landmines (the `:param` entry looks like it grants public access to course pages, but `.includes()` can't honor it).

**Proposed fix:** when re-enabling the middleware, prune `publicRoutes` to actual public pages (or key it off the filesystem), and never mix param patterns into an `.includes()`-consumed list.

### I3 — `/auth/reset` vs `reset-password`: the reset route has two names

- `index.ts:11`: `'/auth/reset',` (inside `authRoutes`, lines 7-13)
- Page directory: `src/[to-be-implemented]/auth/reset-password/page.tsx` (verified; route would be `/auth/reset-password` once bolted under `src/app`)
- Login page link: `src/[to-be-implemented]/auth/login/page.tsx:12` — `href="/auth/reset-password"`
- API path: `src/components/auth/AuthForm.tsx:99` — `const response = await fetch("/api/auth/reset-password", {`

`grep -rn "auth/reset"` across the repo returns exactly these four occurrences: `index.ts:11` is the **only** place using the short form. Everything that names the flow by path — the directory, the cross-page link, the API endpoint — uses `reset-password`.

**Proposed fix:** change `index.ts:11` from `'/auth/reset'` to `'/auth/reset-password'`. (Owner: root `index.ts` — outside this part's editable scope; see the fix-decision section.)

### I4 — Referenced-but-missing auth pages, and hardcoded localhost links

Three routes are referenced but have no page anywhere in the repo (`find src -type f` verified; no `auth` pages exist outside the parked three):

- `/auth/new-verification` — `index.ts:3` (publicRoutes) and `utils/mail.ts:13`: `//     const confirmLink = \`https://localhost:3000/auth/new-verification?token=${token}\`;`
- `/auth/new-password` — `index.ts:12` (authRoutes) and `utils/mail.ts:34`: `//     const resetLink = \`https://localhost:3000/auth/new-password?token=${token}\`;`
- `/auth/error` — `index.ts:10` (authRoutes); no page, and nothing in the repo navigates to it (`grep` verified).

Sub-inconsistency: `mail.ts:13,34` hardcode `https://localhost:3000` as the email link base. In production every verification/reset email would link to localhost. There is no env-var indirection, in contrast with, e.g., `mail.ts:6` which does read `process.env.RESEND_API_KEY`.

**Proposed fix:** create the three pages at re-bolt (they are the natural targets of the token flows in `utils/tokens.ts` and `utils/mail.ts`) or drop the references; derive the link base from an env var (`NEXTAUTH_URL`).

### I5 — Three different post-login redirect stories (and a comment contradicting its own code)

The three sources of "where does the user go next" disagree:

1. **Unauthenticated users** — `utils/middleware.ts:34-37`:
   ```ts
   //   // if user is not logged in and route is not public, redirect to home page
   //   if (!isLoggedIn && !isPublicRoute) {
   //     return Response.redirect(new URL('/auth/register', nextUrl));
   ```
   The comment on line 34 says "redirect to **home page**"; the code on line 36 redirects to **`/auth/register`**. Even internally, comment vs code disagree.
2. **Logged-in users hitting an auth page** — `utils/middleware.ts:30`: `return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));` where `index.ts:19-20` defines:
   ```ts
   // Default redirect path after login
   export const DEFAULT_LOGIN_REDIRECT = "/";
   ```
3. **After a successful credentials sign-in** — `AuthForm.tsx:139-149` (`handlePostAuth`): fetches `/api/auth/session` (line 140), then:
   ```ts
   if (session.user.firstTime) {
     router.push("/onboarding");
   } else {
     router.push("/dashboard");
   }
   ```
   (lines 144-148).

And the kicker: **none of the destinations exist**. `src/app` has no `/onboarding`, no `/dashboard`, and no `/auth` routes at all (verified via `find src -type f` and `ls src/app`); `/onboarding` and `/dashboard` appear only in `AuthForm.tsx:145,147` (`grep` verified). `DEFAULT_LOGIN_REDIRECT` (`"/"`) and the middleware's `/auth/register` are a third and fourth story that never meet the first.

**Proposed fix:** pick one canonical post-login destination constant, use it in both the middleware and `handlePostAuth`, and create the destination pages before wiring the middleware.

### I6 — `FieldValues` types `password` as required, but reset mode never renders it

`AuthForm.tsx:40-45`:

```ts
interface FieldValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
```

`AuthForm.tsx:209`: `{mode !== "resetPassword" && (` — the password input (lines 211-216) is rendered only when mode is not `"resetPassword"`, and reset mode validates against the email-only `ResetSchema` (`src/schema/index.ts:54-58`, wired at `reset-password/page.tsx:11`). So in reset mode the type claims a required `password: string` that the form neither renders nor submits. The type contract and the rendered form diverge per mode.

**Proposed fix:** model the form values per mode (a union keyed by `mode`) or make `password` optional in the shared type.

---

## (b) Comments vs code

### I7 — `route.ts` imports handlers from `@/../auth`, which does not exist

`src/[to-be-implemented]/api/auth/[...nextauth]/route.ts` (the entire file, lines 1-2):

```ts
// import { handlers } from "@/../auth"
// export const { GET, POST } = handlers
```

`@/` maps to `["./src/*", "./*"]` (`tsconfig.json:29-34`), so `@/../auth` resolves to `./src/../auth` → repo-root `auth.ts`. Verified missing: `ls auth.ts` → "No such file or directory"; `find src -type f` shows no `auth.ts`/`auth.config.*` anywhere. The same phantom import appears a second time at `src/context/AuthProvider.tsx:7` (`// import { auth } from '@/../auth';`). The NextAuth route handler — the single entry point of the whole auth API — points at a file the repo has never contained (at least at this commit).

**Proposed fix:** create the root `auth.ts` / `auth.config.ts` pair (the conventional NextAuth v5 split the parked middleware also expects, I11) or correct the specifier when re-enabling.

### I8 — `services/auth.ts`: header names a `.js` file at the wrong path; body is a Vite-era relic

`src/[to-be-implemented]/services/auth.ts` (entire file commented), line 1:

```ts
// // src/services/auth.js
```

The actual path is `src/[to-be-implemented]/services/auth.ts`. The body is pre-Next.js, Vite-era code:

- line 2: `// const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;` — `import.meta.env` is Vite; `import.meta` appears nowhere else in the auth path (grep: only `services/directus.ts:3` alongside).
- line 3: `// const DISCORD_REDIRECT_URI = 'https://samgu-nrx.github.io/LuminAI/auth/discord/callback';` — a GitHub Pages deployment URL; the current site is Vercel-hosted (`src/app/layout.tsx:81` — `url: "https://luminaibootcamps.vercel.app"`).
- line 8: `//   window.location.href = DISCORD_AUTH_URL;` — a manual OAuth redirect that competes with the NextAuth `signIn("discord")` flow in `AuthForm.tsx:124,237-240`.

**Proposed fix:** delete the file (its flow is superseded by NextAuth's Discord provider).

### I9 — `services/AuthCallback.ts`: header names `src/pages/AuthCallback.js`; body is react-router-dom + axios + a placeholder URL

Line 1: `// src/pages/AuthCallback.js`. Verified: `src/pages` does not exist (`ls src/pages` → "No such file or directory") — and pages live under `src/app` in the App Router anyway.

The commented body (lines 2-31): line 5 `import { useLocation } from 'react-router-dom';` — react-router-dom is not a dependency (`package.json:11-42`; grep finds it only here and at `Inquiry.tsx:4`); line 4 `import axios from 'axios';` — axios is not a dependency either; line 14 `axios.get(\`https://your-backend-url.com/auth/discord/callback?code=${code}\`)` — a literal placeholder backend URL. Line 6 imports `Loading from '../components/Loading/Loading'` — that component does exist (`src/components/Loading/Loading.tsx`), but relative to the claimed `src/pages/` home, not the file's actual home.

**Proposed fix:** delete the file (manual Discord callback handling is superseded by NextAuth).

### I10 — `utils/db.ts`: header says `lib/prisma.ts`; imports a non-dependency

Lines 1-2:

```ts
// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';
```

Actual path: `src/[to-be-implemented]/utils/db.ts`. `@prisma/client` is not in `package.json` (verified lines 11-42), and the import target `@/lib/db` used by `utils/tokens.ts:2` is also missing (`src/lib/` contains only `shadcn/utils.ts` — verified via `find src -type f`).

**Proposed fix:** at re-bolt, this belongs at `src/lib/db.ts` (matching what `tokens.ts:2` imports) — or delete if Prisma is not the chosen persistence layer.

### I11 — `utils/middleware.ts` imports two modules, one missing entirely, one resolvable only by fallback

Line 1: `// import authConfig from "@/auth.config"` — `grep`/`find` verify there is no `auth.config.ts` anywhere in the repo (this is the sibling of the missing root `auth.ts`, I7).

Lines 3-8:

```ts
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/index"
```

`@/index` first resolves to `src/index.ts` — which does **not** exist (`find src -type f` verified; the constants live at repo-root `index.ts`) — and only then to the fallback `./*` entry of `tsconfig.json:30-33` (`"@/*": ["./src/*", "./*"]`). So the import works by accident of a fallback, while the sibling import on line 1 doesn't work at all. Compare `route.ts:1`, which reaches the same root-level file with the explicit-but-ugly `@/../auth` — two different conventions for the same location.

**Proposed fix:** move `index.ts` to `src/index.ts` (or `src/routes.ts`) so a single `@/...` specifier resolves directly for both consumers; create `auth.config.ts`.

### I12 — AuthForm's TODO promises server-side redirects the code never does

`AuthForm.tsx:19`:

```ts
// TODO: ensure change to server (redirect instead of useRouter) for performance and SEO
```

The code below it does the opposite — client-side navigation in `handlePostAuth` (`AuthForm.tsx:144-148`, `router.push("/onboarding")` / `router.push("/dashboard")`) — and right above that, lines 141-143 keep a commented-out redirect to yet another phantom route:

```ts
// if (!session.user.emailVerified) {
//   router.push('/confirm-email');
// } else
```

`/confirm-email` exists nowhere in the repo (`grep` verified — only this commented line).

**Proposed fix:** when re-bolting, either implement the server-side redirect (NextAuth `signIn` with `redirectTo`) or delete the TODO; settle the email-verification flow (I4) before reusing `/confirm-email`.

---

## (c) Dead code

### I13 — AuthForm carries six unused imports/vars/props, hidden by disabled linting

All verified by `cat -n src/components/auth/AuthForm.tsx` plus `grep -n` for each symbol:

| Line | Dead item | Note |
|---|---|---|
| 21 | `import Email from "next-auth/providers/email";` | never used. Importing a *provider definition* into a client component is also a category error — providers belong in the server auth config |
| 26 | `import { callbackify } from "util";` | never used, and `util` is a Node builtin inside a `"use client"` component (line 2) — it only survives because it is unused and tree-shaken |
| 11 | `useSession` (from `import { useSession, signIn }`) | `signIn` is used (lines 66, 124); `useSession` never — and it would need a `SessionProvider`, which `layout.tsx` never mounts (it mounts only `BannerProvider`, `layout.tsx:115`) |
| 6 | `z` (from `import { z, ZodSchema } from "zod"`) | only the `ZodSchema` type is used (line 35); no `z.` anywhere (grep verified) |
| 50 | `const [isPending, startTransition] = useTransition();` | neither binding is used anywhere else in the file (grep verified) |
| 37, 47 | `csrfToken?: string` prop | accepted in `AuthFormProps` and destructured, never read; no page passes it |

Plus the archaeological layer: line 5 is a commented duplicate of line 11's import (`// import { useSession, signIn, signOut } from 'next-auth/react';`), and lines 10, 22-24 are further commented imports.

Why this survives: `.eslintrc.json:4` sets `"@typescript-eslint/no-unused-vars": "off"`, and `AuthForm.tsx:1` adds a file-level `/* eslint-disable @typescript-eslint/no-unused-vars */`.

**Proposed fix:** prune the six dead items and the commented import block; re-enable `no-unused-vars` for this file.

### I14 — `WaitlistSchema` and `NewPasswordSchema` are exported and never imported

`grep -rn` across `src` and root: `WaitlistSchema` appears only at `src/schema/index.ts:48` (its definition); `NewPasswordSchema` only at `:60`. Every other export in the file is consumed (`LoginSchema` at `login/page.tsx:5`, `RegisterSchema` at `register/page.tsx:5`, `ResetSchema` at `reset-password/page.tsx:5`).

`NewPasswordSchema` (`schema/index.ts:60-69`, min 8 + no-spaces) is the natural schema for the missing `/auth/new-password` page (I4) — its orphan status suggests the "set new password" screen was planned but never built, while its email-request counterpart (`ResetSchema`) was.

**Proposed fix:** build the `/auth/new-password` page (which also completes the flow `mail.ts:34` links to), or remove both schemas.

### I15 — `src/context/AuthProvider.tsx`: an active-tree file that is entirely a commented-out Firebase relic

`src/context/AuthProvider.tsx` sits in the **active** tree (not under `[to-be-implemented]`), yet every line is commented out, starting with line 1: `// deprecated`. Contents: `import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';` (line 6), the phantom `@/../auth` import (line 7, see I7), a `localStorage`-token login against `/api/token-auth/` (lines 43-54) — a fourth auth mechanism (token-in-localStorage) inside one file.

It is unreachable: `layout.tsx:109-119` mounts only `BannerProvider`; the sole reference anywhere is the commented import at `AuthForm.tsx:10` (grep verified).

**Proposed fix:** delete the file at re-bolt (NextAuth's `SessionProvider` replaces it), or resurrect it deliberately if a context layer is wanted on top of NextAuth.

---

## (d) Duplicated / divergent definitions

### I16 — Three different definitions of "valid password"

All in `src/schema/index.ts` (verified):

| Schema | Lines | Policy |
|---|---|---|
| `LoginSchema.password` | 13-20 | `min(1)` + no spaces |
| `RegisterSchema.password` | 35-45 | `min(8)` + `max(32)` + no spaces |
| `NewPasswordSchema.password` | 61-68 | `min(8)` + no spaces, **no max** |

Only the `noSpaces` helper (lines 3-9) is shared. The meaningful divergence: registration caps passwords at 32 characters, but the new-password (reset) schema does not — so as-is, a user could set a 40-character password via the reset flow. Login (`min(1)`, no spaces) would still accept it, so no lockout — but the policies disagree about what a password is, and the 32-cap exists only in one of the three places.

**Proposed fix:** extract one shared password policy builder (with an explicit decision on the 32-cap) and compose the three schemas from it.

### I17 — The remains of multiple auth/email stacks coexist in one codebase

Verified fragments of four different generations of auth/email infrastructure:

1. **NextAuth v5 beta** (the intended one): `AuthForm.tsx:11,66,124`, `route.ts:1-2`, `middleware.ts:1-10`, dependency at `package.json:30` (`"next-auth": "5.0.0-beta.25"`).
2. **Firebase client auth**: `context/AuthProvider.tsx:6` (`firebase/auth` import; not a dependency).
3. **Manual Discord OAuth (Vite era)**: `services/auth.ts:2-8` + `AuthCallback.ts` (I8, I9).
4. **Email infrastructure, split in two**: `utils/mail.ts:1-4` (Resend + `@react-email/components`) vs `services/emailService.ts:1` (`// import emailjs from '@emailjs/browser';`) — neither package is a dependency.

**Proposed fix:** at re-bolt, delete generations 2-4 and the `emailService.ts` twin, keep NextAuth + one email stack.

---

## Fix decision: no in-scope-and-safe fix was applied

The brief authorizes fixing an inconsistency only if it is (i) fully inside `src/[to-be-implemented]/auth/` and (ii) clearly safe. **No finding qualifies, and this is stated explicitly as required:**

1. Every actionable fix target lies outside `src/[to-be-implemented]/auth/`: I1-I4 and I14's fix live in root `index.ts` and `src/schema/index.ts`; I5-I6, I12-I13 in `src/components/auth/AuthForm.tsx`; I7 in repo-root `auth.ts`/`route.ts`; I8-I11 in `src/[to-be-implemented]/services/` and `utils/`; I15 in `src/context/`. Editing any of these is out of scope for this part.
2. The only in-scope file implicated by any finding is `src/[to-be-implemented]/auth/login/page.tsx:12` (`href="/auth/reset-password"`) — and it is on the **correct** side of I3: the page directory is named `reset-password` (that is the route the file will produce when bolted under `src/app`), and `AuthForm.tsx:99` uses the same hyphenated form for the API path. The outlier is `index.ts:11`. Rewriting the page's href to `/auth/reset` would align the page with the stale constant and **introduce** an error, not repair one.

Consequently no `examples/inconsistency-fixes-check.ts` was created — the brief requires that check only when a fix ships, and no fix shipped. Everything found is reported above as `file:line` references with the proposed fix and its true owner location.

---

## Adjacent findings (outside the auth path — reported, not fixed)

- **Ghost tsconfig includes:** `tsconfig.json:41-42` list `"src/app/dashboard-force/buttonTest.js"` and `"src/components/page.jsx"`. Both verified missing (`ls` → "No such file or directory" for each). Harmless to `tsc` but misleading.
- **Same stale-header pattern beyond auth:** `src/[to-be-implemented]/Dashboard/Dashboard.tsx:1` says `// components/Dashboard.jsx` (and is otherwise *live*, uncommented code); `services/api.ts:1` says `// src/services/api.js` and imports axios; `services/directus.ts:3` uses `import.meta.env.VITE_API_URL`; `generateEnrollmentLink.ts:1` imports from `../firebaseConfig` (does not exist) and `uuid`.
- **Formatting artifact:** `index.ts:5-20` carry stray leading whitespace (the file reads as if pasted from an indented block). Cosmetic only.

## Re-bolt checklist (condensed)

1. `index.ts:3` — remove the elided comma (I1); prune stale routes and drop the `:param` pattern (I2).
2. `index.ts:11` — `'/auth/reset'` → `'/auth/reset-password'` (I3).
3. Create `/auth/new-verification`, `/auth/new-password`, `/auth/error` pages — or drop their references; un-hardcode `localhost:3000` in `mail.ts:13,34` (I4).
4. Unify the redirect story across `middleware.ts:36`, `index.ts:20`, `AuthForm.tsx:144-148`; create the destination pages (I5).
5. Fix the `FieldValues` type vs reset-mode rendering (I6); implement or delete the server-redirect TODO (I12).
6. Create root `auth.ts`/`auth.config.ts` (I7, I11) — this is the precondition for un-commenting `route.ts`, `middleware.ts`, `tokens.ts`, `db.ts`, `mail.ts` at all.
7. Delete `services/auth.ts`, `services/AuthCallback.ts`, `context/AuthProvider.tsx` (I8, I9, I15, I17).
8. Prune the six dead imports/vars/props in `AuthForm.tsx` and re-enable `no-unused-vars` (I13).
9. Wire or remove `WaitlistSchema`/`NewPasswordSchema`; unify the password policy (I14, I16).

---

## Verification log (commands run this session, in order)

1. `git clone https://github.com/SamGu-NRX/LuminAI.git ~/work/gend-luminai-src-to-be-implemented-auth-08` → OK; `git checkout -b obv/gend-luminai-src-to-be-implemented-auth--08-inconsistencies` → OK; `git log --oneline -3` → HEAD `c3b8063` (matches the brief's base).
2. `find src -type f | sort`; `ls -la`; existence probes for `auth.ts`, `middleware.ts`, `src/middleware.ts`, `src/pages` → all four MISSING.
3. `cat -n` on: root `index.ts`, `route.ts`, `services/auth.ts`, `services/AuthCallback.ts`, `utils/middleware.ts`, `utils/tokens.ts`, `utils/db.ts`, `utils/mail.ts`, the three auth pages, `AuthForm.tsx`, `AuthButtons.tsx`, `schema/index.ts`, `package.json`, `tsconfig.json`, `next.config.mjs`, `.eslintrc.json`, `context/AuthProvider.tsx`, `app/layout.tsx` — all quotes above come from these reads.
4. `grep -rn` for: `WaitlistSchema`, `NewPasswordSchema`, `AuthProvider|useAuth`, `auth/reset`, `onboarding|/dashboard|confirm-email`, `isPending|startTransition|csrfToken|z\.|useSession`, `import\.meta`, `react-router-dom`, `../auth`, `axios|uuid|resend|@prisma|react-email` — results cited inline above.
5. `ls src/app/dashboard-force/buttonTest.js` and `ls src/components/page.jsx` → both "No such file or directory"; `ls src/app` → the page inventory used in I2.

Nothing in this audit is UNVERIFIED: every file:line above was read this session at commit `c3b8063`. Git-history claims are deliberately absent (history was not inspected; the brief's history notes were not relied on).
