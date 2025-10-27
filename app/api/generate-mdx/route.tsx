import { GoogleGenAI } from "@google/genai"
import type { ProjectData } from "@/types"
import { NextResponse } from "next/server"
import { buildPrompt } from "@/lib/prompt"

export async function POST(request: Request) {
    try {
        const data: ProjectData = await request.json()

        if (!data.name || !data.description) {
            return NextResponse.json({ error: "Project name and description are required." }, { status: 400 })
        }

        if (!process.env.NEXT_GEMINI_API_KEY) {
            return NextResponse.json({ error: "NEXT_GEMINI_API_KEY environment variable is not set" }, { status: 500 })
        }

        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY })
        const prompt = buildPrompt(data)

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.6,
            },
        })

        let text = response.text

        if (text?.startsWith("```mdx")) {
            text = text.substring(6)
        }

        if (text?.endsWith("```")) {
            text = text.slice(0, -3)
        }

        return NextResponse.json({ mdx: text?.trim() || "" })
    } catch (error) {
        console.error("Error calling Gemini API:", error)
        return NextResponse.json({ error: "Failed to generate documentation from AI service." }, { status: 500 })
    }
}