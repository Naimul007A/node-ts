import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    schema: "./src/app/models/schema.ts",
    out: "./drizzle",
    ...(process.env.DATABASE_URL
        ? { dbCredentials: { url: process.env.DATABASE_URL } }
        : {}),
});
