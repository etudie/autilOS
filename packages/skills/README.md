# @autilos/skills

A collection of [Claude / Agent Skills](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills)
plus tooling to validate and package them.

Each skill is a folder under [`skills/`](./skills) containing a `SKILL.md` file
(YAML frontmatter + Markdown instructions) and any supporting resources.

## Authoring a skill

1. Create a folder under `skills/<skill-name>/` (kebab-case).
2. Add a `SKILL.md` with frontmatter:

   ```markdown
   ---
   name: my-skill            # must equal the folder name
   description: What it does and when to use it.
   license: MIT              # optional
   allowed-tools:            # optional
     - Bash
   metadata:                 # optional
     category: example
   ---

   # My Skill

   Instructions the agent reads go here.
   ```

3. Add any extra files (scripts, templates, data) inside the folder — they are
   included when the skill is packaged.

### Frontmatter rules

| Field           | Required | Notes                                                   |
| --------------- | -------- | ------------------------------------------------------- |
| `name`          | yes      | kebab-case, ≤ 64 chars, must match the folder name      |
| `description`   | yes      | ≤ 1024 chars                                            |
| `license`       | no       | string                                                  |
| `allowed-tools` | no       | list of strings                                         |
| `metadata`      | no       | arbitrary key/value map                                 |

## Commands

Run from the repo root or this package:

```bash
bun run validate   # validate every SKILL.md against the schema
bun run index      # write dist/skills.index.json (registry of all skills)
bun run package    # zip each skill into dist/<name>.zip
```

## Distribution format

`bun run package` produces **one `.zip` per skill** in `dist/`. Each archive
contains the skill folder's contents at its root (so `SKILL.md` is top-level),
which is the format Claude / Anthropic expect when ingesting a skill.
