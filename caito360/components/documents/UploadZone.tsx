'use client'
import { useRef, useState, DragEvent } from 'react'
import { Upload, X, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { api } from '@/lib/api'

interface UploadZoneProps {
  onClose: () => void
  onUploaded: (_docId: string) => void
}

export function UploadZone({ onClose, onUploaded }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<'idle' | 'uploading' | 'processing' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|xlsx|pptx|docx)$/i)) {
      setErrorMsg('Unsupported file type. Please upload a PDF, XLSX, PPTX, or DOCX file.')
      setStep('error')
      return
    }
    setErrorMsg('')
    setStep('idle')
    setFile(f)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleUpload = async () => {
    if (!file) return
    setStep('uploading')
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 95) { clearInterval(interval); return p }
        return p + Math.random() * 15
      })
    }, 200)

    try {
      await api.getUploadUrl(file.name)
      await new Promise(r => setTimeout(r, 1500))
      clearInterval(interval)
      setProgress(100)
      setStep('processing')
      await new Promise(r => setTimeout(r, 500))
      onUploaded('doc-999')
      onClose()
    } catch {
      clearInterval(interval)
      setErrorMsg('Upload failed. Please check your connection and try again.')
      setStep('error')
    }
  }

  const reset = () => {
    setFile(null)
    setStep('idle')
    setErrorMsg('')
    setProgress(0)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#F1F5F9] font-semibold">Upload Document</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#F1F5F9]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drop zone — shown when idle and no file */}
        {step === 'idle' && !file && (
          <>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center py-12 transition-colors
                ${dragging ? 'border-[#6366F1] bg-[#6366F1]/5' : 'border-[#1E1E2E] hover:border-[#6366F1]/50'}`}
            >
              <Upload className="w-8 h-8 text-[#64748B] mb-3" />
              <p className="text-[#F1F5F9] text-sm font-medium mb-1">Drop file here or click to browse</p>
              <p className="text-[#64748B] text-xs">PDF, XLSX, PPTX, DOCX supported</p>
              <input ref={inputRef} type="file"
                accept=".pdf,.xlsx,.pptx,.docx"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
          </>
        )}

        {/* File selected — confirm */}
        {file && step === 'idle' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border border-[#1E1E2E] rounded bg-[#0A0A0F]">
              <FileText className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#F1F5F9] text-sm truncate">{file.name}</div>
                <div className="text-[#64748B] text-xs font-mono">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
              <button onClick={reset} className="text-[#64748B] hover:text-[#F1F5F9]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          </div>
        )}

        {/* Uploading / processing progress */}
        {(step === 'uploading' || step === 'processing') && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-[#1E1E2E] rounded bg-[#0A0A0F]">
              <FileText className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
              <div className="text-[#F1F5F9] text-sm truncate flex-1">{file?.name}</div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#64748B]">{step === 'uploading' ? 'Uploading...' : 'Processing...'}</span>
                <span className="text-[#64748B] font-mono">{Math.min(100, Math.round(progress))}%</span>
              </div>
              <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6366F1] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {step === 'error' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border border-[#EF4444]/40 rounded bg-[#EF4444]/5">
              <AlertTriangle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[#EF4444] text-sm font-medium mb-0.5">Upload failed</div>
                <div className="text-[#64748B] text-xs">{errorMsg}</div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={onClose}>Close</Button>
              <Button onClick={reset}>Try again</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
