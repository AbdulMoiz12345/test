export type Role = 'owner' | 'admin' | 'manager' | 'member' | 'viewer'
export type Capability = 'manage_billing' | 'manage_users' | 'approve_marketing' | 'upload_docs' | 'ask_questions'

export type DocStatus = 'ready' | 'processing' | 'failed'
export type InsightSeverity = 'high' | 'medium' | 'low'

export interface User {
  id: string
  email: string
  fullName: string
  role: Role
  department: string
  branch?: string
}

export interface Tenant {
  id: string
  name: string
}

export interface Plan {
  id: string
  name: string
  maxDocuments: number
  maxQuestions: number
  maxSeats: number
}

export interface Usage {
  documents: number
  questions: number
  tokens?: number
}

export interface MeResponse {
  user: User
  tenant: Tenant
  plan: Plan
  usage: Usage
}

export interface Insight {
  id: string
  category: string
  title: string
  body: string
  severity: InsightSeverity
  createdAt: string
}

export interface Document {
  id: string
  filename: string
  status: DocStatus
  docType: string
  department: string
  visibility: string
  uploadedAt: string
  pageCount: number | null
  errorReason?: string
}

export interface Source {
  chunkId?: string
  filename: string
  page: number
  section: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  createdAt: string
}

export interface Conversation {
  id: string
  title: string
}

export interface TeamUser {
  id: string
  fullName: string
  email: string
  role: Role
  department: string
  status: 'active' | 'invited'
  lastLoginAt: string | null
}
