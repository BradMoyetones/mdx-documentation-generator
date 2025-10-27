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
  // v0 dark theme with exact colors from v0's design system
  return {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Comentarios
      { token: "comment", foreground: "888888", fontStyle: "italic" },

      // Palabras clave / storage
      { token: "keyword", foreground: "6fadf7" },
      { token: "keyword.control", foreground: "000000" },
      { token: "storage.type", foreground: "ff0078" },
      { token: "storage.modifier", foreground: "ff0078" },

      // Tipos generales
      { token: "type", foreground: "85e89d" }, // elementos html
      { token: "type.yaml", foreground: "ed6d96" }, // valor del yaml (esta parte -> title: Almuerzos)

      // Cadenas
      { token: "string", foreground: "39d471" },
      { token: "string.quoted", foreground: "39d471" },
      { token: "string.yaml", foreground: "44d46a" }, // valor del yaml (title: Almuerzos <- esta parte)
      { token: "string.unquoted.yaml", foreground: "39d471" },

      // Números
      { token: "number", foreground: "fbbf24" },
      { token: "constant.numeric", foreground: "fbbf24" },

      // Funciones
      { token: "entity.name.function", foreground: "c084fc" },
      { token: "support.function", foreground: "c084fc" },
      { token: "meta.function-call", foreground: "c084fc" },

      // Clases / tipos / interfaces
      { token: "entity.name.type", foreground: "c084fc" },
      { token: "entity.name.class", foreground: "c084fc" },
      { token: "support.type", foreground: "c084fc" },
      { token: "support.class", foreground: "c084fc" },
      { token: "entity.other.inherited-class", foreground: "c084fc" },

      // Variables
      { token: "variable", foreground: "ffffff" },
      { token: "variable.other", foreground: "ffffff" },
      { token: "variable.parameter", foreground: "ffffff" },
      { token: "meta.definition.variable", foreground: "ffffff" },

      // Propiedades
      { token: "variable.other.property", foreground: "ffffff" },
      { token: "support.variable.property", foreground: "ffffff" },

      // Operadores / puntuación
      { token: "keyword.operator", foreground: "ffffff" },
      { token: "punctuation", foreground: "ffffff" },
      { token: "punctuation.definition", foreground: "ffffff" },
      { token: "punctuation.separator", foreground: "ffffff" },
      { token: "punctuation.terminator", foreground: "ffffff" },
      { token: "meta.brace", foreground: "ffffff" },
      { token: "meta.delimiter", foreground: "ffffff" },

      // JSX / TSX / HTML en MDX
      { token: "entity.name.tag", foreground: "00e7c1" },
      { token: "support.class.component", foreground: "00e7c1" },
      { token: "punctuation.definition.tag", foreground: "ffffff" },
      { token: "entity.other.attribute-name", foreground: "ffffff" },
      { token: "attribute.value", foreground: "39d471" },                // valor de atributo
      { token: "attribute.name", foreground: "ba7bf5" },                // nombre de atributo

      // Markdown / MDX textos
      { token: "markup.heading", foreground: "000000", fontStyle: "bold" },
      { token: "entity.name.section", foreground: "00a7fd", fontStyle: "bold" },
      { token: "markup.list", foreground: "fbbf24" },
      { token: "punctuation.definition.list", foreground: "fbbf24" },
      { token: "beginning.punctuation.definition.list", foreground: "fbbf24" },
      { token: "markup.bold", foreground: "ffffff", fontStyle: "bold" },
      { token: "markup.italic", foreground: "ffffff", fontStyle: "italic" },
      { token: "markup.underline.link", foreground: "00a7fd" },
      { token: "meta.link", foreground: "00a7fd" },
      { token: "markup.inline.raw", foreground: "00e7c1" },
      { token: "markup.fenced_code", foreground: "00e7c1" },
      { token: "markup.quote", foreground: "888888", fontStyle: "italic" },

      // YAML Frontmatter en MDX
      { token: "meta.embedded.block.frontmatter", foreground: "ffffff" },                // bloque completo
      { token: "meta.embedded.block.frontmatter punctuation.definition.block", foreground: "ffffff" }, // las líneas ---
      { token: "meta.embedded.block.frontmatter entity.name.tag.yaml", foreground: "ff0078" },  // clave
      { token: "meta.embedded.block.frontmatter punctuation.separator.key-value.yaml", foreground: "ffffff" }, // :
      { token: "meta.embedded.block.frontmatter string.unquoted.yaml", foreground: "39d471" }, // valor sin comillas
      { token: "meta.embedded.block.frontmatter string.quoted.yaml", foreground: "39d471" },   // valor entre comillas

      // JSON
      { token: "support.type.property-name.json", foreground: "ff0078" },
      { token: "string.quoted.double.json", foreground: "39d471" },

      // CSS
      { token: "entity.name.tag.css", foreground: "39d471" },
      { token: "support.type.property-name.css", foreground: "ffffff" },
      { token: "support.constant.property-value.css", foreground: "39d471" },

      // Por defecto / fallback
      { token: "", foreground: "ededed" }  // para cualquier token que no se haya cubierto
    ],
    colors: {
      // Editor background - using v0 background colors
      "editor.background": "#0a0a0a", // --v0-background-100
      "editor.foreground": "#ededed", // --v0-gray-1000

      // Line numbers - using v0 gray scale
      "editorLineNumber.foreground": "#454545", // --v0-gray-500
      "editorLineNumber.activeForeground": "#ffffff", // --v0-gray-600

      // Current line highlight
      "editor.lineHighlightBackground": "#1a1a1a", // --v0-gray-100
      "editor.lineHighlightBorder": "#1f1f1f", // --v0-gray-200

      // Selection - using v0 teal colors
      "editor.selectionBackground": "#0f2f57", // --v0-blue-300
      "editor.inactiveSelectionBackground": "#0f1c2e", // --v0-blue-100

      // Cursor - using v0 blue
      "editorCursor.foreground": "#0090ff", // --v0-blue-600

      // Indent guides
      "editorIndentGuide.background": "#1f1f1f", // --v0-gray-200
      "editorIndentGuide.activeBackground": "#292929", // --v0-gray-300

      // Gutter (line numbers area)
      "editorGutter.background": "#000000", // --v0-background-200

      // Scrollbar - using v0 gray scale
      "scrollbarSlider.background": "#292929", // --v0-gray-300
      "scrollbarSlider.hoverBackground": "#2e2e2e", // --v0-gray-400
      "scrollbarSlider.activeBackground": "#454545", // --v0-gray-500

      // Minimap
      "minimap.background": "#000000", // --v0-background-200

      // Borders - using v0 gray
      "editorWidget.border": "#292929", // --v0-gray-300

      // Bracket matching
      "editorBracketMatch.background": "#0f2f57", // --v0-blue-300
      "editorBracketMatch.border": "#878787", // --v0-gray-600

      // Folding
      "editorGutter.foldingControlForeground": "#878787", // --v0-gray-600

      // Overview ruler
      "editorOverviewRuler.border": "#121212", // --v0-background-300
    },
  }
}

