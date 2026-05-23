'use client'

import { motion } from 'framer-motion'
import { Network } from 'lucide-react'
import type { SkillNode } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig = {
  'active': { label: 'Active', color: 'text-cyan-400', ring: 'ring-cyan-500/30', bg: 'bg-cyan-500/10' },
  'locked-in': { label: 'Locked In', color: 'text-emerald-400', ring: 'ring-emerald-500/30', bg: 'bg-emerald-500/10' },
  'needs-attention': { label: 'Needs Attention', color: 'text-amber-400', ring: 'ring-amber-500/30', bg: 'bg-amber-500/10' },
  'behind': { label: 'Behind', color: 'text-rose-400', ring: 'ring-rose-500/30', bg: 'bg-rose-500/10' },
}

interface SkillNodeCardProps {
  node: SkillNode
  index: number
}

function SkillNodeCard({ node, index }: SkillNodeCardProps) {
  const sc = statusConfig[node.status]
  const xpToNext = 1000 - (node.xp % 1000)
  const levelPct = ((node.xp % 1000) / 1000) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className={cn('rounded-xl border border-white/8 bg-white/4 p-4 flex flex-col gap-3 ring-1', sc.ring)}
    >
      {/* Icon + level badge */}
      <div className="flex items-center justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl text-xl', sc.bg)}>
          {node.icon}
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-bold text-white leading-none">{node.level}</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Level</div>
        </div>
      </div>

      {/* Name + status */}
      <div>
        <h4 className="font-display text-sm font-bold text-white">{node.name}</h4>
        <span className={cn('font-mono text-[9px] uppercase tracking-widest', sc.color)}>{sc.label}</span>
      </div>

      {/* XP bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] text-slate-600">{node.xp.toLocaleString()} XP</span>
          <span className="font-mono text-[9px] text-slate-600">{xpToNext} to next</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: node.status === 'locked-in' ? '#10b981' : node.status === 'needs-attention' ? '#f59e0b' : node.status === 'behind' ? '#f43f5e' : '#06b6d4' }}
            initial={{ width: 0 }}
            animate={{ width: `${levelPct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 + 0.05 * index }}
          />
        </div>
      </div>

      {/* Progress ring-style indicator */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-slate-500">Week Progress</span>
        <span className={cn('font-mono text-[11px] font-bold', sc.color)}>{node.progress}%</span>
      </div>
    </motion.div>
  )
}

interface Props {
  nodes: SkillNode[]
}

export function BrainSkillTree({ nodes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Network className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Skill Tree</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500">{nodes.length} nodes</span>
          <span className="font-mono text-[10px] text-cyan-400">{nodes.reduce((s, n) => s + n.xp, 0).toLocaleString()} total XP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {nodes.map((node, i) => (
          <SkillNodeCard key={node.id} node={node} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
