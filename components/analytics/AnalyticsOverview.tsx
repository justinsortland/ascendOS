'use client'

import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import {
  OVERALL_MOMENTUM,
  ANALYTICS_WEEKLY_RANK,
  TOTAL_XP,
  CURRENT_TITLE,
  BEST_CATEGORY,
  WEAKEST_CATEGORY,
  CURRENT_BOTTLENECK,
  WEEKLY_XP,
  categoryXP,
} from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const categoryConfig = {
  body: { label: 'Body', color: 'text-emerald-400', bar: '#10b981' },
  brain: { label: 'Brain', color: 'text-cyan-400', bar: '#06b6d4' },
  spirit: { label: 'Spirit', color: 'text-violet-400', bar: '#8b5cf6' },
  execution: { label: 'Execution', color: 'text-amber-400', bar: '#f59e0b' },
}

const rankColor = (rank: string) => {
  if (rank === 'Machine Mode' || rank === 'Mythic Week') return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  if (rank === 'Locked In' || rank === 'Ascendant') return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  if (rank === 'Rebuilding') return 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  return 'text-slate-400 border-slate-500/20 bg-slate-500/8'
}

export function AnalyticsOverview() {
  const maxXP = Math.max(...Object.values(categoryXP))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-start gap-6">
        {/* Momentum ring */}
        <div className="relative flex-shrink-0">
          <svg width={100} height={100} className="-rotate-90">
            <circle cx={50} cy={50} r={42} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={7} />
            <motion.circle
              cx={50} cy={50} r={42}
              fill="none" strokeWidth={7} strokeLinecap="round"
              stroke={OVERALL_MOMENTUM >= 80 ? '#10b981' : OVERALL_MOMENTUM >= 65 ? '#06b6d4' : OVERALL_MOMENTUM >= 50 ? '#f59e0b' : '#f43f5e'}
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - OVERALL_MOMENTUM / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-bold text-white">{OVERALL_MOMENTUM}</span>
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Momentum</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-display text-lg font-bold text-white">{CURRENT_TITLE}</span>
            <span className={cn('font-mono text-[10px] px-2 py-0.5 rounded border', rankColor(ANALYTICS_WEEKLY_RANK))}>
              {ANALYTICS_WEEKLY_RANK}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3">
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Total XP</span>
              <span className="font-display text-base font-bold text-white ml-2">{TOTAL_XP.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">This Week</span>
              <span className="font-display text-base font-bold text-amber-400 ml-2">+{WEEKLY_XP.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Best Category</span>
              <span className="font-mono text-[11px] text-cyan-400 ml-2">{BEST_CATEGORY}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Weakest</span>
              <span className="font-mono text-[11px] text-violet-400 ml-2">{WEAKEST_CATEGORY}</span>
            </div>
          </div>

          {/* Category XP bars */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {(Object.entries(categoryXP) as [keyof typeof categoryXP, number][]).map(([cat, xp]) => {
              const cfg = categoryConfig[cat]
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn('font-mono text-[9px] uppercase tracking-widest', cfg.color)}>{cfg.label}</span>
                    <span className="font-mono text-[9px] text-slate-500">{xp.toLocaleString()}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cfg.bar }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(xp / maxXP) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottleneck */}
      <div className="mt-4 rounded-lg bg-rose-500/5 border border-rose-500/15 px-3 py-2.5 flex items-center gap-2">
        <BarChart3 className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-rose-400/70 mr-2">Current Bottleneck</span>
          <span className="font-sans text-xs text-slate-300">{CURRENT_BOTTLENECK}</span>
        </div>
      </div>
    </motion.div>
  )
}
