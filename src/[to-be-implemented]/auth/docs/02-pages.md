# Auth Pages — Intended Routes, Modes, and Links (part 02, page-docs)

These three page components live in the parked `src/[to-be-implemented]/auth/` tree. They are **not routed**: Next.js only routes pages under `src/app/`, and `src/app` contains only `page.tsx` for `/` (root), `/about`, `/faq`, and `/programs` — no auth pages. Each page is a small `'use client'` component that renders `<AuthForm>` from `src/components/auth/AuthForm.tsx` with a `mode` prop and a zod schema from `src/schema/index.ts`.

All line references below were verified with `cat -n` in this clone at commit `c3b8063` (full hash `c3b8063468e88c28060e24da1cf37db6a4e4be2a`).

---

## 1. Sign-in page — intended route `/auth/login`

- **File:** `src/[to-be-implemented]/auth/login/page.tsx` — **33 lines**
- **Component:** `SignInPage`, default export (line 7 declared, line 33 `export default SignInPage;`)
- **Mode/schema mapping:** `<AuthForm mode="signin" schema={LoginSchema}>` (line 9). `AuthForm` is imported from `'@/components/auth/AuthForm'` (line 4); `LoginSchema` from `'@/schema'` (line 5). In `AuthForm`, mode `"signin"` submits via next-auth `signIn("credentials", { redirect: false, ... })` (`AuthForm.tsx:65-76`), and on success `handlePostAuth` fetches `/api/auth/session` and routes to `/onboarding` if `session.user.firstTime`, else `/dashboard` (`AuthForm.tsx:139-149`). `LoginSchema` requires a valid email and a password of min 1 char with no spaces (`src/schema/index.ts:11-21`).
- **Links rendered (both as `<a href>` children of the form):**
  - `/auth/reset-password` — "Forgot password?" (line 12)
  - `/auth/register` — "Sign up" (line 23)

## 2. Registration page — intended route `/auth/register`

- **File:** `src/[to-be-implemented]/auth/register/page.tsx` — **26 lines**
- **Component:** `RegisterPage`, default export (line 7 declared, line 26 `export default RegisterPage;`)
- **Mode/schema mapping:** `<AuthForm mode="signup" schema={RegisterSchema}>` (line 10). `AuthForm` imported from `'@/components/auth/AuthForm'` (line 4); `RegisterSchema` from `'@/schema'` (line 5). In `AuthForm`, mode `"signup"` POSTs the form data to `/api/auth/signup` and toasts success ("Registration successful, please check your email to verify your account.") or the returned error (`AuthForm.tsx:80-95`). `RegisterSchema` requires firstName/lastName (1-30 chars), a valid email, and an 8-32 char password with no spaces (`src/schema/index.ts:23-46`).
- **Link rendered:**
  - `/auth/login` — "Sign in" (line 16)

## 3. Password-reset page — intended route `/auth/reset-password`

- **File:** `src/[to-be-implemented]/auth/reset-password/page.tsx` — **27 lines**
- **Component:** `ResetPasswordPage`, default export (line 7 declared, line 27 `export default ResetPasswordPage;`)
- **Mode/schema mapping:** `<AuthForm mode="resetPassword" schema={ResetSchema}>` (line 11). `AuthForm` imported from `'@/components/auth/AuthForm'` (line 4); `ResetSchema` from `'@/schema'` (line 5). In `AuthForm`, mode `"resetPassword"` POSTs `{ email }` to `/api/auth/reset-password` and toasts "Password reset email sent." on success (`AuthForm.tsx:96-111`). `ResetSchema` validates a single email field (`src/schema/index.ts:54-58`).
- **Link rendered:**
  - `/auth/login` — "Sign in" (line 17)

---

### Verified at commit

Commit `c3b8063468e88c28060e24da1cf37db6a4e4be2a` (branch base `c3b8063`, "chore: remove unnecessary console logs, add footer to non-lander pages"). Exact lines relied on:

- `src/[to-be-implemented]/auth/login/page.tsx`
  - `4  import AuthForm from '@/components/auth/AuthForm';`
  - `5  import { LoginSchema } from '@/schema';`
  - `7  const SignInPage = () => {`
  - `9      <AuthForm mode="signin" schema={LoginSchema}>`
  - `12           href="/auth/reset-password"`
  - `23           href="/auth/register"`
  - `33  export default SignInPage;`
- `src/[to-be-implemented]/auth/register/page.tsx`
  - `4  import AuthForm from '@/components/auth/AuthForm';`
  - `5  import { RegisterSchema } from '@/schema';`
  - `7  const RegisterPage = () => {`
  - `10     <AuthForm mode="signup" schema={RegisterSchema}>`
  - `16          href="/auth/login"`
  - `26  export default RegisterPage;`
- `src/[to-be-implemented]/auth/reset-password/page.tsx`
  - `4  import AuthForm from '@/components/auth/AuthForm';`
  - `5  import { ResetSchema } from '@/schema';`
  - `7  const ResetPasswordPage = () => {`
  - `11     <AuthForm mode="resetPassword" schema={ResetSchema}>`
  - `17          href="/auth/login"`
  - `27  export default ResetPasswordPage;`
- `src/schema/index.ts` — `11` `export const LoginSchema = z.object({` … `21` `})`; `23` `export const RegisterSchema = z.object({` … `46` `})` (password `.min(8)`/`.max(32)`/`.refine(noSpaces)` at lines 37-45); `54` `export const ResetSchema = z.object({` … `58` `})`.
- `src/components/auth/AuthForm.tsx` — `59` `resolver: zodResolver(schema),`; `65` `if (mode === "signin") {` … `66` `await signIn("credentials", {`; `80` `const response = await fetch("/api/auth/signup", {`; `96` `} else if (mode === "resetPassword") {`; `99` `const response = await fetch("/api/auth/reset-password", {`; `140` `const session = await fetch("/api/auth/session").then((res) => res.json());`; `144` `if (session.user.firstTime) {`; `145` `router.push("/onboarding");`; `147` `router.push("/dashboard");`.
- Routed pages in `src/app` (via `find src/app -name 'page.tsx'`): `src/app/about/page.tsx`, `src/app/faq/page.tsx`, `src/app/page.tsx`, `src/app/programs/page.tsx` — no auth routes.
