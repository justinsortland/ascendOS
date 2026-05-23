'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ExternalLink, AlertCircle, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { LeetCodeProblem } from '@/lib/types'
import { cn } from '@/lib/utils'

const difficultyConfig = {
  easy: { label: 'Easy', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  hard: { label: 'Hard', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
}

const statusConfig = {
  'mastered': { label: 'Mastered', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  'solved-independent': { label: 'Solved', color: 'text-cyan-400', dot: 'bg-cyan-400' },
  'solved-help': { label: 'Solved w/ Help', color: 'text-amber-400', dot: 'bg-amber-400' },
  'attempted': { label: 'Attempted', color: 'text-orange-400', dot: 'bg-orange-400' },
  'revisit': { label: 'Revisit', color: 'text-rose-400', dot: 'bg-rose-400' },
  'not-started': { label: 'Not Started', color: 'text-slate-500', dot: 'bg-slate-600' },
}

interface ProblemRowProps {
  problem: LeetCodeProblem
  recommended?: boolean
}

function ProblemRow({ problem, recommended }: ProblemRowProps) {
  const [expanded, setExpanded] = useState(false)
  const dc = difficultyConfig[problem.difficulty]
  const sc = statusConfig[problem.status]

  return (
    <div className={cn(
      'rounded-lg border transition-colors',
      recommended ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-white/6 bg-white/3',
    )}>
      <button
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', sc.dot)} />
        <span className="font-display text-xs font-medium text-white flex-1 truncate">{problem.title}</span>
        {recommended && (
          <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 rounded px-1.5 py-0.5 flex-shrink-0">
            Recommended
          </span>
        )}
        <span className={cn('font-mono text-[10px] flex-shrink-0', dc.color)}>{dc.label}</span>
        {problem.timeMins && (
          <span className="font-mono text-[10px] text-slate-500 flex-shrink-0">{problem.timeMins}m</span>
        )}
        {problem.notes
          ? expanded ? <ChevronUp className="h-3 w-3 text-slate-500 flex-shrink-0" /> : <ChevronDown className="h-3 w-3 text-slate-500 flex-shrink-0" />
          : <div className="w-3" />
        }
      </button>
      <AnimatePresence>
        {expanded && (problem.notes || problem.url) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2.5 flex items-start gap-2">
              {problem.notes && (
                <p className="font-sans text-[11px] text-slate-400 leading-relaxed flex-1">{problem.notes}</p>
              )}
              {problem.url && (
                <a href={problem.url} target="_blank" rel="noopener noreferrer"
                  className="text-slate-600 hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5">
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
}

export function LeetCodeTracker({ problems, recommendedProblem, weeklyGoal, weakTopics }: Props) {
  const [tab, setTab] = useState<'focus' | 'queue' | 'log'>('focus')

  const solvedThisWeek = problems.filter(p => p.solvedDate)
  const revisitQueue = problems.filter(p => p.status === 'revisit')
  const log = [...problems].sort((a, b) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return (days.indexOf(b.solvedDate ?? '') ?? -1) - (days.indexOf(a.solvedDate ?? '') ?? -1)
  }).filter(p => p.solvedDate)

  const weekProgress = Math.min((solvedThisWeek.length / weeklyGoal) * 100, 100)

  // Bar chart data — difficulty breakdown
  const chartData = [
    { name: 'Easy', count: problems.filter(p => p.difficulty === 'easy' && p.solvedDate).length, color: '#10b981' },
    { name: 'Medium', count: problems.filter(p => p.difficulty === 'medium' && p.solvedDate).length, color: '#f59e0b' },
    { name: 'Hard', count: problems.filter(p => p.difficulty === 'hard' && p.solvedDate).length, color: '#f43f5e' },
  ]

  const tabs = [
    { key: 'focus', label: 'Focus' },
    { key: 'queue', label: `Queue (${revisitQueue.length})` },
    { key: 'log', label: `Log (${solvedThisWeek.length})` },
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

      {/* Weekly progress bar */}
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
              tab === t.key
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="space-y-1.5">
        {tab === 'focus' && (
          <>
            <ProblemRow problem={recommendedProblem} recommended />
            {revisitQueue.filter(p => p.id !== recommendedProblem.id).slice(0, 3).map(p => (
              <ProblemRow key={p.id} problem={p} />
            ))}
          </>
        )}
        {tab === 'queue' && revisitQueue.map(p => (
          <ProblemRow key={p.id} problem={p} recommended={p.id === recommendedProblem.id} />
        ))}
        {tab === 'log' && log.map(p => (
          <ProblemRow key={p.id} problem={p} />
        ))}
      </div>
    </motion.div>
  )
}
