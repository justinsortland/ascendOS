'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Wind, Play, Pause, RotateCcw, CheckCircle2, Flame } from 'lucide-react'
import type { MeditationSession, MoodLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

const moodOptions: MoodLevel[] = ['low', 'neutral', 'good', 'great']
const moodColor: Record<MoodLevel, string> = {
  low: 'text-rose-400', neutral: 'text-slate-400', good: 'text-cyan-400', great: 'text-emerald-400',
}

const DEFAULT_SECS = 10 * 60 // 10 minutes

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

interface Props {
  sessions: MeditationSession[]
  streak: number
  onSave: (session: MeditationSession) => void
}

export function MeditationTracker({ sessions, streak, onSave }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECS)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'running' | 'paused' | 'done'>('idle')
  const [moodBefore, setMoodBefore] = useState<MoodLevel>('neutral')
  const [moodAfter, setMoodAfter] = useState<MoodLevel>('neutral')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSecs = DEFAULT_SECS
  const pct = ((totalSecs - secondsLeft) / totalSecs) * 100

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (running && secondsLeft === 0) {
        setRunning(false)
        setPhase('done')
      }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, secondsLeft])

  function handleStart() {
    if (phase === 'idle' || phase === 'paused') {
      setRunning(true)
      setPhase('running')
    }
  }

  function handlePause() {
    setRunning(false)
    setPhase('paused')
  }

  function handleReset() {
    setRunning(false)
    setSecondsLeft(DEFAULT_SECS)
    setPhase('idle')
    setSaved(false)
  }

  function handleMarkComplete() {
    const elapsed = Math.round((DEFAULT_SECS - secondsLeft) / 60) || 10
    onSave({
      id: `m-${Date.now()}`,
      date: 'Just now',
      durationMins: elapsed,
      moodBefore,
      moodAfter,
      notes: notes.trim() || undefined,
      completed: true,
    })
    setSaved(true)
    handleReset()
  }

  const weeklyMins = sessions.slice(0, 7).reduce((s, sess) => s + sess.durationMins, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Wind className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Meditation</h3>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-[11px] font-bold text-orange-300">{streak}d</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">{weeklyMins} min this week</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-4 py-4 mb-4">
        <div className="relative">
          <svg width={120} height={120} className="-rotate-90">
            <circle cx={60} cy={60} r={52} fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth={6} />
            <motion.circle
              cx={60} cy={60} r={52}
              fill="none" stroke="rgb(139,92,246)" strokeWidth={6} strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold text-white tabular-nums">{formatTime(secondsLeft)}</span>
            <span className="font-mono text-[9px] text-violet-400 uppercase tracking-widest">
              {phase === 'done' ? 'Complete' : phase === 'idle' ? '10 min' : phase === 'paused' ? 'Paused' : 'Focus'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase !== 'done' ? (
            <>
              {phase !== 'running'
                ? <button onClick={handleStart} className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30 transition-colors">
                    <Play className="h-4 w-4 ml-0.5" />
                  </button>
                : <button onClick={handlePause} className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30 transition-colors">
                    <Pause className="h-4 w-4" />
                  </button>
              }
              <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/8 text-slate-500 hover:text-slate-300 transition-colors">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button onClick={handleMarkComplete} className="flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-display text-xs font-semibold hover:bg-emerald-500/25 transition-colors">
              <CheckCircle2 className="h-4 w-4" />
              Mark Complete
            </button>
          )}
          {saved && <span className="font-mono text-[10px] text-emerald-400">Saved</span>}
        </div>
      </div>

      {/* Mood row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {(['before', 'after'] as const).map(when => {
          const current = when === 'before' ? moodBefore : moodAfter
          const setter = when === 'before' ? setMoodBefore : setMoodAfter
          return (
            <div key={when}>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">Mood {when}</span>
              <div className="flex gap-1">
                {moodOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setter(opt)}
                    className={cn(
                      'flex-1 rounded py-1 font-mono text-[9px] uppercase tracking-widest transition-all border capitalize',
                      current === opt
                        ? 'border-violet-500/40 bg-violet-500/15 text-violet-300'
                        : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Notes */}
      <input
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Session notes (optional)..."
        className="w-full rounded-lg bg-white/4 border border-white/8 px-3 py-2 font-sans text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/30 transition-colors mb-4"
      />

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <div className="space-y-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent</span>
          {sessions.slice(0, 4).map(sess => (
            <div key={sess.id} className="flex items-center justify-between rounded-lg bg-white/3 border border-white/5 px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-500">{sess.date}</span>
                <span className="font-mono text-[10px] text-violet-400">{sess.durationMins} min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('font-mono text-[10px]', moodColor[sess.moodBefore])}>{sess.moodBefore}</span>
                <span className="text-slate-600 text-[10px]">→</span>
                <span className={cn('font-mono text-[10px]', moodColor[sess.moodAfter])}>{sess.moodAfter}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
