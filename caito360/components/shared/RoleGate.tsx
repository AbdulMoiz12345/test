'use client'
import { ReactNode } from 'react'
import { can } from '@/lib/rbac'
import type { Capability } from '@/lib/types'
import { useMe } from '@/contexts/MeContext'

export function RoleGate({ capability, children, fallback }: { capability: Capability; children: ReactNode; fallback?: ReactNode }) {
  const me = useMe()
  if (!can(me.user.role, capability)) return fallback ? <>{fallback}</> : null
  return <>{children}</>
}
