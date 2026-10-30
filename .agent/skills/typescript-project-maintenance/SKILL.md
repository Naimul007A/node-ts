---
name: typescript-project-maintenance
description: Maintain dependencies, scripts, TypeScript configuration, and build behavior for this Node.js starter.
---

# TypeScript project maintenance

- Treat pnpm as the canonical package manager; use `pnpm-lock.yaml` for dependency resolution.
- Keep `package.json` scripts, package metadata, and lockfile consistent when changing dependencies.
- Prefer compatible, non-breaking updates unless the task requests major upgrades. Review migration notes for major changes.
- Keep the `build` script compiling with `tsc` and resolving aliases with `tsc-alias`.
- Preserve strict TypeScript checking and the path aliases used by the source tree.
- Document new setup requirements, scripts, environment variables, and endpoint behavior in `README.md`.
- Do not commit generated `dist` output or `node_modules`.
