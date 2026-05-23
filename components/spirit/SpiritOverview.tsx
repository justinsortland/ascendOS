'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  spiritScore: number
  spiritXp: number
  reflectionMode: string
  meditationStreak: number
  gratitudeStreak: number
  dreamRecallScore: number
  lucidPracticeThisWeek: number
  visualizationThisWeek: number
}

function ScoreRing({ score }: { score: number }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - score / 100)
  return (
    <div className="relative flex items-center justify-center">
      <svg width={108} height={108} className="-rotate-90">
        <circle cx={54} cy={54} r={r} fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth={7} />
        <motion.circle
          cx={54} cy={54} r={r}
          fill="none"
          stroke="rgb(139,92,246)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-bold text-white leading-none">{score}</span>
        <span className="font-mono text-[9px] text-violet-400 uppercase tracking-widest mt-0.5">Spirit</span>
      </div>
    </div>
  )
}

interface StatTileProps {
  label: string
  value: string | number
  sub?: string
  accent?: string
  pct?: number
}

function StatTile({ label, value, sub, accent = 'text-white', pct }: StatTileProps) {
  return (
    <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2.5 flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</span>
      <span className={cn('font-display text-lg font-bold leading-none', accent)}>{value}</span>
      {pct !== undefined && (
        <div className="h-1 rounded-full bg-white/5 overflow-hidden mt-0.5">
          <motion.div
            className="h-full rounded-full bg-violet-500/60"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
          />
        </div>
      )}
      {sub && !pct && <span className="font-mono text-[10px] text-slate-500">{sub}</span>}
    </div>
  )
}

export function SpiritOverview({
  spiritScore, spiritXp, reflectionMode,
  meditationStreak, gratitudeStreak, dreamRecallScore,
  lucidPracticeThisWeek, visualizationThisWeek,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
      style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #0e0b1a 100%)' }}
    >
      <div className="flex items-start gap-6">
        <ScoreRing score={spiritScore} />
        <div className="flex-1 grid grid-cols-3 gap-2 lg:grid-cols-6">
          <StatTile label="Spirit XP" value={spiritXp.toLocaleString()} sub="earned" accent="text-violet-400" />
          <StatTile label="Meditation" value={`${meditationStreak}d`} sub="streak" accent="text-violet-300" />
          <StatTile label="Gratitude" value={`${gratitudeStreak}d`} sub="streak" accent="text-white" />
          <StatTile label="Dream Recall" value={`${dreamRecallScore}/10`} pct={dreamRecallScore * 10} accent="text-white" />
          <StatTile label="Lucid Practice" value={`${lucidPracticeThisWeek}/7`} pct={(lucidPracticeThisWeek / 7) * 100} accent="text-white" />
          <StatTile label="Visualization" value={`${visualizationThisWeek}/5`} pct={(visualizationThisWeek / 5) * 100} accent="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-violet-400/70" />
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Mode</span>
        <span className="font-display text-xs font-semibold text-violet-300">{reflectionMode}</span>
        <div className="flex-1 flex items-center gap-2 ml-4">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${((spiritXp % 1000) / 1000) * 100}%` }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.6 }}
            />
          </div>
          <span className="font-mono text-[10px] text-slate-500">{spiritXp % 1000}/1000 XP</span>
        </div>
      </div>
    </motion.div>
  )
}
