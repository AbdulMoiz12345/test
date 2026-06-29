'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { FileText, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { StatusBadge } from '@/components/documents/StatusBadge'
import { useMe } from '@/contexts/MeContext'
import type { Insight, Document } from '@/lib/types'

const severityConfig = {
  high: { border: 'border-l-[#EF4444]', badge: 'text-[#EF4444]' },
  medium: { border: 'border-l-[#F59E0B]', badge: 'text-[#F59E0B]' },
  low: { border: 'border-l-[#22C55E]', badge: 'text-[#22C55E]' },
}

function timeAgo(dateStr: string) {
  const d = new Date(dateStr)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function DashboardPage() {
  const me = useMe()
  const [data, setData] = useState<{ insights: Insight[]; documents: Document[]; usage: { documents: number; questions: number } } | null>(null)

  useEffect(() => { api.getDashboard().then(setData) }, [])

  const { usage, plan } = me

  const usageBars = [
    { label: 'Documents', used: usage.documents, max: plan.maxDocuments },
    { label: 'Questions', used: usage.questions, max: plan.maxQuestions },
    { label: 'Seats', used: 3, max: plan.maxSeats },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Usage bars */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {usageBars.map(({ label, used, max }) => (
            <div key={label} className="bg-[#13131A] border border-[#1E1E2E] rounded p-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[#64748B] text-xs">{label}</span>
                <span className="text-[#F1F5F9] font-mono text-xs">
                  <span className="text-[#F1F5F9]">{used.toLocaleString()}</span>
                  <span className="text-[#64748B]"> / {max.toLocaleString()}</span>
                </span>
              </div>
              <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (used / max) * 100)}%`,
                    background: (used / max) > 0.8 ? '#EF4444' : '#6366F1'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#F1F5F9] text-sm font-semibold">AI Insights</h2>
            <Link href="/insights" className="text-[#6366F1] text-xs hover:underline">View all →</Link>
          </div>
          {data ? (
            <div className="space-y-2">
              {data.insights.map(ins => (
                <div key={ins.id} className={`bg-[#13131A] border border-[#1E1E2E] border-l-2 ${severityConfig[ins.severity].border} rounded p-4`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-mono uppercase tracking-wide ${severityConfig[ins.severity].badge}`}>{ins.category}</span>
                      </div>
                      <div className="text-[#F1F5F9] text-sm font-medium mb-1">{ins.title}</div>
                      <div className="text-[#64748B] text-xs leading-relaxed">{ins.body}</div>
                    </div>
                    <div className="text-[#64748B] text-xs font-mono whitespace-nowrap flex-shrink-0">{timeAgo(ins.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-20 bg-[#13131A] border border-[#1E1E2E] rounded animate-pulse" />)}
            </div>
          )}
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#F1F5F9] text-sm font-semibold">Recent Documents</h2>
            <Link href="/documents" className="text-[#6366F1] text-xs hover:underline">View all →</Link>
          </div>
          <div className="border border-[#1E1E2E] rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E2E]">
                  {['Filename', 'Type', 'Department', 'Status', 'Uploaded'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[#64748B] text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data ? data.documents.map(doc => (
                  <tr key={doc.id} className="border-b border-[#1E1E2E] last:border-0 hover:bg-[#1E1E2E]/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#64748B] flex-shrink-0" />
                        <div>
                          <div className="text-[#F1F5F9] text-xs font-mono">{doc.filename}</div>
                          {doc.errorReason && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                              <span className="text-[#EF4444] text-xs">{doc.errorReason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize font-mono">{doc.docType}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize">{doc.department}</td>
                    <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                    <td className="px-4 py-3 text-[#64748B] text-xs font-mono">{timeAgo(doc.uploadedAt)}</td>
                  </tr>
                )) : [1,2,3].map(i => (
                  <tr key={i} className="border-b border-[#1E1E2E]">
                    {[1,2,3,4,5].map(j => <td key={j} className="px-4 py-3"><div className="h-3 bg-[#1E1E2E] rounded animate-pulse" /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
