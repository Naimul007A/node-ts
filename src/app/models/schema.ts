import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const photos = mysqlTable("photos", {
    id: int().autoincrement().primaryKey(),
    url: varchar({ length: 2048 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});
