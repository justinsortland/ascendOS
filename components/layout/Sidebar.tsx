'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Dumbbell,
  Brain,
  Sparkles,
  CalendarDays,
  BarChart3,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, color: 'text-white' },
  { href: '/body', label: 'Body', icon: Dumbbell, color: 'text-emerald-400' },
  { href: '/brain', label: 'Brain', icon: Brain, color: 'text-cyan-400' },
  { href: '/spirit', label: 'Spirit', icon: Sparkles, color: 'text-violet-400' },
  { href: '/weekly', label: 'Weekly', icon: CalendarDays, color: 'text-amber-400' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, color: 'text-slate-400' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-56 flex flex-col bg-[#0a0a12] border-r border-white/5 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="font-display text-sm font-bold text-white tracking-wide">AscendOS</span>
          <p className="font-mono text-[10px] text-slate-500 leading-none mt-0.5">v1.0.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative',
                  active
                    ? 'bg-white/8 text-white'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full"
                  />
                )}
                <item.icon
                  className={cn('w-4 h-4 flex-shrink-0', active ? item.color : 'text-current')}
                />
                {item.label}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
            J
          </div>
          <div>
            <p className="font-display text-xs font-semibold text-white">Justin</p>
            <p className="font-mono text-[10px] text-slate-500 tracking-wide">ASCENDANT II</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
