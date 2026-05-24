'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react'
import { weeklyReviewAIResponse } from '@/lib/weekly-mock-data'
import type { WeeklyReviewEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

const fields: { key: keyof Omit<WeeklyReviewEntry, 'id' | 'date'>; label: string; placeholder: string }[] = [
  { key: 'wins', label: 'Biggest Wins', placeholder: 'What shipped, what improved, what held...' },
  { key: 'misses', label: 'Misses / Bottlenecks', placeholder: 'Where did momentum break...' },
  { key: 'heavy', label: 'What Felt Heavy?', placeholder: 'Honest observation...' },
  { key: 'momentum', label: 'What Generated Momentum?', placeholder: 'The inputs that worked...' },
  { key: 'reduce', label: 'What to Reduce?', placeholder: 'Cut or defer...' },
  { key: 'repeat', label: 'What to Repeat?', placeholder: 'Keep this in rotation...' },
  { key: 'adjustment', label: "Next Week's Adjustment", placeholder: 'One specific change...' },
  { key: 'summary', label: 'One Sentence Summary', placeholder: 'The week in one sentence...' },
]

interface RecentReviewProps {
  entry: WeeklyReviewEntry
}

function RecentReview({ entry }: RecentReviewProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="rounded-lg border border-white/6 bg-white/3 overflow-hidden">
      <button className="w-full flex items-center justify-between px-4 py-3" onClick={() => setExpanded((e: boolean) => !e)}>
        <div className="text-left">
          <span className="font-mono text-[10px] text-slate-500">{entry.date}</span>
          <p className="font-sans text-xs text-slate-300 truncate max-w-xs">{entry.summary}</p>
        </div>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-slate-600" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-600" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2 border-t border-white/5 pt-2">
              {fields.slice(0, 4).map(f => entry[f.key] && (
                <div key={f.key}>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">{f.label}</span>
                  <p className="font-sans text-xs text-slate-400">{entry[f.key]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface Props {
  entries: WeeklyReviewEntry[]
  onSave: (entry: WeeklyReviewEntry) => void
}

export function WeeklyReview({ entries, onSave }: Props) {
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.key, '']))
  )
  const [saved, setSaved] = useState(false)
  const [showAI, setShowAI] = useState(false)

  function update(key: string, value: string) {
    setForm((prev: Record<string, string>) => ({ ...prev, [key]: value }))
  }

  const hasSummary = form['summary']?.trim()

  function handleSave() {
    if (!hasSummary) return
    onSave({
      id: `wr-${Date.now()}`,
      date: 'This week',
      wins: form.wins,
      misses: form.misses,
      heavy: form.heavy,
      momentum: form.momentum,
      reduce: form.reduce,
      repeat: form.repeat,
      adjustment: form.adjustment,
      summary: form.summary,
    })
    setForm(Object.fromEntries(fields.map(f => [f.key, ''])))
    setSaved(true)
    setShowAI(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.19 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <ClipboardList className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly Review</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-4">
        {fields.map(f => (
          <div key={f.key} className={f.key === 'summary' ? 'sm:col-span-2' : ''}>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">{f.label}</span>
            <textarea
              value={form[f.key]}
              onChange={e => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={f.key === 'summary' ? 2 : 2}
              className="w-full rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-xs text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-amber-500/25 transition-colors"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!hasSummary}
        className={cn(
          'w-full rounded-lg py-2.5 font-display text-xs font-semibold transition-all border mb-4',
          hasSummary
            ? saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-amber-500/30 bg-amber-500/15 text-amber-200 hover:bg-amber-500/25'
            : 'border-white/6 bg-white/3 text-slate-600 cursor-not-allowed'
        )}
      >
        {saved ? 'Review Saved' : 'Save Review'}
      </button>

      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-amber-500/5 border border-amber-500/15 px-4 py-3 mb-4"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500/70 block mb-1.5">AI Reflection</span>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">{weeklyReviewAIResponse}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {entries.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent Reviews</span>
          {entries.slice(0, 2).map(e => <RecentReview key={e.id} entry={e} />)}
        </div>
      )}
    </motion.div>
  )
}
