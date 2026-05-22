'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Lightbulb, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { AICoachMessage } from '@/lib/types'
import { cn } from '@/lib/utils'

const typeConfig = {
  encouragement: {
    icon: TrendingUp,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/8',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/8',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/8',
  },
}

interface Props {
  messages: AICoachMessage[]
}

export function AICoachPanel({ messages }: Props) {
  const [index, setIndex] = useState(0)
  const msg = messages[index]
  const cfg = typeConfig[msg.type]
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.22 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
            <Bot className="h-3.5 w-3.5 text-violet-400" />
          </div>
          <span className="text-xs font-bold text-white">AI Coach</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            className="p-1 rounded text-slate-600 hover:text-slate-300 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <span className="text-[10px] text-slate-600">{index + 1}/{messages.length}</span>
          <button
            onClick={() => setIndex(i => Math.min(messages.length - 1, i + 1))}
            disabled={index === messages.length - 1}
            className="p-1 rounded text-slate-600 hover:text-slate-300 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className={cn('rounded-lg border p-3', cfg.border, cfg.bg)}
        >
          <div className="flex items-start gap-2">
            <Icon className={cn('h-3.5 w-3.5 flex-shrink-0 mt-0.5', cfg.color)} />
            <p className="text-xs text-slate-300 leading-relaxed">{msg.message}</p>
          </div>
          <p className="text-[10px] text-slate-600 mt-2">{msg.timestamp}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
