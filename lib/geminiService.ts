import type { ProjectData } from "@/types"

export async function generateMdxDocumentation(
  data: ProjectData,
  onThinking?: () => void,
  onChunk?: (chunk: string) => void,
  onComplete?: (fullContent: string) => void,
  onError?: (error: string) => void,
): Promise<string> {
  if (!data.name || !data.description) {
    throw new Error("Project name and description are required.")
  }

  try {
    const response = await fetch("/api/generate-mdx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to generate documentation")
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let fullContent = ""

    if (!reader) {
      throw new Error("No response body")
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6))

            if (data.type === "thinking") {
              onThinking?.()
            } else if (data.type === "content") {
              fullContent += data.text
              onChunk?.(data.text)
            } else if (data.type === "done") {
              onComplete?.(fullContent)
            } else if (data.type === "error") {
              throw new Error(data.error)
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }
    }

    return fullContent
  } catch (error) {
    console.error("Error calling MDX generation API:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    onError?.(errorMessage)
    throw error
  }
}


// export async function generateMdxDocumentation(data: ProjectData): Promise<string> {
//   if (!data.name || !data.description) {
//     throw new Error("Project name and description are required.")
//   }

//   try {
//     const response = await fetch("/api/generate-mdx", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.error || "Failed to generate documentation")
//     }

//     const result = await response.json()
//     return result.mdx
//   } catch (error) {
//     console.error("Error calling MDX generation API:", error)
//     throw error
//   }
// }

