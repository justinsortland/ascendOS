'use client'

import { motion } from 'framer-motion'
import { Sparkles, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { moodTrend, spiritHabitData, SPIRIT_INSIGHTS } from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const moodLabels: Record<number, string> = { 1: 'Low', 2: 'Neutral', 3: 'Good', 4: 'Great' }
const moodColors: Record<number, string> = { 1: '#f43f5e', 2: '#64748b', 3: '#06b6d4', 4: '#10b981' }
const insightIcons = { high: AlertTriangle, medium: TrendingUp, low: Info }
const insightColors = { high: 'text-rose-400', medium: 'text-amber-400', low: 'text-slate-400' }

const MoodTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  const v = payload[0].value
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2">
      <p className="font-mono text-[10px] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold" style={{ color: moodColors[v] }}>{moodLabels[v]}</p>
    </div>
  )
}

export function SpiritAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.16 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Spirit Analytics</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Mood trend */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Mood Trend</span>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={moodTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 4]} ticks={[1, 2, 3, 4]} tick={{ fontSize: 8, fill: '#475569' }} axisLine={false} tickLine={false} />
              <Tooltip content={<MoodTooltip />} />
              <Line
                type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props
                  return <circle key={payload.day} cx={cx} cy={cy} r={3} fill={moodColors[payload.mood] ?? '#8b5cf6'} />
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Habit completion */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Habit Completion</span>
          <div className="space-y-2">
            {spiritHabitData.map(h => {
              const pct = Math.round((h.completed / h.target) * 100)
              const barColor = pct >= 80 ? '#10b981' : pct >= 50 ? '#8b5cf6' : '#f43f5e'
              return (
                <div key={h.habit}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-sans text-xs text-slate-400">{h.habit}</span>
                    <span className="font-mono text-[10px] text-slate-500">{h.completed}/{h.target}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {SPIRIT_INSIGHTS.map(insight => {
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
