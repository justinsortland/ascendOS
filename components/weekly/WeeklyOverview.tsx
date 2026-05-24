'use client'

import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import type { WeeklyGoal, WeeklyResetItem } from '@/lib/types'
import { cn } from '@/lib/utils'

const categoryConfig = {
  body: { label: 'Body', color: 'text-emerald-400', bar: '#10b981' },
  brain: { label: 'Brain', color: 'text-cyan-400', bar: '#06b6d4' },
  spirit: { label: 'Spirit', color: 'text-violet-400', bar: '#8b5cf6' },
  execution: { label: 'Execution', color: 'text-amber-400', bar: '#f59e0b' },
}

function categoryPct(goals: WeeklyGoal[], cat: WeeklyGoal['category']) {
  const catGoals = goals.filter(g => g.category === cat)
  if (!catGoals.length) return 0
  return Math.round(catGoals.reduce((s, g) => s + Math.min(g.current / g.target, 1), 0) / catGoals.length * 100)
}

interface Props {
  weekRange: string
  theme: string
  rank: string
  mainFocus: string
  goals: WeeklyGoal[]
  resetItems: WeeklyResetItem[]
}

export function WeeklyOverview({ weekRange, theme, rank, mainFocus, goals, resetItems }: Props) {
  const cats = ['body', 'brain', 'spirit', 'execution'] as const
  const overall = Math.round(cats.reduce((s, c) => s + categoryPct(goals, c), 0) / cats.length)
  const resetDone = resetItems.filter(r => r.completed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-amber-500/15 bg-[#0d0d1a] p-5"
      style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #100e07 100%)' }}
    >
      <div className="flex items-start gap-6">
        {/* Score ring */}
        <div className="relative flex-shrink-0">
          <svg width={100} height={100} className="-rotate-90">
            <circle cx={50} cy={50} r={42} fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth={7} />
            <motion.circle
              cx={50} cy={50} r={42}
              fill="none" stroke="rgb(245,158,11)" strokeWidth={7} strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - overall / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-bold text-white">{overall}%</span>
            <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest">Week</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest">{weekRange}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/25 text-amber-300">
              {rank}
            </span>
            <span className="font-mono text-[10px] text-slate-500 ml-auto">
              Reset: {resetDone}/{resetItems.length}
            </span>
          </div>
          <h2 className="font-display text-lg font-bold text-white mb-0.5">{theme}</h2>
          <p className="font-sans text-xs text-slate-400 mb-3">{mainFocus}</p>

          {/* Category bars */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {cats.map(cat => {
              const cfg = categoryConfig[cat]
              const pct = categoryPct(goals, cat)
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('font-mono text-[9px] uppercase tracking-widest', cfg.color)}>{cfg.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cfg.bar }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
