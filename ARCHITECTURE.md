# Project Architecture

## Overview
AI MDX Doc Generator is a comprehensive platform for creating and managing fumadocs MDX documentation using AI. The project is structured to support future growth with a clear, scalable routing system.

## Route Structure

### `/` - Landing Page
**Purpose**: Main entry point showcasing all features and tools
**Features**:
- Hero section with value proposition
- Feature grid highlighting main tools
- Call-to-action sections
- Navigation to all major sections

### `/generator` - MDX Generator (Main Tool)
**Purpose**: Core AI-powered MDX documentation generator
**Features**:
- Input panel for project details (name, description, tech stack, features, benefits)
- Output panel with Monaco Editor for generated MDX
- Resizable panels on desktop, tabs on mobile
- Real-time generation using Gemini AI
- Copy to clipboard functionality
- Light/dark theme support

**Tech Stack**:
- Monaco Editor for code display
- Gemini AI for content generation
- shadcn/ui components
- Responsive design with Resizable and Tabs

### `/templates` - MDX Templates (Coming Soon)
**Purpose**: Pre-made MDX templates for common documentation patterns
**Planned Features**:
- Quick Start Guide template
- API Reference template
- Component Library template
- Migration Guide template
- One-click template usage
- Customizable template variables

### `/examples` - Documentation Examples (Coming Soon)
**Purpose**: Real-world examples of generated MDX documentation
**Planned Features**:
- E-commerce platform documentation
- SaaS dashboard documentation
- Mobile app backend documentation
- View source MDX
- Copy example code
- Filter by tech stack

### `/tools` - Additional Utilities (Coming Soon)
**Purpose**: Supplementary tools for MDX workflow
**Planned Tools**:
- MDX Validator - Syntax checking and error detection
- MDX Formatter - Auto-formatting and beautification
- Markdown to MDX Converter - Migration tool
- MDX Component Extractor - Component analysis

## Future Expansion Possibilities

### Additional Routes to Consider:
- `/docs` - Platform documentation and guides
- `/api-reference` - API documentation if backend services are added
- `/playground` - Interactive MDX playground
- `/community` - User-submitted templates and examples
- `/pricing` - If monetization is added
- `/dashboard` - User dashboard for saved projects

### Feature Additions:
- User authentication (save/load projects)
- Project history and versioning
- Export to different formats (PDF, HTML)
- Team collaboration features
- Custom AI model selection
- Integration with GitHub/GitLab
- Fumadocs theme customization

## Component Structure

```
components/
├── ui/              # shadcn/ui components
├── input-panel.tsx  # Generator input form
├── output-panel.tsx # Monaco editor output
└── icons.tsx        # Custom SVG icons
```

## API Routes

```
app/api/
└── generate-mdx/    # Server-side Gemini API integration
    └── route.ts
```

## Design System

The project uses shadcn/ui with semantic design tokens:
- `--primary` - Brand color (purple/violet)
- `--muted` - Subtle backgrounds
- `--accent` - Highlight elements
- `--border` - Borders and dividers
- Full light/dark theme support

## Best Practices

1. **Route Organization**: Keep routes flat and descriptive
2. **Component Reusability**: Share components across routes
3. **Consistent Navigation**: Maintain clear back-to-home links
4. **Progressive Enhancement**: Mark future features as "Coming Soon"
5. **Mobile-First**: Ensure all routes are responsive
6. **SEO Optimization**: Proper metadata for all pages

## Development Guidelines

- Use Server Components by default, Client Components only when needed
- Keep API keys server-side only
- Implement proper error handling
- Add loading states for async operations
- Follow shadcn/ui design patterns
- Use semantic HTML and ARIA labels
