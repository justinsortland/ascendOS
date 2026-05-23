'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface Props {
  score: number
  streakDays: number
}

function getScoreColor(score: number) {
  if (score >= 80) return { ring: '#10b981', label: 'Locked In', glow: 'shadow-emerald-500/20' }
  if (score >= 60) return { ring: '#f59e0b', label: 'On Track', glow: 'shadow-amber-500/20' }
  if (score >= 40) return { ring: '#f97316', label: 'Grinding', glow: 'shadow-orange-500/20' }
  return { ring: '#ef4444', label: 'Restart', glow: 'shadow-red-500/20' }
}

export function MomentumScoreCard({ score, streakDays }: Props) {
  const { ring, label, glow } = getScoreColor(score)
  const circumference = 2 * Math.PI * 36
  const dash = (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={`rounded-xl border border-white/8 bg-[#0d0d1a] p-5 shadow-xl ${glow}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
            Momentum
          </p>
          <p className="font-display text-sm font-bold text-white mt-0.5">{label}</p>
        </div>
        <TrendingUp className="h-4 w-4 text-slate-500" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
            <circle cx="44" cy="44" r="36" stroke="white" strokeOpacity="0.05" strokeWidth="6" fill="none" />
            <motion.circle
              cx="44"
              cy="44"
              r="36"
              stroke={ring}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl font-black text-white leading-none">{score}</span>
            <span className="font-mono text-[9px] text-slate-500 font-medium">/ 100</span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">Streak</p>
            <p className="font-mono text-lg font-black text-white leading-none">
              {streakDays}
              <span className="text-xs font-normal text-slate-400 ml-1">days</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">Today</p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: i < (score / 100) * 7 ? ring : 'rgba(255,255,255,0.08)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
