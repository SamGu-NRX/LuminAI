import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoList from "../TodoList";

/**
 * Static-verification regression guards for findings in the Dashboard dir
 * that render tests alone do not cover.
 *
 * Finding: TodoList's add control is an icon-only <button> wrapping a
 * PlusIcon with no text, aria-label, or title. Its accessible name is the
 * empty string, so assistive tech announces "button" with no purpose.
 * This pins the button to a non-empty, semantically correct name.
 */
describe("TodoList static a11y findings", () => {
  it("gives the icon-only add-to-do button an accessible name", () => {
    render(<TodoList />);
    const button = screen.getByRole("button");
    expect(button).toHaveAccessibleName(/add/i);
  });
});
