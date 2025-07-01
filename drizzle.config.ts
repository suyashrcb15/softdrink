import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle/migrations",
    driver: "sqlite", // ✅ must be 'sqlite'
    dbCredentials: {
        url: "./db.sqlite", // ✅ path to SQLite file
    },
    dialect: "sqlite", // ✅ required in latest version
} satisfies Config;
