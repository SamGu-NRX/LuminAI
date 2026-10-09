import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// The repo runs Vitest without globals, so Testing Library's automatic
// cleanup does not hook in — unmount and clear the DOM after every test,
// otherwise queries leak matches across test cases.
afterEach(() => {
  cleanup();
});