// Alternative: Dynamic theme that reads from CSS variables
export function createDynamicV0Theme(): editor.IStandaloneThemeData {
  const background = getThemeColor("--background", "#0a0a0a")
  const foreground = getThemeColor("--foreground", "#ededed")
  const muted = getThemeColor("--muted", "#1a1a1a")
  const mutedForeground = getThemeColor("--muted-foreground", "#6b7280")
  const border = getThemeColor("--border", "#292929")
  const primary = getThemeColor("--primary", "#ff0078")

  return {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: mutedForeground, fontStyle: "italic" },
      { token: "keyword", foreground: primary },
      { token: "keyword.control", foreground: primary },
      { token: "string", foreground: "#00e7c1" },
      { token: "string.yaml", foreground: "#00e7c1" },
      { token: "number", foreground: "#ffb96d" },
      { token: "function", foreground: "#00a7fd" },
      { token: "entity.name.function", foreground: "#00a7fd" },
      { token: "type", foreground: "#52a8ff" },
      { token: "entity.name.type", foreground: "#52a8ff" },
      { token: "variable", foreground: foreground },
      { token: "variable.parameter", foreground: "#ffb96d" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },
      { token: "heading", foreground: "#a78bfa", fontStyle: "bold" },
      { token: "meta.link", foreground: "#00a7fd" },
      { token: "markup.underline.link", foreground: "#00a7fd" },
      { token: "markup.bold", foreground: "#ffb96d", fontStyle: "bold" },
      { token: "markup.italic", fontStyle: "italic" },
      { token: "markup.list", foreground: primary },
      { token: "markup.quote", foreground: mutedForeground, fontStyle: "italic" },
      { token: "markup.inline.raw", foreground: "#00e7c1" },
      { token: "markup.fenced_code", foreground: "#00e7c1" },
      { token: "tag", foreground: "#a78bfa" },
      { token: "tag.id", foreground: "#a78bfa" },
      { token: "tag.class", foreground: "#00a7fd" },
      { token: "attribute.name", foreground: "#ffb96d" },
      { token: "attribute.value", foreground: "#00e7c1" },
      { token: "operator", foreground: primary },
      { token: "delimiter", foreground: "#9b9b9b" },
    ],
    colors: {
      "editor.background": background,
      "editor.foreground": foreground,
      "editorLineNumber.foreground": "#878787",
      "editorLineNumber.activeForeground": "#454545",
      "editor.lineHighlightBackground": "#1a1a1a",
      "editor.lineHighlightBorder": "#1f1f1f",
      "editor.selectionBackground": "#0f2f57",
      "editor.inactiveSelectionBackground": "#0f1c2e",
      "editorCursor.foreground": "#0090ff",
      "editorIndentGuide.background": "#1f1f1f",
      "editorIndentGuide.activeBackground": "#292929",
      "editorGutter.background": "#000000",
      "scrollbarSlider.background": "#292929",
      "scrollbarSlider.hoverBackground": "#2e2e2e",
      "scrollbarSlider.activeBackground": "#454545",
      "minimap.background": "#000000",
      "editorWidget.border": "#292929",
      "editorBracketMatch.background": "#0f2f57",
      "editorBracketMatch.border": "#878787",
      "editorGutter.foldingControlForeground": "#878787",
      "editorOverviewRuler.border": "#121212",
    },
  }
}

