import type { Role, Capability } from './types'

const ROLE_CAPS: Record<Role, Capability[]> = {
  owner:   ['manage_billing', 'manage_users', 'approve_marketing', 'upload_docs', 'ask_questions'],
  admin:   ['manage_users', 'approve_marketing', 'upload_docs', 'ask_questions'],
  manager: ['approve_marketing', 'upload_docs', 'ask_questions'],
  member:  ['upload_docs', 'ask_questions'],
  viewer:  ['ask_questions'],
}

export const can = (role: Role, cap: Capability): boolean =>
  ROLE_CAPS[role]?.includes(cap) ?? false
