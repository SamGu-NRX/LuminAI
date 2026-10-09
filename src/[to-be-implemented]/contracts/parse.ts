import { z } from "zod";
import { ContractError, issuesFromZod } from "./errors";

/** Successful boundary parse: the validated, inferred value. */
export interface ParseSuccess<T> {
  readonly ok: true;
  readonly data: T;
}

/** Failed boundary parse: a `ContractError` with code and issues. */
export interface ParseFailure {
  readonly ok: false;
  readonly error: ContractError;
}

/** Discriminated result of validating untrusted input at a boundary. */
export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

/**
 * Formats a Zod error into one specific message, e.g.
 * `email: Email must be a valid address such as name@example.com`.
 */
export function formatZodError(error: z.ZodError): string {
  const parts = issuesFromZod(error).map(
    (issue) =>
      issue.path === "<root>"
        ? issue.message
        : `${issue.path}: ${issue.message}`,
  );
  if (parts.length === 0) {
    return "Input was rejected but no detail was produced";
  }
  return parts.join("; ");
}

const VALIDATION_CODE = "SCHEMA_VALIDATION_FAILED";

/**
 * Validates untrusted `input` against `schema` and returns the parsed value.
 * Throws `ContractError` (code `SCHEMA_VALIDATION_FAILED`) with a specific
 * message when the input does not satisfy the schema. Use at boundaries
 * where invalid input is a programming error (internal invariants).
 */
export function parseOrThrow<S extends z.ZodTypeAny>(
  schema: S,
  input: unknown,
): z.infer<S> {
  const result = schema.safeParse(input);
  if (result.success) {
    return result.data;
  }
  throw new ContractError(
    VALIDATION_CODE,
    `Input rejected at boundary: ${formatZodError(result.error)}`,
    issuesFromZod(result.error),
  );
}

/**
 * Validates untrusted `input` against `schema` without throwing. Returns a
 * discriminated result so callers can handle invalid input explicitly.
 * Use at boundaries where invalid input is expected (user input, network).
 */
export function safeParse<S extends z.ZodTypeAny>(
  schema: S,
  input: unknown,
): ParseResult<z.infer<S>> {
  const result = schema.safeParse(input);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  return {
    ok: false,
    error: new ContractError(
      VALIDATION_CODE,
      `Input rejected at boundary: ${formatZodError(result.error)}`,
      issuesFromZod(result.error),
    ),
  };
}
