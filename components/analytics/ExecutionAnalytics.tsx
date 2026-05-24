'use client'

import { motion } from 'framer-motion'
import { Zap, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import {
  pomodoroByDay, tierCompletion,
  DEEP_WORK_HOURS, TASK_COMPLETION_RATE, MVD_COMPLETION, BONUS_QUESTS,
  EXECUTION_INSIGHTS,
} from '@/lib/analytics-mock-data'
import { cn } from '@/lib/utils'

const insightIcons = { high: AlertTriangle, medium: TrendingUp, low: Info }
const insightColors = { high: 'text-rose-400', medium: 'text-amber-400', low: 'text-slate-400' }

const PomodoroTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2">
      <p className="font-mono text-[10px] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold text-amber-300">{payload[0].value} sessions</p>
    </div>
  )
}

export function ExecutionAnalytics() {
  const totalPomodoros = pomodoroByDay.reduce((s, d) => s + d.count, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Execution Analytics</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-amber-400">{totalPomodoros} Pomodoros</span>
          <span className="font-mono text-[10px] text-slate-500">{DEEP_WORK_HOURS}h deep work</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Pomodoro by day */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Pomodoros by Day</span>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={pomodoroByDay} barCategoryGap="30%" margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<PomodoroTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {pomodoroByDay.map((d, i) => (
                  <Cell key={i} fill={d.count >= 5 ? '#10b981' : d.count >= 3 ? '#f59e0b' : '#475569'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tier completion + stats */}
        <div className="space-y-3">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Completion by Tier</span>
            <div className="space-y-2">
              {tierCompletion.map(tier => (
                <div key={tier.tier}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-sans text-xs text-slate-400">{tier.tier}</span>
                    <span className="font-mono text-[10px] text-slate-400">{tier.completed}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tier.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${tier.completed}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Task Completion', value: `${TASK_COMPLETION_RATE}%`, color: 'text-white' },
              { label: 'MVD Days', value: `${MVD_COMPLETION}/7`, color: 'text-amber-400' },
              { label: 'Deep Work', value: `${DEEP_WORK_HOURS}h`, color: 'text-white' },
              { label: 'Bonus Quests', value: BONUS_QUESTS, color: 'text-white' },
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
        {EXECUTION_INSIGHTS.map(insight => {
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
