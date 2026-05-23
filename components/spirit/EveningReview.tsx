'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sunset, ChevronDown, ChevronUp } from 'lucide-react'
import { aiReflectionMock } from '@/lib/spirit-mock-data'
import type { EveningReviewEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

const fields: { key: keyof Omit<EveningReviewEntry, 'id' | 'date'>; label: string; placeholder: string }[] = [
  { key: 'wentWell', label: 'What went well?', placeholder: 'Even one thing counts...' },
  { key: 'feltHeavy', label: 'What felt heavy?', placeholder: 'Honest, not dramatic...' },
  { key: 'avoided', label: 'What did I avoid?', placeholder: 'The thing you kept pushing back...' },
  { key: 'toRepair', label: 'What to repair tomorrow?', placeholder: 'One specific fix...' },
  { key: 'proudOf', label: 'What am I proud of?', placeholder: 'No disclaimers...' },
  { key: 'anchorTask', label: "Tomorrow's anchor task", placeholder: 'The one thing that defines tomorrow...' },
]

interface RecentReviewProps {
  entry: EveningReviewEntry
}

function RecentReview({ entry }: RecentReviewProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="rounded-lg border border-white/6 bg-white/3 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="text-left">
          <span className="font-mono text-[10px] text-slate-500 block">{entry.date}</span>
          <p className="font-sans text-xs text-slate-300 truncate max-w-xs">{entry.anchorTask}</p>
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
              {fields.map(f => entry[f.key] && (
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
  entries: EveningReviewEntry[]
  onSave: (entry: EveningReviewEntry) => void
}

type FormState = Record<string, string>

export function EveningReview({ entries, onSave }: Props) {
  const [form, setForm] = useState<FormState>(
    Object.fromEntries(fields.map(f => [f.key, '']))
  )
  const [saved, setSaved] = useState(false)
  const [showReflection, setShowReflection] = useState(false)

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const hasAnchor = form['anchorTask']?.trim()
  const filledCount = fields.filter(f => form[f.key]?.trim()).length

  function handleSave() {
    if (!hasAnchor) return
    onSave({
      id: `er-${Date.now()}`,
      date: 'Just now',
      wentWell: form.wentWell,
      feltHeavy: form.feltHeavy,
      avoided: form.avoided,
      toRepair: form.toRepair,
      proudOf: form.proudOf,
      anchorTask: form.anchorTask,
    })
    setForm(Object.fromEntries(fields.map(f => [f.key, ''])))
    setSaved(true)
    setShowReflection(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Sunset className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Evening Review</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{filledCount}/{fields.length} fields</span>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-4">
        {fields.map(f => (
          <div key={f.key}>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">{f.label}</span>
            <textarea
              value={form[f.key]}
              onChange={e => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={f.key === 'anchorTask' ? 1 : 2}
              className="w-full rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-xs text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-violet-500/30 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={!hasAnchor}
        className={cn(
          'w-full rounded-lg py-2.5 font-display text-xs font-semibold transition-all border mb-4',
          hasAnchor
            ? saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-violet-500/30 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25'
            : 'border-white/6 bg-white/3 text-slate-600 cursor-not-allowed'
        )}
      >
        {saved ? 'Review Saved' : 'Save Evening Review'}
      </button>

      {/* AI reflection */}
      <AnimatePresence>
        {showReflection && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-lg bg-violet-500/6 border border-violet-500/15 px-4 py-3 mb-4"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-violet-500 block mb-1.5">AI Reflection</span>
            <p className="font-sans text-xs text-violet-200/80 leading-relaxed">{aiReflectionMock}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent reviews */}
      {entries.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent</span>
          {entries.slice(0, 2).map(e => <RecentReview key={e.id} entry={e} />)}
        </div>
      )}
    </motion.div>
  )
}
