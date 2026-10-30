# Agent Guide

This file gives AI coding agents the context and conventions needed to work in this repository. Read it before making project changes. Specialized workflows live in `.agent/skills/`.

## Workspace Tooling

- Prefix shell commands with `rtk` in this workspace, as required by the local RTK setup.
- Use pnpm for dependency installation and package scripts.

## Tech Stack

- **Runtime:** Node.js 20 or later
- **Language:** TypeScript 5, configured in `tsconfig.json` with strict checking
- **HTTP framework:** Express 4
- **Validation:** Zod 3
- **Database ORM:** Drizzle ORM with the MySQL dialect and `mysql2`
- **Middleware:** `cors`, `cookie-parser`, `morgan`, `express-rate-limit`, and Express JSON/form parsers
- **Configuration:** `dotenv`, with `.env.example` as the template
- **Package manager:** pnpm; `pnpm-lock.yaml` is the maintained lockfile
- **Build:** `tsc` followed by `tsc-alias` to rewrite TypeScript path aliases

## Project Structure

```text
src/
├── app.ts                         # Express setup, middleware, routes, and server startup
├── routes/
│   └── routes.ts                  # Versioned API route registrations
└── app/
    ├── controllers/               # HTTP request handlers
    ├── services/                  # Application/business logic
    ├── middleware/                # Reusable Express middleware
    ├── config/                    # Application settings
    ├── lib/
    │   └── database.ts            # MySQL pool, Drizzle client, and shutdown helper
    ├── utils/                     # Shared utilities and error handling
    ├── config/                    # Application configuration
    ├── helpers/                   # Helper functions
    ├── lib/                       # Shared libraries and integrations
    └── models/                    # Data models and Drizzle schema

.agent/skills/                     # Repository-specific agent skills
drizzle/                           # Generated SQL migrations
drizzle.config.ts                  # Drizzle Kit configuration
```

Some directories are currently placeholders. Add files only when the feature needs them.

## Application Behavior

- `src/app.ts` mounts API routes at `/api/v1` and rate limits `/api` to 100 requests per IP per 15 minutes.
- `GET /` returns a basic server status message.
- `GET /api/v1/health` is the health endpoint. Its controller delegates to `ServerService` and returns a `success` response object.
- Not-found and centralized error middleware are defined in `src/app/utils/error.ts` and registered after the routes.
- Drizzle uses a `mysql2` connection pool from `src/app/lib/database.ts`; table definitions belong in `src/app/models/schema.ts`. The starter schema defines a `photos` table.
- Database commands use `DATABASE_URL` from `.env`. Generate migrations with `pnpm db:generate` and apply reviewed migrations with `pnpm db:migrate`.
- The default port in `src/app.ts` is `3502`; `.env.example` sets `PORT=3501`.

## Development Commands

```sh
pnpm install
cp .env.example .env
pnpm dev
pnpm build
pnpm start
```

`pnpm dev` runs `src/app.ts` with `ts-node-dev`. `pnpm build` emits JavaScript into `dist/`, and `pnpm start` runs `dist/app.js`. Do not commit generated `dist/` or `node_modules/` content.

## Implementation Conventions

- Keep route registration in `src/routes/routes.ts`, request/response handling in controllers, and business logic in services.
- Controllers should forward asynchronous failures with `next(error)` so the central error handler can format them.
- Validate untrusted input at the HTTP boundary. Use the installed Zod package where schema validation is appropriate.
- Preserve the existing `/api/v1` prefix and response shapes unless the requested change calls for an API change.
- Use the aliases configured in `tsconfig.json` (such as `@utils/*`, `@routes/*`, and `@services/*`) when applicable.
- Keep TypeScript strictness and the existing Express 4 and Zod 3 major versions unless a task explicitly includes a migration.
- For dependency changes, update `package.json` and `pnpm-lock.yaml` together. Do not add a dependency when the current stack already provides the needed functionality.
- Keep Drizzle schema changes and generated SQL migrations in sync. Review generated SQL before applying it to a database.
- Update `README.md` when public endpoints, setup, scripts, or environment variables change.

## Agent Skills

Read the relevant skill before work in its area:

- `.agent/skills/express-api-route/SKILL.md` for API routes, controllers, and services.
- `.agent/skills/express-error-handling/SKILL.md` for middleware and error responses.
- `.agent/skills/typescript-project-maintenance/SKILL.md` for package, script, and TypeScript configuration changes.
