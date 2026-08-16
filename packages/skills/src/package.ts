import { mkdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { $ } from "bun";
import { discoverSkills } from "./discover.ts";

const DIST = resolve(import.meta.dir, "..", "dist");

async function main(): Promise<void> {
  const { skills } = await discoverSkills();
  await mkdir(DIST, { recursive: true });

  const built: string[] = [];

  for (const skill of skills) {
    const zipPath = join(DIST, `${skill.folderName}.zip`);
    // Start fresh so stale files never linger inside the archive.
    await rm(zipPath, { force: true });

    // Zip the CONTENTS of the skill folder (recursively) so that SKILL.md sits
    // at the archive root — this matches how Claude / Anthropic ingest a skill.
    // Dotfiles (e.g. .DS_Store) are excluded.
    await $`zip -r -q ${zipPath} . -x ".*"`.cwd(skill.dir);

    built.push(zipPath);
  }

  console.log(`\u2713 Packaged ${built.length} skill(s) into ${DIST}`);
  for (const path of built) {
    console.log(`  - ${path}`);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
