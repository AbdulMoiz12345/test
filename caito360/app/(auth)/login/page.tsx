'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#08080E' }}>
      {/* Left branded panel */}
      <div className="hidden lg:flex w-[480px] flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #0A0A15 100%)', borderRight: '1px solid #1E1E2E' }}>
        {/* Glow orb */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-base" style={{ color: '#F1F5F9' }}>CAITO<span className="gradient-text">360</span></span>
        </div>

        {/* Pitch */}
        <div className="relative z-10">
          <blockquote className="text-2xl font-medium leading-snug mb-6" style={{ color: '#F1F5F9' }}>
            "Your documents,<br />
            <span className="gradient-text">intelligently answered.</span>"
          </blockquote>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#475569' }}>
            Upload financial reports, sales data, and business documents. Ask questions in plain English. Get answers backed by your actual data.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            {[
              { value: '10k+', label: 'Documents analysed' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '< 2s', label: 'Avg response time' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-1 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1E1E2E' }}>
                <div className="text-lg font-bold gradient-text">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: '#1E1E2E' }}>
          © 2026 CAITO360
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold" style={{ color: '#F1F5F9' }}>CAITO360</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-1" style={{ color: '#F1F5F9' }}>Welcome back</h2>
            <p className="text-sm" style={{ color: '#475569' }}>Sign in to your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94A3B8' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" className="input" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium" style={{ color: '#94A3B8' }}>Password</label>
                <a href="#" className="text-xs transition-colors" style={{ color: '#6366F1' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#818CF8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6366F1')}>Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="input pr-10" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#475569' }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm text-white transition-all mt-2"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #5254CC)',
                boxShadow: '0 0 0 0 rgba(99,102,241,0)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)' }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(99,102,241,0)'}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
              ) : (
                <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium transition-colors" style={{ color: '#6366F1' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#818CF8')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#6366F1')}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
