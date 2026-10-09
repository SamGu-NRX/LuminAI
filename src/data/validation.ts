import { z } from "zod";

/**
 * The modules that own data contracts in `src/data`.
 */
export type DataModuleName = "faq" | "staff" | "syllabus";

/**
 * Thrown whenever a value entering or leaving a `src/data` module violates
 * that module's contract. The class always prefixes the message with
 * `[<module>] ` so the offending module is identifiable from logs and tests
 * can assert on exact messages.
 */
export class DataValidationError extends Error {
  public readonly module: DataModuleName;
  public readonly field?: string;

  constructor(module: DataModuleName, message: string, field?: string) {
    super(`[${module}] ${message}`);
    this.name = "DataValidationError";
    this.module = module;
    this.field = field;
    // Keep `instanceof` working when this class is transpiled to ES5.
    Object.setPrototypeOf(this, DataValidationError.prototype);
  }
}

/**
 * Parse `value` against `schema`, throwing a {@link DataValidationError} that
 * names the module, the thing being parsed, and the exact path and reason of
 * the first violation.
 *
 * Message format (pinned contract, asserted by tests):
 * `[<module>] invalid <what> at <path>: <reason>`
 */
export function parseData<T>(
  module: DataModuleName,
  what: string,
  schema: z.ZodType<T>,
  value: unknown,
): T {
  const result = schema.safeParse(value);
  if (result.success) {
    return result.data;
  }
  const issue = result.error.issues[0];
  const path =
    issue && issue.path.length > 0
      ? issue.path
          .map((part: string | number) => String(part))
          .join(".")
      : "(root)";
  const reason = issue ? issue.message : "unknown validation error";
  throw new DataValidationError(
    module,
    `invalid ${what} at ${path}: ${reason}`,
    path,
  );
}
