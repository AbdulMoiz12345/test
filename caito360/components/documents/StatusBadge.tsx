import type { DocStatus } from '@/lib/types'

const config: Record<DocStatus, { label: string; color: string; dot?: string }> = {
  ready: { label: 'Ready', color: 'text-[#22C55E]', dot: 'bg-[#22C55E]' },
  processing: { label: 'Processing', color: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
  failed: { label: 'Failed', color: 'text-[#EF4444]', dot: 'bg-[#EF4444]' },
}

export function StatusBadge({ status }: { status: DocStatus }) {
  const { label, color, dot } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${color}`}>
      {status === 'processing' ? (
        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] spinner inline-block" />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} />
      )}
      {label}
    </span>
  )
}
