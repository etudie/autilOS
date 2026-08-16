# nautilus (autilOS)

A **Bun + Turborepo** monorepo.

## Requirements

- [Bun](https://bun.sh) `>= 1.3` (pinned in [`.bun-version`](./.bun-version))

Bun is the package manager, workspace manager, and runtime — it runs the
TypeScript tooling directly, so there is no separate compile step.

## Layout

```
autilOS/
├── apps/                 # applications (Vite / Astro / Electron) — added later
└── packages/
    └── skills/           # Claude / Agent Skills collection + tooling
```

## Getting started

```bash
bun install       # install all workspace dependencies
bun run validate  # validate every skill's SKILL.md
bun run build     # validate + build the skills index + package skills to zips
bun run package   # zip each skill into packages/skills/dist/<name>.zip
```

Tasks are orchestrated by [Turborepo](https://turborepo.dev) (`turbo.json`) and
cached across runs.

## Packages

| Package           | Description                                                    |
| ----------------- | ------------------------------------------------------------- |
| `@autilos/skills` | Claude / Agent Skills, with validation and packaging tooling. |

See [`packages/skills/README.md`](./packages/skills/README.md) for how to author
and package a skill.