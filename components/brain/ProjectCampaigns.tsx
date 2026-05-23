'use client'

import { motion } from 'framer-motion'
import { Rocket, GitBranch, Flame, CheckCircle2, Clock } from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig = {
  active: { label: 'Active', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  building: { label: 'Building', color: 'text-cyan-400', dot: 'bg-cyan-400' },
  planning: { label: 'Planning', color: 'text-amber-400', dot: 'bg-amber-400' },
  paused: { label: 'Paused', color: 'text-slate-400', dot: 'bg-slate-500' },
  shipped: { label: 'Shipped', color: 'text-violet-400', dot: 'bg-violet-400' },
}

const priorityBorder = {
  high: 'border-cyan-500/20',
  medium: 'border-white/8',
  low: 'border-white/5',
}

interface Props {
  projects: Project[]
}

export function ProjectCampaigns({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Rocket className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Project Campaigns</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{projects.length} active</span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {projects.map((project, i) => {
          const sc = statusConfig[project.status]
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.3 }}
              className={cn(
                'rounded-lg border bg-white/4 p-4 flex flex-col gap-3',
                priorityBorder[project.priority]
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', sc.dot)} />
                    <h4 className="font-display text-sm font-bold text-white">{project.name}</h4>
                  </div>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed">{project.description}</p>
                </div>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-400 transition-colors ml-2 flex-shrink-0">
                    <GitBranch className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Progress</span>
                  <span className="font-mono text-[10px] text-cyan-400">{project.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + 0.06 * i }}
                  />
                </div>
              </div>

              {/* Sprint + next task */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-slate-600 flex-shrink-0" />
                  <span className="font-mono text-[10px] text-slate-400">{project.currentSprint}</span>
                </div>
                <div className="rounded bg-cyan-500/8 border border-cyan-500/15 px-2 py-1.5">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Next Task</span>
                  <p className="font-display text-xs font-medium text-cyan-300 mt-0.5">{project.nextTask}</p>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-1">
                {project.recentMilestones.slice(0, 2).map((m, j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500/60 flex-shrink-0" />
                    <span className="font-sans text-[10px] text-slate-500 truncate">{m}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-400/70" />
                  <span className="font-mono text-[10px] text-slate-500">{project.shipStreak}d streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('font-mono text-[10px]', sc.color)}>{sc.label}</span>
                  <span className="font-mono text-[10px] text-cyan-400/80">+{project.xp} XP</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
