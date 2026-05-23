'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Play, CheckCircle2, RotateCcw, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CardioSession } from '@/lib/types'
import { cardioPreset } from '@/lib/body-mock-data'
import { cn } from '@/lib/utils'

export function CardioTracker() {
  const [session, setSession] = useState<CardioSession>({
    id: 'cs1',
    ...cardioPreset,
    completed: false,
  })
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    durationMins: String(cardioPreset.durationMins),
    incline: String(cardioPreset.incline ?? ''),
    speedMph: String(cardioPreset.speedMph ?? ''),
  })

  function usePreset() {
    setSession(s => ({
      ...s,
      type: cardioPreset.type,
      durationMins: cardioPreset.durationMins,
      incline: cardioPreset.incline,
      speedMph: cardioPreset.speedMph,
      distanceMi: cardioPreset.distanceMi,
      estimatedCalories: cardioPreset.estimatedCalories,
    }))
    setDraft({
      durationMins: String(cardioPreset.durationMins),
      incline: String(cardioPreset.incline ?? ''),
      speedMph: String(cardioPreset.speedMph ?? ''),
    })
  }

  function handleSaveDraft() {
    const dur = Number(draft.durationMins) || 0
    const inc = Number(draft.incline) || 0
    const spd = Number(draft.speedMph) || 0
    // rough estimate: MET-based for incline walk
    const met = 3 + inc * 0.15 + spd * 0.5
    const calBurn = Math.round(met * 75 * (dur / 60))
    setSession(s => ({
      ...s,
      durationMins: dur,
      incline: inc,
      speedMph: spd,
      distanceMi: parseFloat(((spd * dur) / 60).toFixed(1)),
      estimatedCalories: calBurn,
    }))
    setEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Activity className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white">Cardio</h3>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">{session.type}</p>
          </div>
        </div>
        {session.completed ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full"
          >
            DONE
          </motion.span>
        ) : (
          <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            PLANNED
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Duration', value: `${session.durationMins} min`, color: 'text-white' },
          { label: 'Incline', value: `${session.incline ?? '—'}%`, color: 'text-amber-400' },
          { label: 'Speed', value: `${session.speedMph ?? '—'} mph`, color: 'text-cyan-400' },
          { label: 'Distance', value: `${session.distanceMi ?? '—'} mi`, color: 'text-slate-300' },
        ].map(s => (
          <div key={s.label} className="rounded-lg bg-white/5 border border-white/6 p-2 text-center">
            <p className={`font-mono text-sm font-bold ${s.color}`}>{s.value}</p>
            <p className="font-mono text-[9px] text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Calories estimate */}
      <div className="flex items-center gap-2 mb-4 rounded-lg bg-orange-500/8 border border-orange-500/15 px-3 py-2">
        <Flame className="h-3.5 w-3.5 text-orange-400" />
        <span className="font-mono text-xs font-bold text-orange-400">~{session.estimatedCalories} kcal</span>
        <span className="font-mono text-[10px] text-slate-500">estimated burn</span>
      </div>

      {/* Edit form */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-3"
          >
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="font-mono text-[10px] text-slate-500 mb-1 block">Duration (min)</label>
                <Input value={draft.durationMins} onChange={e => setDraft(d => ({ ...d, durationMins: e.target.value }))} className="bg-white/5 border-white/10 text-white text-sm h-8" type="number" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-slate-500 mb-1 block">Incline (%)</label>
                <Input value={draft.incline} onChange={e => setDraft(d => ({ ...d, incline: e.target.value }))} className="bg-white/5 border-white/10 text-white text-sm h-8" type="number" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-slate-500 mb-1 block">Speed (mph)</label>
                <Input value={draft.speedMph} onChange={e => setDraft(d => ({ ...d, speedMph: e.target.value }))} className="bg-white/5 border-white/10 text-white text-sm h-8" type="number" step="0.1" />
              </div>
            </div>
            <Button size="sm" onClick={handleSaveDraft} className="w-full h-7 text-[10px] bg-white/10 hover:bg-white/15 text-white border-0">
              Save
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-2">
        {!session.completed ? (
          <>
            <Button
              size="sm"
              onClick={() => setSession(s => ({ ...s, completed: true }))}
              className="flex-1 h-8 text-xs bg-amber-600/80 hover:bg-amber-600 text-white border-0"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />Mark Complete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={usePreset}
              className="h-8 text-xs border-white/10 text-slate-400 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />Preset
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(e => !e)}
              className="h-8 text-xs border-white/10 text-slate-400 hover:text-white"
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSession(s => ({ ...s, completed: false }))}
            className="text-xs text-slate-500 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />Undo
          </Button>
        )}
      </div>
    </motion.div>
  )
}
