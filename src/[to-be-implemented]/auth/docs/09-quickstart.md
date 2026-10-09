# Auth module quickstart — the 15-minute tour

This is a tour of a parked authenticated portal. LuminAI itself is "currently a static site" (README.md:63); the auth code was unbolted from it in commit `2b01e73` ("fix: removed auth"), tidied in `8609787` and `74795bb`, and now lives in `src/[to-be-implemented]/` — a directory Next.js never routes, because nothing in it sits under `src/app/` (which holds only `about/`, `faq/`, `programs/`, `fonts/`, `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`; verified by `ls` this session). The client half of the portal is real TypeScript that still typechecks — `"strict": true` at tsconfig.json:11 and the `**/*.ts*` include at tsconfig.json:36-40 sweep this directory in. The server half is 100% comments.

The clock assumes you already know React and the Next.js App Router; if not, double every estimate. Everything below was verified against `main` at commit `c3b8063` by reading each file (`cat -n`); line counts come from `wc -l`.

## The route

Six stops, roughly fifteen minutes, in this order. Later stops explain earlier ones, so don't skip ahead.

### Stop 1 — The three pages (~2 min, 86 lines)

- `src/[to-be-implemented]/auth/login/page.tsx` (33 lines) — a `'use client'` wrapper (`:1`) that renders `<AuthForm mode="signin" schema={LoginSchema}>` (`:9`) plus links to `/auth/reset-password` (`:12`) and `/auth/register` (`:23`).
- `src/[to-be-implemented]/auth/register/page.tsx` (26 lines) — `<AuthForm mode="signup" schema={RegisterSchema}>` (`:10`), link back to `/auth/login` (`:16`).
- `src/[to-be-implemented]/auth/reset-password/page.tsx` (27 lines) — `<AuthForm mode="resetPassword" schema={ResetSchema}>` (`:11`), link back to `/auth/login` (`:17`).

Notice how little is here: every page is a mode-and-schema pairing handed to one shared component — all behavior lives in `src/components/auth/`, outside the parking lot. Also notice that none of this is reachable — there is no `src/app/auth/` at all.

### Stop 2 — AuthForm and AuthButtons (~5 min, 334 lines)

`src/components/auth/AuthForm.tsx` (257 lines) is the engine. Read it top to bottom:

- The form is react-hook-form bound to whatever zod schema the page passed: `useForm({ resolver: zodResolver(schema) })` (`:54-60`), with `zodResolver` imported from `@hookform/resolvers/zod` (`:8`).
- **mode "signin"** calls `signIn("credentials", { redirect: false, email, password })` (`:65-76`). `redirect: false` makes the call return a result instead of navigating, so the form can `toast.error(result.error)` (`:72`) or move on to `handlePostAuth()` (`:74`).
- **mode "signup"** does not go through NextAuth: it `fetch`-es `POST /api/auth/signup` (`:80-86`) and, on success, toasts "Registration successful, please check your email to verify your account." (`:91-93`) — a promise no server currently keeps.
- **mode "resetPassword"** fetches `POST /api/auth/reset-password` with just the email (`:99-105`) and toasts "Password reset email sent." (`:110`).
- `handleSignIn(provider)` (`:120-137`) is the OAuth path: `signIn(provider, { redirect: false })` (`:124`), then the same `handlePostAuth()`.
- `handlePostAuth()` (`:139-149`) is the part to memorize: it fetches `/api/auth/session` (`:140`) and forks on `session.user.firstTime` (`:144`) — first-timers go to `/onboarding` (`:145`), everyone else to `/dashboard` (`:147`). Neither page exists.
- The social buttons are rendered for signin/signup (`:229-248`) and wired to `handleSignIn("google")` (`:231`), `handleSignIn("discord")` (`:238`), `handleSignIn("github")` (`:245`).

Quirks worth three seconds each: an `eslint-disable @typescript-eslint/no-unused-vars` at `:1` keeps dead imports alive, including `import Email from "next-auth/providers/email"` (`:21`) and `import { callbackify } from "util"` (`:26`) — a Node builtin, in a client component.

`src/components/auth/AuthButtons.tsx` (77 lines) is presentation only. `GoogleSignInButton` (`:20`), `DiscordSignInButton` (`:34`), and `GithubSignInButton` (`:48`) receive a `handleClick` prop and never touch `signIn` themselves; `EmailSignInButton` (`:62`) is the form's `type="submit"` button (`:67`) with a label that switches by mode (`:73`). It sits inside the `<form>` at AuthForm `:225`, which is what makes Enter-key submission work.

### Stop 3 — The schemas (~2 min, 70 lines)

`src/schema/index.ts` defines all five, but the portal uses three:

- `LoginSchema` (`:11-21`): email plus a password of `min(1)` (`:15`) that must pass the `noSpaces` refine (`:18`, helper at `:3-9`). Any non-empty, space-free string logs in — there is deliberately no complexity rule at sign-in time.
- `RegisterSchema` (`:23-46`): first/last names of 1-30 chars (`:24-33`) and a password of **8 to 32** characters (`:37`, `:40`) with the same no-spaces rule (`:43`). Note the asymmetry: registration is strict, sign-in is not.
- `ResetSchema` (`:54-58`): email only. The reset form never asks for a new password — that job belongs to `NewPasswordSchema` (`:60-69`, min 8, no spaces), which pairs with the `/auth/new-password` page that doesn't exist yet.

