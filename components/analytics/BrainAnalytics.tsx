'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import {
  studyMinutes, lcByDifficulty,
  LEET_SOLVED_WEEK, LEET_REVISIT_QUEUE, PROJECT_SHIP_STREAK,
  POMODOROS_WEEK, LANGUAGE_MINS_WEEK, READING_PAGES_WEEK,
  BRAIN_INSIGHTS,
} from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const insightIcons = { high: AlertTriangle, medium: TrendingUp, low: Info }
const insightColors = { high: 'text-rose-400', medium: 'text-amber-400', low: 'text-slate-400' }

const StudyTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2">
      <p className="font-mono text-[10px] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold text-white">{payload[0].value} min</p>
    </div>
  )
}

export function BrainAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.14 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Brain Analytics</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-cyan-400">{LEET_SOLVED_WEEK} LC solved</span>
          <span className="font-mono text-[10px] text-slate-500">{PROJECT_SHIP_STREAK}d ship streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Study minutes by track */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Study Minutes by Track</span>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={studyMinutes} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="track" tick={{ fontSize: 9, fill: '#94a3b8', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<StudyTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar dataKey="minutes" radius={[0, 3, 3, 0]}>
                {studyMinutes.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LC difficulty + stats */}
        <div className="space-y-3">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">LC by Difficulty</span>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={lcByDifficulty} barCategoryGap="30%" margin={{ top: 0, right: 4, left: -24, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<StudyTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {lcByDifficulty.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Revisit Queue', value: LEET_REVISIT_QUEUE, color: 'text-rose-400' },
              { label: 'Pomodoros', value: POMODOROS_WEEK, color: 'text-white' },
              { label: 'Language Min', value: LANGUAGE_MINS_WEEK, color: 'text-cyan-400' },
              { label: 'Pages Read', value: READING_PAGES_WEEK, color: 'text-white' },
            ].map(stat => (
              <div key={stat.label} className="rounded-lg bg-white/3 border border-white/5 px-2 py-2">
                <span className="font-mono text-[9px] text-slate-500 block">{stat.label}</span>
                <span className={cn('font-display text-base font-bold', stat.color)}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {BRAIN_INSIGHTS.map(insight => {
          const Icon = insightIcons[insight.priority]
          return (
            <div key={insight.id} className="flex items-start gap-2 rounded-lg bg-white/3 border border-white/5 px-3 py-2">
              <Icon className={cn('h-3.5 w-3.5 flex-shrink-0 mt-0.5', insightColors[insight.priority])} />
              <p className="font-sans text-xs text-slate-400 leading-relaxed">{insight.message}</p>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
