'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ExternalLink, AlertCircle, ChevronDown, ChevronUp, BarChart3, Loader2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { LeetCodeProblem, LeetCodeStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const difficultyConfig = {
  easy:   { label: 'Easy',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  medium: { label: 'Medium', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  hard:   { label: 'Hard',   color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
}

const statusConfig: Record<LeetCodeStatus, {
  label: string
  color: string
  dot: string
  badgeBg: string
  badgeBorder: string
  pickerActive: string
}> = {
  'mastered': {
    label: 'Mastered',
    color: 'text-emerald-400',
    dot: 'bg-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    pickerActive: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
  },
  'solved-independent': {
    label: 'Solved',
    color: 'text-cyan-400',
    dot: 'bg-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/20',
    pickerActive: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-300',
  },
  'solved-help': {
    label: 'With Help',
    color: 'text-amber-400',
    dot: 'bg-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    pickerActive: 'border-amber-500/30 bg-amber-500/15 text-amber-300',
  },
  'attempted': {
    label: 'Attempted',
    color: 'text-orange-400',
    dot: 'bg-orange-400',
    badgeBg: 'bg-orange-500/10',
    badgeBorder: 'border-orange-500/20',
    pickerActive: 'border-orange-500/30 bg-orange-500/15 text-orange-300',
  },
  'revisit': {
    label: 'Revisit',
    color: 'text-rose-400',
    dot: 'bg-rose-400',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/20',
    pickerActive: 'border-rose-500/30 bg-rose-500/15 text-rose-300',
  },
  'not-started': {
    label: 'Not Started',
    color: 'text-slate-500',
    dot: 'bg-slate-600',
    badgeBg: 'bg-white/4',
    badgeBorder: 'border-white/8',
    pickerActive: 'border-white/20 bg-white/10 text-slate-200',
  },
}

const STATUS_ORDER: LeetCodeStatus[] = [
  'mastered',
  'solved-independent',
  'solved-help',
  'attempted',
  'revisit',
  'not-started',
]

interface ProblemRowProps {
  problem: LeetCodeProblem
  recommended?: boolean
  onStatusChange?: (status: LeetCodeStatus) => void
  updating?: boolean
}

function ProblemRow({ problem, recommended, onStatusChange, updating }: ProblemRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const dc = difficultyConfig[problem.difficulty]
  const sc = statusConfig[problem.status]

  function handleStatusSelect(status: LeetCodeStatus) {
    if (status === problem.status) { setShowPicker(false); return }
    setShowPicker(false)
    onStatusChange?.(status)
  }

  const hasExpandable = !!(problem.notes || problem.url)

  return (
    <div className={cn(
      'rounded-lg border transition-colors',
      recommended ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-white/6 bg-white/3',
    )}>
      {/* Row header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Status badge — clickable */}
        <button
          onClick={() => setShowPicker(s => !s)}
          disabled={updating}
          className={cn(
            'flex items-center gap-1 rounded px-1.5 py-0.5 border flex-shrink-0 transition-colors',
            sc.badgeBg, sc.badgeBorder,
            updating ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-125 cursor-pointer',
          )}
        >
          {updating
            ? <Loader2 className="h-2.5 w-2.5 animate-spin text-slate-400" />
            : <span className={cn('h-1.5 w-1.5 rounded-full', sc.dot)} />
          }
          <span className={cn('font-mono text-[9px] uppercase tracking-wide', sc.color)}>
            {sc.label}
          </span>
          <ChevronDown className="h-2.5 w-2.5 text-slate-600" />
        </button>

        {/* Title + metadata — clicking expands notes */}
        <div
          className={cn(
            'flex flex-1 items-center gap-2 min-w-0',
            hasExpandable && 'cursor-pointer',
          )}
          onClick={() => hasExpandable && setExpanded(e => !e)}
        >
          <span className="font-display text-xs font-medium text-white flex-1 truncate">
            {problem.title}
          </span>
          {recommended && (
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 rounded px-1.5 py-0.5 flex-shrink-0">
              Rec
            </span>
          )}
          <span className={cn('font-mono text-[10px] flex-shrink-0', dc.color)}>{dc.label}</span>
          {problem.timeMins && (
            <span className="font-mono text-[10px] text-slate-500 flex-shrink-0">{problem.timeMins}m</span>
          )}
          {hasExpandable && (
            expanded
              ? <ChevronUp className="h-3 w-3 text-slate-500 flex-shrink-0" />
              : <ChevronDown className="h-3 w-3 text-slate-500 flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Status picker */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2.5 pt-0.5 border-t border-white/5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">
                Change Status
              </span>
              <div className="grid grid-cols-3 gap-1">
                {STATUS_ORDER.map(s => {
                  const cfg = statusConfig[s]
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusSelect(s)}
                      className={cn(
                        'rounded px-2 py-1.5 font-mono text-[9px] uppercase tracking-wide border transition-all text-left flex items-center gap-1',
                        s === problem.status
                          ? cfg.pickerActive
                          : 'border-white/6 bg-white/3 text-slate-400 hover:bg-white/6 hover:text-slate-200',
                      )}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', cfg.dot)} />
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes / URL */}
      <AnimatePresence>
        {expanded && hasExpandable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2.5 flex items-start gap-2 border-t border-white/5 pt-2">
              {problem.notes && (
                <p className="font-sans text-[11px] text-slate-400 leading-relaxed flex-1">{problem.notes}</p>
              )}
              {problem.url && (
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface Props {
  problems: LeetCodeProblem[]
  recommendedProblem: LeetCodeProblem
  weeklyGoal: number
  weakTopics: string[]
  onStatusChange?: (id: string, status: LeetCodeStatus) => void
  updatingId?: string | null
}

export function LeetCodeTracker({ problems, recommendedProblem, weeklyGoal, weakTopics, onStatusChange, updatingId }: Props) {
  const [tab, setTab] = useState<'focus' | 'queue' | 'log'>('focus')

  const solvedThisWeek = problems.filter(p => p.solvedDate)
  const revisitQueue = problems.filter(p => p.status === 'revisit')
  const log = problems.filter(p => p.solvedDate).slice().sort((a, b) =>
    (b.solvedDate ?? '') > (a.solvedDate ?? '') ? 1 : -1
  )

  const weekProgress = Math.min((solvedThisWeek.length / weeklyGoal) * 100, 100)

  const chartData = [
    { name: 'Easy',   count: problems.filter(p => p.difficulty === 'easy'   && p.solvedDate).length, color: '#10b981' },
    { name: 'Medium', count: problems.filter(p => p.difficulty === 'medium' && p.solvedDate).length, color: '#f59e0b' },
    { name: 'Hard',   count: problems.filter(p => p.difficulty === 'hard'   && p.solvedDate).length, color: '#f43f5e' },
  ]

  const tabs = [
    { key: 'focus', label: 'Focus' },
    { key: 'queue', label: `Queue (${revisitQueue.length})` },
    { key: 'log',   label: `Log (${solvedThisWeek.length})` },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">LeetCode Tracker</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">Week Goal: {weeklyGoal}</span>
      </div>

      {/* Weekly progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Weekly Progress</span>
          <span className="font-mono text-[10px] text-cyan-400">{solvedThisWeek.length}/{weeklyGoal}</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${weekProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>

      {/* Chart + Weak Topics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart3 className="h-3 w-3 text-slate-500" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={64}>
            <BarChart data={chartData} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#0f0f1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 11 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertCircle className="h-3 w-3 text-slate-500" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Weak Topics</span>
          </div>
          <div className="space-y-1">
            {weakTopics.slice(0, 4).map((topic, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-rose-400/60 flex-shrink-0" />
                <span className="font-sans text-[10px] text-slate-400 truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 bg-white/4 rounded-lg p-0.5">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex-1 rounded-md py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all',
              tab === t.key ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Problem list */}
      <div className="space-y-1.5">
        {tab === 'focus' && (
          <>
            <ProblemRow
              problem={recommendedProblem}
              recommended
              onStatusChange={s => onStatusChange?.(recommendedProblem.id, s)}
              updating={updatingId === recommendedProblem.id}
            />
            {revisitQueue
              .filter(p => p.id !== recommendedProblem.id)
              .slice(0, 3)
              .map(p => (
                <ProblemRow
                  key={p.id}
                  problem={p}
                  onStatusChange={s => onStatusChange?.(p.id, s)}
                  updating={updatingId === p.id}
                />
              ))}
          </>
        )}
        {tab === 'queue' && revisitQueue.map(p => (
          <ProblemRow
            key={p.id}
            problem={p}
            recommended={p.id === recommendedProblem.id}
            onStatusChange={s => onStatusChange?.(p.id, s)}
            updating={updatingId === p.id}
          />
        ))}
        {tab === 'log' && log.map(p => (
          <ProblemRow
            key={p.id}
            problem={p}
            onStatusChange={s => onStatusChange?.(p.id, s)}
            updating={updatingId === p.id}
          />
        ))}
      </div>
    </motion.div>
  )
}
