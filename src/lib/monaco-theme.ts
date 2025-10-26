import type { editor } from "monaco-editor"

// Helper to get CSS variable value and convert to hex
function getCSSVar(varName: string): string {
  if (typeof window === "undefined") return "#000000"
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

  // If it's already a hex color, return it
  if (value.startsWith("#")) return value

  // If it's an oklch color, we need to convert it (simplified conversion)
  // For now, we'll use a mapping of common values
  return value || "#000000"
}

// Helper to convert oklch to approximate hex (simplified)
function oklchToHex(oklch: string): string {
  // This is a simplified conversion - in production you'd want a proper color conversion library
  // For now, we'll extract lightness and map to grayscale or use predefined mappings
  const match = oklch.match(/oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)$$/)
  if (!match) return "#000000"

  const [, l, c, h] = match
  const lightness = Number.parseFloat(l)

  // Map common oklch values to hex colors
  if (lightness > 0.95) return "#fafafa"
  if (lightness > 0.9) return "#f5f5f5"
  if (lightness > 0.8) return "#e5e5e5"
  if (lightness > 0.6) return "#a3a3a3"
  if (lightness > 0.5) return "#737373"
  if (lightness > 0.3) return "#404040"
  if (lightness > 0.2) return "#262626"
  if (lightness > 0.15) return "#1a1a1a"
  if (lightness > 0.1) return "#0f0f0f"
  return "#000000"
}

// Get color from CSS variable with fallback
function getThemeColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback

  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

  if (!value) return fallback
  if (value.startsWith("#")) return value
  if (value.startsWith("oklch")) return oklchToHex(value)

  return fallback
}

export function createV0Theme(): editor.IStandaloneThemeData {
  // v0-inspired color palette for syntax highlighting
  return {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Comments - muted
      { token: "comment", foreground: "6b7280", fontStyle: "italic" },

      // Keywords - primary/purple
      { token: "keyword", foreground: "a78bfa" },
      { token: "keyword.control", foreground: "a78bfa" },

      // Strings - green
      { token: "string", foreground: "86efac" },
      { token: "string.yaml", foreground: "86efac" },

      // Numbers - orange
      { token: "number", foreground: "fdba74" },

      // Functions - blue
      { token: "function", foreground: "7dd3fc" },
      { token: "entity.name.function", foreground: "7dd3fc" },

      // Types - cyan
      { token: "type", foreground: "67e8f9" },
      { token: "entity.name.type", foreground: "67e8f9" },

      // Variables - foreground
      { token: "variable", foreground: "e5e7eb" },
      { token: "variable.parameter", foreground: "fbbf24" },

      // Markdown specific
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },
      { token: "heading", foreground: "c4b5fd", fontStyle: "bold" },
      { token: "meta.link", foreground: "7dd3fc" },
      { token: "markup.underline.link", foreground: "7dd3fc" },
      { token: "markup.bold", foreground: "fbbf24", fontStyle: "bold" },
      { token: "markup.italic", fontStyle: "italic" },
      { token: "markup.list", foreground: "a78bfa" },
      { token: "markup.quote", foreground: "6b7280", fontStyle: "italic" },
      { token: "markup.inline.raw", foreground: "86efac" },
      { token: "markup.fenced_code", foreground: "86efac" },

      // JSX/TSX in MDX
      { token: "tag", foreground: "c084fc" },
      { token: "tag.id", foreground: "c084fc" },
      { token: "tag.class", foreground: "7dd3fc" },
      { token: "attribute.name", foreground: "fbbf24" },
      { token: "attribute.value", foreground: "86efac" },

      // Operators
      { token: "operator", foreground: "a78bfa" },
      { token: "delimiter", foreground: "9ca3af" },
    ],
    colors: {
      // Editor background - use card color for slight elevation
      "editor.background": "#0f0f0f",
      "editor.foreground": "#e5e7eb",

      // Line numbers
      "editorLineNumber.foreground": "#4b5563",
      "editorLineNumber.activeForeground": "#9ca3af",

      // Current line highlight
      "editor.lineHighlightBackground": "#1a1a1a",
      "editor.lineHighlightBorder": "#262626",

      // Selection
      "editor.selectionBackground": "#374151",
      "editor.inactiveSelectionBackground": "#1f2937",

      // Cursor
      "editorCursor.foreground": "#a78bfa",

      // Indent guides - subtle lines
      "editorIndentGuide.background": "#262626",
      "editorIndentGuide.activeBackground": "#404040",

      // Gutter (line numbers area)
      "editorGutter.background": "#0a0a0a",

      // Scrollbar
      "scrollbarSlider.background": "#262626",
      "scrollbarSlider.hoverBackground": "#404040",
      "scrollbarSlider.activeBackground": "#525252",

      // Minimap
      "minimap.background": "#0a0a0a",

      // Borders
      "editorWidget.border": "#262626",

      // Bracket matching
      "editorBracketMatch.background": "#374151",
      "editorBracketMatch.border": "#6b7280",

      // Folding
      "editorGutter.foldingControlForeground": "#6b7280",

      // Overview ruler (scrollbar annotations)
      "editorOverviewRuler.border": "#1a1a1a",
    },
  }
}

