# 03 — Deep dive: `AuthForm.tsx` and `AuthButtons.tsx`

Part 03 of the `[to-be-implemented]` auth-portal documentation series.

**Scope of this document.** `src/components/auth/AuthForm.tsx` and `src/components/auth/AuthButtons.tsx` are the only *live* (non-commented, fully typed) pieces of the parked auth portal. They sit in the active tree, are typechecked by `tsc`, and are imported by exactly three files — the parked pages `src/[to-be-implemented]/auth/login/page.tsx:4`, `register/page.tsx:4`, and `reset-password/page.tsx:4` (verified by grep for `AuthForm` imports repo-wide). Because those pages live under `src/[to-be-implemented]/` and not under `src/app/`, Next.js never routes them; `src/app/` contains only `about`, `faq`, `programs`, the root `page.tsx`, `layout.tsx`, `globals.css`, fonts, and `favicon.ico` (verified by `find src/app -type f`). Every consumer-facing claim below is therefore about code that currently never executes in the deployed site.

**Conventions.** Line numbers refer to the file at commit `c3b8063` (branch point `main`), read this session with `cat -n`. Quoted code is verbatim.

---

## 1. Props contract

`AuthFormProps` — `src/components/auth/AuthForm.tsx:33-38`:

```tsx
interface AuthFormProps {
  mode: "signin" | "signup" | "resetPassword";
  schema: ZodSchema;
  children: React.ReactNode;
  csrfToken?: string;
}
```

| Prop | Type | Required | Used? | Notes |
|---|---|---|---|---|
| `mode` | `"signin" \| "signup" \| "resetPassword"` | yes | yes | Selects fields rendered, submit path, heading, and button label (lines 173-177, 181, 190, 209, 229) |
| `schema` | `ZodSchema` | yes | yes | Fed to `zodResolver(schema)` at line 59 |
| `children` | `React.ReactNode` | yes | yes | Rendered below the social buttons at line 250; the three pages pass their cross-page links here |
| `csrfToken` | `string` (optional) | no | **no — dead** | Declared at line 37 and destructured at line 47, then never referenced again. `grep -n csrfToken src/components/auth/AuthForm.tsx` returns only lines 37 and 47. Flagged dead. |

How each page instantiates the contract (all verified this session):

- Login: `<AuthForm mode="signin" schema={LoginSchema}>` — `src/[to-be-implemented]/auth/login/page.tsx:9`; children link to `/auth/reset-password` (line 12) and `/auth/register` (line 23).
- Register: `<AuthForm mode="signup" schema={RegisterSchema}>` — `src/[to-be-implemented]/auth/register/page.tsx:10`; children link to `/auth/login` (line 16).
- Reset: `<AuthForm mode="resetPassword" schema={ResetSchema}>` — `src/[to-be-implemented]/auth/reset-password/page.tsx:11`; children link to `/auth/login` (line 17).

Note the optional `csrfToken` prop exists but no caller passes it, and the component never reads it. In a classic NextAuth (v4 non-app-router) form this token is used for CSRF protection on credentials posts; here the credentials flow goes through `signIn()` from `next-auth/react`, which handles CSRF internally — the prop is vestigial even for its era.

The schemas come from `src/schema/index.ts`: `LoginSchema` (lines 11-21), `RegisterSchema` (lines 23-46), `ResetSchema` (lines 54-58). Password rules differ per schema: login requires `min(1)` and forbids spaces (lines 15-20); register requires 8-32 chars and forbids spaces (lines 37-45). `ResetSchema` validates `email` only (lines 54-58).

## 2. Form machinery

