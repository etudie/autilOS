---
name: example-tool
description: Example skill that bundles a helper script. Demonstrates how to ship executable resources alongside SKILL.md. Use as a template for skills that include scripts or other files.
license: MIT
allowed-tools:
  - Bash
metadata:
  category: example
---

# Example Tool

Demonstrates a skill that bundles a helper script under `scripts/`. When the
skill is packaged, the script travels inside the distributable `.zip`.

## Instructions

1. Run `scripts/run.sh` to produce a greeting.
2. Report the script's output back to the user.

## Layout

```
example-tool/
├── SKILL.md
└── scripts/
    └── run.sh
```
