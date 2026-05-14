"use client"

import { Bot, Settings, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  title?: string
  status?: "online" | "typing" | "offline"
}

export function ChatHeader({ title = "AI 助手", status = "online" }: ChatHeaderProps) {
  const statusText = {
    online: "在线",
    typing: "正在输入...",
    offline: "离线",
  }

  const statusColor = {
    online: "bg-accent",
    typing: "bg-primary animate-pulse",
    offline: "bg-muted-foreground",
  }

  return (
    <header className="flex items-center justify-between px-3 py-2 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusColor[status]}`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">{statusText[status]}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
