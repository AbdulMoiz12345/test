'use client'
import { useMe } from '@/contexts/MeContext'
import { Bell, Search } from 'lucide-react'

export function Topbar({ title }: { title: string }) {
  const me = useMe()
  const { usage, plan } = me
  const pct = Math.round((usage.questions / plan.maxQuestions) * 100)
  const overLimit = pct >= 90

  return (
    <header className="h-14 flex items-center justify-between px-6 flex-shrink-0"
      style={{
        background: 'rgba(13,13,21,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E1E2E',
      }}>
      {/* Title */}
      <h1 className="font-semibold text-sm" style={{ color: '#F1F5F9' }}>{title}</h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Usage pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: '#18181F', border: '1px solid #1E1E2E' }}>
          <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: '#1E1E2A' }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, pct)}%`, background: overLimit ? '#EF4444' : '#6366F1' }} />
          </div>
          <span className="text-xs font-mono" style={{ color: overLimit ? '#EF4444' : '#94A3B8' }}>
            <span style={{ color: overLimit ? '#EF4444' : '#F1F5F9' }}>{usage.questions.toLocaleString()}</span>
            {' / '}{plan.maxQuestions.toLocaleString()}
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ color: '#818CF8', background: 'rgba(99,102,241,0.1)' }}>
            {plan.name}
          </span>
        </div>

        {/* Icon buttons */}
        <button className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
          style={{ color: '#475569', background: 'transparent' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#18181F'; (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569' }}>
          <Search className="w-3.5 h-3.5" />
        </button>
        <button className="w-8 h-8 rounded-md flex items-center justify-center transition-colors relative"
          style={{ color: '#475569' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#18181F'; (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569' }}>
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#6366F1' }} />
        </button>
      </div>
    </header>
  )
}
