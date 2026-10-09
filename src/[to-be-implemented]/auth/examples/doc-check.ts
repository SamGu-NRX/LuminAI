/**
 * doc-check.ts — executable structural spec of the parked auth module
 * (src/[to-be-implemented]/).
 *
 * Run from the repo root, or from any cwd (paths resolve from this file's own
 * location, not from the cwd and not from tsconfig '@/' aliases):
 *
 *   npx --yes tsx "src/[to-be-implemented]/auth/examples/doc-check.ts"
 *
 * What it asserts, one printed line per group (all matching is CONTENT-based
 * — regex/includes — never line numbers, so doc-comment insertions elsewhere
 * cannot break it):
 *
 *   1-3. The three auth pages (login, register, reset-password) exist and each
 *        imports '@/components/auth/AuthForm' with the right zod schema and the
 *        right mode, and renders the right cross-links.
 *   4.   src/components/auth/AuthForm.tsx contains the three submit paths:
 *        signIn("credentials", fetch('/api/auth/signup', fetch('/api/auth/reset-password'.
 *   5.   src/components/auth/AuthForm.tsx defines handlePostAuth: a
 *        /api/auth/session fetch, a session.user.firstTime branch, and pushes
 *        to /onboarding and /dashboard.
 *   6.   src/schema/index.ts defines LoginSchema, RegisterSchema, ResetSchema
 *        and the noSpaces helper.
 *   7.   The seven parked server files are 100% commented out: after stripping
 *        "//" line comments and slash-star block comments, NO uncommented code
 *        remains. The six files disabled line-by-line additionally satisfy the
 *        strict rule "every non-blank line starts with //". The exception is
 *        services/AuthCallback.ts, which is disabled as ONE slash-star block
 *        comment, so only the block-aware "no uncommented code" rule can apply
 *        to it (the strict per-line rule would wrongly fail it there).
 *   8.   src/app exists but contains NO "api" directory and NO "auth" directory
 *        — nothing from the parking lot is shadowed by a live route.
 *   9.   Root index.ts exports publicRoutes, authRoutes, apiAuthPrefix and
 *        DEFAULT_LOGIN_REDIRECT (consumed by the parked middleware), and
 *        authRoutes contains '/auth/reset' — the known, documented mismatch
 *        with the page directory named 'reset-password'.
 *
 * Exit code: 0 when every group passes; 1 when any group fails (the FAIL lines
 * name the failing assertions). A failure means the code and the docs have
 * drifted and must be reconciled — see docs/06-doc-check.md.
 */

import { strict as assert } from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Location helpers. The repo root is resolved RELATIVE TO THIS SCRIPT
// (import.meta.url + fileURLToPath) so the script runs from any cwd. The '@/'
// tsconfig aliases are deliberately never used here.
// ---------------------------------------------------------------------------

function resolveScriptDir(): string {
  try {
    if (typeof import.meta.url === "string" && import.meta.url.startsWith("file:")) {
      return dirname(fileURLToPath(import.meta.url));
    }
  } catch {
    // tsx can execute a .ts file as CommonJS when package.json has no
    // "type": "module"; in that mode import.meta.url is unavailable and the
    // __dirname fallback below applies.
  }
  if (typeof __dirname === "string" && __dirname) return __dirname;
  const argv1 = process.argv[1] ?? "";
  if (argv1) return dirname(argv1);
  return assert.fail(
    "doc-check: cannot resolve this script's directory (import.meta.url, __dirname and process.argv[1] are all unavailable)"
  );
}

const SCRIPT_DIR = resolveScriptDir();
// This file lives at src/[to-be-implemented]/auth/examples/doc-check.ts:
// examples -> auth -> [to-be-implemented] -> src -> repo root.
const REPO_ROOT = join(SCRIPT_DIR, "..", "..", "..", "..");

function readRepoFile(repoRelativePath: string): string {
  const absPath = join(REPO_ROOT, repoRelativePath);
  assert.ok(
    existsSync(absPath),
    `expected file to exist: ${repoRelativePath} (resolved: ${absPath})`
  );
  return readFileSync(absPath, "utf8");
}

/**
 * Removes "//" line comments and slash-star block comments from source text.
 * Order matters: a line comment runs to end-of-line even if it contains
 * slash-star, and a block comment runs to the next star-slash even if it
 * contains line-comment markers. The result of the "100% commented out"
 * assertion is whatever survives stripping — it must be whitespace only.
 */
