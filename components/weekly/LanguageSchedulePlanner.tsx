'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import {
  langConversationThemes,
  langDayStatus,
  LANG_DAILY_MIN,
  LANG_WEEKLY_TARGET,
  LANG_WEEKLY_COMPLETED,
} from '@/lib/weekly-mock-data'
import { cn } from '@/lib/utils'

export function LanguageSchedulePlanner() {
  const [days, setDays] = useState(langDayStatus)
  const totalMins = days.reduce((s, d) => s + d.durationMins, 0)
  const weeklyPct = Math.min((totalMins / LANG_WEEKLY_TARGET) * 100, 100)

  function toggleDay(day: string) {
    setDays(prev => prev.map(d =>
      d.day === day
        ? { ...d, completed: !d.completed, durationMins: d.completed ? 0 : LANG_DAILY_MIN }
        : d
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Language Schedule</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-cyan-400">{totalMins} min</span>
          <span className="font-mono text-[10px] text-slate-500">target: {LANG_WEEKLY_TARGET}</span>
        </div>
      </div>

      {/* Weekly progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Weekly Progress</span>
          <span className="font-mono text-[10px] text-cyan-400">{Math.round(weeklyPct)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            animate={{ width: `${weeklyPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {days.map(d => (
          <button
            key={d.day}
            onClick={() => toggleDay(d.day)}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-xl border px-1 py-3 transition-all',
              d.completed
                ? 'border-cyan-500/25 bg-cyan-500/10'
                : 'border-white/6 bg-white/3 hover:bg-white/5'
            )}
          >
            <span className="font-mono text-[9px] text-slate-500">{d.day}</span>
            {d.completed
              ? <Check className="h-4 w-4 text-cyan-400" />
              : <div className="h-4 w-4 rounded-full border border-white/15" />
            }
            <span className={cn('font-mono text-[9px]', d.completed ? 'text-cyan-400' : 'text-slate-600')}>
              {d.durationMins > 0 ? `${d.durationMins}m` : '--'}
            </span>
          </button>
        ))}
      </div>

      {/* Targets */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Daily Minimum</span>
          <span className="font-display text-sm font-bold text-white">{LANG_DAILY_MIN} min</span>
        </div>
        <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Deep Block (Sat)</span>
          <span className="font-display text-sm font-bold text-white">45 min</span>
        </div>
      </div>

      {/* Conversation themes */}
      <div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Conversation Themes</span>
        <div className="space-y-1">
          {langConversationThemes.map((theme, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-slate-600">{i + 1}.</span>
              <span className="font-sans text-xs text-slate-400">{theme}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
