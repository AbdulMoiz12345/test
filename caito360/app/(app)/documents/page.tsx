'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { FileText, Upload, AlertTriangle, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { StatusBadge } from '@/components/documents/StatusBadge'
import { UploadZone } from '@/components/documents/UploadZone'
import { RoleGate } from '@/components/shared/RoleGate'
import { Button } from '@/components/shared/Button'
import { EmptyState } from '@/components/shared/EmptyState'
import type { Document } from '@/lib/types'

function timeAgo(dateStr: string) {
  const d = new Date(dateStr)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')

  useEffect(() => {
    api.getDocuments().then(d => { setDocs(d.documents); setLoading(false) })
  }, [])

  const handleUploaded = (docId: string) => {
    const newDoc: Document = {
      id: docId,
      filename: 'Uploaded_Document.pdf',
      status: 'processing',
      docType: 'report',
      department: 'finance',
      visibility: 'tenant',
      uploadedAt: new Date().toISOString(),
      pageCount: null,
    }
    setDocs(prev => [newDoc, ...prev])

    let polls = 0
    const interval = setInterval(async () => {
      polls++
      if (polls >= 3) {
        clearInterval(interval)
        const status = await api.getDocumentStatus(docId)
        setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: 'ready', pageCount: status.pageCount } : d))
      }
    }, 3000)
  }

  const filtered = docs.filter(d => {
    if (statusFilter !== 'all' && d.status !== statusFilter) return false
    if (deptFilter !== 'all' && d.department !== deptFilter) return false
    return true
  })

  const depts = Array.from(new Set(docs.map(d => d.department)))

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Documents" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="bg-[#13131A] border border-[#1E1E2E] rounded px-3 py-1.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50">
              <option value="all">All status</option>
              <option value="ready">Ready</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="bg-[#13131A] border border-[#1E1E2E] rounded px-3 py-1.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50">
              <option value="all">All departments</option>
              {depts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <RoleGate capability="upload_docs">
            <Button onClick={() => setUploading(true)}>
              <Upload className="w-3.5 h-3.5" />
              Upload
            </Button>
          </RoleGate>
        </div>

        {loading ? (
          <div className="border border-[#1E1E2E] rounded overflow-hidden">
            {[1,2,3].map(i => <div key={i} className="h-14 border-b border-[#1E1E2E] animate-pulse bg-[#13131A]" />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-full h-full" />}
            title="No documents yet"
            description="Upload your first document to start asking questions about your data."
            action={
              <RoleGate capability="upload_docs">
                <Button onClick={() => setUploading(true)}>
                  <Upload className="w-3.5 h-3.5" /> Upload document
                </Button>
              </RoleGate>
            }
          />
        ) : (
          <div className="border border-[#1E1E2E] rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E2E]">
                  {['Filename', 'Type', 'Visibility', 'Department', 'Pages', 'Status', 'Uploaded', ''].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[#64748B] text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id} className="border-b border-[#1E1E2E] last:border-0 hover:bg-[#1E1E2E]/20 group">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#64748B] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[#F1F5F9] text-xs font-mono">{doc.filename}</div>
                          {doc.errorReason && (
                            <div className="flex items-start gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3 text-[#EF4444] flex-shrink-0 mt-0.5" />
                              <span className="text-[#EF4444] text-xs">{doc.errorReason} <button className="underline hover:no-underline">Re-upload</button></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize font-mono">{doc.docType}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize">{doc.visibility}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize">{doc.department}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs font-mono">{doc.pageCount ?? '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                    <td className="px-4 py-3 text-[#64748B] text-xs font-mono">{timeAgo(doc.uploadedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/documents/${doc.id}`}>
                          <button className="p-1.5 text-[#64748B] hover:text-[#F1F5F9] rounded hover:bg-[#1E1E2E]">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <RoleGate capability="manage_users">
                          <button className="p-1.5 text-[#64748B] hover:text-[#EF4444] rounded hover:bg-[#1E1E2E]">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </RoleGate>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {uploading && <UploadZone onClose={() => setUploading(false)} onUploaded={handleUploaded} />}
    </div>
  )
}
