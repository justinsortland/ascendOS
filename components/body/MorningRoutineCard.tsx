'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Sun } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { MorningHabit, HabitTier } from '@/lib/types'
import { cn } from '@/lib/utils'

const tierStyle: Record<HabitTier, { badge: string; dot: string }> = {
  core: {
    badge: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    dot: 'bg-emerald-500',
  },
  enhancer: {
    badge: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    dot: 'bg-amber-500',
  },
  optional: {
    badge: 'text-slate-400 border-white/10 bg-white/5',
    dot: 'bg-slate-600',
  },
}

interface Props {
  habits: MorningHabit[]
  onToggle: (id: string) => void
}

export function MorningRoutineCard({ habits, onToggle }: Props) {
  const done = habits.filter(h => h.completed).length
  const core = habits.filter(h => h.tier === 'core')
  const coreDone = core.filter(h => h.completed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Sun className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white">Morning Protocol</h3>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">
              {done}/{habits.length} complete
            </p>
          </div>
        </div>
        {coreDone === core.length && core.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full"
          >
            CORE ✓
          </motion.span>
        )}
      </div>

      {/* Tier groups */}
      {(['core', 'enhancer', 'optional'] as HabitTier[]).map(tier => {
        const group = habits.filter(h => h.tier === tier)
        if (group.length === 0) return null
        const ts = tierStyle[tier]
        return (
          <div key={tier} className="mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className={`h-1.5 w-1.5 rounded-full ${ts.dot}`} />
              <span className={`font-mono text-[10px] uppercase tracking-wider font-medium ${tier === 'core' ? 'text-emerald-400' : tier === 'enhancer' ? 'text-amber-400' : 'text-slate-500'}`}>
                {tier === 'core' ? 'Core' : tier === 'enhancer' ? 'Enhancer' : 'Optional Rituals'}
              </span>
            </div>
            <div className="space-y-1">
              {group.map(habit => (
                <HabitRow key={habit.id} habit={habit} tierStyle={ts} onToggle={onToggle} />
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

function HabitRow({
  habit, tierStyle: ts, onToggle,
}: {
  habit: MorningHabit
  tierStyle: { badge: string; dot: string }
  onToggle: (id: string) => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={() => onToggle(habit.id)}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
        habit.completed ? 'bg-white/3 opacity-60' : 'bg-white/5 hover:bg-white/8'
      )}
    >
      <div className="mt-0.5 flex-shrink-0">
        <AnimatePresence mode="wait">
          {habit.completed ? (
            <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </motion.div>
          ) : (
            <motion.div key="todo" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Circle className="h-4 w-4 text-slate-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn('font-sans text-xs font-medium', habit.completed ? 'line-through text-slate-500' : 'text-white')}>
            {habit.label}
          </span>
          <Badge variant="outline" className={cn('h-3.5 px-1 text-[9px]', ts.badge)}>
            {habit.tierLabel}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-[10px] text-slate-600">{habit.duration}</span>
          <span className="font-mono text-[10px] text-slate-600">·</span>
          <span className="font-mono text-[10px] text-slate-600">🔥 {habit.streak}d</span>
        </div>
      </div>
    </motion.button>
  )
}
