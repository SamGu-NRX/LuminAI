import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// next/image's real renderer depends on Next's build/runtime plumbing that is
// not present under Vitest. Stub it with a pass-through <img> so these tests
// observe exactly the src/alt props Sidebar hands it — that is the contract
// under test (does the referenced asset actually ship in public/?).
vi.mock("next/image", () => ({
  default: function StubNextImage({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

import Sidebar from "../Sidebar";

const EXPECTED_MENU = [
  "Dashboard",
  "Courses",
  "Calendar",
  "Inbox",
  "History",
  "Help",
] as const;

/**
 * Resolves a site-absolute src (e.g. "/gradient-luminai-logo.svg") to a path
 * under this repo's public/ directory. The test file sits five levels below
 * the repo root, so the walk-up count is pinned by the existsSync guard.
 */
function getPublicAssetPath(siteAbsoluteSrc: string): string {
  const repoRoot = path.resolve(
    fileURLToPath(import.meta.url),
    "../../../../..",
  );
  expect(fs.existsSync(path.join(repoRoot, "package.json"))).toBe(true);
  return path.join(repoRoot, "public", siteAbsoluteSrc.replace(/^\//, ""));
}

describe("Sidebar", () => {
  it("renders its navigation as an <aside> landmark", () => {
    render(<Sidebar />);
    const aside = screen.getByRole("complementary");
    expect(aside.tagName.toLowerCase()).toBe("aside");
  });

  it("references an avatar asset that actually ships in public/", () => {
    render(<Sidebar />);
    const aside = screen.getByRole("complementary");
    const img = within(aside).getByRole("img");
    expect(img.getAttribute("alt")).toBeTruthy();

    const src = img.getAttribute("src");
    // The avatar must be a site-absolute reference into public/, not an
    // external URL and not a bare relative path.
    expect(src).toMatch(/^\//);

    expect(fs.existsSync(getPublicAssetPath(src ?? ""))).toBe(true);
  });

  it("renders exactly the six expected menu items, in order", () => {
    render(<Sidebar />);
    const aside = screen.getByRole("complementary");
    const labels = Array.from(aside.querySelectorAll("span"))
      .map((s) => s.textContent?.trim() ?? "")
      .filter(Boolean);
    expect(labels).toEqual([...EXPECTED_MENU]);
  });

  it("renders a real icon beside every visible menu label", () => {
    render(<Sidebar />);
    const aside = screen.getByRole("complementary");
    for (const label of EXPECTED_MENU) {
      const labelEl = within(aside).getByText(label);
      // toBeVisible fails on aria-hidden ancestors, display:none, etc. — the
      // labels are meant to be read, not just present in the DOM.
      expect(labelEl).toBeVisible();
      const item = labelEl.closest("div");
      const svg = item?.querySelector("svg");
      expect(svg).not.toBeNull();
      // An <svg> with no children renders nothing; require real icon markup.
      expect(svg?.children.length).toBeGreaterThan(0);
    }
  });
});
