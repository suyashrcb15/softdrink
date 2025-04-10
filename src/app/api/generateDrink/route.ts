// app/api/generateDrink/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    const { name } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give a list of ingredients for a drink named "${name}". Return only a JSON array, e.g., ["Water", "Lime", "Mint"].`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result.response.text();

        // Try to parse as JSON
        const ingredients = JSON.parse(text);

        return NextResponse.json({ ingredients });
    } catch (err) {
        console.error("AI generation error:", err);
        return NextResponse.json({ error: "Failed to generate drink" }, { status: 500 });
    }
}


