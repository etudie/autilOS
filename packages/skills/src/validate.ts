import { discoverSkills, SKILLS_ROOT } from "./discover.ts";
import { frontmatterSchema } from "./schema.ts";

interface Issue {
  skill: string;
  message: string;
}

async function main(): Promise<void> {
  const { skills, missing } = await discoverSkills();
  const issues: Issue[] = [];

  for (const name of missing) {
    issues.push({ skill: name, message: `folder has no SKILL.md` });
  }

  const seenNames = new Map<string, string>();

  for (const skill of skills) {
    const result = frontmatterSchema.safeParse(skill.data);

    if (!result.success) {
      for (const err of result.error.issues) {
        const path = err.path.join(".") || "(root)";
        issues.push({
          skill: skill.folderName,
          message: `frontmatter ${path}: ${err.message}`,
        });
      }
      continue;
    }

    const fm = result.data;

    if (fm.name !== skill.folderName) {
      issues.push({
        skill: skill.folderName,
        message: `frontmatter name "${fm.name}" must match folder name "${skill.folderName}"`,
      });
    }

    if (skill.body.trim().length === 0) {
      issues.push({
        skill: skill.folderName,
        message: `SKILL.md body (instructions) is empty`,
      });
    }

    const previous = seenNames.get(fm.name);
    if (previous && previous !== skill.folderName) {
      issues.push({
        skill: skill.folderName,
        message: `duplicate skill name "${fm.name}" (also used by folder "${previous}")`,
      });
    }
    seenNames.set(fm.name, skill.folderName);
  }

  const total = skills.length;

  if (issues.length > 0) {
    console.error(
      `\u2717 Validation failed: ${issues.length} issue(s) across ${total} skill(s) in ${SKILLS_ROOT}`,
    );
    for (const issue of issues) {
      console.error(`  - [${issue.skill}] ${issue.message}`);
    }
    process.exit(1);
  }

  console.log(`\u2713 ${total} skill(s) valid`);
  for (const skill of skills) {
    console.log(`  - ${skill.folderName}`);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
