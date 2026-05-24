'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck } from 'lucide-react'
import { weeklyReportCard } from '@/lib/analytics-mock-data'
import type { Grade } from '@/lib/types'
import { cn } from '@/lib/utils'

function gradeColor(g: Grade) {
  if (g.startsWith('A')) return 'text-emerald-400'
  if (g.startsWith('B')) return 'text-cyan-400'
  if (g.startsWith('C')) return 'text-amber-400'
  return 'text-rose-400'
}

function gradeBg(g: Grade) {
  if (g.startsWith('A')) return 'bg-emerald-500/10 border-emerald-500/20'
  if (g.startsWith('B')) return 'bg-cyan-500/10 border-cyan-500/20'
  if (g.startsWith('C')) return 'bg-amber-500/10 border-amber-500/20'
  return 'bg-rose-500/10 border-rose-500/20'
}

const categoryGrades = [
  { label: 'Body', grade: weeklyReportCard.body, color: 'text-emerald-300' },
  { label: 'Brain', grade: weeklyReportCard.brain, color: 'text-cyan-300' },
  { label: 'Spirit', grade: weeklyReportCard.spirit, color: 'text-violet-300' },
  { label: 'Execution', grade: weeklyReportCard.execution, color: 'text-amber-300' },
]

export function WeeklyReportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.22 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <ClipboardCheck className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly Report Card</h3>
        <div className={cn('ml-auto font-display text-lg font-bold', gradeColor(weeklyReportCard.overall))}>
          {weeklyReportCard.overall}
        </div>
      </div>

      {/* Category grades */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {categoryGrades.map(cat => (
          <div key={cat.label} className={cn('rounded-xl border p-3 text-center', gradeBg(cat.grade))}>
            <div className={cn('font-display text-2xl font-bold', gradeColor(cat.grade))}>{cat.grade}</div>
            <div className={cn('font-mono text-[9px] uppercase tracking-widest mt-0.5', cat.color)}>{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Report details */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {[
          { label: 'Biggest Win', value: weeklyReportCard.biggestWin, color: 'text-emerald-400' },
          { label: 'Biggest Miss', value: weeklyReportCard.biggestMiss, color: 'text-rose-400' },
          { label: 'Best Day', value: weeklyReportCard.bestDay, color: 'text-cyan-400' },
          { label: 'Lowest Day', value: weeklyReportCard.worstDay, color: 'text-amber-400' },
        ].map(item => (
          <div key={item.label} className="rounded-lg bg-white/3 border border-white/5 px-3 py-2.5">
            <span className={cn('font-mono text-[9px] uppercase tracking-widest block mb-0.5', item.color)}>{item.label}</span>
            <p className="font-sans text-xs text-slate-300 leading-snug">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Adjustment */}
      <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/15 px-4 py-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500/70 block mb-1">Next Week Adjustment</span>
        <p className="font-sans text-xs text-slate-300 leading-relaxed">{weeklyReportCard.adjustment}</p>
      </div>
    </motion.div>
  )
}
