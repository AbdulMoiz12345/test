'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, FileText, MessageSquare } from 'lucide-react'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { StatusBadge } from '@/components/documents/StatusBadge'
import { Button } from '@/components/shared/Button'
import type { Document } from '@/lib/types'

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [doc, setDoc] = useState<Document | null>(null)

  useEffect(() => {
    api.getDocuments().then(d => {
      const found = d.documents.find(doc => doc.id === params.id)
      if (found) setDoc(found)
    })
  }, [params.id])

  if (!doc) return (
    <div className="flex flex-col h-full">
      <Topbar title="Document" />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border border-[#6366F1] border-t-transparent rounded-full spinner" />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Document Detail" />
      <div className="flex-1 overflow-y-auto p-6">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#F1F5F9] text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Documents
        </button>

        <div className="max-w-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#13131A] border border-[#1E1E2E] rounded flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div>
              <h2 className="text-[#F1F5F9] font-semibold font-mono">{doc.filename}</h2>
              <div className="flex items-center gap-3 mt-1">
                <StatusBadge status={doc.status} />
                <span className="text-[#64748B] text-xs">·</span>
                <span className="text-[#64748B] text-xs capitalize">{doc.docType}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              ['Department', doc.department],
              ['Visibility', doc.visibility],
              ['Pages', doc.pageCount?.toString() ?? 'Pending'],
              ['Uploaded', new Date(doc.uploadedAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#13131A] border border-[#1E1E2E] rounded p-4">
                <div className="text-[#64748B] text-xs mb-1">{label}</div>
                <div className="text-[#F1F5F9] text-sm font-mono capitalize">{value}</div>
              </div>
            ))}
          </div>

          {doc.status === 'ready' && (
            <Button onClick={() => router.push('/chat')}>
              <MessageSquare className="w-4 h-4" />
              Ask about this document
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
