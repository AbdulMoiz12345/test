'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, FileText, Lightbulb, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useMe } from '@/contexts/MeContext'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/documents', icon: FileText, label: 'Documents' },
  { href: '/insights', icon: Lightbulb, label: 'Insights' },
]

const roleBadgeColor: Record<string, string> = {
  owner: 'text-[#6366F1]',
  admin: 'text-[#7C3AED]',
  manager: 'text-[#F59E0B]',
  member: 'text-[#64748B]',
  viewer: 'text-[#64748B]',
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const me = useMe()

  return (
    <aside className={`relative flex flex-col bg-[#13131A] border-r border-[#1E1E2E] transition-all duration-200 ${collapsed ? 'w-14' : 'w-60'}`} style={{ minHeight: '100vh' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-[#1E1E2E] h-14">
        <div className="w-7 h-7 rounded bg-[#6366F1] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">C</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-[#F1F5F9] font-semibold text-sm tracking-tight leading-none">CAITO360</div>
            <div className="text-[#64748B] text-xs mt-0.5 truncate">{me.tenant.name}</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 px-2 py-2 rounded text-sm transition-colors relative
                ${active
                  ? 'bg-[#1E1E2E] text-[#F1F5F9]'
                  : 'text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E]'
                }`}
              title={collapsed ? label : undefined}
            >
              {active && <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#6366F1] rounded-r" />}
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#1E1E2E] px-2 py-3 space-y-0.5">
        <Link
          href="/settings/profile"
          className={`flex items-center gap-3 px-2 py-2 rounded text-sm text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E1E2E] transition-colors`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>

        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {me.user.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-[#F1F5F9] text-xs font-medium truncate">{me.user.fullName}</div>
              <div className={`text-xs capitalize ${roleBadgeColor[me.user.role]}`}>{me.user.role}</div>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 bg-[#13131A] border border-[#1E1E2E] rounded-full flex items-center justify-center text-[#64748B] hover:text-[#F1F5F9] transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}
