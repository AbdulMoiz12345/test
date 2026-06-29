'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { UserPlus, MoreHorizontal, Shield } from 'lucide-react'
import { api } from '@/lib/api'
import { Topbar } from '@/components/layout/Topbar'
import { RoleGate } from '@/components/shared/RoleGate'
import { Button } from '@/components/shared/Button'
import type { TeamUser } from '@/lib/types'

const roleColor: Record<string, string> = {
  owner: 'text-[#6366F1]',
  admin: 'text-[#7C3AED]',
  manager: 'text-[#F59E0B]',
  member: 'text-[#64748B]',
  viewer: 'text-[#64748B]',
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return 'Never'
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function TeamPage() {
  const [users, setUsers] = useState<TeamUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'member', department: '' })

  useEffect(() => {
    api.getUsers().then(d => { setUsers(d.users); setLoading(false) })
  }, [])

  const active = users.filter(u => u.status === 'active')
  const invited = users.filter(u => u.status === 'invited')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Team" />
      <div className="flex-1 overflow-y-auto p-6">
        <RoleGate capability="manage_users" fallback={
          <div className="flex items-center gap-3 p-4 border border-[#1E1E2E] rounded bg-[#13131A] text-[#64748B] text-sm">
            <Shield className="w-4 h-4 flex-shrink-0" />
            You don&apos;t have permission to manage team members.
          </div>
        }>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#F1F5F9] font-semibold mb-0.5">Team Members</h2>
              <p className="text-[#64748B] text-xs">{active.length} active · {invited.length} pending</p>
            </div>
            <Button onClick={() => setShowInvite(true)}>
              <UserPlus className="w-3.5 h-3.5" />
              Invite member
            </Button>
          </div>

          {/* Members table */}
          <div className="border border-[#1E1E2E] rounded overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E2E]">
                  {['Member', 'Role', 'Department', 'Last active', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[#64748B] text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [1,2,3].map(i => (
                  <tr key={i} className="border-b border-[#1E1E2E]">
                    {[1,2,3,4,5,6].map(j => <td key={j} className="px-4 py-3"><div className="h-3 bg-[#1E1E2E] rounded animate-pulse" /></td>)}
                  </tr>
                )) : active.map(user => (
                  <tr key={user.id} className="border-b border-[#1E1E2E] last:border-0 hover:bg-[#1E1E2E]/20 group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1E1E2E] flex items-center justify-center text-xs font-semibold text-[#F1F5F9] flex-shrink-0">
                          {user.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-[#F1F5F9] text-sm">{user.fullName}</div>
                          <div className="text-[#64748B] text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono capitalize ${roleColor[user.role]}`}>{user.role}</span>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] text-xs capitalize">{user.department}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs font-mono">{timeAgo(user.lastLoginAt)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 text-[#64748B] hover:text-[#F1F5F9] opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pending invitations */}
          {invited.length > 0 && (
            <div>
              <h3 className="text-[#64748B] text-xs font-medium uppercase tracking-wide mb-3">Pending Invitations</h3>
              <div className="border border-[#1E1E2E] rounded overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {invited.map(user => (
                      <tr key={user.id} className="border-b border-[#1E1E2E] last:border-0">
                        <td className="px-4 py-3">
                          <div className="text-[#F1F5F9] text-sm">{user.fullName}</div>
                          <div className="text-[#64748B] text-xs">{user.email}</div>
                        </td>
                        <td className="px-4 py-3 text-[#64748B] text-xs capitalize font-mono">{user.role}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-[#F59E0B]">Invitation pending</span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-[#EF4444] hover:underline">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </RoleGate>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg w-full max-w-sm p-6">
            <h2 className="text-[#F1F5F9] font-semibold mb-5">Invite team member</h2>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs text-[#64748B] mb-1.5">Email address</label>
                <input type="email" value={inviteForm.email} onChange={e => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="colleague@company.com"
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50" />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1.5">Role</label>
                <select value={inviteForm.role} onChange={e => setInviteForm({...inviteForm, role: e.target.value})}
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50">
                  {['admin', 'manager', 'member', 'viewer'].map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1.5">Department</label>
                <select value={inviteForm.department} onChange={e => setInviteForm({...inviteForm, department: e.target.value})}
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50">
                  <option value="">Select department</option>
                  {['Finance', 'Sales', 'HR', 'Marketing', 'Operations'].map(d => <option key={d} value={d.toLowerCase()}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowInvite(false)}>Cancel</Button>
              <Button onClick={() => setShowInvite(false)}>Send invite</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
