"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import * as monaco from "monaco-editor"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Monaco } from "@monaco-editor/react"
import { createV0Theme, createV0LightTheme } from "@/lib/monaco-theme"
import { useTheme } from "next-themes"
import { Check, ClipboardIcon, Code2Icon, DownloadIcon, Eye, FileTextIcon } from "lucide-react"
import { MDXPreview } from "./mdx-preview"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { editor } from "monaco-editor"
import { toast } from "sonner"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface OutputPanelProps {
  mdxContent: string
  setMdxContent: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  isThinking?: boolean
  error: string | null
}

export default function OutputPanel({ mdxContent, setMdxContent, isLoading, isThinking, error }: OutputPanelProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const {theme} = useTheme()

  useEffect(() => {
    if (copyStatus === "copied") {
      const timer = setTimeout(() => setCopyStatus("idle"), 2000)
      return () => clearTimeout(timer)
    }
  }, [copyStatus])

  const handleCopy = () => {
    navigator.clipboard.writeText(mdxContent)
    setCopyStatus("copied")
  }

  const handleDownload = () => {
    const blob = new Blob([mdxContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generated.mdx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    // Define the custom v0 theme
    monaco.editor.defineTheme("v0-dark", createV0Theme())
    monaco.editor.defineTheme("v0-light", createV0LightTheme())
  }

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor

    editor.onDidChangeModelContent(() => {
      const currentValue = editor.getValue()
      // No actualices el estado aquí por cada letra
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const text = editor.getValue()
      setMdxContent(text)
      toast.success("Saved")
    })
  }

  const renderContent = () => {
    if (isThinking) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="max-w-md space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">AI is thinking...</h3>
              <p className="text-sm text-muted-foreground">Analyzing your project and crafting documentation</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      )
    }

    if (isLoading && !mdxContent) {
      return (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-6 bg-muted rounded w-1/3 mt-6"></div>
          <div className="h-10 bg-muted rounded w-full"></div>
          <div className="h-6 bg-muted rounded w-1/4 mt-6"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Card className="bg-destructive/10 border-destructive/30 text-destructive p-6 max-w-md">
            <h3 className="font-semibold text-lg mb-2">Generation Failed</h3>
            <p className="text-sm">{error}</p>
          </Card>
        </div>
      )
    }

    if (!mdxContent) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="max-w-md space-y-3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-muted-foreground"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">No Documentation Yet</h3>
            <p className="text-sm text-muted-foreground">
              Fill in your project details and click "Generate Docs" to create your MDX documentation.
            </p>
          </div>
        </div>
      )
    }

    return (
      <Tabs defaultValue="MonacoEditor" className="w-full h-full gap-0">
        <div className="p-2 flex items-center justify-between bg-background border-b">
          <TabsList>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="MonacoEditor" asChild>
                  <Button size={"icon-sm"} variant={"ghost"}>
                    <Code2Icon /> <span className="sr-only">MonacoEditor</span>
                  </Button>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Code</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="Preview" asChild>
                  <Button size={"icon-sm"} variant={"ghost"}>
                    <Eye /> <span className="sr-only">Preview</span>
                  </Button>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview</p>
              </TooltipContent>
            </Tooltip>
          </TabsList>
          {mdxContent && !isLoading && !error && (
            <Badge variant="secondary" className="text-xs ml-2">
              {mdxContent.split("\n").length} lines
            </Badge>
          )}
        </div>
        <TabsContent value="MonacoEditor" className="h-full w-full overflow-y-auto">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full bg-background border-border">
                <div className="p-3 border-b border-border">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Explorer</h3>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent/40 text-sm text-foreground transition-colors">
                    <FileTextIcon className="w-4 h-4 text-primary shrink-0" />
                    <span>generated.mdx</span>
                  </button>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={80}>
              <div className="h-full flex flex-col">
                <div className="py-1 px-2 border-b flex items-center justify-between bg-background">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-muted-foreground">
                          docs
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium">generated.mdx</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleCopy} variant="ghost" size="icon-sm">
                          {copyStatus === "copied" ? <Check className="w-2 h-2" /> : <ClipboardIcon className="w-2 h-2" />}
                          <span className="sr-only">Copy</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleDownload} variant="ghost" size="icon-sm">
                          <DownloadIcon className="w-2 h-2" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Download</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="flex-1">
                  <MonacoEditor
                    height="100%"
                    defaultLanguage="mdx"
                    defaultValue={mdxContent}
                    theme={theme === "dark" ? "v0-dark" : "v0-light"}
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                    options={{
                      readOnly: false,
                      minimap: { enabled: true },
                      fontSize: 14,
                      fontFamily: "'Geist Mono', 'Fira Code', 'Consolas', monospace",
                      lineNumbers: "on",
                      renderLineHighlight: "all",
                      guides: {
                        indentation: true,
                        highlightActiveIndentation: true,
                      },
                      wordWrap: "on",
                      wrappingIndent: "same",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 16, bottom: 16 },
                      renderWhitespace: "selection",
                      cursorBlinking: "smooth",
                      smoothScrolling: true,
                      folding: true,
                      foldingHighlight: true,
                      showFoldingControls: "mouseover",
                      bracketPairColorization: {
                        enabled: true,
                      },
                      lineDecorationsWidth: 10,
                      lineNumbersMinChars: 3,
                      glyphMargin: false,
                      scrollbar: {
                        vertical: "visible",
                        horizontal: "visible",
                        useShadows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                      },
                    }}
                    loading={
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse text-muted-foreground">Loading editor...</div>
                      </div>
                    }
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        <TabsContent value="Preview" className="h-full w-full overflow-y-auto bg-background p-4 scroll-smooth">
          <MDXPreview mdxContent={mdxContent} />
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background rounded-lg scale-[98%] border-2 justify-between">
      <div className="grow overflow-hidden bg-card">
        {renderContent()}
      </div>
    </div>
  )
}
