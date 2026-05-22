'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react'
import type { Task } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  tasks: Task[]
}

export function MinimumViableDayCard({ tasks }: Props) {
  const nonNeg = tasks.filter(t => t.tier === 'non-negotiable')
  const done = nonNeg.filter(t => t.completed).length
  const complete = done === nonNeg.length && nonNeg.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn(
        'rounded-xl border p-4',
        complete
          ? 'border-emerald-500/30 bg-emerald-950/30'
          : 'border-white/8 bg-[#0d0d1a]'
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck
          className={cn('h-4 w-4', complete ? 'text-emerald-400' : 'text-slate-500')}
        />
        <div>
          <h3 className="text-xs font-bold text-white">Minimum Viable Day</h3>
          <p className="text-[10px] text-slate-500">
            {done}/{nonNeg.length} non-negotiables
          </p>
        </div>
        {complete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full"
          >
            CLEARED
          </motion.span>
        )}
      </div>

      <div className="space-y-1.5">
        {nonNeg.map(task => (
          <div key={task.id} className="flex items-center gap-2">
            {task.completed ? (
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
            ) : (
              <Circle className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
            )}
            <span
              className={cn(
                'text-xs',
                task.completed ? 'line-through text-slate-500' : 'text-slate-300'
              )}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 w-full rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(done / nonNeg.length) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