`WaitlistSchema` (`:48-52`) is exported but imported nowhere in `src/` (grep-verified this session).

### Stop 4 — The route constants (~1 min, 19 lines)

Root `index.ts` is the shopping list the parked middleware would consume:

- `publicRoutes` (`:2-4`) — including a literal array hole: `'/api/uploadthing', ,` at `:3`.
- `authRoutes` (`:7-13`) — `/auth/login`, `/auth/register`, `/auth/error`, `/auth/reset`, `/auth/new-password`. Note `'/auth/reset'` at `:11` does not match the page directory, which is named `reset-password`. That mismatch needs a decision when this goes live.
- `apiAuthPrefix = "/api/auth"` (`:17`) and `DEFAULT_LOGIN_REDIRECT = "/"` (`:20`).

### Stop 5 — The commented-out server (~3 min, 251 lines)

Ten files, every line commented. Each imports modules that do not exist (`src/lib/` has no `db.ts`; `src/data/` has no `verification-token` or `password-reset-token`; there is no root `auth.ts` — all verified by `ls` this session). One line each:

- `api/auth/[...nextauth]/route.ts` (2 lines) — was the NextAuth route handler: `// import { handlers } from "@/../auth"` / `// export const { GET, POST } = handlers` (`:1-2`).
- `services/auth.ts` (9) — pre-NextAuth Discord OAuth: hand-built authorize URL from `import.meta.env.VITE_DISCORD_CLIENT_ID` (`:2-5`) and a `window.location.href` redirect (`:8`).
- `services/AuthCallback.ts` (31) — a react-router + axios callback page that POSTed the OAuth `?code=` to a placeholder backend (`:12-14`).
- `services/api.ts` (10) — axios client with a placeholder `baseURL` and a `generateEnrollmentLink` call (`:4-8`).
- `services/directus.ts` (17) — axios client for a Directus CMS via `import.meta.env.VITE_API_URL` (`:3`, `:9-17`).
- `services/emailService.ts` (28) — emailjs sender with hardcoded service/template IDs (`:4-6`).
- `utils/tokens.ts` (56) — `generateVerificationToken` (`:7-33`) and `generatePasswordResetToken` (`:35-56`): uuid tokens, 1-hour expiry (`:11`), Prisma reads/writes, built on the missing `@/lib/db` and `@/data/*` modules (`:1-4`).
- `utils/middleware.ts` (45) — the parked middleware: wraps `NextAuth(authConfig)` (`:10-12`), imports the four constants from `@/index` (`:3-8`), lets `/api/auth/*` through (`:24-26`), bounces logged-in users off authRoutes to `DEFAULT_LOGIN_REDIRECT` (`:28-31`), and sends unauthenticated strangers to `/auth/register` (`:35-37`), with a matcher at `:43-45`.
- `utils/db.ts` (10) — the standard Prisma singleton (`:2-10`).
- `utils/mail.ts` (43) — Resend + `@react-email` render for the verification email (`:9-28`) and password-reset email (`:30-43`); `RESEND_API_KEY` at `:6`, links into `/auth/new-verification` (`:13`) and `/auth/new-password` (`:34`).

You are looking at three server generations stacked in one directory: emailjs/Firebase-era, Vite + react-router + axios-era, and finally NextAuth v5 + Prisma + Resend. Only the newest generation is the one to rebuild on.

### Stop 6 — The rest of the portal story (~2 min, 254 lines)

Six sibling files in the same parking lot. Skim, don't study:

- `Dashboard/Dashboard.tsx` (53 lines, **not** commented) — a hardcoded student-LMS mockup: a "LuminAI Innovate Scholars (Summer 2024)" course card with a fixed 93% progress bar (`:12-25`) and a due-assignments list (`:32-38`). This is what `/dashboard` would render after sign-in.
- `Dashboard/Sidebar.tsx` (43, not commented) — icon rail nav: Dashboard, Courses, Calendar, Inbox, History, Help (`:13-20`), with a placeholder avatar at `/path-to-avatar.png` (`:26`).
- `Dashboard/TodoList.tsx` (74, not commented) — right-hand "To Do" panel with hardcoded assignments (`:5-17`), Announcements (`:52-63`), and Recent Feedback (`:65-72`).
- `generateEnrollmentLink.ts` (15, commented) — the admin side of onboarding: writes a uuid token to a Firestore `enrollmentTokens` collection (`:6`) and returns a `/enroll?token=…` link (`:12`). Firestore, not Prisma — the oldest generation.
- `SendEnrollmentLink.tsx` (33, commented) — the admin form that calls it (`:8-12`) and shows the resulting link.
- `Inquiry.tsx` (36, commented) — a contact page wrapping the still-active `src/components/ContactForm` (`:28`), dressed in tanstack-router (`:10`) and `react-helmet-async` (`:21`) relics.

