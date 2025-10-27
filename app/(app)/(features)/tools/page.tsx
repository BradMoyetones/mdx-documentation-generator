import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, CodeIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "Tools",
    description: "Additional utilities for working with MDX documentation.",
}

const tools = [
    {
        title: "MDX Validator",
        description: "Validate your MDX syntax and check for common errors before publishing.",
        comingSoon: true,
    },
    {
        title: "MDX Formatter",
        description: "Automatically format and beautify your MDX files with consistent styling.",
        comingSoon: true,
    },
    {
        title: "Markdown to MDX Converter",
        description: "Convert existing Markdown documentation to fumadocs-compatible MDX format.",
        comingSoon: true,
    },
    {
        title: "MDX Component Extractor",
        description: "Extract and list all custom components used in your MDX files.",
        comingSoon: true,
    },
]

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12">
                <div className="mb-8">
                    <Button asChild variant="ghost" size="sm" className="mb-4">
                        <Link href="/">
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <CodeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">MDX Tools</h1>
                            <p className="text-muted-foreground">Utilities to enhance your MDX workflow</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tools.map((tool) => (
                        <Card key={tool.title} className="relative">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    {tool.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
                                </div>
                                <CardTitle>{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{tool.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
