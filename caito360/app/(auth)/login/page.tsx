'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#6366F1] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-[#F1F5F9] text-xl font-semibold tracking-tight">CAITO360</h1>
          <p className="text-[#64748B] text-sm mt-1">Sign in to your workspace</p>
        </div>

        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white font-medium py-2 rounded text-sm transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-xs text-[#64748B] mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#6366F1] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
