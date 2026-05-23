'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, StickyNote } from 'lucide-react'
import type { ExercisePlan, GymSet } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  exercise: ExercisePlan
  onSetToggle: (exerciseId: string, setId: string) => void
  index: number
}

export function ExerciseRow({ exercise, onSetToggle, index }: Props) {
  const [expanded, setExpanded] = useState(index < 2) // first 2 open by default
  const done = exercise.sets.filter(s => s.completed).length
  const total = exercise.sets.length
  const allDone = done === total

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
      className={cn(
        'rounded-lg border transition-colors',
        allDone ? 'border-emerald-500/20 bg-emerald-950/20' : 'border-white/6 bg-white/3'
      )}
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex w-full items-center justify-between px-4 py-2.5 gap-3"
      >
        <div className="flex items-center gap-3">
          {allDone ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          ) : (
            <div className="h-4 w-4 flex items-center justify-center flex-shrink-0">
              <span className="font-mono text-[10px] text-slate-600 font-bold">{done}/{total}</span>
            </div>
          )}
          <span className={cn('font-display text-sm font-semibold', allDone ? 'text-slate-400' : 'text-white')}>
            {exercise.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-500">
            {total} × {exercise.sets[0]?.reps}
            {exercise.sets[0]?.weight !== 'BW' ? ` @ ${exercise.sets[0]?.weight}` : ''}
          </span>
          {exercise.notes && <StickyNote className="h-3 w-3 text-slate-600" />}
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-600" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
          )}
        </div>
      </button>

      {/* Set rows */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-4 pb-3 pt-2 space-y-1">
              {exercise.sets.map((set, i) => (
                <SetRow key={set.id} set={set} setIndex={i} onToggle={() => onSetToggle(exercise.id, set.id)} />
              ))}
              {exercise.notes && (
                <p className="font-sans text-[11px] text-slate-500 mt-2 pl-1 italic">{exercise.notes}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SetRow({ set, setIndex, onToggle }: { set: GymSet; setIndex: number; onToggle: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-3 rounded px-2 py-1.5 text-left transition-colors',
        set.completed ? 'opacity-50' : 'hover:bg-white/5'
      )}
    >
      {set.completed ? (
        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
      ) : (
        <Circle className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
      )}
      <span className="font-mono text-[11px] text-slate-400 w-12">Set {setIndex + 1}</span>
      <span className={cn('font-mono text-xs flex-1', set.completed ? 'line-through text-slate-600' : 'text-white')}>
        {set.reps} reps
        {set.weight !== 'BW' ? ` @ ${set.weight}` : ' — bodyweight'}
      </span>
    </motion.button>
  )
}
