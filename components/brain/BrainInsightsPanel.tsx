'use client'

import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import type { BrainInsight } from '@/lib/types'
import { cn } from '@/lib/utils'

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/8',
  },
  medium: {
    icon: TrendingUp,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/8',
  },
  low: {
    icon: Info,
    color: 'text-slate-400',
    border: 'border-white/8',
    bg: 'bg-white/3',
  },
}

interface Props {
  insights: BrainInsight[]
}

export function BrainInsightsPanel({ insights }: Props) {
  const sorted = [...insights].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.22 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Brain className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Brain Insights</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">AscendOS Coach</span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((insight, i) => {
          const cfg = priorityConfig[insight.priority]
          const Icon = cfg.icon
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.3 }}
              className={cn('rounded-lg border p-3', cfg.border, cfg.bg)}
            >
              <div className="flex items-start gap-2">
                <Icon className={cn('h-3.5 w-3.5 flex-shrink-0 mt-0.5', cfg.color)} />
                <p className="font-sans text-xs text-slate-300 leading-relaxed">{insight.message}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
