import type { ProjectData } from "@/types"

export async function generateMdxDocumentation(data: ProjectData): Promise<string> {
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

    const result = await response.json()
    return result.mdx
  } catch (error) {
    console.error("Error calling MDX generation API:", error)
    throw error
  }
}

