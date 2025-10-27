import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function Announcement() {
  return (
    <Badge asChild variant="secondary" className="rounded-full">
      <Link href="/generate">
        <span className="flex size-2 rounded-full bg-primary" title="New" />
        AI-Powered Documentation <ArrowRightIcon />
      </Link>
    </Badge>
  )
}