function stripComments(source: string): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = i + 1 < source.length ? source[i + 1] : "";
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      if (end === -1) return out; // unterminated block comment swallows the rest
      i = end + 2;
    } else {
      out += ch;
      i++;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Assertion groups
// ---------------------------------------------------------------------------

interface PageSpec {
  label: string;
  path: string;
  schemaName: string;
  mode: string;
  links: string[];
}

const PAGE_SPECS: PageSpec[] = [
  {
    label: "login page",
    path: "src/[to-be-implemented]/auth/login/page.tsx",
    schemaName: "LoginSchema",
    mode: "signin",
    links: ["/auth/reset-password", "/auth/register"],
  },
  {
    label: "register page",
    path: "src/[to-be-implemented]/auth/register/page.tsx",
    schemaName: "RegisterSchema",
    mode: "signup",
    links: ["/auth/login"],
  },
  {
    label: "reset-password page",
    path: "src/[to-be-implemented]/auth/reset-password/page.tsx",
    schemaName: "ResetSchema",
    mode: "resetPassword",
    links: ["/auth/login"],
  },
];

function checkAuthPage(spec: PageSpec): void {
  const src = readRepoFile(spec.path);

  assert.match(
    src,
    /import\s+AuthForm\s+from\s+["']@\/components\/auth\/AuthForm["']/,
    `${spec.label} (${spec.path}): must import AuthForm from '@/components/auth/AuthForm'`
  );
  assert.match(
    src,
    new RegExp(
      `import\\s+\\{\\s*${spec.schemaName}\\s*\\}\\s+from\\s+["']@\\/schema["']`
    ),
    `${spec.label} (${spec.path}): must import { ${spec.schemaName} } from '@/schema'`
  );
  assert.match(
    src,
    new RegExp(`mode\\s*=\\s*["']${spec.mode}["']`),
    `${spec.label} (${spec.path}): must render <AuthForm mode="${spec.mode}" ...>`
  );
  for (const link of spec.links) {
    assert.match(
      src,
      new RegExp(`href\\s*=\\s*["']${link}["']`),
      `${spec.label} (${spec.path}): must link to ${link}`
    );
  }
}

function checkAuthFormSubmitPaths(): void {
  const src = readRepoFile("src/components/auth/AuthForm.tsx");
  assert.match(
    src,
    /signIn\(\s*["']credentials["']\s*,/,
    "AuthForm.tsx: signin mode must call signIn(\"credentials\", ...)"
  );
  assert.match(
    src,
    /fetch\(\s*["']\/api\/auth\/signup["']/,
    "AuthForm.tsx: signup mode must fetch POST /api/auth/signup"
  );
  assert.match(
    src,
    /fetch\(\s*["']\/api\/auth\/reset-password["']/,
    "AuthForm.tsx: resetPassword mode must fetch POST /api/auth/reset-password"
  );
}

function checkAuthFormPostAuth(): void {
  const src = readRepoFile("src/components/auth/AuthForm.tsx");
  assert.match(
    src,
    /const\s+handlePostAuth\s*=/,
    "AuthForm.tsx: must define handlePostAuth"
  );
  assert.match(
    src,
    /fetch\(\s*["']\/api\/auth\/session["']/,
    "AuthForm.tsx: handlePostAuth must fetch /api/auth/session"
  );
  assert.match(
    src,
    /session\.user\.firstTime/,
    "AuthForm.tsx: handlePostAuth must branch on session.user.firstTime"
  );
  assert.match(
    src,
    /router\.push\(\s*["']\/onboarding["']\s*\)/,
    "AuthForm.tsx: first-time users must be pushed to /onboarding"
  );
  assert.match(
    src,
    /router\.push\(\s*["']\/dashboard["']\s*\)/,
    "AuthForm.tsx: returning users must be pushed to /dashboard"
  );
}

function checkSchemaExports(): void {
  const src = readRepoFile("src/schema/index.ts");
  for (const name of ["LoginSchema", "RegisterSchema", "ResetSchema"]) {
    assert.match(
      src,
      new RegExp(`export\\s+const\\s+${name}\\b`),
      `src/schema/index.ts: must export ${name}`
    );
  }
  assert.match(
    src,
    /const\s+noSpaces\b/,
    "src/schema/index.ts: must define the noSpaces helper (used by the password refinements)"
  );
}

const PARKED_DIR = "src/[to-be-implemented]";

// Files disabled line-by-line: they satisfy BOTH the strict "every non-blank
// line starts with //" rule AND the general "no uncommented code" rule.
const LINE_COMMENTED_FILES = [
  `${PARKED_DIR}/api/auth/[...nextauth]/route.ts`,
  `${PARKED_DIR}/services/auth.ts`,
  `${PARKED_DIR}/utils/tokens.ts`,
  `${PARKED_DIR}/utils/middleware.ts`,
  `${PARKED_DIR}/utils/db.ts`,
  `${PARKED_DIR}/utils/mail.ts`,
];

// services/AuthCallback.ts is disabled as ONE slash-star block comment, so the
// strict per-line rule does not hold for it; the general rule does.
const BLOCK_COMMENTED_FILES = [`${PARKED_DIR}/services/AuthCallback.ts`];

const ALL_PARKED_SERVER_FILES = [...LINE_COMMENTED_FILES, ...BLOCK_COMMENTED_FILES];

function checkParkedServerFilesAreCommentedOut(): void {
  for (const relPath of ALL_PARKED_SERVER_FILES) {
    const src = readRepoFile(relPath);
    const leftover = stripComments(src).trim();
    assert.ok(
      leftover === "",
      `${relPath}: contains uncommented code after stripping comments: ${JSON.stringify(
        leftover.slice(0, 100)
      )}`
    );
  }
  for (const relPath of LINE_COMMENTED_FILES) {
    const nonBlank = readRepoFile(relPath)
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");
    assert.ok(
      nonBlank.length > 0,
      `${relPath}: file has no content — cannot confirm it is commented out`
    );
    const offender = nonBlank.find((line) => !line.trim().startsWith("//"));
    assert.ok(
      offender === undefined,
      `${relPath}: every non-blank line must start with '//' — found: ${JSON.stringify(
        offender?.trim().slice(0, 100)
      )}`
    );
  }
}

function checkAppDirHasNoAuthRoutes(): void {
  assert.ok(
    existsSync(join(REPO_ROOT, "src", "app")),
    "src/app must exist — otherwise this check is vacuous"
  );
  assert.ok(
    !existsSync(join(REPO_ROOT, "src", "app", "api")),
    "src/app/api must NOT exist — a live API route would contradict the parked-auth claim"
  );
  assert.ok(
    !existsSync(join(REPO_ROOT, "src", "app", "auth")),
    "src/app/auth must NOT exist — auth pages are parked in src/[to-be-implemented]/auth and must stay unrouted"
  );
}

function checkRootRouteConstants(): void {
  const src = readRepoFile("index.ts");
  for (const name of ["publicRoutes", "authRoutes", "apiAuthPrefix", "DEFAULT_LOGIN_REDIRECT"]) {
    assert.match(
      src,
      new RegExp(`export\\s+const\\s+${name}\\b`),
      `index.ts: must export ${name} (consumed by the parked middleware)`
    );
  }
  const authRoutesLiteral = src.match(/export\s+const\s+authRoutes\s*=\s*\[([\s\S]*?)\]/);
  assert.ok(
    authRoutesLiteral,
    "index.ts: could not locate the authRoutes array literal"
  );
  const routes = [...authRoutesLiteral[1].matchAll(/["']([^"']+)["']/g)].map(
    (match) => match[1]
  );
  assert.ok(
    routes.includes("/auth/reset"),
    `index.ts: authRoutes must contain '/auth/reset' (the known, documented mismatch: the page directory is 'src/[to-be-implemented]/auth/reset-password') — found: ${JSON.stringify(
      routes
    )}`
  );
}

// ---------------------------------------------------------------------------
// Runner — prints one line per assertion group; exits non-zero on any failure.
// ---------------------------------------------------------------------------

const GROUPS: { name: string; run: () => void }[] = [
  { name: "login page: AuthForm import, LoginSchema, mode 'signin', links /auth/reset-password + /auth/register", run: () => checkAuthPage(PAGE_SPECS[0]) },
  { name: "register page: AuthForm import, RegisterSchema, mode 'signup', link /auth/login", run: () => checkAuthPage(PAGE_SPECS[1]) },
  { name: "reset-password page: AuthForm import, ResetSchema, mode 'resetPassword', link /auth/login", run: () => checkAuthPage(PAGE_SPECS[2]) },
  { name: "AuthForm.tsx: three submit paths (credentials signIn, /api/auth/signup, /api/auth/reset-password)", run: checkAuthFormSubmitPaths },
  { name: "AuthForm.tsx: handlePostAuth (session fetch, firstTime branch, /onboarding + /dashboard pushes)", run: checkAuthFormPostAuth },
  { name: "src/schema/index.ts: exports LoginSchema, RegisterSchema, ResetSchema; defines noSpaces", run: checkSchemaExports },
  { name: "parked server files are 100% commented out (7 files, block-aware; strict // rule on 6 line-commented files)", run: checkParkedServerFilesAreCommentedOut },
  { name: "src/app: exists, with NO api/ and NO auth/ directory", run: checkAppDirHasNoAuthRoutes },
  { name: "root index.ts: exports publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT; authRoutes contains '/auth/reset'", run: checkRootRouteConstants },
];

function main(): void {
  let failures = 0;
  for (const group of GROUPS) {
    try {
      group.run();
      console.log(`PASS: ${group.name}`);
    } catch (error) {
      failures += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`FAIL: ${group.name} — ${message}`);
    }
  }
  console.log("");
  if (failures > 0) {
    console.error(
      `doc-check: ${failures} of ${GROUPS.length} assertion groups FAILED (see the FAIL lines above)`
    );
    process.exitCode = 1;
    return;
  }
  console.log(`doc-check: all ${GROUPS.length} assertion groups passed`);
}

main();
