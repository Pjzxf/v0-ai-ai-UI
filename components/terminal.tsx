"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function Terminal() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // 模拟AI响应
    await new Promise((resolve) => setTimeout(resolve, 400))

    const responses: Record<string, string> = {
      "你好": "你好，我是你的智能终端。有什么可以帮助你的？",
      "购物": "正在为你打开购物模块。你想购买什么商品？",
      "天气": "今日天气：晴，温度 24°C，空气质量优。",
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responses[input.trim()] || `收到指令：${input.trim()}。正在处理中...`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsProcessing(false)
    inputRef.current?.focus()
  }

  return (
    <div className="h-[480px] w-[800px] bg-background flex flex-col overflow-hidden relative">
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* 顶部状态栏 */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            Terminal Active
          </span>
        </div>
        <div className="text-xs font-mono text-muted-foreground tracking-wider">
          {new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </header>

      {/* 对话区域 */}
      <div 
        ref={containerRef}
        className="relative z-10 flex-1 px-6 overflow-y-auto scrollbar-none"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-2xl font-light text-foreground/90 tracking-tight">
              有什么可以帮助你？
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              对话 · 购物 · 控制 · 一切皆可
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-secondary px-4 py-2.5 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="relative z-10 px-6 pb-6 pt-2">
        <form onSubmit={handleSubmit}>
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入指令..."
              disabled={isProcessing}
              className="w-full h-14 bg-secondary/50 border border-border/50 rounded-2xl px-5 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-secondary/80 transition-all duration-300 font-light tracking-wide"
            />
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-primary/10 disabled:hover:text-primary transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
