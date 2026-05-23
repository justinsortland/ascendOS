'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Plus, Minus, CheckCircle2, Circle } from 'lucide-react'
import { initialDreamSigns } from '@/lib/spirit-mock-data'
import { cn } from '@/lib/utils'

const practiceItems = [
  { id: 'reality-checks', label: 'Reality Checks Done' },
  { id: 'dream-journal', label: 'Dream Journal Written' },
  { id: 'intention-set', label: 'Intention Set Before Sleep' },
  { id: 'wbtb', label: 'WBTB Attempt' },
  { id: 'morning-recall', label: 'Morning Recall' },
]

interface Props {
  lucidCountThisMonth?: number
  practiceStreak?: number
}

export function LucidDreamingPractice({ lucidCountThisMonth = 2, practiceStreak = 5 }: Props) {
  const [realityChecks, setRealityChecks] = useState(3)
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    'reality-checks': false,
    'dream-journal': true,
    'intention-set': false,
    'wbtb': false,
    'morning-recall': true,
  })
  const [notes, setNotes] = useState('')

  function toggle(id: string) {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const completedCount = Object.values(completed).filter(Boolean).length
  const readinessScore = Math.round((completedCount / practiceItems.length) * 100)

  const readinessColor = readinessScore >= 80
    ? 'text-emerald-400'
    : readinessScore >= 50
      ? 'text-violet-400'
      : 'text-slate-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/15 border border-indigo-500/15">
          <Eye className="h-3.5 w-3.5 text-indigo-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Lucid Dreaming</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">optional practice</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 text-center">
          <div className="font-display text-lg font-bold text-indigo-400">{lucidCountThisMonth}</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">lucid this month</div>
        </div>
        <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 text-center">
          <div className="font-display text-lg font-bold text-violet-400">{practiceStreak}d</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">practice streak</div>
        </div>
        <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 text-center">
          <div className={cn('font-display text-lg font-bold', readinessColor)}>{readinessScore}%</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">readiness</div>
        </div>
      </div>

      {/* Reality check counter */}
      <div className="flex items-center justify-between rounded-lg bg-white/4 border border-white/6 px-4 py-3 mb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Reality Checks Today</span>
          <span className="font-display text-2xl font-bold text-white">{realityChecks}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRealityChecks(c => Math.max(0, c - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/8 text-slate-400 hover:bg-white/10 transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setRealityChecks(c => c + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/25 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5 mb-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Tonight's Practice</span>
        {practiceItems.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all border text-left',
              completed[item.id]
                ? 'border-emerald-500/15 bg-emerald-500/5'
                : 'border-white/5 bg-white/3 hover:bg-white/5'
            )}
          >
            {completed[item.id]
              ? <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              : <Circle className="h-4 w-4 text-slate-600 flex-shrink-0" />
            }
            <span className={cn(
              'font-sans text-xs',
              completed[item.id] ? 'text-slate-400 line-through' : 'text-slate-300'
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Readiness bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Readiness</span>
          <span className={cn('font-mono text-[10px] font-bold', readinessColor)}>{readinessScore}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
            animate={{ width: `${readinessScore}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Dream signs */}
      <div className="mb-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Common Dream Signs</span>
        <div className="flex flex-wrap gap-1.5">
          {initialDreamSigns.map(sign => (
            <span key={sign} className="font-mono text-[9px] px-2 py-1 rounded bg-indigo-500/8 border border-indigo-500/15 text-indigo-400/80 uppercase tracking-widest">
              {sign}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <input
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notes or intention for tonight..."
        className="w-full rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/30 transition-colors"
      />
    </motion.div>
  )
}
