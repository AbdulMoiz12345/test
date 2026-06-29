'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    company: 'Acme Corp',
    industry: '',
    size: '',
    goals: '',
  })

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded bg-[#6366F1] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-[#F1F5F9] font-semibold tracking-tight">CAITO360</span>
          </div>
          <h1 className="text-xl font-semibold text-[#F1F5F9] mb-1">Tell us about your company</h1>
          <p className="text-[#64748B] text-sm">This helps us personalize your experience</p>
        </div>

        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-6 space-y-4">
          {[
            { label: 'Company name', key: 'company', type: 'input', placeholder: 'Acme Corp' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5">{f.label}</label>
              <input type="text" value={form[f.key as keyof typeof form]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                placeholder={f.placeholder}
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50 transition-colors" />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">Industry</label>
            <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}
              className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50 transition-colors">
              <option value="">Select industry</option>
              {['Finance', 'Retail', 'Manufacturing', 'Logistics', 'Healthcare', 'Other'].map(i => (
                <option key={i} value={i.toLowerCase()}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">Company size</label>
            <select value={form.size} onChange={e => setForm({...form, size: e.target.value})}
              className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#6366F1]/50 transition-colors">
              <option value="">Select size</option>
              {['1–10', '11–50', '51–200', '200+'].map(s => <option key={s} value={s}>{s} employees</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">Primary goals</label>
            <textarea value={form.goals} onChange={e => setForm({...form, goals: e.target.value})}
              placeholder="What do you want CAITO360 to help with?"
              rows={3}
              className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50 transition-colors resize-none" />
          </div>

          <button onClick={() => router.push('/dashboard')}
            className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white font-medium py-2 rounded text-sm transition-colors mt-2">
            Complete setup
          </button>
        </div>
      </div>
    </div>
  )
}
