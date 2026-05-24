'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Check } from 'lucide-react'
import { weeklyThemes, themeInterpretations } from '@/lib/weekly-mock-data'
import { cn } from '@/lib/utils'

interface Props {
  theme: string
  onThemeChange: (t: string) => void
}

export function WeeklyThemeSelector({ theme, onThemeChange }: Props) {
  const [custom, setCustom] = useState('')
  const [saved, setSaved] = useState(false)

  function handleCustomSave() {
    if (!custom.trim()) return
    onThemeChange(custom.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const interpretation = themeInterpretations[theme]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/20">
          <Compass className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Weekly Theme</h3>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {weeklyThemes.map(t => (
          <button
            key={t}
            onClick={() => onThemeChange(t)}
            className={cn(
              'rounded-lg px-3 py-1.5 font-display text-xs font-medium transition-all border',
              theme === t
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-200'
                : 'border-white/6 bg-white/3 text-slate-400 hover:text-slate-200'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Custom theme */}
      <div className="flex gap-2 mb-4">
        <input
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCustomSave()}
          placeholder="Custom theme..."
          className="flex-1 rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/30 transition-colors"
        />
        <button
          onClick={handleCustomSave}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
            saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-amber-500/25 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
          )}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>

      {/* Interpretation */}
      {interpretation && (
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/15 px-4 py-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500/70 block mb-1.5">AI Interpretation</span>
          <p className="font-sans text-xs text-slate-300 leading-relaxed">{interpretation}</p>
        </div>
      )}
    </motion.div>
  )
}
