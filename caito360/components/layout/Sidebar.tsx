'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, FileText, Lightbulb, Settings, ChevronLeft, ChevronRight, CreditCard, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useMe } from '@/contexts/MeContext'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat',      icon: MessageSquare,   label: 'Chat' },
  { href: '/documents', icon: FileText,         label: 'Documents' },
  { href: '/insights',  icon: Lightbulb,        label: 'Insights' },
]

const roleBadge: Record<string, { label: string; color: string; bg: string }> = {
  owner:   { label: 'Owner',   color: '#818CF8', bg: 'rgba(99,102,241,0.12)' },
  admin:   { label: 'Admin',   color: '#A78BFA', bg: 'rgba(124,58,237,0.12)' },
  manager: { label: 'Manager', color: '#FCD34D', bg: 'rgba(245,158,11,0.12)' },
  member:  { label: 'Member',  color: '#94A3B8', bg: 'rgba(71,85,105,0.15)'  },
  viewer:  { label: 'Viewer',  color: '#64748B', bg: 'rgba(71,85,105,0.10)'  },
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const me = useMe()
  const badge = roleBadge[me.user.role] ?? roleBadge.viewer

  const settingsLinks = [
    { href: '/settings/profile', icon: Settings,    label: 'Settings' },
    ...(me.user.role === 'owner' ? [{ href: '/settings/billing', icon: CreditCard, label: 'Billing' }] : []),
  ]

  return (
    <aside
      className="relative flex flex-col border-r transition-all duration-200 flex-shrink-0"
      style={{ width: collapsed ? 56 : 232, minHeight: '100vh', background: '#0D0D15', borderColor: '#1E1E2E' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3.5 py-4 border-b" style={{ borderColor: '#1E1E2E', height: 56 }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)', boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}>
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden leading-none">
            <div className="text-sm font-semibold tracking-tight" style={{ color: '#F1F5F9' }}>CAITO<span className="gradient-text">360</span></div>
            <div className="text-xs mt-0.5 truncate" style={{ color: '#475569' }}>{me.tenant.name}</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all relative"
              style={{
                color: active ? '#F1F5F9' : '#475569',
                background: active ? '#1E1E2A' : 'transparent',
              }}
              title={collapsed ? label : undefined}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#18181F'; (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569' } }}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r"
                  style={{ background: 'linear-gradient(to bottom, #818CF8, #6366F1)' }} />
              )}
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? '#818CF8' : 'inherit' }} />
              {!collapsed && <span className="font-medium">{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#6366F1', boxShadow: '0 0 6px rgba(99,102,241,0.8)' }} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t px-2 py-3 space-y-0.5" style={{ borderColor: '#1E1E2E' }}>
        {settingsLinks.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all"
              style={{ color: active ? '#F1F5F9' : '#475569', background: active ? '#1E1E2A' : 'transparent' }}
              title={collapsed ? label : undefined}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#18181F'; (e.currentTarget as HTMLElement).style.color = '#94A3B8' } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#475569' } }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{label}</span>}
            </Link>
          )
        })}

        {/* User avatar */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1 rounded-md" style={{ background: '#18181F' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}>
              {me.user.fullName.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: '#F1F5F9' }}>{me.user.fullName}</div>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ color: badge.color, background: badge.bg }}>
                {badge.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-14 w-6 h-6 rounded-full flex items-center justify-center transition-colors z-10"
        style={{ background: '#111118', border: '1px solid #1E1E2E', color: '#475569' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#252535' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#475569'; (e.currentTarget as HTMLElement).style.borderColor = '#1E1E2E' }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}
