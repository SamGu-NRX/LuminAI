# 04 — Schemas the auth module consumes (`LoginSchema`, `RegisterSchema`, `ResetSchema`)

Fleet part 04 of 10 (`schema-example`). Source of truth: `src/schema/index.ts`
(READ-ONLY in this task — not modified by this part). Every line number below
was verified this session via `cat -n` at base commit `c3b8063`. The message
strings were additionally confirmed at runtime by executing
`src/[to-be-implemented]/auth/examples/validate-credentials.ts` (see the last
section) — all 10 checks exit 0.

## Consumption map

| Schema | Defined | Imported by the parked page | Bound into the form |
|---|---|---|---|
| `LoginSchema` | `src/schema/index.ts:11` | `src/[to-be-implemented]/auth/login/page.tsx:5` — `import { LoginSchema } from '@/schema'` | `login/page.tsx:9` — `<AuthForm mode="signin" schema={LoginSchema}>` |
| `RegisterSchema` | `src/schema/index.ts:23` | `src/[to-be-implemented]/auth/register/page.tsx:5` — `import { RegisterSchema } from '@/schema'` | `register/page.tsx:10` — `<AuthForm mode="signup" schema={RegisterSchema}>` |
| `ResetSchema` | `src/schema/index.ts:54` | `src/[to-be-implemented]/auth/reset-password/page.tsx:5` — `import { ResetSchema } from '@/schema'` | `reset-password/page.tsx:11` — `<AuthForm mode="resetPassword" schema={ResetSchema}>` |

`AuthForm` receives the schema as a prop (`src/components/auth/AuthForm.tsx:35`
— `schema: ZodSchema`) and hands it to react-hook-form via
`zodResolver(schema)` (`AuthForm.tsx:59`). These three schemas are therefore
the entire client-side validation gate for the parked auth pages, and the form
renders each issue's `message` verbatim: email errors at `AuthForm.tsx:205-207`,
password errors at `AuthForm.tsx:217-221`.

## The `noSpaces` helper — `src/schema/index.ts:3-9`

```ts
const noSpaces = (value: string) => {
  if (value.includes(' ')) {
    return false
  } else {
    return true
  }
}
```

It rejects exactly the literal space character U+0020 (the `' '` check on line
4). Tabs, newlines, and other whitespace pass. It is module-private (no
`export`) and is referenced by three refines: `LoginSchema.password`
(`index.ts:18`), `RegisterSchema.password` (`index.ts:43`), and the unused
`NewPasswordSchema` (`index.ts:66`).

## `LoginSchema` — `src/schema/index.ts:11-21`

```ts
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .refine(noSpaces, {
      message: 'Password cannot contain spaces'
    })
})
```

- `email` (line 12): `z.string().email()` — format check only, no custom
  message, so zod's built-in `"Invalid email"` is what surfaces (confirmed at
  runtime with the installed zod).
- `password` (lines 13-20): `.string()` (14) + `.min(1, { message: 'Password is required' })`
  (15-17) + `.refine(noSpaces, { message: 'Password cannot contain spaces' })`
  (18-20).
- There is **no `.max()`** on the login password — see the asymmetry section
  below.

## `RegisterSchema` — `src/schema/index.ts:23-46`

- `firstName` (lines 24-28): `.string().min(1, { message: 'Name is required' })`
  (24-25) + `.max(30, { message: 'Name is too long' })` (26-27).
- `lastName` (lines 29-33): identical rules and messages (29-30 min, 31-32 max).
- `email` (line 34): `z.string().email()` — zod default `"Invalid email"`
  (confirmed at runtime).
- `password` (lines 35-45): `.string()` (36) + `.min(8, { message: 'Password cannot be shorter than 8 characters' })`
  (37-39) + `.max(32, { message: 'Password cannot be longer than 32 characters' })`
  (40-42) + `.refine(noSpaces, { message: 'Password cannot contain spaces' })`
  (43-45).

There is no `confirmPassword` field and no object-level `.refine()` — the
schema is a flat four-field object (first name, last name, email, password).

## `ResetSchema` — `src/schema/index.ts:54-58`

```ts
export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})
```

Single field, and a quirk worth knowing: the custom message is bound to the
`.email()` **format** check (lines 55-57), so a malformed-but-present email
such as `not-an-email` fails with `'Email is required'` rather than zod's
default `"Invalid email"`. Verified both by reading lines 55-57 and at runtime
(the example script asserts this exact behavior for `not-an-email`).

## Exact error-message strings users would see

