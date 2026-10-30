---
name: api-testing
description: Add or update automated tests for this Express TypeScript API using Vitest and Supertest.
---

# API testing

- Put HTTP behavior tests in `tests/` with the `*.test.ts` suffix.
- Import the exported Express app from `src/app.ts`; do not start a separate server or use a fixed port in tests.
- Use Supertest to make requests and Vitest assertions to check status codes, headers, and response bodies.
- Keep tests independent of a live MySQL server unless the task explicitly requests database integration tests.
- Add tests for externally visible behavior when changing routes, validation, or error handling.
- Run `pnpm test` and `pnpm build` after changes to application behavior.
