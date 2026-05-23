'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import type { UserStats } from '@/lib/types'

interface Props {
  stats: UserStats
}

export function XPLevelCard({ stats }: Props) {
  const xpPct = Math.round((stats.xp / stats.xpToNextLevel) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
            Level
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-mono text-2xl font-black text-white">{stats.level}</span>
            <span className="font-display text-xs font-semibold text-slate-400">{stats.rank}</span>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between font-mono text-[10px] text-slate-500">
          <span>{stats.xp.toLocaleString()} XP</span>
          <span>{stats.xpToNextLevel.toLocaleString()} to next</span>
        </div>
        <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
            initial={{ width: '0%' }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
