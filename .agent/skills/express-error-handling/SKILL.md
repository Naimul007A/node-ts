---
name: express-error-handling
description: Implement or modify Express middleware and error paths in this starter. Use when changing validation, not-found handling, or API error responses.
---

# Express error handling

- Controllers should pass asynchronous failures to Express with `next(error)`.
- Keep not-found handling after application routes and the central error handler last in `src/app.ts`.
- Use the shared middleware in `src/app/utils/error.ts` rather than duplicating response logic.
- Return an appropriate HTTP status and a stable, JSON response shape for API errors.
- Avoid sending stack traces or internal exception details to clients in production.
- When changing middleware ordering, check how it affects every route, including `/` and `/api/v1`.
- Update the README if the externally visible error behavior changes.
