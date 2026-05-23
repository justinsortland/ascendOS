'use client'

import { motion } from 'framer-motion'
import { Target, Clock, Zap, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { DailyMission } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  mission: DailyMission
  onComplete: () => void
}

export function DailyMissionCard({ mission, onComplete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br from-violet-950/60 via-[#0d0d1f] to-cyan-950/40 p-5"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-violet-500/15 border border-violet-500/20">
            <Target className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-400">
                Daily Mission
              </span>
              <Badge
                variant="outline"
                className="h-4 px-1.5 text-[9px] border-violet-500/30 text-violet-400 bg-violet-500/10"
              >
                ACTIVE
              </Badge>
            </div>
            <h3
              className={cn(
                'font-display text-base font-bold text-white',
                mission.completed && 'line-through text-slate-400'
              )}
            >
              {mission.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">{mission.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5">
            <Zap className="h-3 w-3 text-amber-400" />
            <span className="font-mono text-xs font-bold text-amber-400">+{mission.xp} XP</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>By {mission.deadline}</span>
          </div>
        </div>
      </div>

      {!mission.completed ? (
        <motion.div whileTap={{ scale: 0.97 }} className="mt-4">
          <Button
            size="sm"
            onClick={onComplete}
            className="bg-violet-600/80 hover:bg-violet-600 text-white border-0 text-xs"
          >
            Mark Complete
          </Button>
        </motion.div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Mission complete — {mission.xp} XP earned</span>
        </div>
      )}
    </motion.div>
  )
}
