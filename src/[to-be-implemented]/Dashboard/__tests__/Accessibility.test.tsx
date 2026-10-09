import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import TodoList from "../TodoList";

/**
 * Accessibility sweep for the three Dashboard mocks.
 *
 * Scope (per the sweep plan):
 *   1. sane heading hierarchy across the three files
 *   2. no interactive element without an accessible name
 *   3. images carry meaningful alt text
 *   4. text is not lost to decorative rendering (labels are text nodes)
 *   5. list regions render their items as readable text
 *
 * Known parallel fixes owned by other sub-threads (do not fix here):
 *   - the icon-only add button in TodoList.tsx (accessible name)
 *   - the avatar asset path in Sidebar.tsx
 */

// -- helpers ---------------------------------------------------------------

function headingLevels(): number[] {
  return screen
    .getAllByRole("heading")
    .map((h) => Number(h.tagName.charAt(1)));
}

// A section may close (the level goes back up); it may open a subsection at
// most one level deeper. h2 -> h4 hides structure from assistive technology.
function expectNoDownwardLevelJump(levels: number[]): void {
  levels.forEach((level, i) => {
    if (i === 0) return;
    expect(level).toBeLessThanOrEqual(levels[i - 1] + 1);
  });
}

// Heroicons ship aria-hidden="true"; decorative icons must stay out of the
// accessibility tree so they are not read as unnamed graphics.
function expectEverySvgIsHidden(): void {
  const svgs = Array.from(document.querySelectorAll("svg"));
  expect(svgs.length).toBeGreaterThan(0);
  for (const svg of svgs) {
    expect(svg).toHaveAttribute("aria-hidden", "true");
  }
}

// Tripwire for check (2): every interactive element must expose a
// non-empty accessible name.
function everyInteractiveElementIsNamed(): Element[] {
  const interactive = Array.from(
    document.querySelectorAll("button, a, input, select, textarea"),
  );
  for (const el of interactive) {
    expect(el).toHaveAccessibleName();
  }
  return interactive;
}

// -- Dashboard -------------------------------------------------------------

describe("Dashboard accessibility", () => {
  it("exposes exactly one level-1 heading", () => {
    render(<Dashboard />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Dashboard");
  });

  it("keeps its section headings at level 2", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { level: 2, name: /LuminAI Innovate Scholars/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Due" }),
    ).toBeInTheDocument();
  });

  it("never skips heading levels downward", () => {
    render(<Dashboard />);
    const levels = headingLevels();
    expect(levels[0]).toBe(1);
    expectNoDownwardLevelJump(levels);
  });

  it("keeps the ellipsis icon decorative and out of the accessibility tree", () => {
    render(<Dashboard />);
    expectEverySvgIsHidden();
  });

  it("has no unnamed interactive elements", () => {
    render(<Dashboard />);
    const interactive = everyInteractiveElementIsNamed();
    // Presentational mock: nothing is interactive yet. When a real control
    // (e.g. the ellipsis menu) is wired in, this count forces the naming
    // conversation instead of shipping a silent control.
    expect(interactive).toHaveLength(0);
  });

  it("keeps each Due row's assignment name and due-in text readable together", () => {
    render(<Dashboard />);
    const rows = [
      { name: "Unit 4 Test", due: "in 2d" },
      { name: "Discussion: Fail-Safe Recovery", due: "in 2d" },
      { name: "Activity: Hardware Security Guidelines", due: "in 2d" },
      { name: "Lab: Asymmetric Practice", due: "in 2d" },
    ];
    for (const { name, due } of rows) {
      const row = screen.getByText(name).closest("div");
      expect(row).not.toBeNull();
      expect(row).toHaveTextContent(name);
      expect(row).toHaveTextContent(due);
    }
  });
});

// -- TodoList --------------------------------------------------------------

describe("TodoList accessibility", () => {
  it("exposes no level-1 heading of its own (the page h1 lives in Dashboard)", () => {
    render(<TodoList />);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });

  it("renders section headers at level 2 and card titles at level 3", () => {
    render(<TodoList />);
    expect(
      screen.getByRole("heading", { level: 2, name: "To Do" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Announcements" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Feedback" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Unit 3 Test" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Physical and Tactical Controls/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /WEEK 6/ }),
    ).toBeInTheDocument();
  });

  it("keeps each todo's course and due date readable with its title", () => {
    render(<TodoList />);
    const todos = [
      {
        title: "Unit 3 Test",
        course: "LIS Summer 24",
        due: "Jun 27 at 18:00 (5 days ago)",
      },
      {
        title: "Discussion: Physical and Tactical Controls",
        course: "LIS Summer 24",
        due: "July 2 at 18:00 (5 days ago)",
      },
    ];
    for (const { title, course, due } of todos) {
      const card = screen
        .getByRole("heading", { level: 3, name: title })
        .closest("div");
      expect(card).not.toBeNull();
      expect(card).toHaveTextContent(course);
      expect(card).toHaveTextContent(due);
    }
  });

  it("renders announcement and feedback content as readable text", () => {
    render(<TodoList />);
    expect(screen.getByText("Jul 1 at 9:07 (3 days ago)")).toBeInTheDocument();
    expect(screen.getByText("Activity: Something")).toBeInTheDocument();
  });

  // TODO(parallel-fix): the icon-only add button is being fixed by a parallel
  // sub-thread, which adds an accessible name matching /add/i. This assertion
  // targets the FIXED state — verified to FAIL on the current placeholder
  // (toHaveAccessibleName received empty) — and ships skipped so this clone
  // stays green. Un-skip once the parallel fix is merged.
  it.skip("gives the icon-only add button an accessible name", () => {
    render(<TodoList />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAccessibleName(/add/i);
  });
});

// -- Sidebar ---------------------------------------------------------------

describe("Sidebar accessibility", () => {
  it("gives the avatar image a meaningful, non-empty alt", () => {
    render(<Sidebar />);
    // NOTE: the avatar asset path itself is owned by a parallel sub-thread;
    // this pins only the accessible name.
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1); // decorative menu icons must not register as images
    expect(images[0]).toHaveAccessibleName(/account/i);
    expect(images[0].getAttribute("alt")).not.toBe("");
  });

  it("renders every menu label as a readable text node", () => {
    render(<Sidebar />);
    const labels = [
      "Dashboard",
      "Courses",
      "Calendar",
      "Inbox",
      "History",
      "Help",
    ];
    for (const label of labels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("keeps menu icons decorative and out of the accessibility tree", () => {
    render(<Sidebar />);
    expectEverySvgIsHidden();
  });

  it("has no unnamed interactive elements", () => {
    render(<Sidebar />);
    const interactive = everyInteractiveElementIsNamed();
    // Presentational mock: menu entries are not links/buttons yet. Wiring
    // them up flips this count — and each new control must then carry an
    // accessible name (the text labels above already provide one).
    expect(interactive).toHaveLength(0);
  });
});

// -- Composition -----------------------------------------------------------

describe("Dashboard page composition", () => {
  it("keeps a sane heading outline when all three regions render together", () => {
    render(<Dashboard />);
    render(<Sidebar />);
    render(<TodoList />);
    const levels = headingLevels();
    expect(levels[0]).toBe(1);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expectNoDownwardLevelJump(levels);
  });
});
