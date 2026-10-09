import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dashboard from "../Dashboard";
import TodoList from "../TodoList";

/**
 * Coherence guards over the hardcoded mock data in Dashboard.tsx and
 * TodoList.tsx.
 *
 * These components are presentational mocks: every string shown is inline
 * data. Because the data lives in literal JSX, a careless edit can silently
 * break the *shape* of a value (a percent without its unit, a relative time
 * without its "d" suffix) or the *consistency* between values (a todo whose
 * course no longer matches the active cohort). These tests pin those
 * invariants without duplicating the exemplar's numeric width==label check,
 * which is already covered in Dashboard.test.tsx.
 */

/** The progress card's fill bar element and its percentage label element. */
function getProgressElements() {
  const container = screen.getByText("Dashboard").closest("div")!;
  const bar = container.querySelector<HTMLElement>("div.bg-blue-600");
  expect(bar).not.toBeNull();
  const label = container.querySelector("p.text-right");
  expect(label).not.toBeNull();
  return { bar: bar!, label: label! };
}

/** The Due list's row elements (name span + "in Xd" badge per row). */
function getDueRows() {
  const container = screen.getByRole("heading", { name: "Due" }).closest("div")!;
  return Array.from(container.querySelectorAll("div.mb-2"));
}

/** The todo cards rendered as direct children of the TodoList aside. */
function getTodoCards() {
  const aside = screen.getByRole("heading", { name: "To Do" }).closest("aside")!;
  // Child combinator keeps the Announcements card (nested one level deeper)
  // and the section header (no bg-gray-700) out of the match.
  return Array.from(aside.querySelectorAll("aside > div.bg-gray-700"));
}

describe("Dashboard data shape", () => {
  it("progress width carries a % unit and the label ends with %", () => {
    render(<Dashboard />);
    const { bar, label } = getProgressElements();
    // The unit is load-bearing: an inline width only sizes the fill as a
    // percentage of the track when it ends in "%". A bare "93" would
    // collapse the bar; the same must hold for the visible label.
    expect(bar.style.width).toMatch(/^\d+(?:\.\d+)?%$/);
    expect(label.textContent?.trim() ?? "").toMatch(/%$/);
  });

  it("every Due badge is a well-formed 'in Xd' relative time", () => {
    render(<Dashboard />);
    const rows = getDueRows();
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      const badge = row.querySelector("span.text-gray-400");
      expect(badge).not.toBeNull();
      // Anchored: "in 2d" is fine, but "in 2 days", "in 2" or a blank
      // suffix would break the compact "in Xd" rendering.
      expect(badge!.textContent).toMatch(/^in \d+d$/);
    }
  });

  it("no Due row renders with empty text content", () => {
    render(<Dashboard />);
    const rows = getDueRows();
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(row.textContent?.trim() ?? "").not.toBe("");
      const name = row.querySelector("span");
      expect(name?.textContent?.trim() ?? "").not.toBe("");
    }
  });
});

describe("TodoList data shape", () => {
  it("every todo item has a non-empty name, course, and dueDate", () => {
    render(<TodoList />);
    const cards = getTodoCards();
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const name = card.querySelector("h3");
      const course = card.querySelector("p.text-gray-400");
      const dueDate = card.querySelector("p.text-red-400");
      expect(name?.textContent?.trim() ?? "").not.toBe("");
      expect(course?.textContent?.trim() ?? "").not.toBe("");
      expect(dueDate?.textContent?.trim() ?? "").not.toBe("");
    }
  });

  it("every todo course equals the single cohort 'LIS Summer 24'", () => {
    render(<TodoList />);
    const cards = getTodoCards();
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const course = card.querySelector("p.text-gray-400");
      // Consistency across items: one item drifting to another cohort name
      // (or a typo like "LIS Summmer 24") fails here.
      expect(course?.textContent?.trim()).toBe("LIS Summer 24");
    }
  });

  it("no todo card renders with empty text content", () => {
    render(<TodoList />);
    const cards = getTodoCards();
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.textContent?.trim() ?? "").not.toBe("");
    }
  });
});

describe("Cross-component data coherence", () => {
  it("todo courses match the active cohort shown on the Dashboard", () => {
    render(<Dashboard />);
    render(<TodoList />);

    // The Dashboard card shows the cohort subtitle; it is the one <p> in the
    // progress card that does not end in "%".
    const dashboardRoot = screen.getByText("Dashboard").closest("div")!;
    const card = dashboardRoot.querySelector("div.bg-gray-800");
    expect(card).not.toBeNull();
    const cohortLabel = Array.from(card!.querySelectorAll("p"))
      .map((p) => p.textContent?.trim() ?? "")
      .find((text) => !/%$/.test(text));
    expect(cohortLabel).toBeTruthy();

    const cards = getTodoCards();
    expect(cards.length).toBeGreaterThan(0);
    for (const todo of cards) {
      const course = todo.querySelector("p.text-gray-400");
      expect(course?.textContent?.trim()).toBe(cohortLabel);
    }
  });
});