// Alternative: Dynamic theme that reads from CSS variables
export function createDynamicV0Theme(): editor.IStandaloneThemeData {
  const background = getThemeColor("--background", "#0f0f0f")
  const foreground = getThemeColor("--foreground", "#e5e7eb")
  const muted = getThemeColor("--muted", "#1a1a1a")
  const mutedForeground = getThemeColor("--muted-foreground", "#6b7280")
  const border = getThemeColor("--border", "#262626")
  const primary = getThemeColor("--primary", "#a78bfa")

  return {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: mutedForeground, fontStyle: "italic" },
      { token: "keyword", foreground: primary },
      { token: "keyword.control", foreground: primary },
      { token: "string", foreground: "#16a34a" },
      { token: "string.yaml", foreground: "#16a34a" },
      { token: "number", foreground: "#ea580c" },
      { token: "function", foreground: "#0284c7" },
      { token: "entity.name.function", foreground: "#0284c7" },
      { token: "type", foreground: "#0891b2" },
      { token: "entity.name.type", foreground: "#0891b2" },
      { token: "variable", foreground: foreground },
      { token: "variable.parameter", foreground: "#d97706" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },
      { token: "heading", foreground: "#6d28d9", fontStyle: "bold" },
      { token: "meta.link", foreground: "#0284c7" },
      { token: "markup.underline.link", foreground: "#0284c7" },
      { token: "markup.bold", foreground: "#d97706", fontStyle: "bold" },
      { token: "markup.italic", fontStyle: "italic" },
      { token: "markup.list", foreground: primary },
      { token: "markup.quote", foreground: mutedForeground, fontStyle: "italic" },
      { token: "markup.inline.raw", foreground: "#16a34a" },
      { token: "markup.fenced_code", foreground: "#16a34a" },
      { token: "tag", foreground: "#9333ea" },
      { token: "tag.id", foreground: "#9333ea" },
      { token: "tag.class", foreground: "#0284c7" },
      { token: "attribute.name", foreground: "#d97706" },
      { token: "attribute.value", foreground: "#16a34a" },
      { token: "operator", foreground: primary },
      { token: "delimiter", foreground: "#6b7280" },
    ],
    colors: {
      "editor.background": background,
      "editor.foreground": foreground,
      "editorLineNumber.foreground": "#9ca3af",
      "editorLineNumber.activeForeground": "#4b5563",
      "editor.lineHighlightBackground": "#f9fafb",
      "editor.lineHighlightBorder": "#e5e7eb",
      "editor.selectionBackground": "#ddd6fe",
      "editor.inactiveSelectionBackground": "#ede9fe",
      "editorCursor.foreground": primary,
      "editorIndentGuide.background": "#e5e7eb",
      "editorIndentGuide.activeBackground": "#d1d5db",
      "editorGutter.background": "#fafafa",
      "scrollbarSlider.background": "#d1d5db",
      "scrollbarSlider.hoverBackground": "#9ca3af",
      "scrollbarSlider.activeBackground": "#6b7280",
      "minimap.background": "#fafafa",
      "editorWidget.border": "#e5e7eb",
      "editorBracketMatch.background": "#ddd6fe",
      "editorBracketMatch.border": "#9ca3af",
      "editorGutter.foldingControlForeground": "#6b7280",
      "editorOverviewRuler.border": "#f3f4f6",
    },
  }
}

