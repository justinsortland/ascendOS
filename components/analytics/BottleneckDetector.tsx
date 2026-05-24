'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertOctagon, CheckCircle2 } from 'lucide-react'
import { bottlenecks } from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const severityConfig = {
  high: { color: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/5', dot: 'bg-rose-400', label: 'High' },
  medium: { color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', dot: 'bg-amber-400', label: 'Medium' },
  low: { color: 'text-slate-400', border: 'border-white/8', bg: 'bg-white/3', dot: 'bg-slate-500', label: 'Low' },
}

const categoryConfig = {
  body: 'text-emerald-400',
  brain: 'text-cyan-400',
  spirit: 'text-violet-400',
  execution: 'text-amber-400',
}

export function BottleneckDetector() {
  const [applied, setApplied] = useState<Set<string>>(new Set())

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500/15 border border-rose-500/20">
          <AlertOctagon className="h-3.5 w-3.5 text-rose-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Bottleneck Detector</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{bottlenecks.length} identified</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {bottlenecks.map((bn, i) => {
          const sc = severityConfig[bn.severity]
          const isApplied = applied.has(bn.id)
          return (
            <motion.div
              key={bn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className={cn('rounded-lg border p-4 flex flex-col gap-2', sc.border, sc.bg)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full flex-shrink-0 mt-0.5', sc.dot)} />
                  <h4 className="font-display text-xs font-bold text-white leading-snug">{bn.name}</h4>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={cn('font-mono text-[9px] uppercase tracking-widest', sc.color)}>{sc.label}</span>
                  <span className={cn('font-mono text-[9px] uppercase tracking-widest', categoryConfig[bn.category])}>· {bn.category}</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">{bn.why}</p>

              <div className="rounded bg-white/4 border border-white/6 px-2.5 py-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-0.5">Fix</span>
                <p className="font-sans text-[11px] text-slate-300 leading-relaxed">{bn.fix}</p>
              </div>

              <button
                onClick={() => setApplied(prev => {
                  const next = new Set(prev)
                  next.has(bn.id) ? next.delete(bn.id) : next.add(bn.id)
                  return next
                })}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-all border mt-auto',
                  isApplied
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : `${sc.border} bg-white/4 ${sc.color} hover:bg-white/8`
                )}
              >
                <CheckCircle2 className="h-3 w-3" />
                {isApplied ? 'Applied' : 'Apply Suggestion'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
