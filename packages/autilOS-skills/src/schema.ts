import { z } from "zod";

/** Max length for a skill `name` (matches Anthropic Agent Skills constraints). */
export const SKILL_NAME_MAX = 64;
/** Max length for a skill `description`. */
export const SKILL_DESCRIPTION_MAX = 1024;

/** Skill names are kebab-case: lowercase letters, digits, and single hyphens. */
export const skillNameRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Schema for the YAML frontmatter of a `SKILL.md` file.
 *
 * Required: `name`, `description`.
 * Optional: `license`, `allowed-tools`, `metadata`.
 */
export const frontmatterSchema = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .min(1, "name is required")
      .max(SKILL_NAME_MAX, `name must be <= ${SKILL_NAME_MAX} characters`)
      .regex(
        skillNameRegex,
        "name must be kebab-case (lowercase letters, digits, single hyphens)",
      ),
    description: z
      .string({ required_error: "description is required" })
      .min(1, "description is required")
      .max(
        SKILL_DESCRIPTION_MAX,
        `description must be <= ${SKILL_DESCRIPTION_MAX} characters`,
      ),
    license: z.string().min(1).optional(),
    "allowed-tools": z.array(z.string().min(1)).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type SkillFrontmatter = z.infer<typeof frontmatterSchema>;
