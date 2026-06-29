'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, Check } from 'lucide-react'

const perks = [
  'No credit card required',
  'Free 14-day trial',
  'Up to 3 team members',
  'Cancel any time',
]

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    router.push('/onboarding/plan')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#08080E' }}>
      {/* Left branded panel */}
      <div className="hidden lg:flex w-[480px] flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0D0D1A 0%, #0A0A15 100%)', borderRight: '1px solid #1E1E2E' }}>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base" style={{ color: '#F1F5F9' }}>CAITO<span className="gradient-text">360</span></span>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold leading-snug mb-3" style={{ color: '#F1F5F9' }}>
            Start making smarter<br />
            <span className="gradient-text">business decisions</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: '#475569' }}>
            Join teams who use CAITO360 to get instant AI-powered answers from their business documents.
          </p>
          <div className="space-y-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <Check className="w-2.5 h-2.5" style={{ color: '#22C55E' }} />
                </div>
                <span className="text-sm" style={{ color: '#94A3B8' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: '#1E1E2E' }}>© 2026 CAITO360</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold" style={{ color: '#F1F5F9' }}>CAITO360</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-1" style={{ color: '#F1F5F9' }}>Create your workspace</h2>
            <p className="text-sm" style={{ color: '#475569' }}>Get started in under 2 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Work email', key: 'email', type: 'email', placeholder: 'you@company.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '8+ characters' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#94A3B8' }}>{label}</label>
                <input type={type} value={form[key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} className="input" required />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm text-white transition-all mt-2"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #5254CC)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)' }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
                : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>

            <p className="text-xs text-center" style={{ color: '#475569' }}>
              By signing up you agree to our{' '}
              <a href="#" style={{ color: '#6366F1' }}>Terms</a> and{' '}
              <a href="#" style={{ color: '#6366F1' }}>Privacy Policy</a>
            </p>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-medium" style={{ color: '#6366F1' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
