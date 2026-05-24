'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Check } from 'lucide-react'
import type { WeeklyWorkoutDay } from '@/lib/types'
import { cn } from '@/lib/utils'

const splitColors: Record<string, string> = {
  Push: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  Pull: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Legs: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Rest: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  Reset: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Upper: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Lower: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
}

interface Props {
  days: WeeklyWorkoutDay[]
  onToggleDay: (day: string) => void
}

export function WorkoutSplitPlanner({ days, onToggleDay }: Props) {
  const completedWorkouts = days.filter(d => d.completed && d.split !== 'Rest' && d.split !== 'Reset').length
  const totalWorkouts = days.filter(d => d.split !== 'Rest' && d.split !== 'Reset').length
  const cardioSessions = days.filter(d => d.cardio).length
  const completedCardio = days.filter(d => d.cardio && d.completed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.11 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-500/20">
          <Dumbbell className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Workout Split</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-emerald-400">{completedWorkouts}/{totalWorkouts} lifts</span>
          <span className="font-mono text-[10px] text-slate-500">{completedCardio}/{cardioSessions} cardio</span>
        </div>
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {days.map(day => {
          const colors = splitColors[day.split] ?? 'text-slate-400 bg-white/5 border-white/8'
          return (
            <motion.button
              key={day.day}
              onClick={() => onToggleDay(day.day)}
              whileTap={{ scale: 0.96 }}
              className={cn(
                'relative flex flex-col items-center gap-1.5 rounded-xl border px-1.5 py-3 transition-all',
                day.completed ? 'opacity-60' : 'hover:bg-white/5',
                colors
              )}
            >
              {day.completed && (
                <div className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="h-2 w-2 text-emerald-400" />
                </div>
              )}
              <span className="font-mono text-[9px] text-slate-400">{day.day}</span>
              <span className="font-mono text-[10px] font-bold">{day.split}</span>
              {day.cardio && (
                <span className="font-mono text-[8px] text-orange-400 uppercase tracking-widest">+Cardio</span>
              )}
              {day.notes && (
                <span className="font-sans text-[8px] text-slate-500 text-center leading-tight">{day.notes}</span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Cardio preset */}
      <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-0.5">Cardio Preset</span>
        <p className="font-mono text-xs text-slate-300">15% incline · 3.1 mph · 40 min</p>
      </div>
    </motion.div>
  )
}
