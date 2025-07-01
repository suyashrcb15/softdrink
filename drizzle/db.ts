// drizzle/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("drinks.sqlite");
export const db = drizzle(sqlite, { schema });
