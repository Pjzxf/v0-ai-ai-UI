"use client"

import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-2 px-3 py-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-card px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}
