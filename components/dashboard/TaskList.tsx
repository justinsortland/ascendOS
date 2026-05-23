'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Task, TaskTier, Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const tierConfig: Record<TaskTier, { label: string; color: string; dotColor: string }> = {
  'non-negotiable': {
    label: 'Non-Negotiables',
    color: 'text-rose-400',
    dotColor: 'bg-rose-500',
  },
  enhancer: {
    label: 'Enhancers',
    color: 'text-amber-400',
    dotColor: 'bg-amber-500',
  },
  optional: {
    label: 'Optional Rituals',
    color: 'text-slate-400',
    dotColor: 'bg-slate-600',
  },
}

const categoryColor: Record<Category, string> = {
  body: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  brain: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  spirit: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  execution: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
}

interface TierSectionProps {
  tier: TaskTier
  tasks: Task[]
  onToggle: (id: string) => void
}

function TierSection({ tier, tasks, onToggle }: TierSectionProps) {
  const [collapsed, setCollapsed] = useState(false)
  const cfg = tierConfig[tier]
  const done = tasks.filter(t => t.completed).length

  return (
    <div>
      <button
        onClick={() => setCollapsed(c => !c)}
        className="flex w-full items-center justify-between py-2 group"
      >
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${cfg.dotColor}`} />
          <span className={`font-mono text-[10px] font-medium uppercase tracking-wider ${cfg.color}`}>
            {cfg.label}
          </span>
          <span className="font-mono text-[10px] text-slate-600">
            {done}/{tasks.length}
          </span>
        </div>
        {collapsed ? (
          <ChevronDown className="h-3 w-3 text-slate-600" />
        ) : (
          <ChevronUp className="h-3 w-3 text-slate-600" />
        )}
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-1"
          >
            {tasks.map(task => (
              <motion.button
                key={task.id}
                onClick={() => onToggle(task.id)}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  task.completed
                    ? 'bg-white/3 opacity-60'
                    : 'bg-white/5 hover:bg-white/8'
                )}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 flex-shrink-0 text-slate-600" />
                )}
                <span
                  className={cn(
                    'flex-1 text-sm',
                    task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                  )}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={cn('h-4 px-1.5 text-[9px] font-semibold', categoryColor[task.category])}
                  >
                    {task.category}
                  </Badge>
                  <span className="font-mono text-[10px] text-slate-600">+{task.xp}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface Props {
  tasks: Task[]
  onToggle: (id: string) => void
}

const TIERS: TaskTier[] = ['non-negotiable', 'enhancer', 'optional']

export function TaskList({ tasks, onToggle }: Props) {
  const xpEarned = tasks.filter(t => t.completed).reduce((s, t) => s + t.xp, 0)
  const xpTotal = tasks.reduce((s, t) => s + t.xp, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-sm font-bold text-white">Today&apos;s Queue</h2>
          <p className="font-mono text-[10px] text-slate-500 mt-0.5">
            {tasks.filter(t => t.completed).length}/{tasks.length} complete
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs font-bold text-amber-400">{xpEarned} XP</p>
          <p className="font-mono text-[10px] text-slate-600">of {xpTotal} avail</p>
        </div>
      </div>

      <div className="space-y-3">
        {TIERS.map(tier => (
          <TierSection
            key={tier}
            tier={tier}
            tasks={tasks.filter(t => t.tier === tier)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </motion.div>
  )
}
