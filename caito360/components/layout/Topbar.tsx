'use client'
import { useMe } from '@/contexts/MeContext'

export function Topbar({ title }: { title: string }) {
  const me = useMe()
  const { usage, plan } = me

  return (
    <header className="h-14 border-b border-[#1E1E2E] flex items-center justify-between px-6 bg-[#0A0A0F]">
      <h1 className="text-[#F1F5F9] font-semibold text-sm">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-[#64748B] text-xs border border-[#1E1E2E] px-2 py-1 rounded font-mono">
          {plan.name}
        </span>
        <span className="text-[#64748B] text-xs font-mono">
          <span className="text-[#F1F5F9]">{usage.questions.toLocaleString()}</span>
          {' / '}
          {me.plan.maxQuestions.toLocaleString()} questions
        </span>
      </div>
    </header>
  )
}
