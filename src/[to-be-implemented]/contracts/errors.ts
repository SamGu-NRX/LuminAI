import { z } from "zod";

/**
 * A single, human-readable validation issue found at a trust boundary.
 * `path` is a dotted path into the rejected input (`<root>` when the whole
 * input was rejected), `message` states what was expected.
 */
export interface ContractIssue {
  readonly path: string;
  readonly message: string;
}

/**
 * Thrown (or returned) when input crosses a trust boundary and fails its
 * contract. Carries a stable machine-readable `code`, a specific human
 * message, and the individual issues so callers can render field errors
 * without re-parsing strings.
 */
export class ContractError extends Error {
  /** Stable, machine-readable failure code, e.g. `SCHEMA_VALIDATION_FAILED`. */
  readonly code: string;
  /** Individual validation issues; empty for non-schema failures. */
  readonly issues: readonly ContractIssue[];

  constructor(
    code: string,
    message: string,
    issues: readonly ContractIssue[] = [],
  ) {
    super(message);
    this.name = "ContractError";
    this.code = code;
    this.issues = issues;
  }
}

/** True exactly when `value` is a `ContractError` (safe across module copies). */
export function isContractError(value: unknown): value is ContractError {
  return value instanceof ContractError;
}

/** Flattens a Zod error into `ContractIssue`s with dotted paths. */
export function issuesFromZod(error: z.ZodError): ContractIssue[] {
  return error.issues.map((issue) => ({
    path:
      issue.path.length > 0
        ? issue.path.map((segment) => String(segment)).join(".")
        : "<root>",
    message: issue.message,
  }));
}
