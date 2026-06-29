'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, FileText } from 'lucide-react'
import type { Message } from '@/lib/types'

export function MessageBubble({ message, isStreaming }: { message: Message; isStreaming?: boolean }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isAssistant ? '' : 'flex flex-col items-end'}`}>
        {isAssistant && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded bg-[#6366F1] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">C</span>
            </div>
            <span className="text-[#64748B] text-xs">CAITO360</span>
          </div>
        )}

        <div className={`relative rounded px-4 py-3 text-sm leading-relaxed
          ${isAssistant
            ? `bg-[#13131A] border border-[#1E1E2E] text-[#F1F5F9] ${isStreaming ? 'streaming-border' : ''}`
            : 'bg-[#1E1E2E] text-[#F1F5F9]'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-[#6366F1] ml-0.5 animate-pulse" />
          )}
        </div>

        {isAssistant && message.sources && message.sources.length > 0 && !isStreaming && (
          <div className="mt-2 w-full">
            <button
              onClick={() => setSourcesOpen(!sourcesOpen)}
              className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#F1F5F9] transition-colors"
            >
              <FileText className="w-3 h-3" />
              {message.sources.length} source{message.sources.length !== 1 ? 's' : ''}
              {sourcesOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {sourcesOpen && (
              <div className="mt-1.5 space-y-1">
                {message.sources.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded text-xs">
                    <FileText className="w-3 h-3 text-[#6366F1] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[#F1F5F9] font-mono">{s.filename}</span>
                      <span className="text-[#64748B] ml-2">p.{s.page} · {s.section}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isAssistant && !isStreaming && (
          <div className="flex items-center gap-1 mt-2">
            <button
              onClick={() => setVoted(voted === 'up' ? null : 'up')}
              className={`p-1 rounded transition-colors ${voted === 'up' ? 'text-[#22C55E]' : 'text-[#64748B] hover:text-[#F1F5F9]'}`}
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => setVoted(voted === 'down' ? null : 'down')}
              className={`p-1 rounded transition-colors ${voted === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] hover:text-[#F1F5F9]'}`}
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
