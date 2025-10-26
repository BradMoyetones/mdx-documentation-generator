"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardIcon } from "./icons/ClipboardIcon"

import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { EditorView } from "@codemirror/view"

import Editor from '@monaco-editor/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Monaco } from "@monaco-editor/react"
import { createV0Theme, createV0LightTheme } from "@/lib/monaco-theme"
import { useTheme } from "./theme-provider"

interface OutputPanelProps {
  mdxContent: string
  isLoading: boolean
  error: string | null
}

export default function OutputPanel({ mdxContent, isLoading, error }: OutputPanelProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")
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

  const handleEditorWillMount = (monaco: Monaco) => {
    // Define the custom v0 theme
    monaco.editor.defineTheme("v0-dark", createV0Theme())
    monaco.editor.defineTheme("v0-light", createV0LightTheme())
  }

  const renderContent = () => {
    if (isLoading) {
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
      <Tabs defaultValue="CodeMirror" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="CodeMirror">CodeMirror</TabsTrigger>
          <TabsTrigger value="MonacoEditor">MonacoEditor</TabsTrigger>
        </TabsList>
        <TabsContent value="CodeMirror">
          <div className="h-full w-full">
            <CodeMirror
              value={mdxContent}
              height="100%"
              theme={dracula}
              extensions={[
                markdown({ base: markdownLanguage, codeLanguages: languages }),
                EditorView.lineWrapping, // Enable line wrapping for long lines
              ]}
              editable={false}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: false,
                highlightActiveLine: false,
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: false,
              }}
              className="text-sm"
            />
          </div>
        </TabsContent>
        <TabsContent value="MonacoEditor">
          <div className="h-full w-full">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={mdxContent}
              theme={theme === "dark" ? "v0-dark" : "v0-light"}
              beforeMount={handleEditorWillMount}
              options={{
                readOnly: true,
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
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 py-2 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Generated MDX</h2>
          {mdxContent && !isLoading && !error && (
            <Badge variant="secondary" className="text-xs">
              {mdxContent.split("\n").length} lines
            </Badge>
          )}
        </div>
        {mdxContent && !isLoading && !error && (
          <Button onClick={handleCopy} variant="outline" size="sm">
            <ClipboardIcon className="w-4 h-4 mr-2" />
            {copyStatus === "copied" ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>

      <div className="grow overflow-hidden bg-card">
        {renderContent()}
      </div>
    </div>
  )
}
