import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { discoverSkills } from "./discover.ts";
import { frontmatterSchema } from "./schema.ts";

const DIST = resolve(import.meta.dir, "..", "dist");

interface IndexEntry {
  name: string;
  description: string;
  folder: string;
  license?: string;
  allowedTools?: string[];
  metadata?: Record<string, unknown>;
}

async function main(): Promise<void> {
  const { skills } = await discoverSkills();
  const entries: IndexEntry[] = [];

  for (const skill of skills) {
    const result = frontmatterSchema.safeParse(skill.data);
    if (!result.success) {
      // validate.ts is the gate for correctness; skip malformed entries here.
      continue;
    }
    const fm = result.data;
    entries.push({
      name: fm.name,
      description: fm.description,
      folder: skill.folderName,
      ...(fm.license ? { license: fm.license } : {}),
      ...(fm["allowed-tools"] ? { allowedTools: fm["allowed-tools"] } : {}),
      ...(fm.metadata ? { metadata: fm.metadata } : {}),
    });
  }

  await mkdir(DIST, { recursive: true });
  const index = {
    generatedAt: new Date().toISOString(),
    count: entries.length,
    skills: entries,
  };

  const outPath = join(DIST, "skills.index.json");
  await Bun.write(outPath, `${JSON.stringify(index, null, 2)}\n`);
  console.log(`\u2713 Wrote index of ${entries.length} skill(s) to ${outPath}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
