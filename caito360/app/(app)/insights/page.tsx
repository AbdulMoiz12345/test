'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { EmptyState } from '@/components/shared/EmptyState'
import type { Insight } from '@/lib/types'

const severityConfig = {
  high: { border: 'border-l-[#EF4444]', badge: 'bg-[#EF4444]/10 text-[#EF4444]' },
  medium: { border: 'border-l-[#F59E0B]', badge: 'bg-[#F59E0B]/10 text-[#F59E0B]' },
  low: { border: 'border-l-[#22C55E]', badge: 'bg-[#22C55E]/10 text-[#22C55E]' },
}

const categories = ['all', 'finance', 'sales', 'churn', 'growth', 'marketing', 'crm']

function timeAgo(dateStr: string) {
  const d = new Date(dateStr)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    api.getInsights().then(d => { setInsights(d.insights); setLoading(false) })
  }, [])

  const filtered = activeCategory === 'all' ? insights : insights.filter(i => i.category === activeCategory)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Insights" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Category tabs */}
        <div className="flex items-center gap-1 border-b border-[#1E1E2E] mb-6 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 text-xs capitalize font-medium whitespace-nowrap border-b-2 transition-colors -mb-px
                ${activeCategory === cat
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-[#64748B] hover:text-[#F1F5F9]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="h-28 bg-[#13131A] border border-[#1E1E2E] rounded animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Lightbulb className="w-full h-full" />}
            title="No insights yet"
            description="Upload documents and ask questions to generate AI-powered insights."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map(ins => (
              <div key={ins.id} className={`bg-[#13131A] border border-[#1E1E2E] border-l-2 ${severityConfig[ins.severity].border} rounded p-5`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide ${severityConfig[ins.severity].badge}`}>
                      {ins.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wide ${severityConfig[ins.severity].badge} opacity-60`}>
                      {ins.severity}
                    </span>
                  </div>
                  <span className="text-[#64748B] text-xs font-mono flex-shrink-0">{timeAgo(ins.createdAt)}</span>
                </div>
                <h3 className="text-[#F1F5F9] text-sm font-semibold mb-2">{ins.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{ins.body}</p>
                <div className="mt-3 pt-3 border-t border-[#1E1E2E]">
                  <span className="text-[#64748B] text-xs">Generated from your uploaded documents</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