| String | Emitted by | Trigger |
|---|---|---|
| `Password is required` | `LoginSchema.password` `.min(1)` — `index.ts:15-17` | Sign-in submit with an empty password field |
| `Password cannot contain spaces` | `LoginSchema.password` refine — `index.ts:18-20`; `RegisterSchema.password` refine — `index.ts:43-45` | Any U+0020 space inside the password |
| `Name is required` | `RegisterSchema.firstName` `.min(1)` — `index.ts:24-25`; `lastName` `.min(1)` — `index.ts:29-30` | Empty name field on sign-up |
| `Name is too long` | `RegisterSchema.firstName` `.max(30)` — `index.ts:26-27`; `lastName` `.max(30)` — `index.ts:31-32` | Name longer than 30 characters |
| `Password cannot be shorter than 8 characters` | `RegisterSchema.password` `.min(8)` — `index.ts:37-39` | Sign-up password of 1-7 characters |
| `Password cannot be longer than 32 characters` | `RegisterSchema.password` `.max(32)` — `index.ts:40-42` | Sign-up password of 33+ characters |
| `Email is required` | `ResetSchema.email` — `index.ts:55-57` | Malformed **or** empty email on the reset page |
| `Invalid email` (zod default — no custom message in code) | `LoginSchema.email` — `index.ts:12`; `RegisterSchema.email` — `index.ts:34` | Malformed email on sign-in or sign-up |

Rendering caveat, verified by reading `AuthForm.tsx` in full: the sign-up form
renders `firstName`/`lastName` inputs (`AuthForm.tsx:181-197`) but has **no
error `<p>` for the name fields** — `errors.firstName`/`errors.lastName` are
never rendered as text (`AuthForm.tsx` only renders `errors.email` at
205-207 and `errors.password` at 217-221). The `inputClassNames` helper does
read `errors[field]` (`AuthForm.tsx:151-159`), so an invalid name field shows
the pink error border while its `'Name is required'`/`'Name is too long'`
message stays invisible. Submission is still blocked by `zodResolver`.

## Flagged asymmetry: login password has no maximum length

- `LoginSchema.password` (`index.ts:13-20`): `.min(1)` + the no-spaces refine.
  **No `.max()`.** A 1,000-character password with no spaces passes schema
  validation at sign-in.
- `RegisterSchema.password` (`index.ts:35-45`): `.min(8)` + `.max(32)` + the
  no-spaces refine.

Consequences: the two forms present different password contracts. Registration
enforces a hard 8..32 window with two distinct error strings, while sign-in
schema-validates any length ≥ 1 — so sign-in length enforcement depends
entirely on whatever the credential backend does, not on this schema. The same
"no max" pattern repeats in the unused `NewPasswordSchema` (below).

## Schemas in `src/schema/index.ts` not consumed by auth

A repo-wide grep this session
(`grep -rn -E "WaitlistSchema|NewPasswordSchema|LoginSchema|RegisterSchema|ResetSchema" src/ --include='*.ts' --include='*.tsx'`)
matched the three auth schemas only at their definitions and the three page
import sites above. These two matched **only at their definitions** — no
importer anywhere in `src/`:

- `WaitlistSchema` — `index.ts:48-52`. `email` (49), optional `phoneNumber`
  restricted to exactly 10 digits (50), optional `countryCode` matching
  `/^\+\d{1,999}$/` (51).
- `NewPasswordSchema` — `index.ts:60-69`. `password` with
  `.min(8, { message: 'Minimum 8 characters' })` (63-65) + the no-spaces
  refine (66-68) and **no max length**.

Both are exported from the same module (`'@/schema'`) the auth pages import
from, so nothing structural blocks wiring them in later; today nothing in the
repo uses them.

## Run the checks yourself

`src/[to-be-implemented]/auth/examples/validate-credentials.ts` imports the
real schemas via the relative path `'../../../schema'` (resolves to
`src/schema/index.ts`; the pages themselves use the `'@/schema'` alias, which
`tsconfig.json:29-34` maps to `./src/*`) and asserts every rule in this
document with `node:assert`:

```bash
corepack enable
corepack prepare pnpm@9.11.0 --activate
pnpm install
npx --yes tsx "src/[to-be-implemented]/auth/examples/validate-credentials.ts"
```

It prints one `PASS:` (or `FAIL:`) line per check and exits 0 only if all
checks pass. If `corepack enable` fails with `EACCES` on `/usr/bin`, run it
with `sudo` or point it at a writable directory with
`corepack enable --install-directory ~/.local/bin`.
