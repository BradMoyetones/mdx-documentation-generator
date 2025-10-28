// import { GoogleGenAI } from "@google/genai"
import type { ProjectData } from "@/types"
import { buildPrompt } from "@/lib/prompt"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY || "")

export async function POST(request: Request) {
    try {
        const data: ProjectData = await request.json()

        if (!data.name || !data.description) {
            return new Response(JSON.stringify({ error: "Project name and description are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = buildPrompt(data)

        const result = await model.generateContentStream(prompt)

        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Send thinking phase
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "thinking" })}\n\n`))

                    // Small delay to show thinking state
                    await new Promise((resolve) => setTimeout(resolve, 800))

                    // Stream the generated content
                    for await (const chunk of result.stream) {
                        const text = chunk.text()
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "content", text })}\n\n`))
                    }

                    // Send completion signal
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`))
                    controller.close()
                } catch (error) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: String(error) })}\n\n`))
                    controller.close()
                }
            },
        })

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        })
    } catch (error) {
        console.error("Error in generate-mdx API:", error)
        return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}

// export async function POST(request: Request) {
//     try {
//         const data: ProjectData = await request.json()

//         if (!data.name || !data.description) {
//             return NextResponse.json({ error: "Project name and description are required." }, { status: 400 })
//         }

//         if (!process.env.NEXT_GEMINI_API_KEY) {
//             return NextResponse.json({ error: "NEXT_GEMINI_API_KEY environment variable is not set" }, { status: 500 })
//         }

//         const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_API_KEY })
//         const prompt = buildPrompt(data)

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: prompt,
//             config: {
//                 temperature: 0.6,
//             },
//         })

//         let text = response.text

//         if (text?.startsWith("```mdx")) {
//             text = text.substring(6)
//         }

//         if (text?.endsWith("```")) {
//             text = text.slice(0, -3)
//         }

//         return NextResponse.json({ mdx: text?.trim() || "" })
//     } catch (error) {
//         console.error("Error calling Gemini API:", error)
//         return NextResponse.json({ error: "Failed to generate documentation from AI service." }, { status: 500 })
//     }
// }