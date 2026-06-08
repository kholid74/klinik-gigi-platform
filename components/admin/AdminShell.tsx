'use client'

import { useState } from 'react'
import { Menu, Bell } from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'

interface AdminShellProps {
  children: React.ReactNode
  pageTitle: string
  userEmail?: string
}

export function AdminShell({ children, pageTitle, userEmail }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F6F8]">
      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:flex">
        <AdminSidebar userEmail={userEmail} />
      </div>

      {/* Mobile sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userEmail={userEmail}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[var(--color-border)] flex items-center px-5 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-surface)]"
          >
            <Menu size={18} />
          </button>
          <h1 className="font-semibold text-base text-[var(--color-foreground)] flex-1">{pageTitle}</h1>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-surface)]">
              <Bell size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-xs font-bold text-white">
              {userEmail?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
