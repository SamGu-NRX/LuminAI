import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vitest/config";

// Vitest config for the contract tests of `src/[to-be-implemented]`.
// Run from the repository root with:
//   npx vitest run -c "src/[to-be-implemented]/vitest.config.ts"
//
// `include` deliberately uses a broad pattern instead of spelling out the
// bracket directory: `[...]` is a glob character class, so the literal
// directory name would have to be escaped. Every *.test.ts(x) file in the
// repository lives under `src/[to-be-implemented]/` (and only there), so a
// broad include with a default node_modules exclusion is exact in practice.
const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../../../..");

export default defineConfig({
  resolve: {
    alias: {
      // Mirror the repository's tsconfig path mapping "@/*" -> "./src/*".
      "@": path.join(repoRoot, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.next/**"],
  },
});
