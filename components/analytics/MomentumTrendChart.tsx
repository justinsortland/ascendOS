'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { momentumTrend } from '@/lib/analytics-mock-data'

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2">
      <p className="font-mono text-[10px] text-slate-400">{label}</p>
      <p className="font-display text-sm font-bold text-white">{payload[0].value}</p>
    </div>
  )
}

export function MomentumTrendChart() {
  const avg = Math.round(momentumTrend.reduce((s, d) => s + d.score, 0) / momentumTrend.length)
  const max = Math.max(...momentumTrend.map(d => d.score))
  const maxDay = momentumTrend.find(d => d.score === max)?.day

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Momentum Trend</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500">Avg: {avg}</span>
          <span className="font-mono text-[10px] text-cyan-400">Peak: {max} ({maxDay})</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={momentumTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            domain={[40, 100]}
            tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <ReferenceLine y={avg} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ fill: '#06b6d4', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: '#06b6d4' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
