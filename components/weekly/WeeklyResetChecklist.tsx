'use client'

import { motion } from 'framer-motion'
import { ListChecks, CheckCircle2, Circle } from 'lucide-react'
import type { WeeklyResetItem } from '@/lib/types'
import { cn } from '@/lib/utils'

const categoryColors: Record<WeeklyResetItem['category'], string> = {
  body: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  brain: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  spirit: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  execution: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  general: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
}

interface Props {
  items: WeeklyResetItem[]
  onToggle: (id: string) => void
}

export function WeeklyResetChecklist({ items, onToggle }: Props) {
  const completed = items.filter(i => i.completed)
  const totalXP = items.reduce((s, i) => s + i.xp, 0)
  const earnedXP = completed.reduce((s, i) => s + i.xp, 0)
  const pct = items.length ? Math.round((completed.length / items.length) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.17 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <ListChecks className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly Reset Checklist</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-amber-400">+{earnedXP}/{totalXP} XP</span>
          <span className="font-mono text-[10px] text-slate-500">{pct}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            onClick={() => onToggle(item.id)}
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-all text-left',
              item.completed
                ? 'border-emerald-500/15 bg-emerald-500/5'
                : 'border-white/5 bg-white/3 hover:bg-white/5'
            )}
          >
            {item.completed
              ? <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              : <Circle className="h-4 w-4 text-slate-600 flex-shrink-0" />
            }
            <span className={cn('flex-1 font-sans text-xs', item.completed ? 'text-slate-500 line-through' : 'text-slate-200')}>
              {item.label}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={cn(
                'font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-widest',
                categoryColors[item.category]
              )}>
                {item.category}
              </span>
              <span className="font-mono text-[10px] text-amber-400/80">+{item.xp}</span>
              <span className="font-mono text-[9px] text-slate-600">{item.estimatedMins}m</span>
            </div>
          </motion.button>
        ))}
      </div>

      {pct === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-emerald-500/8 border border-emerald-500/20 px-4 py-3 text-center"
        >
          <p className="font-display text-sm font-bold text-emerald-300">Reset Complete. Week Locked In.</p>
          <p className="font-mono text-[10px] text-emerald-500 mt-0.5">+{totalXP} XP earned</p>
        </motion.div>
      )}
    </motion.div>
  )
}
