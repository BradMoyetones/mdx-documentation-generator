import { SparklesIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { ThemeSelector } from "./theme-selector";

export default function SiteHeader() {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-2 py-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <SparklesIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">AI MDX Doc Generator</h1>
                        <p className="text-xs text-muted-foreground">Built for fumadocs</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <ModeToggle />
                    <ThemeSelector className="mr-4 hidden md:flex" />
                </div>
            </div>
        </header>
    )
}
