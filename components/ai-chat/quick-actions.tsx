"use client"

import { Lightbulb, Code, FileText, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickAction {
  icon: React.ReactNode
  label: string
  action: string
}

interface QuickActionsProps {
  onSelect: (action: string) => void
}

const actions: QuickAction[] = [
  { icon: <Lightbulb className="h-4 w-4" />, label: "创意灵感", action: "给我一些创意灵感" },
  { icon: <Code className="h-4 w-4" />, label: "代码帮助", action: "帮我写一段代码" },
  { icon: <FileText className="h-4 w-4" />, label: "文案撰写", action: "帮我写一篇文章" },
  { icon: <HelpCircle className="h-4 w-4" />, label: "问题解答", action: "回答我一个问题" },
]

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex gap-2 px-3 py-2 overflow-x-auto scrollbar-hide">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onSelect(action.action)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-secondary text-secondary-foreground text-xs font-medium",
            "hover:bg-secondary/80 transition-colors whitespace-nowrap",
            "focus:outline-none focus:ring-2 focus:ring-ring"
          )}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  )
}