**Setup** — `AuthForm.tsx:54-60`:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FieldValues>({
  resolver: zodResolver(schema),
});
```

- `useForm` is from `react-hook-form` (import, line 7), the resolver from `@hookform/resolvers/zod` (line 8). Both are declared dependencies: `react-hook-form ^7.53.2` (`package.json:33`), `@hookform/resolvers ^3.9.1` (`package.json:13`).
- The generic parameter is the locally declared `FieldValues` interface (`AuthForm.tsx:40-45`), not a per-mode type:

```tsx
interface FieldValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
```

  Consequence: the form's *type* always allows all four fields; which fields actually exist is decided at render time by the current `mode`, not by types. There is no compile-time guarantee, for example, that `RegisterSchema`'s `firstName`/`lastName` (required, `src/schema/index.ts:24-33`) line up with the optional `firstName?`/`lastName?` here — the zod resolver and react-hook-form's generic are only loosely coupled.

**Field registration per mode** (all `{...register(...)}` calls verified by reading the JSX):

| Field | `signin` | `signup` | `resetPassword` | Registered at |
|---|---|---|---|---|
| `firstName` | — | yes | — | `AuthForm.tsx:184` (input lines 181-188) |
| `lastName` | — | yes | — | `AuthForm.tsx:193` (input lines 190-197) |
| `email` | yes | yes | yes | `AuthForm.tsx:201` (input lines 199-204) |
| `password` | yes | yes | — | `AuthForm.tsx:213` (input lines 209-223; block gated on `mode !== "resetPassword"` at line 209) |

The gating conditions: `mode === "signup" &&` before the name fields (lines 181, 190) and `mode !== "resetPassword" &&` before the password block (line 209). The email input is unconditional.

**Inline error rendering.** Only two fields render an error message:

- Email — `AuthForm.tsx:205-207`:
  ```tsx
  {errors.email && (
    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
  )}
  ```
- Password — `AuthForm.tsx:217-221` (same pattern, plus `pb-1`).

There is **no inline error paragraph for `firstName`/`lastName`**. Their validation failures surface only as pink input styling from the `inputClassNames` helper (`AuthForm.tsx:151-159`, which appends `border-pink-500 text-pink-600 …` when `errors[field]` is set, lines 154-156). So the `RegisterSchema` messages "Name is required" / "Name is too long" (`src/schema/index.ts:25,27,30,32`) are computed by the resolver but never displayed as text — a UX gap to fix when the portal is revived.

## 3. Submit paths per mode

`onSubmit` (`AuthForm.tsx:62-118`, typed `SubmitHandler<FieldValues>`) wraps everything in `setIsLoading(true)` / `try` / `catch` / `finally setIsLoading(false)` (lines 63, 113-114, 115-117).

**`signin`** — NextAuth credentials flow, `AuthForm.tsx:65-76`:

```tsx
if (mode === "signin") {
  await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  }).then((result) => {
    if (result && result.error) {
      toast.error(result.error);
    } else {
      handlePostAuth();
    }
  });
