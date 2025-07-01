// drizzle/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const drinks = sqliteTable("drinks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    flavor: text("flavor").notNull(),
    price: integer("price").notNull(),
    ingredients: text("ingredients").notNull(),
    image: text("image").notNull(),
});
