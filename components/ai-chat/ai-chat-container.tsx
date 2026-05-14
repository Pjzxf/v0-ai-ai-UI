"use client"

import { useState, useRef, useEffect } from "react"
import { ChatHeader } from "./chat-header"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { QuickActions } from "./quick-actions"
import { TypingIndicator } from "./typing-indicator"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "您好！我是您的AI智能助手，很高兴为您服务。有什么我可以帮助您的吗？",
    timestamp: "10:30",
  },
]

const aiResponses = [
  "好的，我来帮您分析一下这个问题。根据您提供的信息...",
  "这是一个很好的问题！让我为您详细解答...",
  "我理解您的需求，以下是我的建议...",
  "非常感谢您的提问！这里有一些想法供您参考...",
]

export function AIChatContainer() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [status, setStatus] = useState<"online" | "typing" | "offline">("online")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setStatus("typing")

    // 模拟AI响应延迟
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      timestamp: getCurrentTime(),
    }

    setIsTyping(false)
    setStatus("online")
    setMessages((prev) => [...prev, aiResponse])
  }

  const handleQuickAction = (action: string) => {
    handleSend(action)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-[800px] max-h-[480px] mx-auto bg-background overflow-hidden rounded-lg border border-border shadow-2xl">
      <ChatHeader title="AI 智能助手" status={status} />
      
      {/* 快捷操作栏 */}
      <QuickActions onSelect={handleQuickAction} />
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入区域 */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