```

`signIn` is from `next-auth/react` (line 11); `redirect: false` keeps the result in-band so `result.error` can be toasted (line 72) and success can fall through to `handlePostAuth()` (line 74). `next-auth` is pinned at `5.0.0-beta.25` (`package.json:30`).

**`signup`** — raw fetch to a nonexistent endpoint, `AuthForm.tsx:80-86` (quoted exactly):

```tsx
const response = await fetch("/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

then `const result = await response.json();` (line 87); `result.error` → `toast.error` (lines 88-89); success → `toast.success("Registration successful, please check your email to verify your account.")` (lines 91-93), followed by the stray comment `// email?` (line 94).

**`resetPassword`** — raw fetch to a nonexistent endpoint, `AuthForm.tsx:99-105` (quoted exactly):

```tsx
const response = await fetch("/api/auth/reset-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: data.email }),
});
```

then `const result = await response.json();` (line 106); error → toast (lines 107-108); success → `toast.success("Password reset email sent.")` (line 110).

**Endpoint reality check (verified this session).**

- `grep -rn "api/auth/signup"` over `*.ts *.tsx *.js *.jsx` (excluding `node_modules`) returns **exactly one hit**: `src/components/auth/AuthForm.tsx:80`. No route handler defines it.
- `grep -rn "api/auth/reset-password"` returns **exactly one hit**: `src/components/auth/AuthForm.tsx:99`. No route handler defines it.
- `src/app/api` does not exist — `ls src/app/api` → `No such file or directory`; the full `src/app` tree (see header) contains no `api` directory. The only auth API route in the repo is the parked, fully commented-out `src/[to-be-implemented]/api/auth/[...nextauth]/route.ts`, whose entire content is:
  ```ts
  // import { handlers } from "@/../auth"
  // export const { GET, POST } = handlers
  ```
  (verified with `cat -n`; `auth.ts` exists at neither the repo root nor `src/` — `ls auth.ts src/auth.ts` fails on both). Even that parked catch-all would only ever serve `/api/auth/*` NextAuth handlers, not the bespoke `/signup` or `/reset-password` endpoints.
- Net effect: in `signup` and `resetPassword` modes the submit would hit Next.js dev/prod 404 pages, whose HTML body would then blow up `await response.json()` (lines 87, 106) and land in the generic `catch` → `toast.error("An error occurred.")` (lines 113-114).

## 4. Post-auth navigation

`handlePostAuth` — `AuthForm.tsx:139-149`, quoted in full:

```tsx
const handlePostAuth = async () => {
  const session = await fetch("/api/auth/session").then((res) => res.json());
  // if (!session.user.emailVerified) {
  //   router.push('/confirm-email');
  // } else
  if (session.user.firstTime) {
    router.push("/onboarding");
  } else {
    router.push("/dashboard");
  }
};
```

- Line 140 fetches `/api/auth/session` — the standard NextAuth session endpoint. `grep -rn "api/auth/session"` returns exactly one hit: `AuthForm.tsx:140`. The route that would answer it in production (the `[...nextauth]` catch-all) is the commented-out parked file quoted above, and `src/app/api` does not exist — so this fetch is also aimed at a missing endpoint in the current tree.
- Lines 141-143 are a commented-out `emailVerified` check that would have routed to `/confirm-email`; the `else` keyword dangling at the end of line 143 is what makes the uncommented `if` on line 144 syntactically valid.
- Branching: `session.user.firstTime` (line 144) → `router.push("/onboarding")` (line 145), else `router.push("/dashboard")` (line 147). `router` is `useRouter()` from `next/navigation` (lines 20, 48), with the author's own TODO at line 19: *"ensure change to server (redirect instead of useRouter) for performance and SEO"*.
- Neither target exists: `ls src/app/onboarding src/app/dashboard` → `No such file or directory` for both; the `src/app` tree has only `about`, `faq`, `programs`, and the root page.
- `grep -rn "firstTime"` over `*.ts *.tsx *.js *.jsx` (excluding `node_modules`) returns exactly one hit: `AuthForm.tsx:144`. **Nothing in the repo ever sets `session.user.firstTime`** — no NextAuth config exists that could enrich the session with it (there is no `auth.ts` anywhere; see section 3). Even if the session endpoint existed, the flag would always be `undefined` and every sign-in would land on `/dashboard` — which also does not exist.

## 5. Social buttons

**Providers wired:** Google, Discord, GitHub — via `handleSignIn("google")`, `handleSignIn("discord")`, `handleSignIn("github")` (`AuthForm.tsx:231, 238, 245`), each calling the provider-by-name overload of NextAuth's `signIn`:

`AuthForm.tsx:120-137`:

```tsx
const handleSignIn = async (provider: string = "") => {
  setIsLoading(true);
  try {
    if (provider) {
      await signIn(provider, { redirect: false }).then((result) => {
        if (result && result.error) {
          console.error(result.error);
        } else {
          handlePostAuth();
        }
      });
    }
  } catch (error) {
    toast.error("An error occurred: " + error);
  } finally {
    setIsLoading(false);
  }
};
```

- The **empty-provider guard** is `if (provider) { … }` at line 123: a defaulted-optional `provider: string = ""` (line 120) that would otherwise be forwarded to `signIn("")`. Note the guard silently *swallows* an empty call (no toast, no log) rather than rejecting it.
- On OAuth error the code uses `console.error(result.error)` (line 126) — **not** `toast.error` like the credentials path (line 72) — so the user gets no visible feedback for a failed social sign-in, only a console line. Inconsistency worth flagging for the revival.
- Success still funnels through `handlePostAuth()` (line 128), i.e. the same `/api/auth/session` → `/onboarding`-or-`/dashboard` routing as section 4.
- The three buttons render only for `signin`/`signup` modes (`mode === "signin" || mode === "signup" &&` guards at `AuthForm.tsx:229, 236, 243`); the reset screen shows no social options.

**Where the buttons come from.** All four are imported from `./AuthButtons` (`AuthForm.tsx:12-17`) and defined in `src/components/auth/AuthButtons.tsx` as `'use client'` components (line 1, with the comment "this component HAS TO BE use client" at line 2):

- `GoogleSignInButton` — lines 20-32, `FaGoogle` icon from `react-icons/fa` (line 6).
- `DiscordSignInButton` — lines 34-46, `FaDiscord`.
- `GithubSignInButton` — lines 48-60, `FaGithub`.
- `EmailSignInButton` — lines 62-76, `LogIn` icon from `lucide-react` (line 7); rendered *inside* the `<form>` at `AuthForm.tsx:225` as its `type="submit"` button (AuthButtons.tsx line 67). Its label is mode-dependent: `'Sign In' | 'Sign Up' | 'Reset Password'` (line 73).

Shared prop types: `OAuthButtonProps` (`AuthButtons.tsx:9-13`: optional `buttonText`, required `handleClick`, optional `isLoading`) and `EmailSignInButtonProps` (lines 15-18: optional `mode`, required `isLoading`). All buttons are `framer-motion` `m.button`s (`whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`, e.g. lines 23-24) with `disabled={isLoading}` (lines 27, 41, 55, 69) and the `Loading...` label swap (lines 29, 43, 57, 73). `framer-motion ^11.5.6`, `react-icons ^5.3.0`, and `lucide-react ^0.445.0` are declared deps (`package.json:25, 34, 28`).

## 6. Loading and error UX

- **`isLoading`** — plain `useState(false)` (`AuthForm.tsx:49`), set `true` at the top of `onSubmit` (line 63) and `handleSignIn` (line 121), cleared in `finally` (lines 116, 135). It threads into every button: `EmailSignInButton mode={mode} isLoading={isLoading}` (line 225) and each social button (lines 230-247). Effect: during any submit/OAuth call all buttons disable and swap to `Loading...` (AuthButtons.tsx lines 27/29, 41/43, 55/57, 69/73).
- **Toasts** — `toast` from `sonner` (import line 25; `sonner ^1.5.0` at `package.json:38`). Fired on: credentials error (line 72), signup error/success (lines 89, 91-93), reset error/success (lines 108, 110), generic catch (line 114), OAuth catch (line 133). Notably *not* on OAuth `result.error` (console only, line 126 — see section 5).
- **`<Toaster />` is never mounted — flag this.** `Toaster` is imported at `AuthForm.tsx:25` but never rendered in the component's JSX (verified by reading lines 161-254; no `<Toaster` appears). Repo-wide grep for `Toaster` finds only the unused import plus commented-out occurrences (`src/components/ContactForm.tsx:6,51`, `src/components/ToastNotif.tsx:19`). So even if the parked pages were routed, every `toast.*` call above would be a no-op on screen — sonner requires a mounted `<Toaster />` to display. Any revival of this portal must mount one (typically in `layout.tsx`).
- **`isPending` from `useTransition` is dead — flag this.** Line 50: `const [isPending, startTransition] = useTransition();`. `grep -n "isPending\|startTransition"` returns only line 50: `startTransition` is never called and `isPending` never appears in the JSX. The entire `useTransition()` allocation is dead code and can be dropped on revival.

## 7. Dead or suspect code inventory

Everything below is visible in the file as of `c3b8063`:

| Location | What | Status |
|---|---|---|
| `AuthForm.tsx:1` | `/* eslint-disable @typescript-eslint/no-unused-vars */` | Blanket suppression that hides the unused imports below from lint |
| `AuthForm.tsx:5` | `// import { useSession, signIn, signOut } from 'next-auth/react';` | Commented-out duplicate of the line-11 import |
| `AuthForm.tsx:6` | `import { z, ZodSchema } from "zod";` | `z` itself is never used (only `ZodSchema` in the props type, line 35) |
| `AuthForm.tsx:10` | `// import { useAuth } from '@/context/AuthProvider';` | Commented out; no `@/context/AuthProvider` exists in the repo |
| `AuthForm.tsx:11` | `import { useSession, signIn } from "next-auth/react";` | `signIn` is used (lines 66, 124); **`useSession` is not** (grep: only lines 5, 11) |
| `AuthForm.tsx:21` | `import Email from "next-auth/providers/email";` | **Unused** — a *provider definition* imported into a client component; no reference to `Email` anywhere else in the file (grep: line 21 and the unrelated `placeholder="Email"` string at line 202) |
| `AuthForm.tsx:22-24` | Commented-out shadcn/ui `Form`/`Input`/`Button` imports | None of `@/components/ui/*` exists in the repo |
| `AuthForm.tsx:25` | `import { Toaster, toast } from "sonner";` | `toast` used; **`Toaster` never rendered** (section 6) |
| `AuthForm.tsx:26` | `import { callbackify } from "util";` | **Unused Node builtin** (`node:util`) imported into a `'use client'` component — would be a server-only concept in a client bundle; grep: line 26 only. Classic sign of file history copied from a server-side NextAuth template |
| `AuthForm.tsx:29-31` | `interface Errors { [key: string]: string \| undefined; }` | Declared, never referenced (grep: line 29 only) |
| `AuthForm.tsx:50` | `useTransition()` tuple | Both `isPending` and `startTransition` unused (section 6) |
| `AuthForm.tsx:37, 47` | `csrfToken` prop | Declared/destructured, never read (section 1) |
| `AuthForm.tsx:141-143` | Commented-out `emailVerified` → `/confirm-email` branch | Route does not exist in `src/app` |
| `AuthForm.tsx:183, 192` | `<input type="name" …>` | **`"name"` is not a valid HTML input type.** The WHATWG HTML Standard's input-type keywords are the list including `text`, `search`, `url`, `tel`, `email`, `password`, date/time types, `number`, `range`, `color`, `checkbox`, `radio`, `file`, and the button types — there is no `name` keyword, so browsers fall back to the `text` state (HTML-standard behavior, from training data — not re-verified against the spec this session). The rendered behavior is therefore "works like text", but the attribute should be `type="text"` (or dropped) when revived |
| `AuthForm.tsx:94` | Stray `// email?` comment | Unresolved authoring note in the signup success path |

Nothing in `AuthButtons.tsx` is dead; its only quirk is that `buttonText` (lines 10, 29/43/57) is accepted but never passed by `AuthForm.tsx`, so every social button renders its default label.

---

## Verified claims

Every claim below was verified this session against commit `c3b8063` in the working clone, by reading files with `cat -n` or by the named grep/`ls`/`find` run. Line numbers are exact.

1. `AuthForm.tsx` is a `"use client"` module — `src/components/auth/AuthForm.tsx:2`.
2. Props contract is `mode`, `schema: ZodSchema`, `children`, optional `csrfToken` — `AuthForm.tsx:33-38`; destructured at line 47.
3. `csrfToken` appears only at `AuthForm.tsx:37` (declaration) and `:47` (destructure); never used. (grep `csrfToken` → 2 hits)
4. `useForm<FieldValues>` with `resolver: zodResolver(schema)` — `AuthForm.tsx:54-60`; `FieldValues` at lines 40-45.
5. Field registration: `firstName` line 184, `lastName` line 193, `email` line 201, `password` line 213; signup-only gating lines 181/190; password hidden in reset mode at line 209.
6. Inline error paragraphs exist only for `email` (`AuthForm.tsx:205-207`) and `password` (`AuthForm.tsx:217-221`); name fields get styling-only feedback via `inputClassNames` (`AuthForm.tsx:151-159`).
7. Sign-in path: `signIn("credentials", { redirect: false, email, password })` — `AuthForm.tsx:66-69`; error toast line 72; `handlePostAuth()` line 74.
8. Signup fetch is `fetch("/api/auth/signup", { method: "POST", … body: JSON.stringify(data) })` — `AuthForm.tsx:80-86`; result parsed line 87; toasts lines 88-93.
9. Reset fetch is `fetch("/api/auth/reset-password", { method: "POST", … body: JSON.stringify({ email: data.email }) })` — `AuthForm.tsx:99-105`; toasts lines 108, 110.
10. `grep -rn "api/auth/signup"` → only `AuthForm.tsx:80`; `grep -rn "api/auth/reset-password"` → only `AuthForm.tsx:99`; `grep -rn "api/auth/session"` → only `AuthForm.tsx:140`. No route handler defines any of the three.
11. `src/app/api` does not exist (`ls src/app/api` → No such file or directory); `find src/app -type f` lists only `about/`, `faq/`, `programs/`, `page.tsx`, `layout.tsx`, `globals.css`, fonts, `favicon.ico`.
12. The only auth API route is the commented-out `src/[to-be-implemented]/api/auth/[...nextauth]/route.ts:1-2` (`// import { handlers } from "@/../auth"` / `// export const { GET, POST } = handlers`); no `auth.ts` exists at repo root or `src/` (`ls auth.ts src/auth.ts` fails both).
13. `handlePostAuth` fetches `/api/auth/session` and reads `session.user.firstTime` — `AuthForm.tsx:140, 144`; routes to `/onboarding` (line 145) or `/dashboard` (line 147); commented-out `/confirm-email` branch at lines 141-143.
14. `grep -rn "firstTime"` → only `AuthForm.tsx:144`; nothing in the repo sets it. `src/app/onboarding` and `src/app/dashboard` do not exist (`ls` fails both).
15. Social providers are google/discord/github via `handleSignIn` calls at `AuthForm.tsx:231, 238, 245`; `handleSignIn` guards `if (provider)` at line 123 and defaults `provider: string = ""` at line 120; OAuth errors go to `console.error` (line 126), not toast.
16. The four buttons are imported from `./AuthButtons` (`AuthForm.tsx:12-17`) and defined in `src/components/auth/AuthButtons.tsx` (Google 20-32, Discord 34-46, Github 48-60, Email 62-76), all `m.button` with `disabled={isLoading}` (27/41/55/69); `EmailSignInButton` is the form's `type="submit"` (line 67) rendered at `AuthForm.tsx:225`.
17. Social buttons render only in signin/signup modes — guards `AuthForm.tsx:229, 236, 243`.
18. `isLoading` state at `AuthForm.tsx:49`, set at 63/121, cleared at 116/135; threaded into all four buttons (225, 230-247).
19. `Toaster` is imported (`AuthForm.tsx:25`) but never rendered in JSX; repo-wide `Toaster` grep finds only that import plus commented lines in `src/components/ContactForm.tsx:6,51` and `src/components/ToastNotif.tsx:19` — no mounted `<Toaster />` anywhere.
20. `isPending`/`startTransition` from `useTransition()` — `AuthForm.tsx:50` — are never used (grep: line 50 only). Dead.
21. Dead/unused imports: `z` (line 6, only `ZodSchema` used at line 35), `useSession` (line 11), `Email` from `next-auth/providers/email` (line 21), `Toaster` (line 25), `callbackify` from `"util"` (line 26); unused `Errors` interface (lines 29-31); commented-out imports at lines 5, 10, 22-24; blanket `eslint-disable @typescript-eslint/no-unused-vars` at line 1. All confirmed by grep of the whole file.
22. `<input type="name">` appears at `AuthForm.tsx:183` and `:192`. `"name"` is not a valid HTML input-type keyword per the WHATWG HTML Standard (browsers fall back to `text`) — HTML-spec knowledge from training data, not re-verified against the spec this session; the line numbers themselves are verified.
23. Pages pass: `mode="signin"` + `LoginSchema` (`login/page.tsx:9`), `mode="signup"` + `RegisterSchema` (`register/page.tsx:10`), `mode="resetPassword"` + `ResetSchema` (`reset-password/page.tsx:11`); child links to `/auth/reset-password` (`login/page.tsx:12`), `/auth/register` (`login/page.tsx:23`), `/auth/login` (`register/page.tsx:16`, `reset-password/page.tsx:17`).
24. Password rules: login `min(1)` + no-spaces (`src/schema/index.ts:15-20`); register 8-32 + no-spaces (`src/schema/index.ts:37-45`); `ResetSchema` is email-only (`src/schema/index.ts:54-58`).
25. Dependency versions cited: `next-auth 5.0.0-beta.25` (`package.json:30`), `react-hook-form ^7.53.2` (`:33`), `@hookform/resolvers ^3.9.1` (`:13`), `sonner ^1.5.0` (`:38`), `framer-motion ^11.5.6` (`:25`), `react-icons ^5.3.0` (`:34`), `lucide-react ^0.445.0` (`:28`), `zod ^3.23.8` (`:42`).
26. Root route constants consumed by the (absent) middleware: `authRoutes` including `'/auth/reset'` (`index.ts:11` — note the directory is `reset-password`), `apiAuthPrefix = "/api/auth"` (`index.ts:17`), `DEFAULT_LOGIN_REDIRECT = "/"` (`index.ts:20`); no `middleware.ts` at repo root or `src/` (`find -maxdepth 2 -name "middleware.*"` → no results).

**UNVERIFIED / training-data items:** only claim 22's HTML-spec assertion (browser fallback of unknown input types to `text`) is training knowledge rather than session-verified; everything else above was checked in the working clone this session.
