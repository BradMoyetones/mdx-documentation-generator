import { SiteFooter } from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

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
      <SiteFooter />
    </div>
  )
}