The connection to the auth module: `handlePostAuth` sends returning students to `/dashboard` (AuthForm.tsx `:147`), and the Dashboard trio is the other end of that redirect. Enrollment links were how students got accounts before NextAuth existed.

## Glossary — as these terms are used here

- **Auth.js / NextAuth v5** — `next-auth@5.0.0-beta.25` (package.json:30), the framework the portal was being rebuilt on. Convention it assumes: a root `auth.ts` exporting `{ handlers, auth, signIn, signOut }`, which the parked route handler imports as `@/../auth` (route.ts:1).
- **provider** — a sign-in method configured in that auth config. This code assumes four: `credentials` (email + password) plus OAuth `google`, `discord`, `github` (AuthForm.tsx:66, 231, 238, 245).
- **`signIn('credentials', { redirect: false })`** — the client helper from `next-auth/react` (AuthForm.tsx:11). `redirect: false` returns a result object instead of navigating, so the form can toast the error (`:72`) or fetch the session itself (`:140`).
- **session / `session.user.firstTime`** — the session object served by `/api/auth/session`. `firstTime` is not a NextAuth field; it is a custom augmentation this codebase assumes (`AuthForm.tsx:144`) that some auth-config callback must supply. None exists yet, so as written `firstTime` would be `undefined` and every sign-in would land on `/dashboard`.
- **route handler `[...nextauth]`** — the App Router catch-all at `src/app/api/auth/[...nextauth]/route.ts` that hands `GET`/`POST` to NextAuth's `handlers`. Here it survives as a two-line comment (`route.ts:1-2`).
- **middleware route guarding** — the pattern in `utils/middleware.ts`: `publicRoutes` bypass, `authRoutes` bounce logged-in users to `DEFAULT_LOGIN_REDIRECT`, `apiAuthPrefix` passes through, everyone else is redirected to `/auth/register` (`:24-38`), with the four lists imported from root `index.ts` (`:3-8`).
- **zodResolver** — the `@hookform/resolvers/zod` adapter (AuthForm.tsx:8, `:59`) that makes react-hook-form validate through the zod schema each page passes in.
- **sonner toasts** — the toast library (`sonner ^1.5.0`, package.json:38). AuthForm imports `Toaster` and `toast` (`:25`) and toasts every outcome — errors at `:72`, `:89`, `:108`, `:114`; successes at `:91` and `:110`.

## If you were to wire this up

The minimum set of artifacts to make `/auth/login` actually work, in dependency order:

1. **Re-export the three pages under the App Router**: `src/app/auth/login/page.tsx`, `src/app/auth/register/page.tsx`, `src/app/auth/reset-password/page.tsx`, each re-exporting the parked component. Until this exists, nothing routes (`src/app/auth/` does not exist — verified).
2. **A root `auth.ts`** holding the NextAuth v5 config (providers + callbacks), because the parked handler imports `@/../auth` (route.ts:1).
3. **The route handler**: `src/app/api/auth/[...nextauth]/route.ts` exporting `GET`/`POST` from that config — the two commented lines' intent (route.ts:1-2). There is no `src/app/api/` today.
4. **Provider config**: a Credentials provider backed by a user lookup, plus google/discord/github OAuth providers with their client IDs and secrets. The buttons already call all three (`AuthForm.tsx:231-245`).
5. **A jwt/session callback that sets `session.user.firstTime`** and flips it once onboarding completes — `handlePostAuth` forks on it (`AuthForm.tsx:144-148`).
6. **`POST /api/auth/signup`** — the register form's fetch target (`AuthForm.tsx:80`): create the user with a hashed password, and send the verification email the success toast promises (`:91-93`).
7. **`POST /api/auth/reset-password`** — the reset form's fetch target (`AuthForm.tsx:99`): uncomment and repair `generatePasswordResetToken` (tokens.ts:35) and the Resend sender (mail.ts:30-43), creating the missing `@/lib/db`, `@/data/password-reset-token`, and `@/emails/*` modules on the way.
8. **`/dashboard` and `/onboarding` pages** — the two redirect targets (`AuthForm.tsx:145,147`). The Dashboard/Sidebar/TodoList mockups are ready-made material for `/dashboard`.
9. **Optionally, the middleware**: copy `utils/middleware.ts` to `src/middleware.ts` (there is none today), and while at it resolve the `/auth/reset` vs `/auth/reset-password` mismatch (index.ts:11) and the array hole (index.ts:3).
10. **Env vars**: `RESEND_API_KEY` is named literally in the parked code (mail.ts:6); the rest are whatever names your `auth.ts` reads — conventionally `AUTH_SECRET` plus client id/secret pairs for google, discord, and github, and a `DATABASE_URL` if Prisma returns.

---

*Provenance: every path and `file:line` above was verified this session (2026-10-09) against `main` at commit `c3b8063`, via `cat -n` for line numbers and `wc -l` for line counts. The `src/[to-be-implemented]/` tree was unmodified; this document is the only file added.*
