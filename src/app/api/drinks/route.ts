import { db } from "@/db/db";           // adjust if your db.ts file is elsewhere
import { drinks } from "@/db/schema";   // your schema file
import { NextResponse } from "next/server";

// GET: fetch all drinks
export async function GET() {
    try {
        const all = await db.select().from(drinks);
        return NextResponse.json(all);
    } catch (error) {
        console.error("❌ Error fetching drinks:", error);
        return NextResponse.json({ error: "Failed to fetch drinks" }, { status: 500 });
    }
}

// POST: add new drink
export async function POST(req: Request) {
    try {
        const data = await req.json();

        // 🧠 Ensure ingredients are stored as comma-separated string
        const toInsert = {
            ...data,
            ingredients: Array.isArray(data.ingredients)
                ? data.ingredients.join(",")
                : data.ingredients,
        };

        await db.insert(drinks).values(toInsert);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ Error inserting drink:", error);
        return NextResponse.json({ error: "Failed to add drink" }, { status: 500 });
    }
}
