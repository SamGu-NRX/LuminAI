/**
 * Runnable checks for the zod schemas the parked auth module consumes.
 *
 * Source of truth: src/schema/index.ts (READ-ONLY - this script only imports it,
 * it never modifies the schemas). Documented in:
 * src/[to-be-implemented]/auth/docs/04-schemas.md (fleet part 04, schema-example).
 *
 * Run from the repo root:
 *   corepack enable
 *   corepack prepare pnpm@9.11.0 --activate
 *   pnpm install
 *   npx --yes tsx "src/[to-be-implemented]/auth/examples/validate-credentials.ts"
 *
 * Prints one "PASS: ..." (or "FAIL: ...") line per check and exits 0 only if
 * every check passes. The schemas are imported via the RELATIVE path
 * '../../../schema' (which resolves to src/schema/index.ts). The auth pages
 * themselves import via the '@/schema' alias (tsconfig.json "paths" maps
 * '@/*' to './src/*'), but the alias is avoided here so the script runs under
 * plain tsx without any path-alias resolution.
 */
import assert from 'node:assert/strict';
import { LoginSchema, RegisterSchema, ResetSchema } from '../../../schema';

/**
 * Structural view of a safeParse result so this script does not depend on a
 * specific zod type import. All issue messages of a failed parse; empty when
 * parsing succeeded.
 */
type ParseAttempt =
  | { success: true }
  | { success: false; error: { issues: Array<{ message: string }> } };

function issueMessages(result: ParseAttempt): string[] {
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
}

let passed = 0;
let failed = 0;

function check(name: string, run: () => void): void {
  try {
    run();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (error) {
    failed += 1;
    const detail = error instanceof Error ? error.message : String(error);
    console.log(`FAIL: ${name} -- ${detail}`);
  }
}

// --- LoginSchema (src/schema/index.ts:11-21) ---

check('login: valid credentials pass', () => {
  const result = LoginSchema.safeParse({
    email: 'student@example.com',
    password: 'correct-horse-battery',
  });
  assert.equal(result.success, true, result.success ? 'ok' : JSON.stringify(issueMessages(result)));
});

check('login: password containing a space is rejected with "Password cannot contain spaces"', () => {
  const result = LoginSchema.safeParse({
    email: 'student@example.com',
    password: 'pass word',
  });
  assert.equal(result.success, false, 'expected the spaced password to be rejected');
  assert.ok(
    issueMessages(result).includes('Password cannot contain spaces'),
    `expected "Password cannot contain spaces", got ${JSON.stringify(issueMessages(result))}`
  );
});

check('login: empty password is rejected with "Password is required"', () => {
  const result = LoginSchema.safeParse({
    email: 'student@example.com',
    password: '',
  });
  assert.equal(result.success, false, 'expected the empty password to be rejected');
  assert.ok(
    issueMessages(result).includes('Password is required'),
    `expected "Password is required", got ${JSON.stringify(issueMessages(result))}`
  );
});

// --- RegisterSchema (src/schema/index.ts:23-46) ---

const baseRegister = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'student@example.com',
};

check('register: 7-character password is rejected', () => {
  const result = RegisterSchema.safeParse({ ...baseRegister, password: 'a'.repeat(7) });
  assert.equal(result.success, false, 'expected a 7-character password to be rejected');
});

check('register: 8-character password is accepted', () => {
  const result = RegisterSchema.safeParse({ ...baseRegister, password: 'a'.repeat(8) });
  assert.equal(result.success, true, result.success ? 'ok' : JSON.stringify(issueMessages(result)));
});

check('register: 33-character password is rejected', () => {
  const result = RegisterSchema.safeParse({ ...baseRegister, password: 'a'.repeat(33) });
  assert.equal(result.success, false, 'expected a 33-character password to be rejected');
});

check('register: 32-character password is accepted', () => {
  const result = RegisterSchema.safeParse({ ...baseRegister, password: 'a'.repeat(32) });
  assert.equal(result.success, true, result.success ? 'ok' : JSON.stringify(issueMessages(result)));
});

check('register: 0-character first name is rejected', () => {
  const result = RegisterSchema.safeParse({
    ...baseRegister,
    firstName: '',
    password: 'a'.repeat(8),
  });
  assert.equal(result.success, false, 'expected an empty first name to be rejected');
});

check('register: 31-character last name is rejected', () => {
  const result = RegisterSchema.safeParse({
    ...baseRegister,
    lastName: 'a'.repeat(31),
    password: 'a'.repeat(8),
  });
  assert.equal(result.success, false, 'expected a 31-character last name to be rejected');
});

// --- ResetSchema (src/schema/index.ts:54-58) ---

check('reset: non-email address is rejected', () => {
  const result = ResetSchema.safeParse({ email: 'not-an-email' });
  assert.equal(result.success, false, 'expected the non-email to be rejected');
  // The custom message is bound to the .email() format check (index.ts:55-57),
  // so even a malformed-but-present email surfaces "Email is required".
  assert.ok(
    issueMessages(result).includes('Email is required'),
    `expected "Email is required", got ${JSON.stringify(issueMessages(result))}`
  );
});

// --- Summary ---

console.log('');
if (failed > 0) {
  console.log(`${passed} check(s) passed, ${failed} failed -- EXITING 1`);
  process.exit(1);
}
console.log(`ALL ${passed} CHECKS PASSED -- EXITING 0`);
process.exit(0);
