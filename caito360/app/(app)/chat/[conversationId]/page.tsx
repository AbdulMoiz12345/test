'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Plus, MessageSquare, ArrowLeft } from 'lucide-react'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { ChatInput } from '@/components/chat/ChatInput'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { EmptyState } from '@/components/shared/EmptyState'
import type { Message } from '@/lib/types'

interface ConvItem { id: string; title: string }

export default function ConversationPage() {
  const params = useParams()
  const router = useRouter()
  const convId = params.conversationId as string

  const [conversations, setConversations] = useState<ConvItem[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const [streamingMsg, setStreamingMsg] = useState<Message | null>(null)
  const [activeConv, setActiveConv] = useState<string | null>(convId)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    api.getConversations().then(d => setConversations(d.conversations))
  }, [])

  useEffect(() => {
    if (convId) loadConv(convId)
  }, [convId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingMsg])

  const loadConv = async (id: string) => {
    setActiveConv(id)
    setMessages([])
    setStreamingMsg(null)
    const data = await api.getConversation(id)
    setMessages(data.messages as Message[])
    router.replace(`/chat/${id}`)
  }

  const handleSend = async (text: string) => {
    if (streaming) return

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMsg])

    const response = await api.postChat(text)

    setStreaming(true)
    const fullText = response.content
    let revealed = ''
    const streamMsg: Message = {
      id: response.messageId,
      role: 'assistant',
      content: '',
      sources: response.sources,
      createdAt: new Date().toISOString()
    }
    setStreamingMsg(streamMsg)

    let i = 0
    const interval = setInterval(() => {
      if (i >= fullText.length) {
        clearInterval(interval)
        setStreaming(false)
        setStreamingMsg(null)
        setMessages(prev => [...prev, { ...streamMsg, content: fullText }])
        return
      }
      i += Math.floor(Math.random() * 3) + 1
      revealed = fullText.slice(0, i)
      setStreamingMsg({ ...streamMsg, content: revealed })
    }, 15)
  }

  const handleNewChat = () => {
    const newConv = { id: 'conv-' + Date.now(), title: 'New Chat' }
    setConversations(prev => [newConv, ...prev])
    setActiveConv(newConv.id)
    setMessages([])
    setStreamingMsg(null)
    router.push(`/chat/${newConv.id}`)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Chat" />
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside className="w-56 border-r border-[#1E1E2E] flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-[#1E1E2E] space-y-1">
            <button onClick={handleNewChat}
              className="w-full flex items-center gap-2 px-3 py-2 bg-[#6366F1] hover:bg-[#5558E8] text-white text-xs font-medium rounded transition-colors">
              <Plus className="w-3.5 h-3.5" />
              New Chat
            </button>
            <button onClick={() => router.push('/chat')}
              className="w-full flex items-center gap-2 px-3 py-2 text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E] text-xs rounded transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              All chats
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => loadConv(conv.id)}
                className={`w-full text-left px-3 py-2.5 text-xs transition-colors truncate
                  ${activeConv === conv.id ? 'text-[#F1F5F9] bg-[#1E1E2E]' : 'text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E]/50'}`}>
                <MessageSquare className="w-3 h-3 inline mr-2 opacity-50" />
                {conv.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 && !streamingMsg ? (
              <EmptyState
                icon={<MessageSquare className="w-full h-full" />}
                title="Ask anything about your documents"
                description={'Try: "What was our revenue last quarter?" or "Summarize the Q3 report"'}
              />
            ) : (
              <>
                {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
                {streamingMsg && <MessageBubble message={streamingMsg} isStreaming={true} />}
                <div ref={bottomRef} />
              </>
            )}
          </div>
          <ChatInput onSend={handleSend} disabled={streaming} />
        </div>
      </div>
    </div>
  )
}
