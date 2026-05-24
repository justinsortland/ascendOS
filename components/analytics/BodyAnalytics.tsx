'use client'

import { motion } from 'framer-motion'
import { Dumbbell, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  nutritionTrend,
  workoutFrequency,
  BODY_CONSISTENCY_SCORE,
  WEEKLY_CARDIO_MINS,
  BODY_INSIGHTS,
} from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const insightIcons = { high: AlertTriangle, medium: TrendingUp, low: Info }
const insightColors = { high: 'text-rose-400', medium: 'text-amber-400', low: 'text-slate-400' }

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2 space-y-0.5">
      <p className="font-mono text-[10px] text-slate-400">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} className="font-mono text-[11px]" style={{ color: p.dataKey === 'protein' ? '#10b981' : '#94a3b8' }}>
          {p.dataKey}: {p.value}
        </p>
      ))}
    </div>
  )
}

export function BodyAnalytics() {
  const avgProtein = Math.round(
    nutritionTrend.filter(d => d.protein > 0).reduce((s, d) => s + d.protein, 0) /
    nutritionTrend.filter(d => d.protein > 0).length
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-500/20">
          <Dumbbell className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Body Analytics</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-emerald-400">Consistency: {BODY_CONSISTENCY_SCORE}%</span>
          <span className="font-mono text-[10px] text-slate-500">{WEEKLY_CARDIO_MINS} min cardio</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Nutrition chart */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Protein (g)</span>
            <span className="font-mono text-[10px] text-emerald-400">Avg: {avgProtein}g · Target: 180g</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={nutritionTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[100, 200]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <ReferenceLine y={180} stroke="rgba(16,185,129,0.2)" strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="protein" stroke="#10b981" strokeWidth={2} dot={{ r: 2, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Workout grid */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Workout Volume</span>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {workoutFrequency.map(d => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <div className={cn(
                  'h-10 w-full rounded flex items-end justify-center pb-1',
                  d.trained ? 'bg-emerald-500/20 border border-emerald-500/20' : 'bg-white/3 border border-white/5'
                )}>
                  {d.sets > 0 && (
                    <span className="font-mono text-[8px] text-emerald-400">{d.sets}</span>
                  )}
                </div>
                <span className="font-mono text-[8px] text-slate-600">{d.day}</span>
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] text-slate-500">Sets per session</span>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2">
              <span className="font-mono text-[9px] text-slate-500 block">Lifts This Week</span>
              <span className="font-display text-lg font-bold text-white">3</span>
            </div>
            <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2">
              <span className="font-mono text-[9px] text-slate-500 block">Cardio Sessions</span>
              <span className="font-display text-lg font-bold text-emerald-400">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4 space-y-2">
        {BODY_INSIGHTS.map(insight => {
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
