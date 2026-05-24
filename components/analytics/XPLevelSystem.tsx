'use client'

import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import {
  CURRENT_LEVEL,
  CURRENT_TITLE,
  TOTAL_XP,
  XP_TO_NEXT,
  LEVEL_XP_CAP,
  WEEKLY_XP,
  categoryXP,
  ranks,
  rankThresholds,
  OVERALL_MOMENTUM,
} from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const categoryConfig = {
  body: { label: 'Body', color: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  brain: { label: 'Brain', color: '#06b6d4', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  spirit: { label: 'Spirit', color: '#8b5cf6', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  execution: { label: 'Execution', color: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-400' },
}

export function XPLevelSystem() {
  const levelPct = ((LEVEL_XP_CAP - XP_TO_NEXT) / LEVEL_XP_CAP) * 100
  const totalCategoryXP = Object.values(categoryXP).reduce((s, v) => s + v, 0)

  const currentRankIdx = rankThresholds.findIndex((t, i) =>
    OVERALL_MOMENTUM >= t && (i === ranks.length - 1 || OVERALL_MOMENTUM < rankThresholds[i + 1])
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">XP & Level System</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Level card */}
        <div className="rounded-lg border border-amber-500/15 bg-amber-500/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Level</div>
              <div className="font-display text-3xl font-bold text-white">{CURRENT_LEVEL}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Title</div>
              <div className="font-display text-sm font-bold text-amber-300">{CURRENT_TITLE}</div>
            </div>
          </div>
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-slate-500">{TOTAL_XP.toLocaleString()} XP</span>
              <span className="font-mono text-[10px] text-amber-400">{XP_TO_NEXT} to next</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${levelPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>
          <div className="font-mono text-[10px] text-amber-400">+{WEEKLY_XP} XP this week</div>
        </div>

        {/* Rank ladder */}
        <div className="rounded-lg border border-white/6 bg-white/3 p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-3">Rank Ladder</div>
          <div className="space-y-1.5">
            {ranks.map((rank, i) => {
              const isActive = i === currentRankIdx
              const isPast = i < currentRankIdx
              return (
                <div key={rank} className={cn(
                  'flex items-center gap-2 rounded px-2 py-1',
                  isActive ? 'bg-cyan-500/10' : ''
                )}>
                  <div className={cn(
                    'h-1.5 w-1.5 rounded-full flex-shrink-0',
                    isActive ? 'bg-cyan-400' : isPast ? 'bg-emerald-500/60' : 'bg-slate-700'
                  )} />
                  <span className={cn(
                    'font-mono text-[10px]',
                    isActive ? 'text-cyan-300 font-bold' : isPast ? 'text-slate-500' : 'text-slate-600'
                  )}>
                    {rank}
                  </span>
                  <span className="font-mono text-[9px] text-slate-600 ml-auto">{rankThresholds[i]}+</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Category XP breakdown */}
      <div className="mt-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-3">Category XP Breakdown</span>
        <div className="grid grid-cols-2 gap-3">
          {(Object.entries(categoryXP) as [keyof typeof categoryXP, number][]).map(([cat, xp]) => {
            const cfg = categoryConfig[cat]
            const pct = Math.round((xp / totalCategoryXP) * 100)
            return (
              <div key={cat} className={cn('rounded-lg p-3', cfg.bg)}>
                <div className="flex items-center justify-between mb-1">
                  <span className={cn('font-mono text-[9px] uppercase tracking-widest', cfg.text)}>{cfg.label}</span>
                  <span className="font-mono text-[10px] text-slate-400">{pct}%</span>
                </div>
                <div className="font-display text-base font-bold text-white">{xp.toLocaleString()}</div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden mt-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: cfg.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
