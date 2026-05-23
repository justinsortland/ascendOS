'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import type { LearningTrack } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TrackCardProps {
  track: LearningTrack
  index: number
}

function TrackCard({ track, index }: TrackCardProps) {
  const isSessionBased = track.targetMins === 0 && track.targetSessions !== undefined
  const completed = isSessionBased ? (track.completedSessions ?? 0) : track.completedMins
  const target = isSessionBased ? (track.targetSessions ?? 1) : track.targetMins
  const pct = target > 0 ? Math.min((completed / target) * 100, 100) : 0
  const unit = isSessionBased ? 'sessions' : 'min'

  const barColor = pct >= 80 ? '#10b981' : pct >= 40 ? '#06b6d4' : '#f59e0b'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className="rounded-lg border border-white/8 bg-white/4 p-3 flex flex-col gap-2"
    >
      {/* Track header */}
      <div className="flex items-center gap-2">
        <span className="text-base leading-none">{track.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs font-bold text-white">{track.name}</span>
            <span className="font-mono text-[10px] text-cyan-400">Lv {track.skillLevel}</span>
          </div>
          <p className="font-sans text-[10px] text-slate-500 truncate mt-0.5">{track.currentTopic}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] text-slate-600">
            {completed}/{target} {unit}
          </span>
          <span className="font-mono text-[10px]" style={{ color: barColor }}>{Math.round(pct)}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 + 0.05 * index }}
          />
        </div>
      </div>

      {/* Next action */}
      <div className="flex items-start gap-1.5">
        <ArrowRight className="h-3 w-3 text-cyan-500/60 flex-shrink-0 mt-0.5" />
        <p className="font-sans text-[10px] text-slate-400 leading-relaxed">{track.nextAction}</p>
      </div>
    </motion.div>
  )
}

interface Props {
  tracks: LearningTrack[]
}

export function LearningTracks({ tracks }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Learning Tracks</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{tracks.length} tracks</span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track, i) => (
          <TrackCard key={track.id} track={track} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
