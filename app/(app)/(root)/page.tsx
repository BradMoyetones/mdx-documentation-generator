import { Metadata } from "next"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/components/ui/button"
import { CodeIcon, FileTextIcon, LayoutTemplateIcon, SparklesIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const title = "AI MDX Doc Generator"
const description =
  "AI-powered MDX documentation generator for fumadocs. Create professional, structured documentation with integrated code editor and real-time preview."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

const features = [
  {
    icon: SparklesIcon,
    title: "MDX Generator",
    description:
      "Generate complete fumadocs MDX documentation using AI. Input your project details and get structured, professional documentation instantly.",
    href: "/generator",
    badge: "Main Tool",
    badgeVariant: "default" as const,
  },
  {
    icon: LayoutTemplateIcon,
    title: "Templates",
    description:
      "Browse pre-made MDX templates for common documentation patterns. Quick start guides, API references, tutorials, and more.",
    href: "/templates",
    badge: "Coming Soon",
    badgeVariant: "secondary" as const,
  },
  {
    icon: FileTextIcon,
    title: "Examples",
    description:
      "Explore real-world examples of generated MDX documentation. Learn best practices and get inspiration for your own docs.",
    href: "/examples",
    badge: "Coming Soon",
    badgeVariant: "secondary" as const,
  },
  {
    icon: CodeIcon,
    title: "Tools",
    description:
      "Additional utilities for working with MDX. Validators, converters, formatters, and more tools to enhance your workflow.",
    href: "/tools",
    badge: "Coming Soon",
    badgeVariant: "secondary" as const,
  },
]

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader className="bg-muted/50">
        <Announcement />
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/generator">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/examples">View Examples</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <Separator />
      
      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need for MDX Documentation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete suite of tools to create, manage, and optimize your fumadocs documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Create Better Documentation?</h2>
            <p className="text-lg text-muted-foreground">
              Join developers who are already using AI to streamline their documentation workflow.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/generator">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
