'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/shared/Button'
import { useMe } from '@/contexts/MeContext'

export default function ProfilePage() {
  const me = useMe()
  const [form, setForm] = useState({
    fullName: me.user.fullName,
    email: me.user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Profile" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md space-y-6">
          {/* Profile section */}
          <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-5">
            <h3 className="text-[#F1F5F9] text-sm font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#64748B] mb-1.5">Full name</label>
                <input type="text" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] mb-1.5">Email address</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs text-[#64748B] mb-1">Role</label>
                  <div className="text-[#F1F5F9] text-sm font-mono capitalize px-3 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded opacity-60">{me.user.role}</div>
                </div>
                <div>
                  <label className="block text-xs text-[#64748B] mb-1">Department</label>
                  <div className="text-[#F1F5F9] text-sm font-mono capitalize px-3 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded opacity-60">{me.user.department}</div>
                </div>
              </div>
              <div className="pt-1 flex justify-end">
                <Button onClick={handleSave}>{saved ? '✓ Saved' : 'Save changes'}</Button>
              </div>
            </div>
          </div>

          {/* Password section */}
          <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-5">
            <h3 className="text-[#F1F5F9] text-sm font-semibold mb-4">Change Password</h3>
            <div className="space-y-3">
              {[
                { label: 'Current password', key: 'currentPassword' },
                { label: 'New password', key: 'newPassword' },
                { label: 'Confirm new password', key: 'confirmPassword' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-[#64748B] mb-1.5">{f.label}</label>
                  <input type="password" value={form[f.key as keyof typeof form]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50 transition-colors" />
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="outline">Update password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
