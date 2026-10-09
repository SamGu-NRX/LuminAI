import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoList from "../TodoList";

/**
 * Regression guards for the two lower sidebar sections of TodoList:
 * Announcements and Recent Feedback. The subcomponents are internal (not
 * exported), so every assertion goes through the <TodoList /> render output.
 *
 * "LIS Summer 24" also appears on the To Do items above these sections, so
 * section-level lookups are scoped through these helpers instead of
 * screen-wide text queries.
 */
function getAnnouncementsSection(): HTMLElement {
  const heading = screen.getByRole("heading", { level: 2, name: "Announcements" });
  const section = heading.parentElement;
  expect(section, "Announcements section wrapper").not.toBeNull();
  return section!;
}

function getRecentFeedbackSection(): HTMLElement {
  const heading = screen.getByRole("heading", { level: 2, name: "Recent Feedback" });
  const section = heading.parentElement;
  expect(section, "Recent Feedback section wrapper").not.toBeNull();
  return section!;
}

describe("TodoList sections (Announcements, Recent Feedback)", () => {
  it("renders both section headings as h2", () => {
    render(<TodoList />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Announcements" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Feedback" }),
    ).toBeInTheDocument();
  });

  it("renders the announcement card title, course line and date line in order", () => {
    render(<TodoList />);
    const section = getAnnouncementsSection();
    const title = within(section).getByRole("heading", {
      level: 3,
      name: "WEEK 6 (7/1 - 7/3) ANNOUNCEMENT",
    });
    const card = title.parentElement;
    expect(card, "announcement card wrapper").not.toBeNull();
    const text = card!.textContent ?? "";
    expect(text).toContain("LIS Summer 24");
    expect(text).toContain("Jul 1 at 9:07 (3 days ago)");
    expect(text.indexOf("WEEK 6")).toBeLessThan(text.indexOf("LIS Summer 24"));
    expect(text.indexOf("LIS Summer 24")).toBeLessThan(
      text.indexOf("Jul 1 at 9:07 (3 days ago)"),
    );
  });

  it("renders the Recent Feedback entry inside its own section", () => {
    render(<TodoList />);
    const section = getRecentFeedbackSection();
    expect(within(section).getByText("Activity: Something")).toBeInTheDocument();
    // The section carries only its h2 heading — no skipped or stray levels.
    expect(within(section).getAllByRole("heading")).toHaveLength(1);
  });

  it("keeps the heading hierarchy: h2 sections, h3 card title", () => {
    render(<TodoList />);
    const outline = (section: HTMLElement) =>
      Array.from(section.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(
        (h) => `${h.tagName.toLowerCase()}: ${(h.textContent ?? "").trim()}`,
      );
    // Flattening (h2 -> styled div/strong), skipping a level (h2 -> h4) or
    // reordering any of these headings must fail here.
    expect(outline(getAnnouncementsSection())).toEqual([
      "h2: Announcements",
      "h3: WEEK 6 (7/1 - 7/3) ANNOUNCEMENT",
    ]);
    expect(outline(getRecentFeedbackSection())).toEqual([
      "h2: Recent Feedback",
    ]);
  });

  it("renders Announcements before Recent Feedback in the sidebar order", () => {
    render(<TodoList />);
    const announcements = getAnnouncementsSection();
    const feedback = getRecentFeedbackSection();
    expect(
      announcements.compareDocumentPosition(feedback) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
