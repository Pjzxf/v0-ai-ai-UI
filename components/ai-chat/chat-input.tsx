"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { Send, Mic, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = "输入您的问题..." }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`
    }
  }, [input])

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 bg-card border-t border-border">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
      >
        <Mic className="h-4 w-4" />
      </Button>
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full resize-none rounded-xl bg-input px-3 py-2 pr-10 text-sm",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[36px] max-h-[80px]"
          )}
        />
        <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
      </div>
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon"
        className="h-9 w-9 shrink-0 rounded-xl"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
