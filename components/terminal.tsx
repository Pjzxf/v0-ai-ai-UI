"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function Terminal() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const handleVoiceStart = () => {
    setIsRecording(true)
  }

  const handleVoiceEnd = async () => {
    setIsRecording(false)
    
    // 模拟语音识别结果
    const mockVoiceInput = "你好"
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: mockVoiceInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 400))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "你好！有什么可以帮助你的？",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsProcessing(false)
  }

  return (
    <div className="h-[480px] w-[800px] bg-background flex flex-col overflow-hidden relative">
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* 顶部状态栏 */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            Online
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
          <div className="h-full flex flex-col items-center justify-center gap-4">
            {/* 机器人头像带动效 */}
            <div className="relative">
              {/* 呼吸光环 */}
              <div className="absolute inset-0 -m-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute inset-0 -m-2 bg-accent/10 rounded-full blur-lg animate-pulse [animation-delay:500ms]" />
              
              {/* 飘动的气泡 */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span 
                  className="w-3 h-3 rounded-full bg-[#ecb761] animate-bubble opacity-90"
                  style={{ animationDelay: "0ms" }}
                />
                <span 
                  className="w-2.5 h-2.5 rounded-full bg-[#ecb761] animate-bubble opacity-80"
                  style={{ animationDelay: "300ms" }}
                />
                <span 
                  className="w-2 h-2 rounded-full bg-[#ecb761] animate-bubble opacity-70"
                  style={{ animationDelay: "600ms" }}
                />
              </div>
              
              {/* 机器人图片 */}
              <div className="relative animate-float">
                <Image
                  src="/kati-robot.png"
                  alt="Kati Robot"
                  width={140}
                  height={140}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            
            {/* 问候语 */}
            <p className="text-xl font-light text-foreground/90 tracking-wide mt-2">
              Hi，我是 Kati
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

      {/* 语音输入按钮 */}
      <div className="relative z-10 px-6 pb-8 pt-2 flex justify-center">
        <button
          onMouseDown={handleVoiceStart}
          onMouseUp={handleVoiceEnd}
          onMouseLeave={() => isRecording && handleVoiceEnd()}
          onTouchStart={handleVoiceStart}
          onTouchEnd={handleVoiceEnd}
          disabled={isProcessing}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? "bg-primary scale-110" 
              : "bg-secondary/80 hover:bg-secondary"
          }`}
        >
          {/* 录音时的波纹效果 */}
          {isRecording && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              <span className="absolute inset-[-8px] rounded-full border-2 border-primary/50 animate-pulse" />
            </>
          )}
          
          {/* 麦克风图标 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-6 h-6 transition-colors ${
              isRecording ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
        
        {/* 录音提示 */}
        <p className={`absolute bottom-2 text-xs text-muted-foreground transition-opacity ${
          isRecording ? "opacity-100" : "opacity-0"
        }`}>
          松开发送
        </p>
      </div>
    </div>
  )
}
