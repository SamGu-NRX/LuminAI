import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ContractError, isContractError } from "../errors";
import { formatZodError, parseOrThrow, safeParse } from "../parse";
import {
  DataCollectionNameSchema,
  EmailAddressSchema,
  HttpsUrlSchema,
  OriginUrlSchema,
  RoutePathSchema,
  UuidTokenSchema,
} from "../schemas";

describe("parseOrThrow", () => {
  it("returns the parsed, type-narrowed value for valid input", () => {
    expect(parseOrThrow(EmailAddressSchema, "  student@luminai.org  ")).toBe(
      "student@luminai.org",
    );
  });

  it("throws ContractError with code and specific message for invalid input", () => {
    let caught: unknown;
    try {
      parseOrThrow(EmailAddressSchema, "not-an-email");
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ContractError);
    if (isContractError(caught)) {
      expect(caught.code).toBe("SCHEMA_VALIDATION_FAILED");
      expect(caught.message).toBe(
        "Input rejected at boundary: Email must be a valid address such as name@example.com",
      );
      expect(caught.issues).toEqual([
        {
          path: "<root>",
          message:
            "Email must be a valid address such as name@example.com",
        },
      ]);
    }
  });

  it("rejects non-string input with a type-specific message", () => {
    expect(() => parseOrThrow(EmailAddressSchema, 42)).toThrowError(
      "Input rejected at boundary: Email must be a string",
    );
  });
});

describe("safeParse", () => {
  it("returns ok:true with parsed data for valid input", () => {
    const result = safeParse(UuidTokenSchema, "9b2f5c1e-4a4d-4f6a-9d3f-2a1b7c8d9e0f");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toBe(
        "9b2f5c1e-4a4d-4f6a-9d3f-2a1b7c8d9e0f",
      );
    }
  });

  it("returns ok:false with a ContractError for invalid input and never throws", () => {
    const result = safeParse(UuidTokenSchema, "short");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(isContractError(result.error)).toBe(true);
      expect(result.error.code).toBe("SCHEMA_VALIDATION_FAILED");
      expect(result.error.message).toBe(
        "Input rejected at boundary: Token must be a UUID string",
      );
    }
  });

  it("reports nested paths for object schemas", () => {
    const schema = z.object({ user: z.object({ email: EmailAddressSchema }) });
    const result = safeParse(schema, { user: { email: "nope" } });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe(
        "Input rejected at boundary: user.email: Email must be a valid address such as name@example.com",
      );
    }
  });
});

describe("shared schemas", () => {
  it("HttpsUrlSchema accepts https and rejects http and garbage", () => {
    expect(
      HttpsUrlSchema.safeParse("https://luminai.example/enroll").success,
    ).toBe(true);
    expect(HttpsUrlSchema.safeParse("http://luminai.example").success).toBe(
      false,
    );
    expect(HttpsUrlSchema.safeParse("not a url").success).toBe(false);
  });

  it("OriginUrlSchema rejects trailing slashes", () => {
    expect(OriginUrlSchema.safeParse("https://luminai.example").success).toBe(
      true,
    );
    expect(OriginUrlSchema.safeParse("https://luminai.example/").success).toBe(
      false,
    );
  });

  it("RoutePathSchema requires a leading slash and no spaces", () => {
    expect(RoutePathSchema.safeParse("/auth/login").success).toBe(true);
    expect(RoutePathSchema.safeParse("auth/login").success).toBe(false);
    expect(RoutePathSchema.safeParse("/auth log in").success).toBe(false);
  });

  it("DataCollectionNameSchema rejects traversal and injection", () => {
    expect(DataCollectionNameSchema.safeParse("enrollment_tokens").success).toBe(
      true,
    );
    expect(DataCollectionNameSchema.safeParse("../secret").success).toBe(false);
    expect(DataCollectionNameSchema.safeParse("items?limit=1").success).toBe(
      false,
    );
  });

  it("EmailAddressSchema enforces length bounds", () => {
    expect(EmailAddressSchema.safeParse("").success).toBe(false);
    expect(
      EmailAddressSchema.safeParse(`${"a".repeat(250)}@example.com`).success,
    ).toBe(false);
  });
});

describe("formatZodError", () => {
  it("joins multiple issues with '; '", () => {
    const schema = z.object({
      email: EmailAddressSchema,
      token: UuidTokenSchema,
    });
    const failure = schema.safeParse({ email: "nope", token: "also-nope" });
    expect(failure.success).toBe(false);
    if (!failure.success) {
      expect(formatZodError(failure.error)).toBe(
        "email: Email must be a valid address such as name@example.com; token: Token must be a UUID string",
      );
    }
  });
});
