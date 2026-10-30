---
name: express-api-route
description: Add or change versioned Express API endpoints in this TypeScript starter. Use when implementing a route, controller, or service.
---

# Express API route

Follow the existing route-controller-service layout.

1. Add route registration in `src/routes/routes.ts` under the existing `/api/v1` mount.
2. Put HTTP status codes, input/output mapping, and `next(error)` forwarding in a controller under `src/app/controllers/`.
3. Put business logic in a service under `src/app/services/`; keep it independent of Express request and response objects.
4. Use the existing TypeScript aliases from `tsconfig.json` where they match the import.
5. Validate untrusted request data before passing it to a service. Use Zod, already included in the project, when a schema is useful.
6. Preserve the existing response envelope conventions unless the requested API explicitly requires a different shape.
7. Update `README.md` when adding or changing a public endpoint.

Do not add dependencies for functionality already provided by Express or the installed packages.
