'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp } from 'lucide-react'
import type { WeeklyGoal } from '@/lib/types'
import { cn } from '@/lib/utils'

const categoryConfig = {
  body: { label: 'Body', color: 'text-emerald-400', border: 'border-emerald-500/15', bg: 'bg-emerald-500/5', bar: '#10b981', icon: '💪' },
  brain: { label: 'Brain', color: 'text-cyan-400', border: 'border-cyan-500/15', bg: 'bg-cyan-500/5', bar: '#06b6d4', icon: '🧠' },
  spirit: { label: 'Spirit', color: 'text-violet-400', border: 'border-violet-500/15', bg: 'bg-violet-500/5', bar: '#8b5cf6', icon: '✨' },
  execution: { label: 'Execution', color: 'text-amber-400', border: 'border-amber-500/15', bg: 'bg-amber-500/5', bar: '#f59e0b', icon: '⚡' },
}

const statusConfig = {
  'complete': { color: 'text-emerald-400', label: 'Done' },
  'on-track': { color: 'text-cyan-400', label: 'On Track' },
  'behind': { color: 'text-rose-400', label: 'Behind' },
  'not-started': { color: 'text-slate-500', label: 'Not Started' },
}

interface GoalRowProps {
  goal: WeeklyGoal
  barColor: string
  index: number
}

function GoalRow({ goal, barColor, index }: GoalRowProps) {
  const pct = Math.min((goal.current / goal.target) * 100, 100)
  const sc = statusConfig[goal.status]
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index }}
      className="py-2 border-b border-white/4 last:border-0"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-sans text-xs text-slate-300">{goal.title}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-500">{goal.current}/{goal.target} {goal.unit}</span>
          <span className={cn('font-mono text-[9px] uppercase tracking-widest', sc.color)}>{sc.label}</span>
        </div>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: pct === 100 ? '#10b981' : barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 * index }}
        />
      </div>
    </motion.div>
  )
}

interface CategoryCardProps {
  category: WeeklyGoal['category']
  goals: WeeklyGoal[]
  index: number
}

function CategoryCard({ category, goals, index }: CategoryCardProps) {
  const cfg = categoryConfig[category]
  const catGoals = goals.filter(g => g.category === category)
  const completionPct = catGoals.length
    ? Math.round(catGoals.reduce((s, g) => s + Math.min(g.current / g.target, 1), 0) / catGoals.length * 100)
    : 0
  const doneCount = catGoals.filter(g => g.status === 'complete').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 * index }}
      className={cn('rounded-xl border p-4', cfg.border, cfg.bg)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">{cfg.icon}</span>
          <span className={cn('font-display text-sm font-bold', cfg.color)}>{cfg.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className={cn('h-3.5 w-3.5', cfg.color)} />
          <span className="font-mono text-[11px] font-bold text-white">{completionPct}%</span>
        </div>
      </div>
      <div>
        {catGoals.map((goal, i) => (
          <GoalRow key={goal.id} goal={goal} barColor={cfg.bar} index={i} />
        ))}
      </div>
      <div className="mt-2 font-mono text-[9px] text-slate-500">
        {doneCount}/{catGoals.length} complete
      </div>
    </motion.div>
  )
}

interface Props {
  goals: WeeklyGoal[]
}

export function WeeklyGoals({ goals }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.07 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <Target className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly Goals</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{goals.length} goals</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(['body', 'brain', 'spirit', 'execution'] as const).map((cat, i) => (
          <CategoryCard key={cat} category={cat} goals={goals} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
