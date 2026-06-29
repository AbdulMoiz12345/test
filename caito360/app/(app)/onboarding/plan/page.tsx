'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const plans = [
  { id: 'starter', name: 'Starter', price: '$49', docs: '50', questions: '500', seats: '3', retention: '6 months' },
  { id: 'growth', name: 'Growth', price: '$149', docs: '250', questions: '5,000', seats: '10', retention: '2 years', recommended: true },
  { id: 'partner', name: 'Partner', price: 'Custom', docs: 'Unlimited', questions: 'Unlimited', seats: 'Unlimited', retention: 'Unlimited' },
]

export default function PlanPage() {
  const router = useRouter()
  const [selected, setSelected] = useState('growth')

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded bg-[#6366F1] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-[#F1F5F9] font-semibold tracking-tight">CAITO360</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9] mb-2">Choose your plan</h1>
          <p className="text-[#64748B] text-sm">Start with a 14-day free trial. No credit card required.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {plans.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative p-5 border rounded-lg cursor-pointer transition-all
                ${selected === plan.id ? 'border-[#6366F1] bg-[#6366F1]/5' : 'border-[#1E1E2E] bg-[#13131A] hover:border-[#6366F1]/30'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#6366F1] text-white text-xs px-2 py-0.5 rounded-full font-medium">Recommended</span>
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[#F1F5F9] font-semibold text-sm">{plan.name}</div>
                  <div className="text-[#64748B] font-mono text-xs mt-0.5">{plan.price}/mo</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                  ${selected === plan.id ? 'bg-[#6366F1] border-[#6366F1]' : 'border-[#1E1E2E]'}`}>
                  {selected === plan.id && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  ['Documents/mo', plan.docs],
                  ['Questions/mo', plan.questions],
                  ['Seats', plan.seats],
                  ['Retention', plan.retention],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#64748B]">{label}</span>
                    <span className="text-[#F1F5F9] font-mono">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push('/onboarding/profile')}
            className="bg-[#6366F1] hover:bg-[#5558E8] text-white font-medium px-8 py-2.5 rounded text-sm transition-colors"
          >
            Continue with {plans.find(p => p.id === selected)?.name}
          </button>
        </div>
      </div>
    </div>
  )
}
