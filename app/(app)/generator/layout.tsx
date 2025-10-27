import SiteHeader from "@/components/site-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builder",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background relative z-10 flex min-h-svh flex-col theme-container">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          <div className="h-full w-full">{children}</div>
        </div>
      </main>
    </div>
  )
}
