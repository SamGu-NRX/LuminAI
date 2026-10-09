import { describe, expect, it } from "vitest";
import { faqData } from "../faq";
import { DataValidationError } from "../validation";

describe("src/data toolchain smoke", () => {
  it("imports the data modules", () => {
    expect(Object.keys(faqData).length).toBeGreaterThan(0);
  });

  it("formats DataValidationError messages as [<module>] <message>", () => {
    const err = new DataValidationError("faq", "boom");
    expect(err.message).toBe("[faq] boom");
    expect(err.module).toBe("faq");
    expect(err instanceof DataValidationError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
});
