'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Droplets, Zap, Flame, Activity, TrendingUp } from 'lucide-react'
import type { BodyMeal, MacroTargets, BodyMode, MorningHabit } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  meals: BodyMeal[]
  waterOz: number
  targets: MacroTargets
  mode: BodyMode
  habits: MorningHabit[]
  workoutCompleted: boolean
  cardioCompleted: boolean
  workoutName: string
}

const modeConfig: Record<BodyMode, { label: string; color: string; bg: string; border: string }> = {
  cut: { label: 'CUT', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  bulk: { label: 'BULK', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  maintenance: { label: 'MAINTAIN', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' },
}

interface StatTileProps {
  label: string
  value: string
  sub?: string
  pct: number
  icon: React.ElementType
  color: string
  index: number
}

function StatTile({ label, value, sub, pct, icon: Icon, color, index }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      className="flex flex-col gap-2 rounded-lg border border-white/8 bg-white/3 px-3 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={`h-3.5 w-3.5 ${color}`} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
        </div>
        <span className={`font-mono text-[10px] font-semibold ${color}`}>{Math.round(pct)}%</span>
      </div>
      <div>
        <span className="font-mono text-base font-bold text-white leading-none">{value}</span>
        {sub && <span className="font-mono text-[10px] text-slate-500 ml-1.5">{sub}</span>}
      </div>
      <div className="h-0.5 w-full rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: pct >= 90 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#94a3b8' }}
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + 0.04 * index }}
        />
      </div>
    </motion.div>
  )
}

export function BodyOverview({
  meals, waterOz, targets, mode, habits, workoutCompleted, cardioCompleted, workoutName,
}: Props) {
  const cal = meals.reduce((s, m) => s + m.calories, 0)
  const prot = meals.reduce((s, m) => s + m.protein, 0)
  const routineDone = habits.filter(h => h.completed).length
  const routineTotal = habits.length
  const modeC = modeConfig[mode]

  // Body score: weighted across 4 pillars
  const calScore = Math.min((cal / targets.calories) * 100, 100)
  const protScore = Math.min((prot / targets.protein) * 100, 100)
  const waterScore = Math.min((waterOz / targets.waterOz) * 100, 100)
  const workoutScore = workoutCompleted ? 100 : 0
  const routineScore = (routineDone / routineTotal) * 100
  const bodyScore = Math.round(calScore * 0.2 + protScore * 0.3 + waterScore * 0.15 + workoutScore * 0.25 + routineScore * 0.1)
  const circumference = 2 * Math.PI * 36
  const dash = (bodyScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-white/8 bg-gradient-to-br from-emerald-950/40 via-[#0d0d1a] to-[#0d0d1a] p-5"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-8 -left-8 w-48 h-48 rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="flex items-center gap-5">
        {/* Score ring */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <svg width="96" height="96" viewBox="0 0 88 88" className="-rotate-90">
              <circle cx="44" cy="44" r="36" stroke="white" strokeOpacity="0.05" strokeWidth="6" fill="none" />
              <motion.circle
                cx="44" cy="44" r="36"
                stroke="#10b981"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - dash }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-black text-white leading-none">{bodyScore}</span>
              <span className="font-mono text-[9px] text-slate-500">/ 100</span>
            </div>
          </div>
          <div className={cn('font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border', modeC.color, modeC.bg, modeC.border)}>
            {modeC.label}
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-3 gap-2 flex-1">
          <StatTile label="Calories" value={cal.toLocaleString()} sub={`/ ${targets.calories}`} pct={(cal / targets.calories) * 100} icon={Flame} color="text-orange-400" index={0} />
          <StatTile label="Protein" value={`${prot}g`} sub={`/ ${targets.protein}g`} pct={(prot / targets.protein) * 100} icon={Zap} color="text-emerald-400" index={1} />
          <StatTile label="Water" value={`${waterOz} oz`} sub={`/ ${targets.waterOz} oz`} pct={(waterOz / targets.waterOz) * 100} icon={Droplets} color="text-cyan-400" index={2} />
          <StatTile
            label="Workout"
            value={workoutCompleted ? 'Done' : workoutName}
            sub={workoutCompleted ? undefined : '— pending'}
            pct={workoutCompleted ? 100 : 0}
            icon={Dumbbell}
            color="text-violet-400"
            index={3}
          />
          <StatTile
            label="Cardio"
            value={cardioCompleted ? 'Done' : '40 min'}
            sub={cardioCompleted ? undefined : '— planned'}
            pct={cardioCompleted ? 100 : 0}
            icon={Activity}
            color="text-amber-400"
            index={4}
          />
          <StatTile
            label="Routine"
            value={`${routineDone}/${routineTotal}`}
            sub="habits"
            pct={routineScore}
            icon={TrendingUp}
            color="text-slate-400"
            index={5}
          />
        </div>
      </div>
    </motion.div>
  )
}
