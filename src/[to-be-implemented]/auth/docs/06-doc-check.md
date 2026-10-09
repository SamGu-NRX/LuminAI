# 06 — doc-check: executable structural spec of the parked auth module

`examples/doc-check.ts` is the executable form of the claims the auth documentation makes about the code. Instead of prose that can silently drift, the script reads the repo files itself and asserts those facts with `node:assert`. All matching is **content-based** (regex), never line numbers, so doc-comment insertions elsewhere cannot break it. Facts below verified against `main` at commit `c3b8063`, 2026-10-09.

## What it enforces

Nine assertion groups, one `PASS:` line each:

| # | Group | Asserted facts (content-based) |
|---|---|---|
| 1 | login page | `src/[to-be-implemented]/auth/login/page.tsx` exists; imports `AuthForm` from `@/components/auth/AuthForm` and `LoginSchema` from `@/schema`; renders `mode="signin"`; links to `/auth/reset-password` and `/auth/register` |
| 2 | register page | same pattern: `RegisterSchema`, `mode="signup"`, link to `/auth/login` |
| 3 | reset-password page | same pattern: `ResetSchema`, `mode="resetPassword"`, link to `/auth/login` |
| 4 | AuthForm submit paths | `src/components/auth/AuthForm.tsx` contains `signIn("credentials"`, a `fetch` to `/api/auth/signup`, and a `fetch` to `/api/auth/reset-password` |
| 5 | handlePostAuth | `AuthForm.tsx` defines `handlePostAuth`, fetches `/api/auth/session`, branches on `session.user.firstTime`, and pushes `/onboarding` and `/dashboard` |
| 6 | schemas | `src/schema/index.ts` exports `LoginSchema`, `RegisterSchema`, `ResetSchema` and defines the `noSpaces` helper |
| 7 | parked server files | the seven files listed below are 100% commented out |
| 8 | unrouted | `src/app` exists and contains NO `api/` directory and NO `auth/` directory |
| 9 | route constants | root `index.ts` exports `publicRoutes`, `authRoutes`, `apiAuthPrefix`, `DEFAULT_LOGIN_REDIRECT`, and `authRoutes` contains `'/auth/reset'` — the known, documented mismatch with the page directory named `reset-password` |

### The "100% commented out" check (group 7)

Files checked, all under `src/[to-be-implemented]/`: `api/auth/[...nextauth]/route.ts`, `services/auth.ts`, `services/AuthCallback.ts`, `utils/tokens.ts`, `utils/middleware.ts`, `utils/db.ts`, `utils/mail.ts`.

Two rules are applied, deliberately:

1. **General rule (all 7 files):** after stripping `//` line comments and `/* ... */` block comments with a small state machine, the file must contain **no uncommented code** — only whitespace may remain.
2. **Strict rule (6 of the 7):** every non-blank line must start with `//`.

The exception is `services/AuthCallback.ts`: it is disabled as one `/* ... */` block comment (`AuthCallback.ts:2` opens it, `AuthCallback.ts:31` closes it), so the strict per-line rule would wrongly fail it there and only the general rule applies to it. The strict rule is what holds for the other six, and either rule failing means live code has returned to a file that is documented as parked and never executed.

## How to run

From the repo root:

```bash
npx --yes tsx "src/[to-be-implemented]/auth/examples/doc-check.ts"
```

- Quote the path — `[` and `]` are glob characters in most shells.
- Paths resolve from the script's own location (`import.meta.url` + `fileURLToPath`), never from the cwd and never via the `@/` tsconfig aliases, so it runs from any cwd.
- `tsx` is deliberately NOT added as a project dependency; `npx --yes` fetches it into the npx cache. `package.json` and the lockfiles are untouched.
- Exit code `0`: every documented fact still matches the code. Exit code `1`: at least one group failed — the `FAIL: <group> — <message>` lines name exactly which assertions broke.

## What a failure means

The code and the docs have drifted, and one of the two is now wrong. The checks catch: a page file moved or renamed, a schema/mode changed, a cross-link edited, a submit path rewritten, a parked server file partially uncommented, a live `src/app/api` or `src/app/auth` route added, or the root route constants edited. Fix whichever side is wrong (the docs or the code), then re-run until it exits `0`. The script matches content, not line numbers, so ordinary doc-comment insertions in the source files cannot cause a false failure.
