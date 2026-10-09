import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoList from "../TodoList";

/**
 * Top-level structure tests for TodoList: the "To Do" heading, the add
 * button, and the list of todo cards. The Announcements and RecentFeedback
 * sections share this component's DOM but belong to their own suites; they
 * show up here only as bystanders of shared text, which is why course and
 * due-date assertions are scoped to individual todo cards.
 */
describe("TodoList", () => {
  it("renders the 'To Do' heading", () => {
    render(<TodoList />);
    const heading = screen.getByRole("heading", { level: 2, name: "To Do" });
    expect(heading).toBeInTheDocument();
  });

  it("renders the add button with an accessible name", () => {
    render(<TodoList />);
    // The add button is icon-only (a PlusIcon); without an accessible name a
    // screen reader announces nothing but "button". If this query fails, the
    // aria-label was lost in a refactor and the control went nameless again.
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("renders the add button exactly once and leaves no unnamed buttons", () => {
    render(<TodoList />);
    expect(screen.getAllByRole("button", { name: /add/i })).toHaveLength(1);
    // The add button is the only button in this component, so any second
    // match here would be a new icon-only button that shipped without a
    // name — the same defect this file fixed for the add button.
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("renders both hardcoded todo items with name, course, and due date", () => {
    render(<TodoList />);

    const expected = [
      {
        name: "Unit 3 Test",
        course: "LIS Summer 24",
        dueDate: "Jun 27 at 18:00 (5 days ago)",
      },
      {
        name: "Discussion: Physical and Tactical Controls",
        course: "LIS Summer 24",
        dueDate: "July 2 at 18:00 (5 days ago)",
      },
    ];

    for (const { name, course, dueDate } of expected) {
      // Each todo card is the div that renders the item name; scoping the
      // course and due-date assertions to that card keeps them unambiguous
      // ("LIS Summer 24" also appears in the Announcements section below
      // the list, so a page-level query would match three elements).
      const card = screen.getByText(name).closest("div")!;
      expect(card).toHaveTextContent(course);
      expect(card).toHaveTextContent(dueDate);
    }
  });

  it("renders one card per todo item", () => {
    render(<TodoList />);
    const aside = screen
      .getByRole("heading", { name: "To Do" })
      .closest("aside")!;
    // Todo cards are the aside's direct children styled as gray cards; the
    // Announcements card uses the same styling but nests one level deeper
    // inside its section wrapper, so it does not match the child selector.
    // An item dropped from the source array (or a broken map) fails here.
    const cards = aside.querySelectorAll(":scope > div.bg-gray-700");
    expect(cards).toHaveLength(2);
  });
});
