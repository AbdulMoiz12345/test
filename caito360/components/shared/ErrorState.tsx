import { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

export function ErrorState({ title, description, action }: {
  title: string; description?: string; action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="w-10 h-10 text-[#EF4444] mb-4" />
      <h3 className="text-[#F1F5F9] font-medium mb-1">{title}</h3>
      {description && <p className="text-[#64748B] text-sm mb-4 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
