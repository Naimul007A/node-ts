import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema from "../models/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to connect to MySQL.");
}

export const pool = createPool(databaseUrl);
export const db = drizzle({ client: pool, schema, mode: "default" });

export async function closeDatabase(): Promise<void> {
    await pool.end();
}
