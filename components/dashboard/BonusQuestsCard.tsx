'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Trophy } from 'lucide-react'
import type { BonusQuest } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  quests: BonusQuest[]
}

const categoryAccent: Record<string, string> = {
  brain: 'text-cyan-400',
  body: 'text-emerald-400',
  spirit: 'text-violet-400',
  execution: 'text-amber-400',
}

export function BonusQuestsCard({ quests: initial }: Props) {
  const [quests, setQuests] = useState(initial)

  function toggle(id: string) {
    setQuests(q => q.map(quest => quest.id === id ? { ...quest, completed: !quest.completed } : quest))
  }

  const xpEarned = quests.filter(q => q.completed).reduce((s, q) => s + q.xp, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" />
          <h3 className="font-display text-xs font-bold text-white">Bonus Objectives</h3>
        </div>
        {xpEarned > 0 && (
          <span className="font-mono text-[10px] font-bold text-amber-400">+{xpEarned} XP</span>
        )}
      </div>

      <div className="space-y-1.5">
        {quests.map((quest, i) => (
          <motion.button
            key={quest.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggle(quest.id)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
              quest.completed ? 'opacity-50' : 'hover:bg-white/5'
            )}
          >
            {quest.completed ? (
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
            ) : (
              <Circle className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
            )}
            <span
              className={cn(
                'flex-1 text-xs',
                quest.completed ? 'line-through text-slate-500' : 'text-slate-300'
              )}
            >
              {quest.title}
            </span>
            <span className={cn('font-mono text-[10px] font-semibold', categoryAccent[quest.category])}>
              +{quest.xp}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
