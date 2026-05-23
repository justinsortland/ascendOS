'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BodyMeal, MacroTargets } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  meals: BodyMeal[]
  targets: MacroTargets
  waterOz: number
  onWaterChange: (oz: number) => void
}

interface MacroBarProps {
  label: string
  value: number
  target: number
  unit: string
  color: string
  barColor: string
  index: number
}

function MacroBar({ label, value, target, unit, color, barColor, index }: MacroBarProps) {
  const pct = Math.min((value / target) * 100, 100)
  const remaining = Math.max(target - value, 0)
  const over = value > target

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-wider font-medium ${color}`}>{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-white">{value}{unit}</span>
          <span className="font-mono text-[10px] text-slate-600">/ {target}{unit}</span>
          {over && (
            <span className="font-mono text-[9px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1 rounded">OVER</span>
          )}
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + 0.04 * index }}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-mono text-[10px] text-slate-600">{Math.round(pct)}%</span>
        <span className="font-mono text-[10px] text-slate-600">
          {over ? `+${value - target}${unit} over` : `${remaining}${unit} left`}
        </span>
      </div>
    </motion.div>
  )
}

export function MacroTracker({ meals, targets, waterOz, onWaterChange }: Props) {
  const cal = meals.reduce((s, m) => s + m.calories, 0)
  const prot = meals.reduce((s, m) => s + m.protein, 0)
  const carbs = meals.reduce((s, m) => s + m.carbs, 0)
  const fat = meals.reduce((s, m) => s + m.fat, 0)

  const calPct = Math.min((cal / targets.calories) * 100, 100)
  const calCircumference = 2 * Math.PI * 44

  // Cut status logic
  const calDiff = cal - targets.calories
  const proteinStatus = prot >= targets.protein ? 'on-target' : prot >= targets.protein * 0.85 ? 'close' : 'short'

  let cutStatus: { label: string; color: string; bg: string; border: string }
  if (calDiff > 150) cutStatus = { label: 'OVER TARGET', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
  else if (calDiff > -100) cutStatus = { label: 'ON PACE', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
  else cutStatus = { label: 'UNDER TARGET', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-bold text-white">Nutrition</h3>
        <div className={cn('font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border', cutStatus.color, cutStatus.bg, cutStatus.border)}>
          {cutStatus.label}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Calorie ring */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="relative">
            <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90">
              <circle cx="52" cy="52" r="44" stroke="white" strokeOpacity="0.05" strokeWidth="7" fill="none" />
              <motion.circle
                cx="52" cy="52" r="44"
                stroke={calDiff > 150 ? '#ef4444' : '#10b981'}
                strokeWidth="7" fill="none" strokeLinecap="round"
                strokeDasharray={calCircumference}
                initial={{ strokeDashoffset: calCircumference }}
                animate={{ strokeDashoffset: calCircumference - (calPct / 100) * calCircumference }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-lg font-black text-white leading-none">{cal.toLocaleString()}</span>
              <span className="font-mono text-[9px] text-slate-500 mt-0.5">/ {targets.calories}</span>
              <span className="font-mono text-[9px] text-slate-500">kcal</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">Calories</span>
        </div>

        {/* Macro bars */}
        <div className="flex-1 space-y-4">
          <MacroBar label="Protein" value={prot} target={targets.protein} unit="g" color="text-emerald-400" barColor="#10b981" index={0} />
          <MacroBar label="Carbs" value={carbs} target={targets.carbs} unit="g" color="text-cyan-400" barColor="#06b6d4" index={1} />
          <MacroBar label="Fat" value={fat} target={targets.fat} unit="g" color="text-amber-400" barColor="#f59e0b" index={2} />

          {/* Water */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Droplets className="h-3 w-3 text-cyan-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-medium text-cyan-400">Water</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => onWaterChange(Math.max(0, waterOz - 8))} className="h-5 w-5 flex items-center justify-center rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                  <Minus className="h-2.5 w-2.5" />
                </button>
                <span className="font-mono text-xs font-bold text-white w-14 text-center">{waterOz} oz</span>
                <button onClick={() => onWaterChange(Math.min(targets.waterOz + 16, waterOz + 8))} className="h-5 w-5 flex items-center justify-center rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                  <Plus className="h-2.5 w-2.5" />
                </button>
                <span className="font-mono text-[10px] text-slate-600">/ {targets.waterOz} oz</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-cyan-500"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min((waterOz / targets.waterOz) * 100, 100)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Protein status line */}
          {proteinStatus === 'short' && (
            <p className="font-mono text-[10px] text-amber-400">
              ⚠ {targets.protein - prot}g protein short — prioritize lean protein
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
