"use client"

import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn(
        "flex gap-2 px-3 py-2",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isAssistant ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}
      >
        {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isAssistant ? "items-start" : "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm leading-relaxed",
            isAssistant
              ? "bg-card text-card-foreground rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm"
          )}
        >
          {content}
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground px-1">{timestamp}</span>
        )}
      </div>
    </div>
  )
}
