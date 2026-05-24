'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Loader2 } from 'lucide-react'
import { weeklyAIResponses } from '@/lib/weekly-mock-data'

const actions = [
  { key: 'weekly-plan', label: 'Generate Weekly Plan' },
  { key: 'meal-prep', label: 'Meal Prep Plan' },
  { key: 'workout-split', label: 'Workout Split' },
  { key: 'tech-schedule', label: 'Technical Schedule' },
  { key: 'lang-schedule', label: 'Language Schedule' },
  { key: 'review-last-week', label: 'Review Last Week' },
  { key: 'mvw', label: 'Minimum Viable Week' },
  { key: 'rebalance', label: 'Rebalance Week' },
] as const

type ActionKey = typeof actions[number]['key']

export function WeeklyAIStrategistPanel() {
  const [activeKey, setActiveKey] = useState<ActionKey | null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ title: string; body: string } | null>(null)

  function handleAction(key: ActionKey) {
    if (loading) return
    setActiveKey(key)
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(weeklyAIResponses[key])
      setLoading(false)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.21 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <Bot className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly AI Strategist</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">AscendOS · Claude</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {actions.map(action => (
          <button
            key={action.key}
            onClick={() => handleAction(action.key)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
              activeKey === action.key && !loading
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                : 'border-white/8 bg-white/4 text-slate-400 hover:bg-white/8 hover:text-slate-200'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="min-h-[80px] rounded-lg border border-white/6 bg-white/3 p-4">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
              <span className="font-mono text-[11px] text-slate-500">Processing...</span>
            </motion.div>
          )}
          {!loading && response && (
            <motion.div key="response" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h4 className="font-display text-xs font-bold text-amber-300 mb-2">{response.title}</h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">{response.body}</p>
            </motion.div>
          )}
          {!loading && !response && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full">
              <p className="font-mono text-[11px] text-slate-600">Select an action above</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
