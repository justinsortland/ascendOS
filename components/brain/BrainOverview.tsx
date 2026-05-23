'use client'

import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import type { Project, LeetCodeProblem, LearningTrack, Book } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  brainScore: number
  brainXp: number
  focusMode: string
  projects: Project[]
  leetcodeProblems: LeetCodeProblem[]
  tracks: LearningTrack[]
  books: Book[]
}

function ScoreRing({ score }: { score: number }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - score / 100)

  return (
    <div className="relative flex items-center justify-center">
      <svg width={108} height={108} className="-rotate-90">
        <circle cx={54} cy={54} r={r} fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth={7} />
        <motion.circle
          cx={54}
          cy={54}
          r={r}
          fill="none"
          stroke="rgb(6,182,212)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-bold text-white leading-none">{score}</span>
        <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest mt-0.5">Brain</span>
      </div>
    </div>
  )
}

interface StatTileProps {
  label: string
  value: string | number
  sub?: string
  accent?: string
}

function StatTile({ label, value, sub, accent = 'text-white' }: StatTileProps) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/8 px-3 py-2.5 flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</span>
      <span className={cn('font-display text-lg font-bold leading-none', accent)}>{value}</span>
      {sub && <span className="font-mono text-[10px] text-slate-500 mt-0.5">{sub}</span>}
    </div>
  )
}

export function BrainOverview({ brainScore, brainXp, focusMode, projects, leetcodeProblems, tracks, books }: Props) {
  const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'building').length
  const solvedThisWeek = leetcodeProblems.filter(p => p.solvedDate).length
  const masteredCount = leetcodeProblems.filter(p => p.status === 'mastered').length
  const revisitCount = leetcodeProblems.filter(p => p.status === 'revisit').length
  const tracksOnTrack = tracks.filter(t => t.targetMins > 0
    ? t.completedMins / t.targetMins >= 0.5
    : (t.completedSessions ?? 0) / (t.targetSessions ?? 1) >= 0.5
  ).length
  const currentlyReading = books.filter(b => b.status === 'reading').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-start gap-6">
        {/* Score ring */}
        <ScoreRing score={brainScore} />

        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-3 gap-2 lg:grid-cols-6">
          <StatTile label="Brain XP" value={brainXp.toLocaleString()} sub="total earned" accent="text-cyan-400" />
          <StatTile label="Projects" value={activeProjects} sub="active / building" accent="text-cyan-300" />
          <StatTile label="LC This Week" value={solvedThisWeek} sub={`${masteredCount} mastered`} accent="text-white" />
          <StatTile label="Revisit Queue" value={revisitCount} sub="problems" accent={revisitCount > 3 ? 'text-rose-400' : 'text-white'} />
          <StatTile label="Tracks On Track" value={`${tracksOnTrack}/${tracks.length}`} sub="this week" accent="text-white" />
          <StatTile label="Reading" value={currentlyReading} sub="books active" accent="text-white" />
        </div>
      </div>

      {/* Focus mode + XP bar */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Focus Mode</span>
          <span className="font-display text-xs font-semibold text-cyan-300">{focusMode}</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((brainXp % 1000) / 1000) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
          <span className="font-mono text-[10px] text-slate-500">{brainXp % 1000}/1000 XP</span>
        </div>
      </div>
    </motion.div>
  )
}
