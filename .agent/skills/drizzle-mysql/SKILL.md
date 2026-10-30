---
name: drizzle-mysql
description: Add or modify MySQL tables, queries, and migrations in this Express TypeScript project using Drizzle ORM and mysql2.
---

# Drizzle with MySQL

- Define tables in `src/app/models/schema.ts` with `drizzle-orm/mysql-core`.
- Use the shared `db` client from `src/app/lib/database.ts`; do not create a new pool per request.
- Read connection settings from `DATABASE_URL`. Never commit real credentials or place secrets in migrations.
- Create migrations with `pnpm db:generate`, inspect the generated SQL, and apply committed migrations with `pnpm db:migrate`.
- Do not apply migrations to production without explicit authorization and a review of the generated SQL and target.
- Add indexes, unique constraints, and foreign keys to the schema when they express actual application requirements; do not guess business rules.
- Keep SQL access in services or focused data modules rather than controllers.
- Add or update API documentation when database changes alter public endpoint behavior.
