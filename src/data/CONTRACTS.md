# src/data contracts

This directory is the typed, self-checking data layer for the LuminAI site.
Every module in it follows the conventions below. The site components
(`src/components/**`) are the only allowed consumers.

## Conventions (all modules)

1. **No `any`, no unchecked casts.** All exported consts are declared with
   `as const satisfies <precise type>`; types are derived from the data
   (`keyof typeof`), not the other way round.
2. **Data values never change.** The text/content of `faq.ts`, `staff.ts` and
   `syllabus.ts` is frozen; only types, schemas and accessors may be added.
3. **Readonly by default.** Data interfaces expose `readonly` fields; exported
   collections are `Readonly<Record<...>>` or `readonly T[]`.
4. **Schema files.** Each module ships a `<module>.schema.ts` with zod schemas
   (zod v3 is already a repo dependency and the house style, see
   `src/schema/index.ts`) and `parse<Name>(value: unknown)` functions built on
   `parseData` from `./validation`.
5. **Import-time validation.** Each data module validates its own exported
   consts at import time (via its schema file). A malformed data entry fails
   the build/test run loudly instead of rendering wrong.
6. **Errors.** All accessor violations throw `DataValidationError` from
   `./validation`. Message formats are pinned below; tests assert them
   character-exact.
7. **No circular imports.** Data files may import their schema file; schema
   files import types from `*-types.ts` / data files only with `import type`.

## Shared primitives (`src/data/validation.ts`)

```ts
export type DataModuleName = "faq" | "staff" | "syllabus";
export class DataValidationError extends Error {
  constructor(module: DataModuleName, message: string, field?: string);
  // message === `[${module}] ${message}`
  public readonly module: DataModuleName;
  public readonly field?: string;
}
export function parseData<T>(module: DataModuleName, what: string,
  schema: z.ZodType<T>, value: unknown): T;
// failure message: `[<module>] invalid <what> at <path>: <reason>`
// <path> is the dotted zod issue path or "(root)".
```

## Pinned error messages

| Trigger | Exact message |
|---|---|
| `getFaqItem(unknownId)` | `[faq] Unknown FAQ id: <String(id)>` |
| `getCategoryQuestions(unknownKey)` | `[faq] Unknown FAQ category: <key>` |
| `getStaffMember(unknownId)` | `[staff] Unknown staff id: <String(id)>` |
| `getWeekModule(unknownId)` | `[syllabus] Unknown module id: <String(id)>` |
| `getModuleResources(unknownId)` / `getModuleProject(unknownId)` | `[syllabus] Unknown module id: <String(id)>` |
| schema rejection | `[<module>] invalid <what> at <path>: <reason>` |

`hasFaqItem`, `listFaqIds`, `listCategoryKeys`, `listStaffIds`,
`listStaffMembers`, `listWeekModules`, `listWeekModuleIds`, `weekLabel` never
throw.

## faq module

```ts
// faq-types.ts
export interface FaqEntry { readonly question: string; readonly answer: string; }
export interface FaqCategory { readonly icon: LucideIcon; readonly title: string;
  readonly questions: readonly number[]; }        // ids reference faqData keys
export interface FAQItemProps { question: string; answer: string; isOpen: boolean; onClick: () => void; }
export interface FAQSectionProps { icon: LucideIcon; title: string;
  questions: readonly number[]; openItem: number | null;
  setOpenItem: (item: number | null) => void; }
// The old loose index-signature types FAQDataType / CategoryType are removed.

// faq.ts
export const faqData /* as const satisfies Readonly<Record<number, FaqEntry>> */;
export type FaqId = keyof typeof faqData;          // 1 | 2 | ... | 14
export const categories /* as const satisfies Readonly<Record<string, FaqCategory>> */;
export type CategoryKey = keyof typeof categories; // "basics" | "structure" | ...
export function getFaqItem(id: number): FaqEntry;
export function hasFaqItem(id: number): boolean;
export function listFaqIds(): readonly FaqId[];
export function getCategoryQuestions(key: string): readonly number[];
export function listCategoryKeys(): readonly CategoryKey[];

// faq.schema.ts
export const FaqEntrySchema, FaqDataSchema, FaqCategorySchema, CategoriesSchema;
export function parseFaqData(value: unknown): Readonly<Record<number, FaqEntry>>;
export function parseCategories(value: unknown): Readonly<Record<string, FaqCategory>>;
```

