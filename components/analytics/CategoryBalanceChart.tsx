'use client'

import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { categoryXP } from '@/lib/analytics-mock-data'

const catData = [
  { name: 'Body', xp: categoryXP.body, color: '#10b981' },
  { name: 'Brain', xp: categoryXP.brain, color: '#06b6d4' },
  { name: 'Spirit', xp: categoryXP.spirit, color: '#8b5cf6' },
  { name: 'Execution', xp: categoryXP.execution, color: '#f59e0b' },
]

const total = catData.reduce((s, d) => s + d.xp, 0)

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; name: string }[] }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f0f1e] px-3 py-2">
      <p className="font-mono text-[10px] text-slate-400">{payload[0].name}</p>
      <p className="font-display text-sm font-bold text-white">{payload[0].value.toLocaleString()} XP</p>
    </div>
  )
}

export function CategoryBalanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <LayoutGrid className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Category Balance</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{total.toLocaleString()} total XP</span>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={catData} barCategoryGap="30%" margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: '#475569', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
            {catData.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.85} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Breakdown */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {catData.map(d => (
          <div key={d.name} className="text-center">
            <div className="font-mono text-[11px] font-bold" style={{ color: d.color }}>
              {Math.round((d.xp / total) * 100)}%
            </div>
            <div className="font-mono text-[9px] text-slate-500">{d.name}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
