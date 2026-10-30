# Photos API Starter

A small Express and TypeScript API starter with request logging, CORS, JSON and form parsing, cookie parsing, rate limiting, and centralized error handling.

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

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the TypeScript app with automatic restarts |
| `pnpm build` | Compile TypeScript and rewrite path aliases |
| `pnpm start` | Run the compiled app from `dist` |

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

## Environment

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `3501` | HTTP port |
| `NODE_ENV` | `development` | Runtime environment |

## Agent skills

Project-specific agent skills are in [`.agent/skills/`](.agent/skills/): `express-api-route`, `express-error-handling`, and `typescript-project-maintenance`. See [`AGENTS.md`](AGENTS.md) for project guidance for AI agents.
