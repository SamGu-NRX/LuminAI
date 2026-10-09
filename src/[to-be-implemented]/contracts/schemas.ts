import { z } from "zod";

/**
 * Shared boundary schemas for `src/[to-be-implemented]`.
 *
 * Every schema here has a specific message that says what a valid value
 * looks like, so a rejection is actionable without reading our source.
 * Module-specific schemas live next to their module; only contracts shared
 * by two or more modules belong here.
 */

/** Email address as typed by a user: trimmed, then shape-checked. */
export const EmailAddressSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .trim()
  .min(1, "Email must be a non-empty string")
  .max(254, "Email must be at most 254 characters")
  .email("Email must be a valid address such as name@example.com");

/** Opaque single-use token minted by the server (UUID v4). */
export const UuidTokenSchema = z
  .string({
    required_error: "Token is required",
    invalid_type_error: "Token must be a string",
  })
  .uuid("Token must be a UUID string");

/** Absolute https URL, used for outbound links (enrollment, auth callbacks). */
export const HttpsUrlSchema = z
  .string({
    required_error: "URL is required",
    invalid_type_error: "URL must be a string",
  })
  .url("URL must be an absolute URL")
  .refine((value) => value.startsWith("https://"), {
    message: "URL must use https",
  });

/** Site origin (scheme + host, no trailing slash) used to build absolute links. */
export const OriginUrlSchema = z
  .string({
    required_error: "Base URL is required",
    invalid_type_error: "Base URL must be a string",
  })
  .url("Base URL must be an absolute URL, e.g. https://luminai.example")
  .refine((value) => !value.endsWith("/"), {
    message: "Base URL must not end with a slash",
  });

/** In-site route path such as `/auth/login`. */
export const RoutePathSchema = z
  .string({
    required_error: "Route path is required",
    invalid_type_error: "Route path must be a string",
  })
  .regex(/^\/\S*$/u, "Route path must start with '/' and contain no spaces");

/**
 * Collection name for data-store lookups. Restricting the shape here is a
 * security boundary: collection names are interpolated into request paths,
 * so this rejects traversal (`../`) and injection attempts outright.
 */
export const DataCollectionNameSchema = z
  .string({
    required_error: "Collection name is required",
    invalid_type_error: "Collection name must be a string",
  })
  .regex(
    /^[a-z0-9_]+$/u,
    "Collection name must contain only lowercase letters, digits and underscores",
  );

/** Human-readable name of a course or bootcamp, e.g. "AI Innovate Scholars". */
export const CourseNameSchema = z
  .string({
    required_error: "Course name is required",
    invalid_type_error: "Course name must be a string",
  })
  .trim()
  .min(1, "Course name must be a non-empty string")
  .max(120, "Course name must be at most 120 characters");

export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type UuidToken = z.infer<typeof UuidTokenSchema>;
export type HttpsUrl = z.infer<typeof HttpsUrlSchema>;
export type OriginUrl = z.infer<typeof OriginUrlSchema>;
export type RoutePath = z.infer<typeof RoutePathSchema>;
export type DataCollectionName = z.infer<typeof DataCollectionNameSchema>;
export type CourseName = z.infer<typeof CourseNameSchema>;
