# Photos API Starter

A small Express and TypeScript API starter with request logging, CORS, JSON and form parsing, cookie parsing, rate limiting, and centralized error handling.

Database access uses Drizzle ORM with MySQL through `mysql2`.

## Requirements

- Node.js 20 or later
- pnpm 12 (or a compatible pnpm version)

## Setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

The server listens on `PORT` from `.env`, defaulting to `3502`. The example environment file sets it to `3501`.

Set `DATABASE_URL` in `.env` to your MySQL connection URL before using the database. Update the example credentials before connecting to a real database.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the TypeScript app with automatic restarts |
| `pnpm build` | Compile TypeScript and rewrite path aliases |
| `pnpm start` | Run the compiled app from `dist` |
| `pnpm db:generate` | Generate SQL migrations from the Drizzle schema |
| `pnpm db:migrate` | Apply generated migrations to the configured MySQL database |
| `pnpm db:studio` | Open Drizzle Studio for the configured database |

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Basic server status text |
| `GET` | `/api/v1/health` | Health response with `success.message` and `success.data` |

API routes are rate limited to 100 requests per IP per 15-minute window. Requests over the limit receive HTTP `429`.

## Project layout

```text
src/
  app.ts                         Express app and middleware setup
  routes/routes.ts               Versioned API routes
  app/controllers/                HTTP request handlers
  app/services/                   Application logic
  app/middleware/                 Middleware modules
  app/utils/                      Shared utilities and error handling
```

Add endpoints in `src/routes/routes.ts`, keep request/response handling in controllers, and put application logic in services. Import aliases are configured in `tsconfig.json` and resolved in the build by `tsc-alias`.

## Database

- Define tables in `src/app/models/schema.ts` using `drizzle-orm/mysql-core`.
- The starter schema includes a `photos` table with an auto-incrementing ID, URL, and creation timestamp.
- Import `db` from `src/app/lib/database.ts` where database access is needed.
- Generate and review migrations with `pnpm db:generate`, then apply them with `pnpm db:migrate`.
- Generated SQL migration files belong in `drizzle/` and should be committed. Do not run migrations against production without reviewing the SQL and target database first.
- `pnpm db:generate` can run without `DATABASE_URL`; migration and Studio commands need a valid MySQL URL.

## Environment

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `3501` | HTTP port |
| `NODE_ENV` | `development` | Runtime environment |
| `DATABASE_URL` | `mysql://root:password@localhost:3306/photos` | MySQL connection URL |

## Agent skills

Project-specific agent skills are in [`.agent/skills/`](.agent/skills/): `express-api-route`, `express-error-handling`, `typescript-project-maintenance`, and `drizzle-mysql`. See [`AGENTS.md`](AGENTS.md) for project guidance for AI agents.
