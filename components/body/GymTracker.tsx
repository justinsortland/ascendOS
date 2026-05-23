'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, CheckCircle2, Flame, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { ExerciseRow } from './ExerciseRow'
import type { WorkoutSession, ExercisePlan } from '@/lib/types'
import { weeklyDays } from '@/lib/body-mock-data'
import { cn } from '@/lib/utils'

const splitColors: Record<string, string> = {
  push: '#f59e0b',
  pull: '#06b6d4',
  legs: '#10b981',
  rest: '#475569',
  upper: '#8b5cf6',
  lower: '#f97316',
}

interface Props {
  workout: WorkoutSession
  onWorkoutChange: (w: WorkoutSession) => void
}

export function GymTracker({ workout, onWorkoutChange }: Props) {
  const [showChart, setShowChart] = useState(false)

  const totalSets = workout.exercises.reduce((s, e) => s + e.sets.length, 0)
  const doneSets = workout.exercises.reduce((s, e) => s + e.sets.filter(st => st.completed).length, 0)
  const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0
  const allDone = doneSets === totalSets && totalSets > 0

  function handleSetToggle(exerciseId: string, setId: string) {
    const updated: WorkoutSession = {
      ...workout,
      exercises: workout.exercises.map((ex): ExercisePlan =>
        ex.id !== exerciseId ? ex : {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s),
        }
      ),
    }
    onWorkoutChange(updated)
  }

  function handleCompleteWorkout() {
    const completed: WorkoutSession = {
      ...workout,
      completed: true,
      exercises: workout.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(s => ({ ...s, completed: true })),
      })),
    }
    onWorkoutChange(completed)
  }

  const splitColor = splitColors[workout.split] ?? '#94a3b8'
  const chartData = weeklyDays.map(d => ({ ...d, fill: d.trained ? splitColor : '#1e293b' }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.16 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Dumbbell className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-white">{workout.name}</h3>
              <span
                className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase"
                style={{ color: splitColor, borderColor: `${splitColor}40`, backgroundColor: `${splitColor}15` }}
              >
                {workout.split}
              </span>
              {workout.completed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full"
                >
                  DONE
                </motion.span>
              )}
            </div>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">
              {doneSets}/{totalSets} sets · ~{workout.estimatedCalories} kcal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChart(c => !c)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <BarChart2 className="h-4 w-4" />
          </button>
          {!workout.completed && (
            <Button
              size="sm"
              onClick={handleCompleteWorkout}
              disabled={allDone}
              className="h-7 text-[10px] bg-cyan-600/80 hover:bg-cyan-600 text-white border-0"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complete
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1.5">
          <span className="font-mono text-[10px] text-slate-500">Workout progress</span>
          <span className="font-mono text-[10px] font-bold" style={{ color: splitColor }}>{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: splitColor }}
            initial={{ width: '0%' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Weekly chart */}
      {showChart && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 overflow-hidden"
        >
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wide mb-2">Weekly Volume</p>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={20}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 11, fontFamily: 'var(--font-mono)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  formatter={(v) => [`${v} sets`, 'Sets']}
                />
                <Bar dataKey="sets" radius={[3, 3, 0, 0]}>
                  {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Exercises */}
      <div className="space-y-2">
        {workout.exercises.map((ex, i) => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            onSetToggle={handleSetToggle}
            index={i}
          />
        ))}
      </div>

      {/* Calories estimate footer */}
      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/5">
        <Flame className="h-3.5 w-3.5 text-orange-400" />
        <span className="font-mono text-[11px] text-slate-500">
          Est. {workout.completed ? workout.estimatedCalories : Math.round(workout.estimatedCalories * (pct / 100))} kcal burned
          {!workout.completed && <span className="text-slate-600"> ({pct}% complete)</span>}
        </span>
      </div>
    </motion.div>
  )
}
