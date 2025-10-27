"use client"

import * as React from "react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { absoluteUrl, cn } from "@/lib/utils"
import matter from "gray-matter"
import { DocsTableOfContents } from "@/components/docs-toc"
import { TableOfContents } from "fumadocs-core/server"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { mdxComponents } from "@/lib/mdx-components"

async function extractTOC(content: string): Promise<TableOfContents> {
    try {
        // Dynamic import to avoid server-only module in client component
        const { getTableOfContents } = await import("fumadocs-core/server")
        const tocItems = await getTableOfContents(content)

        return tocItems
    } catch (error) {
        console.error("[v0] Error generating TOC with fumadocs:", error)
        // Fallback to manual extraction
        const toc: TableOfContents = []
        const headingRegex = /^(#{2,4})\s+(.+)$/gm
        let match

        while ((match = headingRegex.exec(content)) !== null) {
            const depth = match[1].length
            const title = match[2].trim()
            const id = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
            toc.push({ title, url: `#${id}`, depth })
        }

        return toc
    }
}

export function MDXPreview({ mdxContent }: { mdxContent: string }) {
    const [mdxSource, setMdxSource] = React.useState<MDXRemoteSerializeResult | null>(null)
    const [frontmatter, setFrontmatter] = React.useState<Record<string, any>>({})
    const [toc, setToc] = React.useState<TableOfContents>([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function compileMDX() {
            try {
                setIsLoading(true)

                const { data, content } = matter(mdxContent)
                setFrontmatter(data)

                const tocItems = await extractTOC(content)
                setToc(tocItems)

                const mdxSource = await serialize(content, {
                    mdxOptions: {
                        development: false,
                    },
                })

                setMdxSource(mdxSource)
            } catch (error) {
                console.error("[v0] Error compiling MDX:", error)
            } finally {
                setIsLoading(false)
            }
        }

        if (mdxContent) {
            compileMDX()
        }
    }, [mdxContent])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-muted-foreground">Rendering preview...</div>
            </div>
        )
    }

    if (!mdxSource) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Failed to render MDX</div>
            </div>
        )
    }

    return (
        <div className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full @container">

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="h-(--top-spacing) shrink-0" />
                <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                                {frontmatter.title}
                            </h1>
                            <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                                <DocsCopyPage
                                    page={mdxContent}
                                    url={absoluteUrl("#")}
                                />
                            </div>
                        </div>
                        {frontmatter.description && (
                            <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                                {frontmatter.description}
                            </p>
                        )}
                        </div>
                    </div>
                    <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0 @container">
                        <MDXRemote {...mdxSource} components={mdxComponents} />
                    </div>
                </div>
            </div>

            <div className="sticky top-0 ml-auto hidden h-screen w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 @xl:flex">
                {toc.length > 0 ? (
                    <div className="no-scrollbar overflow-y-auto px-8 pt-6">
                        <DocsTableOfContents toc={toc} />
                        <div className="h-12" />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