export function createV0LightTheme(): editor.IStandaloneThemeData {
  // v0-inspired light theme with adjusted colors for light backgrounds
  return {
    base: "vs",
    inherit: true,
    rules: [
      // Comments - muted
      { token: "comment", foreground: "#6b7280", fontStyle: "italic" },

      // Keywords - primary/purple (darker for light bg)
      { token: "keyword", foreground: "#7c3aed" },
      { token: "keyword.control", foreground: "#7c3aed" },

      // Strings - green (darker for light bg)
      { token: "string", foreground: "#16a34a" },
      { token: "string.yaml", foreground: "#16a34a" },

      // Numbers - orange (darker for light bg)
      { token: "number", foreground: "#ea580c" },

      // Functions - blue (darker for light bg)
      { token: "function", foreground: "#0284c7" },
      { token: "entity.name.function", foreground: "#0284c7" },

      // Types - cyan (darker for light bg)
      { token: "type", foreground: "#0891b2" },
      { token: "entity.name.type", foreground: "#0891b2" },

      // Variables - foreground
      { token: "variable", foreground: "#1f2937" },
      { token: "variable.parameter", foreground: "#d97706" },

      // Markdown specific
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },
      { token: "heading", foreground: "#6d28d9", fontStyle: "bold" },
      { token: "meta.link", foreground: "#0284c7" },
      { token: "markup.underline.link", foreground: "#0284c7" },
      { token: "markup.bold", foreground: "#d97706", fontStyle: "bold" },
      { token: "markup.italic", fontStyle: "italic" },
      { token: "markup.list", foreground: "#7c3aed" },
      { token: "markup.quote", foreground: "#6b7280", fontStyle: "italic" },
      { token: "markup.inline.raw", foreground: "#16a34a" },
      { token: "markup.fenced_code", foreground: "#16a34a" },

      // JSX/TSX in MDX
      { token: "tag", foreground: "#9333ea" },
      { token: "tag.id", foreground: "#9333ea" },
      { token: "tag.class", foreground: "#0284c7" },
      { token: "attribute.name", foreground: "#d97706" },
      { token: "attribute.value", foreground: "#16a34a" },

      // Operators
      { token: "operator", foreground: "#7c3aed" },
      { token: "delimiter", foreground: "#6b7280" },
    ],
    colors: {
      // Editor background - light
      "editor.background": "#ffffff",
      "editor.foreground": "#1f2937",

      // Line numbers
      "editorLineNumber.foreground": "#9ca3af",
      "editorLineNumber.activeForeground": "#4b5563",

      // Current line highlight
      "editor.lineHighlightBackground": "#f9fafb",
      "editor.lineHighlightBorder": "#e5e7eb",

      // Selection
      "editor.selectionBackground": "#ddd6fe",
      "editor.inactiveSelectionBackground": "#ede9fe",

      // Cursor
      "editorCursor.foreground": "#7c3aed",

      // Indent guides - subtle lines
      "editorIndentGuide.background": "#e5e7eb",
      "editorIndentGuide.activeBackground": "#d1d5db",

      // Gutter (line numbers area)
      "editorGutter.background": "#fafafa",

      // Scrollbar
      "scrollbarSlider.background": "#d1d5db",
      "scrollbarSlider.hoverBackground": "#9ca3af",
      "scrollbarSlider.activeBackground": "#6b7280",

      // Minimap
      "minimap.background": "#fafafa",

      // Borders
      "editorWidget.border": "#e5e7eb",

      // Bracket matching
      "editorBracketMatch.background": "#ddd6fe",
      "editorBracketMatch.border": "#9ca3af",

      // Folding
      "editorGutter.foldingControlForeground": "#6b7280",

      // Overview ruler (scrollbar annotations)
      "editorOverviewRuler.border": "#f3f4f6",
    },
  }
}
