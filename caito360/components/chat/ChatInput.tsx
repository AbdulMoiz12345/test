'use client'
import { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

export function ChatInput({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px'
    }
  }, [value])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div className="border-t border-[#1E1E2E] p-4">
      <div className="flex gap-3 items-end bg-[#13131A] border border-[#1E1E2E] rounded px-3 py-2 focus-within:border-[#6366F1]/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask anything about your uploaded documents..."
          rows={1}
          className="flex-1 bg-transparent text-[#F1F5F9] text-sm resize-none outline-none placeholder:text-[#64748B] leading-relaxed"
          style={{ maxHeight: '160px' }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="w-7 h-7 rounded bg-[#6366F1] hover:bg-[#5558E8] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <p className="text-[#64748B] text-xs mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
    </div>
  )
}
