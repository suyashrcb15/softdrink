import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    const { name } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Give a list of ingredients for a drink named "${name}". Reply with a JSON array of ingredients only, like ["Water", "Lemon", "Sugar"].`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const ingredients = JSON.parse(text);
        return NextResponse.json({ ingredients });
    } catch (err) {
        console.error("AI generation error:", err);
        return NextResponse.json({ error: "Failed to generate drink" }, { status: 500 });
    }
}
