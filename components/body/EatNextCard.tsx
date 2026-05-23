'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, RefreshCw, Zap, TrendingDown, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BodyMeal, MacroTargets } from '@/lib/types'
import { eatNextSuggestions } from '@/lib/body-mock-data'

type SuggestionMode = 'default' | 'highProtein' | 'lowCal' | 'mealPrep'

interface Props {
  meals: BodyMeal[]
  targets: MacroTargets
}

const modeConfig: Record<SuggestionMode, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  default: { label: 'Best Options', icon: Bot, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  highProtein: { label: 'High Protein', icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  lowCal: { label: 'Low Cal', icon: TrendingDown, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  mealPrep: { label: 'Meal Prep', icon: Package, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
}

export function EatNextCard({ meals, targets }: Props) {
  const [mode, setMode] = useState<SuggestionMode>('default')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  const calConsumed = meals.reduce((s, m) => s + m.calories, 0)
  const protConsumed = meals.reduce((s, m) => s + m.protein, 0)
  const calLeft = Math.max(targets.calories - calConsumed, 0)
  const protLeft = Math.max(targets.protein - protConsumed, 0)

  const suggestions = eatNextSuggestions[mode]
  const cfg = modeConfig[mode]
  const Icon = cfg.icon

  function handleGenerate(m: SuggestionMode) {
    setLoading(true)
    setMode(m)
    setTimeout(() => {
      setGenerated(true)
      setLoading(false)
    }, 900)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.14 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-4 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Bot className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <div>
          <h3 className="font-display text-xs font-bold text-white">What Should I Eat Next?</h3>
          <p className="font-mono text-[10px] text-slate-500 mt-0.5">
            {calLeft} kcal · {protLeft}g protein remaining
          </p>
        </div>
      </div>

      {/* Context */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-white/5 border border-white/6 px-2.5 py-1.5">
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wide">Cal left</p>
          <p className="font-mono text-sm font-bold text-white">{calLeft}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/6 px-2.5 py-1.5">
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wide">Protein left</p>
          <p className="font-mono text-sm font-bold text-emerald-400">{protLeft}g</p>
        </div>
      </div>

      {/* Suggestion area */}
      <AnimatePresence mode="wait">
        {!generated ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center py-4"
          >
            <p className="font-mono text-[10px] text-slate-600 text-center">
              Generate a suggestion based on remaining macros
            </p>
          </motion.div>
        ) : loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center py-4"
          >
            <div className="flex items-center gap-2 text-violet-400">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span className="font-mono text-[11px]">Analyzing macros…</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex-1 rounded-lg border p-3 mb-3 ${cfg.border} ${cfg.bg}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Icon className={`h-3 w-3 ${cfg.color}`} />
              <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>
            <ul className="space-y-1.5">
              {suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-slate-600 mt-0.5">{i + 1}.</span>
                  <span className="font-sans text-xs text-slate-300 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          size="sm"
          onClick={() => handleGenerate('default')}
          className="h-7 text-[10px] bg-violet-600/70 hover:bg-violet-600 text-white border-0"
        >
          <Bot className="h-3 w-3 mr-1" />Generate
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleGenerate('highProtein')}
          className="h-7 text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15"
        >
          <Zap className="h-3 w-3 mr-1" />High Protein
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleGenerate('lowCal')}
          className="h-7 text-[10px] border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/15"
        >
          <TrendingDown className="h-3 w-3 mr-1" />Low Cal
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleGenerate('mealPrep')}
          className="h-7 text-[10px] border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/15"
        >
          <Package className="h-3 w-3 mr-1" />Meal Prep
        </Button>
      </div>
    </motion.div>
  )
}
