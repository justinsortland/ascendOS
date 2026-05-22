'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Brain, Sparkles, Flame, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { CommandCardData } from '@/lib/types'

const config: Record<
  string,
  {
    icon: React.ElementType
    color: string
    border: string
    glow: string
    href: string
    bg: string
    barColor: string
  }
> = {
  body: {
    icon: Dumbbell,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'from-emerald-950/60',
    href: '/body',
    bg: 'bg-emerald-500/10',
    barColor: '#10b981',
  },
  brain: {
    icon: Brain,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'from-cyan-950/60',
    href: '/brain',
    bg: 'bg-cyan-500/10',
    barColor: '#06b6d4',
  },
  spirit: {
    icon: Sparkles,
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    glow: 'from-violet-950/60',
    href: '/spirit',
    bg: 'bg-violet-500/10',
    barColor: '#8b5cf6',
  },
  execution: {
    icon: Flame,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    glow: 'from-amber-950/60',
    href: '/weekly',
    bg: 'bg-amber-500/10',
    barColor: '#f59e0b',
  },
}

interface Props {
  card: CommandCardData
  index: number
}

export function CommandCard({ card, index }: Props) {
  const c = config[card.category]
  const Icon = c.icon

  return (
    <Link href={c.href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 * index }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className={`group relative overflow-hidden rounded-xl border ${c.border} bg-gradient-to-b ${c.glow} to-[#0d0d1a] p-4 cursor-pointer`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg} border ${c.border}`}>
            <Icon className={`h-4 w-4 ${c.color}`} />
          </div>
          <ArrowRight
            className={`h-3.5 w-3.5 text-slate-600 group-hover:${c.color} transition-colors`}
          />
        </div>

        <p className="text-sm font-bold text-white">{card.title}</p>

        <div className="mt-3 space-y-2">
          {/* Progress bar */}
          <div className="h-1 w-full rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: c.barColor }}
              initial={{ width: '0%' }}
              animate={{ width: `${card.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + 0.05 * index }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-medium ${c.color}`}>
              {card.progress}% done
            </span>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span>🔥 {card.streak}d</span>
              <span>+{card.xpPool} XP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
