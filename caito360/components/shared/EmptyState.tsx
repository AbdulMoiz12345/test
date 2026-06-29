import { ReactNode } from 'react'

export function EmptyState({ icon, title, description, action }: {
  icon?: ReactNode; title: string; description?: string; action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="text-[#64748B] mb-4 w-10 h-10">{icon}</div>}
      <h3 className="text-[#F1F5F9] font-medium mb-1">{title}</h3>
      {description && <p className="text-[#64748B] text-sm mb-4 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
