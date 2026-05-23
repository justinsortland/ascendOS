'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PomodoroPhase } from '@/lib/types'

const FOCUS_SECS = 25 * 60
const BREAK_SECS = 5 * 60

function fmt(secs: number) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function PomodoroCard() {
  const [phase, setPhase] = useState<PomodoroPhase>('idle')
  const [running, setRunning] = useState(false)
  const [secs, setSecs] = useState(FOCUS_SECS)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = phase === 'break' ? BREAK_SECS : FOCUS_SECS
  const pct = 1 - secs / total
  const circumference = 2 * Math.PI * 40

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => {
    if (!running) { stop(); return }
    intervalRef.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          stop()
          setRunning(false)
          if (phase === 'focus') {
            setSessions(n => n + 1)
            setPhase('break')
            setSecs(BREAK_SECS)
          } else {
            setPhase('idle')
            setSecs(FOCUS_SECS)
          }
          return 0
        }
        return s - 1
      })
    }, 1000)
    return stop
  }, [running, phase, stop])

  function handleStart() {
    if (phase === 'idle') setPhase('focus')
    setRunning(r => !r)
  }

  function handleReset() {
    stop()
    setRunning(false)
    setPhase('idle')
    setSecs(FOCUS_SECS)
  }

  const isFocus = phase === 'focus' || phase === 'idle'
  const ringColor = isFocus ? '#06b6d4' : '#10b981'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xs font-bold text-white">Focus Block</h3>
          <p className="font-mono text-[10px] text-slate-500 mt-0.5">{sessions} session{sessions !== 1 ? 's' : ''} today</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              phase === 'break'
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                : phase === 'focus'
                ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
                : 'text-slate-500 border-white/10 bg-white/5'
            }`}
          >
            {phase === 'break' ? 'BREAK' : phase === 'focus' ? 'FOCUS' : 'READY'}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5">
        {/* Ring timer */}
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r="40" stroke="white" strokeOpacity="0.05" strokeWidth="5" fill="none" />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke={ringColor}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct)}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black text-white leading-none font-mono">
              {fmt(secs)}
            </span>
            {phase === 'break' && <Coffee className="h-3 w-3 text-emerald-400 mt-1" />}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 flex-1">
          <Button
            size="sm"
            onClick={handleStart}
            className={`w-full text-xs ${
              running
                ? 'bg-white/10 hover:bg-white/15 text-white border-0'
                : 'bg-cyan-600/80 hover:bg-cyan-600 text-white border-0'
            }`}
          >
            {running ? (
              <><Pause className="h-3 w-3 mr-1.5" />Pause</>
            ) : (
              <><Play className="h-3 w-3 mr-1.5" />{phase === 'idle' ? 'Start Focus' : 'Resume'}</>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="w-full text-xs text-slate-500 hover:text-white"
          >
            <RotateCcw className="h-3 w-3 mr-1.5" />Reset
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