export function createV0LightTheme(): editor.IStandaloneThemeData {
  // v0 light theme - using inverted/light versions of v0 colors
  return {
    base: "vs",
    inherit: true,
    rules: [
      // Comments
      { token: "comment", foreground: "6b7280", fontStyle: "italic" },

      // Keywords - darker pink for light background
      { token: "keyword", foreground: "d10068" },
      { token: "keyword.control", foreground: "d10068" },
      { token: "storage.type", foreground: "d10068" },
      { token: "storage.modifier", foreground: "d10068" },

      // Strings - darker teal for light background
      { token: "string", foreground: "00a896" },
      { token: "string.yaml", foreground: "00a896" },
      { token: "string.quoted", foreground: "00a896" },

      // Numbers - darker amber
      { token: "number", foreground: "d97706" },
      { token: "constant.numeric", foreground: "d97706" },

      // Function names - darker purple
      { token: "entity.name.function", foreground: "9333ea" },
      { token: "support.function", foreground: "9333ea" },
      { token: "meta.function-call", foreground: "9333ea" },

      // Types - darker purple
      { token: "entity.name.type", foreground: "9333ea" },
      { token: "entity.name.class", foreground: "9333ea" },
      { token: "support.type", foreground: "9333ea" },
      { token: "support.class", foreground: "9333ea" },
      { token: "entity.other.inherited-class", foreground: "9333ea" },

      // Variables - dark gray
      { token: "variable", foreground: "1a1a1a" },
      { token: "variable.other", foreground: "1a1a1a" },
      { token: "variable.parameter", foreground: "1a1a1a" },
      { token: "meta.definition.variable", foreground: "1a1a1a" },

      // Properties
      { token: "variable.other.property", foreground: "1a1a1a" },
      { token: "support.variable.property", foreground: "1a1a1a" },

      // Operators and delimiters
      { token: "keyword.operator", foreground: "1a1a1a" },
      { token: "punctuation", foreground: "1a1a1a" },
      { token: "punctuation.definition", foreground: "1a1a1a" },
      { token: "punctuation.separator", foreground: "1a1a1a" },
      { token: "punctuation.terminator", foreground: "1a1a1a" },
      { token: "meta.brace", foreground: "1a1a1a" },
      { token: "meta.delimiter", foreground: "1a1a1a" },

      // JSX/TSX Tags
      { token: "entity.name.tag", foreground: "00a896" },
      { token: "support.class.component", foreground: "00a896" },
      { token: "punctuation.definition.tag", foreground: "1a1a1a" },
      { token: "entity.other.attribute-name", foreground: "1a1a1a" },

      // Markdown Headers
      { token: "markup.heading", foreground: "0072f5", fontStyle: "bold" },
      { token: "entity.name.section", foreground: "0072f5", fontStyle: "bold" },

      // Markdown Lists
      { token: "markup.list", foreground: "d97706" },
      { token: "punctuation.definition.list", foreground: "d97706" },
      { token: "beginning.punctuation.definition.list", foreground: "d97706" },

      // Markdown formatting
      { token: "markup.bold", foreground: "1a1a1a", fontStyle: "bold" },
      { token: "markup.italic", foreground: "1a1a1a", fontStyle: "italic" },
      { token: "markup.underline.link", foreground: "0072f5" },
      { token: "meta.link", foreground: "0072f5" },
      { token: "markup.inline.raw", foreground: "00a896" },
      { token: "markup.fenced_code", foreground: "00a896" },
      { token: "markup.quote", foreground: "6b7280", fontStyle: "italic" },

      // Frontmatter
      { token: "punctuation.definition.string.begin.yaml", foreground: "1a1a1a" },
      { token: "punctuation.definition.string.end.yaml", foreground: "1a1a1a" },
      { token: "entity.name.tag.yaml", foreground: "d10068" },
      { token: "punctuation.separator.key-value.yaml", foreground: "1a1a1a" },
      { token: "string.unquoted.yaml", foreground: "00a896" },

      // JSON
      { token: "support.type.property-name.json", foreground: "d10068" },
      { token: "string.quoted.double.json", foreground: "00a896" },

      // CSS
      { token: "entity.name.tag.css", foreground: "00a896" },
      { token: "support.type.property-name.css", foreground: "1a1a1a" },
      { token: "support.constant.property-value.css", foreground: "00a896" },
    ],
    colors: {
      // Editor background - light
      "editor.background": "#ffffff",
      "editor.foreground": "#1a1a1a",

      // Line numbers
      "editorLineNumber.foreground": "#999999",
      "editorLineNumber.activeForeground": "#666666",

      // Current line highlight
      "editor.lineHighlightBackground": "#fafafa",
      "editor.lineHighlightBorder": "#eaeaea",

      // Selection - light blue
      "editor.selectionBackground": "#d3e5ff",
      "editor.inactiveSelectionBackground": "#e8f2ff",

      // Cursor
      "editorCursor.foreground": "#0070f3",

      // Indent guides
      "editorIndentGuide.background": "#eaeaea",
      "editorIndentGuide.activeBackground": "#d1d1d1",

      // Gutter
      "editorGutter.background": "#fafafa",

      // Scrollbar
      "scrollbarSlider.background": "#d1d1d1",
      "scrollbarSlider.hoverBackground": "#999999",
      "scrollbarSlider.activeBackground": "#666666",

      // Minimap
      "minimap.background": "#fafafa",

      // Borders
      "editorWidget.border": "#eaeaea",

      // Bracket matching
      "editorBracketMatch.background": "#d3e5ff",
      "editorBracketMatch.border": "#999999",

      // Folding
      "editorGutter.foldingControlForeground": "#666666",

      // Overview ruler
      "editorOverviewRuler.border": "#f5f5f5",
    },
  }
}
