import { describe, it, expect } from "vitest";
import { useState } from "react";
import { render, act } from "@testing-library/react";
import { BannerProvider, useBanner } from "@/context/BannerContext";

// Probe component: captures the latest context value handed to consumers.
let latest: ReturnType<typeof useBanner> | undefined;
function Probe() {
  latest = useBanner();
  return null;
}

describe("BannerContext bug fixes", () => {
  it("hideBanner resets bannerHeight to 0 (hidden banner must not keep offsetting consumers)", () => {
    render(
      <BannerProvider>
        <Probe />
      </BannerProvider>,
    );
    expect(latest!.isBannerVisible).toBe(false);
    expect(latest!.bannerHeight).toBe(0);

    act(() => {
      latest!.setBannerVisibility(true);
    });
    act(() => {
      latest!.setBannerHeight(120);
    });
    expect(latest!.isBannerVisible).toBe(true);
    expect(latest!.bannerHeight).toBe(120);

    act(() => {
      latest!.hideBanner();
    });
    expect(latest!.isBannerVisible).toBe(false);
    // Invariant: once hidden, the banner's height contribution is 0.
    // Pre-fix this fails with 120 — Navbar keeps a phantom offset
    // (marginTop / top) for a banner that is no longer on screen.
    expect(latest!.bannerHeight).toBe(0);
  });

  it("does not re-render consumers when the provider re-renders with unchanged state", () => {
    let consumerRenders = 0;
    function CountingProbe() {
      latest = useBanner();
      consumerRenders++;
      return null;
    }
    function Harness() {
      const [, force] = useState(0);
      return (
        <BannerProvider>
          <CountingProbe />
          <button onClick={() => force((n) => n + 1)}>force</button>
        </BannerProvider>
      );
    }
    const { getByRole } = render(<Harness />);
    const rendersBefore = consumerRenders;

    act(() => {
      getByRole("button").click();
    });

    // Pre-fix: the context value object is re-created on every provider
    // render, so consumers re-render even though no state changed.
    expect(consumerRenders).toBe(rendersBefore);
  });
});