Schema requirements: `question`/`answer` non-empty strings; `title`
non-empty; `icon` a function (`z.custom`); question ids positive integers.

## staff module

```ts
// staff.ts (interface stays co-located, fields become readonly)
export interface StaffMember { readonly id: number; readonly name: string;
  readonly role: string; readonly quote: string; readonly imageUrl: string; }
export const staffMembers /* as const satisfies readonly StaffMember[] */;
export type StaffId = (typeof staffMembers)[number]["id"];  // 1 | 2 | 3
export function getStaffMember(id: number): StaffMember;
export function listStaffIds(): readonly StaffId[];
export function listStaffMembers(): readonly StaffMember[];

// staff.schema.ts
export const StaffMemberSchema, StaffMembersSchema;
export function parseStaffMembers(value: unknown): readonly StaffMember[];
```

Schema requirements: `id` positive integer; all strings non-empty;
`imageUrl` matches `^\/[A-Za-z0-9._/-]+\.(jpg|jpeg|png|webp|avif|svg)$`
(site-root path into `public/`).

## syllabus module

```ts
// syllabus-types.ts
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ResourceType = "documentation" | "video" | "article" | "github";
export interface Resource { readonly title: string; readonly url: string;
  readonly type: ResourceType; readonly description: string; }
export interface Project { readonly title: string; readonly description: string;
  readonly objectives: readonly string[]; readonly technologies: readonly string[];
  readonly difficulty: Difficulty; }
export interface LearningObjective { readonly title: string;
  readonly description: string; readonly topics: readonly string[]; }
export interface WeekModule { readonly id: number; readonly week: number | string;
  readonly title: string; readonly wittyTitle: string; readonly subtitle: string;
  readonly wittySubtitle: string; readonly description: string;
  readonly duration: string; readonly learningObjectives: readonly LearningObjective[];
  readonly project: Project; readonly resources: readonly Resource[];
  readonly prerequisites?: readonly string[]; }
export const DIFFICULTY_COLORS: Record<Difficulty, string>;
export const RESOURCE_ICONS: Record<ResourceType, string>;

// syllabus.ts
export const syllabusData /* as const satisfies readonly WeekModule[] */;
export type WeekModuleId = (typeof syllabusData)[number]["id"];  // 1 | ... | 6
export function getWeekModule(id: number): WeekModule;
export function listWeekModules(): readonly WeekModule[];
export function listWeekModuleIds(): readonly WeekModuleId[];
export function getModuleResources(id: number): readonly Resource[];
export function getModuleProject(id: number): Project;
export function weekLabel(module: WeekModule): string;  // String(week); never throws

// syllabus.schema.ts
export const ResourceSchema, ProjectSchema, LearningObjectiveSchema,
  WeekModuleSchema, SyllabusDataSchema;
export function parseSyllabusData(value: unknown): readonly WeekModule[];
```

Schema requirements: `url` a valid URL (`z.string().url()`); `type` /
`difficulty` the exact unions; all string fields non-empty;
`objectives`/`technologies`/`topics` non-empty arrays of non-empty strings;
`week` either a positive integer or a non-empty string; `id` positive integer.
`DIFFICULTY_COLORS` / `RESOURCE_ICONS` are typed as `Record<...>` so the
compiler proves full coverage of the unions (the unchecked
`as keyof typeof Icons` cast in `Syllabus/index.tsx` is then backed by an
invariant test).

## Cross-module invariants (enforced by tests, `__tests__/invariants.test.ts`)

- Every id in every `categories[key].questions` exists as a key of `faqData`
  (the old failure mode was a silent `console.warn` + dropped FAQ item).
- Every `faqData` key is referenced by at least one category (no orphans).
- `staffMembers` ids are unique and `syllabusData` ids are unique.
- Every `Resource.type` has an icon in `RESOURCE_ICONS` that is a real
  `lucide-react` export; every `Project.difficulty` has a color in
  `DIFFICULTY_COLORS`.
- Every `staffMembers[].imageUrl` resolves to an existing file under
  `public/`.

## Adding data later

Add the entry to the data file; import-time schema validation and the
invariant tests fail the build if the entry is malformed, mis-keyed, or
references something that does not exist. Accessors fail loudly (pinned
messages above) if a caller asks for an id/category that is not there.
