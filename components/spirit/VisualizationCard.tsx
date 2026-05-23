'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Focus, RefreshCw, CheckCircle2 } from 'lucide-react'
import { desiredStates, visualizationPrompts, initialVisualizationSessions } from '@/lib/spirit-mock-data'
import type { VisualizationSession } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  sessions: VisualizationSession[]
  onSave: (session: VisualizationSession) => void
}

export function VisualizationCard({ sessions, onSave }: Props) {
  const [selectedState, setSelectedState] = useState(desiredStates[0])
  const [script, setScript] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  function nextPrompt() {
    setPromptIdx(i => (i + 1) % visualizationPrompts.length)
  }

  function handleSave() {
    onSave({
      id: `v-${Date.now()}`,
      date: 'Just now',
      desiredState: selectedState,
      script: script.trim() || undefined,
      completed,
      durationMins: 5,
      notes: notes.trim() || undefined,
    })
    setScript(''); setNotes(''); setCompleted(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.14 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/15 border border-purple-500/20">
          <Focus className="h-3.5 w-3.5 text-purple-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">SATS / Visualization</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">identity rehearsal</span>
      </div>

      {/* Desired state selector */}
      <div className="mb-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Desired State</span>
        <div className="flex flex-wrap gap-1.5">
          {desiredStates.map(state => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={cn(
                'rounded-lg px-3 py-1.5 font-display text-xs font-medium transition-all border',
                selectedState === state
                  ? 'border-purple-500/35 bg-purple-500/15 text-purple-200'
                  : 'border-white/6 bg-white/3 text-slate-400 hover:text-slate-200'
              )}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="rounded-lg bg-purple-500/5 border border-purple-500/15 px-4 py-3 mb-3 flex items-start justify-between gap-3">
        <p className="font-sans text-xs text-purple-200/80 leading-relaxed italic flex-1">
          {visualizationPrompts[promptIdx]}
        </p>
        <button onClick={nextPrompt} className="flex-shrink-0 text-purple-500 hover:text-purple-300 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Script */}
      <textarea
        value={script}
        onChange={e => setScript(e.target.value)}
        placeholder="Write your visualization script, or just note the feeling you want to hold..."
        rows={3}
        className="w-full rounded-lg bg-white/4 border border-white/8 px-4 py-3 font-sans text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-purple-500/30 transition-colors mb-3"
      />

      {/* Notes */}
      <input
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Session notes..."
        className="w-full rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/30 transition-colors mb-3"
      />

      {/* Completed toggle + save */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCompleted(c => !c)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-all border',
            completed
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {completed ? 'Session Done' : 'Mark Complete'}
        </button>
        <button
          onClick={handleSave}
          className={cn(
            'flex-1 rounded-lg py-2 font-display text-xs font-semibold transition-all border',
            saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-purple-500/30 bg-purple-500/12 text-purple-200 hover:bg-purple-500/22'
          )}
        >
          {saved ? 'Saved' : 'Save Session'}
        </button>
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <div className="mt-4 space-y-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent</span>
          {sessions.slice(0, 3).map(sess => (
            <div key={sess.id} className="flex items-center justify-between rounded-lg bg-white/3 border border-white/5 px-3 py-2">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[10px] text-slate-500 flex-shrink-0">{sess.date}</span>
                <span className="font-display text-xs text-slate-300 truncate">{sess.desiredState}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono text-[10px] text-purple-400">{sess.durationMins} min</span>
                {sess.completed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
