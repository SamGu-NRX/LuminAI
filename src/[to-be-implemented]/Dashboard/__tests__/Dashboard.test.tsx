import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dashboard from "../Dashboard";

/**
 * Regression guard for the course progress card.
 *
 * The fill bar's width is set inline as a percentage string and the visible
 * label repeats the same number as text. They are stored in two places, so
 * they can silently drift apart when one is edited without the other. These
 * tests pin them to a single consistent value; if either side changes without
 * the other, the suite fails instead of the UI showing contradictory progress.
 */
function getProgressParts(): { widthPercent: number; labelPercent: number } {
  const container = screen.getByText("Dashboard").closest("div")!;
  const bar = container.querySelector<HTMLElement>("div.bg-blue-600");
  expect(bar).not.toBeNull();
  const width = bar!.style.width; // e.g. "93%"
  const label = container.querySelector("p.text-right")!;
  return {
    widthPercent: parseFloat(width),
    labelPercent: parseFloat(label.textContent ?? ""),
  };
}

describe("Dashboard", () => {
  it("renders the dashboard heading", () => {
    render(<Dashboard />);
    const heading = screen.getByRole("heading", { level: 1, name: "Dashboard" });
    expect(heading).toBeInTheDocument();
  });

  it("renders the active course title and cohort subtitle", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { name: /LuminAI Innovate Scholars/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("LIS Summer 24")).toBeInTheDocument();
  });

  it("renders a progress bar whose fill width matches the visible percentage", () => {
    render(<Dashboard />);
    const { widthPercent, labelPercent } = getProgressParts();
    expect(widthPercent).toBeGreaterThan(0);
    expect(widthPercent).toBeLessThanOrEqual(100);
    expect(labelPercent).toBe(widthPercent);
  });

  it("renders a 'Due' section with the expected assignments", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { name: "Due" }),
    ).toBeInTheDocument();

    const expected = [
      "Unit 4 Test",
      "Discussion: Fail-Safe Recovery",
      "Activity: Hardware Security Guidelines",
      "Lab: Asymmetric Practice",
    ];
    for (const name of expected) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/in \d+d/)).toHaveLength(expected.length);
  });

  it("does not duplicate an assignment name in the Due list", () => {
    render(<Dashboard />);
    const container = screen.getByRole("heading", { name: "Due" }).closest("div")!;
    const names = Array.from(container.querySelectorAll("span")).map(
      (s) => s.textContent ?? "",
    );
    // The due list uses array indices as React keys; duplicated names in the
    // source data would be invisible in the UI but would make reordering
    // unsafe the moment this list becomes dynamic. Keep the data clean.
    const dueNames = names.filter((n) => n.length > 0 && !/^in \d+d$/.test(n));
    expect(new Set(dueNames).size).toBe(dueNames.length);
  });
});
