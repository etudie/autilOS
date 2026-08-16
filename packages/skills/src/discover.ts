import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import matter from "gray-matter";

/** Absolute path to the directory that holds all skill folders. */
export const SKILLS_ROOT = resolve(import.meta.dir, "..", "skills");
/** The required entrypoint filename for every skill. */
export const SKILL_FILENAME = "SKILL.md";

export interface DiscoveredSkill {
  /** Absolute path to the skill folder. */
  dir: string;
  /** Basename of the skill folder. */
  folderName: string;
  /** Absolute path to the skill's SKILL.md file. */
  skillFile: string;
  /** Full raw contents of SKILL.md. */
  raw: string;
  /** Parsed YAML frontmatter (unvalidated). */
  data: Record<string, unknown>;
  /** Markdown body following the frontmatter. */
  body: string;
}

export interface DiscoverResult {
  skills: DiscoveredSkill[];
  /** Folder names under the skills root that are missing a SKILL.md. */
  missing: string[];
}

/** Discover every skill folder under `root` and parse its SKILL.md frontmatter. */
export async function discoverSkills(
  root: string = SKILLS_ROOT,
): Promise<DiscoverResult> {
  const entries = await readdir(root, { withFileTypes: true });
  const skills: DiscoveredSkill[] = [];
  const missing: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const dir = join(root, entry.name);
    const skillFile = join(dir, SKILL_FILENAME);
    const file = Bun.file(skillFile);

    if (!(await file.exists())) {
      missing.push(entry.name);
      continue;
    }

    const raw = await file.text();
    const parsed = matter(raw);
    skills.push({
      dir,
      folderName: entry.name,
      skillFile,
      raw,
      data: (parsed.data ?? {}) as Record<string, unknown>,
      body: parsed.content,
    });
  }

  skills.sort((a, b) => a.folderName.localeCompare(b.folderName));
  return { skills, missing };
}
