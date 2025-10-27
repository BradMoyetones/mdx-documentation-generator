import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, FileTextIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "Examples",
    description: "Explore real-world examples of generated MDX documentation.",
}

const examples = [
    {
        title: "E-commerce Platform",
        description: "Complete documentation for a modern e-commerce platform with Next.js, Stripe, and Supabase.",
        stack: ["Next.js", "Stripe", "Supabase"],
        comingSoon: true,
    },
    {
        title: "SaaS Dashboard",
        description: "Documentation for a multi-tenant SaaS application with authentication and billing.",
        stack: ["React", "Node.js", "PostgreSQL"],
        comingSoon: true,
    },
    {
        title: "Mobile App Backend",
        description: "API documentation for a mobile app backend with REST and GraphQL endpoints.",
        stack: ["Express", "GraphQL", "MongoDB"],
        comingSoon: true,
    },
]

export default function ExamplesPage() {
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
                            <FileTextIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Documentation Examples</h1>
                            <p className="text-muted-foreground">Real-world examples of AI-generated MDX documentation</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examples.map((example) => (
                        <Card key={example.title} className="relative">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                {example.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
                                </div>
                                <CardTitle>{example.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed mb-4">{example.description}</CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    {example.stack.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                        {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
