'use client'
export const dynamic = 'force-dynamic'
import { Shield, Check, Zap, ArrowRight } from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/shared/Button'
import { RoleGate } from '@/components/shared/RoleGate'
import { useMe } from '@/contexts/MeContext'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    docs: '50',
    questions: '500',
    seats: '3',
    retention: '6 months',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$149',
    docs: '250',
    questions: '5,000',
    seats: '10',
    retention: '2 years',
    recommended: true,
  },
  {
    id: 'partner',
    name: 'Partner',
    price: 'Custom',
    docs: 'Unlimited',
    questions: 'Unlimited',
    seats: 'Unlimited',
    retention: 'Unlimited',
  },
]

const invoices = [
  { id: 'inv-001', date: 'Jun 1, 2026', amount: '$149.00', status: 'paid' },
  { id: 'inv-002', date: 'May 1, 2026', amount: '$149.00', status: 'paid' },
  { id: 'inv-003', date: 'Apr 1, 2026', amount: '$149.00', status: 'paid' },
]

export default function BillingPage() {
  const me = useMe()
  const currentPlanId = me.plan.id

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Billing" />
      <div className="flex-1 overflow-y-auto p-6">
        <RoleGate capability="manage_billing" fallback={
          <div className="flex items-center gap-3 p-4 border border-[#1E1E2E] rounded bg-[#13131A] text-[#64748B] text-sm">
            <Shield className="w-4 h-4 flex-shrink-0" />
            Only the workspace owner can manage billing and subscription settings.
          </div>
        }>
          <div className="max-w-3xl space-y-8">

            {/* Current plan summary */}
            <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[#F1F5F9] text-sm font-semibold">Current plan</h3>
                  <p className="text-[#64748B] text-xs mt-0.5">Billed monthly · Next renewal Jul 1, 2026</p>
                </div>
                <span className="bg-[#6366F1]/10 text-[#6366F1] text-xs font-mono px-3 py-1 rounded-full">
                  {me.plan.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Documents', used: me.usage.documents, max: me.plan.maxDocuments },
                  { label: 'Questions', used: me.usage.questions, max: me.plan.maxQuestions },
                  { label: 'Seats', used: 3, max: me.plan.maxSeats },
                ].map(({ label, used, max }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#64748B]">{label}</span>
                      <span className="text-[#F1F5F9] font-mono">{used} / {max}</span>
                    </div>
                    <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (used / max) * 100)}%`,
                          background: (used / max) > 0.8 ? '#EF4444' : '#6366F1'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan selection */}
            <div>
              <h3 className="text-[#F1F5F9] text-sm font-semibold mb-4">Change plan</h3>
              <div className="grid grid-cols-3 gap-4">
                {plans.map(plan => {
                  const isCurrent = plan.id === currentPlanId
                  return (
                    <div key={plan.id}
                      className={`relative p-5 border rounded-lg transition-all
                        ${isCurrent ? 'border-[#6366F1] bg-[#6366F1]/5' : 'border-[#1E1E2E] bg-[#13131A] hover:border-[#6366F1]/30'}`}>
                      {plan.recommended && !isCurrent && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <span className="bg-[#6366F1] text-white text-xs px-2 py-0.5 rounded-full font-medium">Recommended</span>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <span className="bg-[#22C55E] text-white text-xs px-2 py-0.5 rounded-full font-medium">Current plan</span>
                        </div>
                      )}
                      <div className="mb-4">
                        <div className="text-[#F1F5F9] font-semibold text-sm">{plan.name}</div>
                        <div className="text-[#64748B] font-mono text-xs mt-0.5">{plan.price}/mo</div>
                      </div>
                      <div className="space-y-2 text-xs mb-4">
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
                      {isCurrent ? (
                        <div className="flex items-center gap-1.5 text-[#22C55E] text-xs">
                          <Check className="w-3.5 h-3.5" /> Active
                        </div>
                      ) : plan.id === 'partner' ? (
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-3.5 h-3.5" /> Contact sales
                        </Button>
                      ) : (
                        <Button size="sm">
                          <Zap className="w-3.5 h-3.5" />
                          {plans.findIndex(p => p.id === plan.id) > plans.findIndex(p => p.id === currentPlanId) ? 'Upgrade' : 'Downgrade'}
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Invoice history */}
            <div>
              <h3 className="text-[#F1F5F9] text-sm font-semibold mb-4">Invoice history</h3>
              <div className="border border-[#1E1E2E] rounded overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1E1E2E]">
                      {['Invoice', 'Date', 'Amount', 'Status', ''].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-[#64748B] text-xs font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id} className="border-b border-[#1E1E2E] last:border-0 hover:bg-[#1E1E2E]/20">
                        <td className="px-4 py-3 text-[#F1F5F9] text-xs font-mono">{inv.id}</td>
                        <td className="px-4 py-3 text-[#64748B] text-xs">{inv.date}</td>
                        <td className="px-4 py-3 text-[#F1F5F9] text-xs font-mono">{inv.amount}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#22C55E] font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-[#6366F1] text-xs hover:underline">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Danger zone */}
            <div className="border border-[#EF4444]/30 rounded-lg p-5 bg-[#EF4444]/5">
              <h3 className="text-[#EF4444] text-sm font-semibold mb-1">Cancel subscription</h3>
              <p className="text-[#64748B] text-xs mb-4">
                Cancelling will immediately restrict your workspace to read-only access at the end of the billing period.
              </p>
              <Button variant="danger" size="sm">Cancel subscription</Button>
            </div>

          </div>
        </RoleGate>
      </div>
    </div>
  )
}
