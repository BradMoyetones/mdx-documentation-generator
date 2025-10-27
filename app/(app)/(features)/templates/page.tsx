import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, LayoutTemplateIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "MDX Templates",
    description: "Browse pre-made MDX templates for common documentation patterns.",
}

const templates = [
    {
        title: "Quick Start Guide",
        description: "Perfect for getting users up and running quickly with installation steps and basic usage.",
        category: "Tutorial",
        comingSoon: true,
    },
    {
        title: "API Reference",
        description: "Comprehensive API documentation template with endpoints, parameters, and response examples.",
        category: "Reference",
        comingSoon: true,
    },
    {
        title: "Component Library",
        description: "Showcase your UI components with props, examples, and usage guidelines.",
        category: "Documentation",
        comingSoon: true,
    },
    {
        title: "Migration Guide",
        description: "Help users migrate from one version to another with step-by-step instructions.",
        category: "Tutorial",
        comingSoon: true,
    },
]

export default function TemplatesPage() {
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
                            <LayoutTemplateIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">MDX Templates</h1>
                            <p className="text-muted-foreground">Pre-made templates for common documentation patterns</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <Card key={template.title} className="relative">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <Badge variant="secondary">{template.category}</Badge>
                                    {template.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
                                </div>
                                <CardTitle>{template.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed">{template.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
