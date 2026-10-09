import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BannerProvider } from "@/context/BannerContext";

// Smoke test: proves the test infrastructure (vitest + jsdom + React) works
// and that BannerProvider mounts without crashing.
describe("test infrastructure", () => {
  it("renders BannerProvider with children without crashing", () => {
    const { getByTestId } = render(
      <BannerProvider>
        <div data-testid="child">ok</div>
      </BannerProvider>,
    );
    expect(getByTestId("child").textContent).toBe("ok");
  });
});
