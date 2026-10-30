# Photos API Starter

A small Express and TypeScript API starter with request logging, CORS, JSON and form parsing, cookie parsing, rate limiting, and centralized error handling.

Database access uses Drizzle ORM with MySQL through `mysql2`.

## Requirements

- Node.js 20.19 or later
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

| Command             | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `pnpm dev`          | Run the TypeScript app with automatic restarts              |
| `pnpm build`        | Compile TypeScript and rewrite path aliases                 |
| `pnpm start`        | Run the compiled app from `dist`                            |
| `pnpm test`         | Run the API test suite once                                 |
| `pnpm test:watch`   | Run tests in watch mode                                     |
| `pnpm lint`         | Check JavaScript and TypeScript with ESLint                 |
| `pnpm lint:fix`     | Automatically fix ESLint issues where possible              |
| `pnpm format`       | Format supported files with Prettier                        |
| `pnpm format:check` | Check formatting without changing files                     |
| `pnpm db:generate`  | Generate SQL migrations from the Drizzle schema             |
| `pnpm db:migrate`   | Apply generated migrations to the configured MySQL database |
| `pnpm db:studio`    | Open Drizzle Studio for the configured database             |

## Endpoints

| Method | Path             | Description                                               |
| ------ | ---------------- | --------------------------------------------------------- |
| `GET`  | `/`              | Basic server status text                                  |
| `GET`  | `/api/v1/health` | Health response with `success.message` and `success.data` |

API routes are rate limited to 100 requests per IP per 15-minute window. Requests over the limit receive HTTP `429`.

## Project layout

```text
src/
  app.ts                         Express app, exported for tests
  server.ts                      Starts the HTTP listener
  routes/routes.ts               Versioned API routes
  app/controllers/                HTTP request handlers
  app/services/                   Application logic
  app/middleware/                 Middleware modules
  app/utils/                      Shared utilities and error handling
```

Add endpoints in `src/routes/routes.ts`, keep request/response handling in controllers, and put application logic in services. Import aliases are configured in `tsconfig.json` and resolved in the build by `tsc-alias`.

`pnpm dev` runs `src/server.ts` with `ts-node-dev`. The Express app is exported from `src/app.ts`, so tests can exercise it without opening a fixed port. `pnpm build` emits JavaScript into `dist/`, and `pnpm start` runs `dist/server.js`. Do not commit generated `dist/` or `node_modules/`.

## Tests

Tests use Vitest and Supertest. The suite covers the health endpoint response, the root status route, and JSON not-found behavior. Add API tests under `tests/` with filenames ending in `.test.ts`, then run `pnpm test`.

## Code Quality

ESLint uses the flat config with the recommended JavaScript and TypeScript rules. Prettier handles formatting, and `eslint-config-prettier` disables overlapping formatting rules. Husky runs `lint-staged` before each commit to lint and format staged source files. Run `pnpm run prepare` if Git hooks need to be installed manually.

## Database

- Define tables in `src/app/models/schema.ts` using `drizzle-orm/mysql-core`.
- The starter schema includes a `photos` table with an auto-incrementing ID, URL, and creation timestamp.
- Import `db` from `src/app/lib/database.ts` where database access is needed.
- Generate and review migrations with `pnpm db:generate`, then apply them with `pnpm db:migrate`.
- Generated SQL migration files belong in `drizzle/` and should be committed. Do not run migrations against production without reviewing the SQL and target database first.
- `pnpm db:generate` can run without `DATABASE_URL`; migration and Studio commands need a valid MySQL URL.

## Environment

| Variable       | Example                                       | Description          |
| -------------- | --------------------------------------------- | -------------------- |
| `PORT`         | `3501`                                        | HTTP port            |
| `NODE_ENV`     | `development`                                 | Runtime environment  |
| `DATABASE_URL` | `mysql://root:password@localhost:3306/photos` | MySQL connection URL |

## Agent skills

Project-specific agent skills are in [`.agent/skills/`](.agent/skills/): `express-api-route`, `express-error-handling`, `typescript-project-maintenance`, `drizzle-mysql`, and `api-testing`. See [`AGENTS.md`](AGENTS.md) for project guidance for AI agents.
