import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const drinks = sqliteTable("drinks", {
    name: text("name").notNull(),
    price: real("price").notNull(),
    flavor: text("flavor").notNull(),
    ingredients: text("ingredients").notNull(),
    image: text("image").notNull(),
    color: text("color"),
});

// 👇 this is what your db.ts file is expecting
export const schema = {
    drinks,
};
