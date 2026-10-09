import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * Next.js / bundler integration pins for the three Dashboard placeholders.
 *
 * These tests exist to fail loudly when the components stop integrating with
 * the Next.js primitives they lean on:
 *
 *  - Sidebar must render its account image through next/image (which always
 *    emits width/height attributes on the <img>, guarding against layout
 *    shift regressions from a hand-rolled <img> without dimensions).
 *  - Every @heroicons/react import must both resolve at module-eval time and
 *    produce a rendered <svg> in the component that uses it.
 *  - All three modules must import cleanly in a jsdom (browser-like) bundler
 *    environment — a broken relative path (including resolution through the
 *    bracketed [to-be-implemented] directory) or a missing third-party
 *    package surfaces here as an import-time throw.
 *
 * Modules are imported dynamically inside each test so that a failure names
 * the one broken module instead of failing the whole suite at collection.
 *
 * NOTE on next/image + remote hosts: in a non-production environment the
 * default next/image loader throws when given an unconfigured remote src.
 * These tests run with NODE_ENV=test, so a passing render additionally pins
 * the current "local, root-relative src" contract — swapping in a remote URL
 * without adding images.remotePatterns to next.config.mjs will fail here.
 */

async function loadDashboard(): Promise<React.ComponentType> {
  const mod = await import("../Dashboard");
  return mod.default;
}

async function loadSidebar(): Promise<React.ComponentType> {
  const mod = await import("../Sidebar");
  return mod.default;
}

async function loadTodoList(): Promise<React.ComponentType> {
  const mod = await import("../TodoList");
  return mod.default;
}

describe("Next.js integration: Sidebar next/image", () => {
  it("renders the account image via next/image with width and height attributes", async () => {
    const Sidebar = await loadSidebar();
    render(<Sidebar />);

    // Accessible name comes from the alt prop, so this also pins that the
    // image stays meaningful to screen readers as the markup evolves.
    const img = screen.getByRole("img", { name: "Account" });
    expect(img).toBeInTheDocument();
    // next/image always emits explicit dimensions on the rendered <img>;
    // losing them means someone bypassed next/image or dropped the props,
    // both of which reintroduce cumulative layout shift.
    expect(img).toHaveAttribute("width", "48");
    expect(img).toHaveAttribute("height", "48");
  });

  it("keeps the image src root-relative so the default loader can serve it", async () => {
    const Sidebar = await loadSidebar();
    render(<Sidebar />);

    const img = screen.getByRole("img", { name: "Account" });
    const src = img.getAttribute("src");
    expect(src).toBeTruthy();
    // next/image rewrites local srcs through the /_next/image optimizer.
    // A plain (non-optimized) src here would mean the component stopped
    // going through next/image; a remote host is already covered by the
    // render-throw behaviour described in the file comment above.
    expect(src!.startsWith("/_next/image?")).toBe(true);
  });
});

describe("Next.js integration: heroicon imports render as svg", () => {
  it("Dashboard renders the EllipsisVerticalIcon it imports", async () => {
    const Dashboard = await loadDashboard();
    const { container } = render(<Dashboard />);

    // Dashboard.tsx imports exactly one heroicon; at least one <svg> must
    // reach the DOM or the import is being swallowed somewhere.
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(1);
  });

  it("Sidebar renders an svg icon for every labeled menu item", async () => {
    const Sidebar = await loadSidebar();
    render(<Sidebar />);

    const labels = ["Dashboard", "Courses", "Calendar", "Inbox", "History", "Help"];
    expect(labels).toHaveLength(6); // keep the list in sync with menuItems
    for (const label of labels) {
      const item = screen.getByText(label).closest("div");
      expect(item, `menu item "${label}" should render`).not.toBeNull();
      expect(
        item!.querySelector("svg"),
        `menu item "${label}" should render its heroicon as an <svg>`,
      ).not.toBeNull();
    }
  });

  it("TodoList renders the PlusIcon it imports inside the add button", async () => {
    const TodoList = await loadTodoList();
    render(<TodoList />);

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).not.toBeNull();
  });
});

describe("Next.js integration: modules import in jsdom", () => {
  it("imports Dashboard.tsx without throwing", async () => {
    const Dashboard = await loadDashboard();
    expect(typeof Dashboard).toBe("function");
  });

  it("imports Sidebar.tsx (including its next/image dependency) without throwing", async () => {
    const Sidebar = await loadSidebar();
    expect(typeof Sidebar).toBe("function");
  });

  it("imports TodoList.tsx without throwing", async () => {
    const TodoList = await loadTodoList();
    expect(typeof TodoList).toBe("function");
  });
});
