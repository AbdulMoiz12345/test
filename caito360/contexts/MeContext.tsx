'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { MeResponse } from '@/lib/types'
import { api } from '@/lib/api'

const MeContext = createContext<MeResponse | null>(null)

export function MeProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<MeResponse | null>(null)

  useEffect(() => {
    api.getMe().then(setMe)
  }, [])

  return <MeContext.Provider value={me}>{children}</MeContext.Provider>
}

export function useMe(): MeResponse {
  const ctx = useContext(MeContext)
  if (!ctx) {
    // Return a safe default during SSR / before hydration
    return {
      user: { id: '', email: '', fullName: '', role: 'viewer', department: '' },
      tenant: { id: '', name: '' },
      plan: { id: '', name: '', maxDocuments: 0, maxQuestions: 0, maxSeats: 0 },
      usage: { documents: 0, questions: 0, tokens: 0 }
    }
  }
  return ctx
}
