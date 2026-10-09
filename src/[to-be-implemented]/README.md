# `src/[to-be-implemented]`

Staging area for the LuminAI app's auth / enrollment backend, typed and
validated as strict contracts. Everything in this directory is compiled and
type-checked by `tsc --noEmit` and covered by contract tests, but the Next.js
app currently renders only from `src/app/` — this code becomes live when its
pages/routes are wired into the app tree.

## Layout

- `contracts/` — shared boundary primitives. Import from `@/[to-be-implemented]/contracts`.
  - `ContractError` — thrown (or returned) on boundary rejection. Fields: `code` (stable machine code), `message` (specific, actionable), `issues` (per-field).
  - `parseOrThrow(schema, input)` — strict parse; throws `ContractError` (`SCHEMA_VALIDATION_FAILED`) with a specific message.
  - `safeParse(schema, input)` — non-throwing parse; returns `{ ok: true, data } | { ok: false, error }`.
  - Shared schemas: `EmailAddressSchema`, `UuidTokenSchema`, `HttpsUrlSchema`, `OriginUrlSchema`, `RoutePathSchema`, `DataCollectionNameSchema`, `CourseNameSchema`.
- `vitest.config.ts` — test runner config. Run: `npm test` (from repo root).

## Contract conventions

1. **Every public function's inputs and outputs are fully typed** — no `any`,
   no unchecked casts, no implicit optionals. Public surface is explicit.
2. **Every input that crosses a trust boundary is validated at runtime** with
   zod: user-typed form values, request bodies, URL parameters, environment
   variables, network response bodies, and anything read from a data store.
   Rejections carry specific messages naming the field and the expectation.
3. **Infrastructure is injected through port types** (data stores, mailers,
   HTTP). Concrete SDKs are wired by the caller. This keeps the modules
   dependency-light and the contracts testable without external services.
4. **Expected failures are values, not crashes**: modules return typed
   discriminated results or throw `ContractError` — never bare strings or
   untyped errors — so misuse fails loudly at the boundary.
5. **Contract tests** live next to their module under `__tests__/` and call
   each public function with valid, boundary, and invalid input, asserting
   exact error codes and messages.

## Running checks

From the repository root:

```
npm test          # contract tests (vitest)
npm run typecheck # tsc --noEmit over the whole repo
npm run lint      # next lint
npm run build     # next build
```
