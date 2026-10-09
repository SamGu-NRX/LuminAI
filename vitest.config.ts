import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/[to-be-implemented]/Dashboard/__tests__/setup.ts"],
    // NOTE: the include pattern deliberately avoids writing "[to-be-implemented]"
    // literally in the glob — square brackets are character-class syntax in globs.
    // "src/**" matches the bracketed directory as an ordinary path segment.
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
