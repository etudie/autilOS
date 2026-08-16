# autilOS

A **Bun + Turborepo** monorepo.

## Lore

**AutilOS** started as *Nautilus*. Named after the ship, the navigator, the idea of a vessel built to move through complex territory.

Drop the **N** because NautilOS.com was taken. You'll get **AutilOS**: part *Nautilus*, part *OS*, with a quiet nod to the auDHD community that shapes a lot of how I think about clarity, agency, and human-centered systems.

It's meant to feel less like a butler or assistant and more like a good helm: helping you steer without taking over. Like the ship in 20,000 Leagues Under the Sea by Jules Verne.

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
bun run package   # zip each skill into packages/autilOS-skills/dist/<name>.zip
```

Tasks are orchestrated by [Turborepo](https://turborepo.dev) (`turbo.json`) and
cached across runs.

## Packages

| Package           | Description                                                    |
| ----------------- | ------------------------------------------------------------- |
| `@autilos/skills` | Claude / Agent Skills, with validation and packaging tooling. |

See [`packages/autilOS-skills/README.md`](./packages/autilOS-skills/README.md) for how to author
and package a skill.