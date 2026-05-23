'use client'

import { motion } from 'framer-motion'
import { BookOpen, Flame, Plus, Minus } from 'lucide-react'
import type { Book } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig = {
  reading: { label: 'Reading', color: 'text-cyan-400', dot: 'bg-cyan-400' },
  paused: { label: 'Paused', color: 'text-amber-400', dot: 'bg-amber-400' },
  finished: { label: 'Finished', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  planned: { label: 'Planned', color: 'text-slate-400', dot: 'bg-slate-500' },
}

interface BookCardProps {
  book: Book
  onAddPages: (id: string, delta: number) => void
}

function BookCard({ book, onAddPages }: BookCardProps) {
  const sc = statusConfig[book.status]
  const pct = Math.min((book.currentPage / book.totalPages) * 100, 100)

  return (
    <div className="rounded-lg border border-white/8 bg-white/4 p-3 flex flex-col gap-2">
      {/* Title + status */}
      <div className="flex items-start gap-2">
        <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0 mt-1.5', sc.dot)} />
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-xs font-bold text-white leading-snug">{book.title}</h4>
          <p className="font-sans text-[10px] text-slate-500">{book.author}</p>
        </div>
        {book.readingStreak > 0 && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Flame className="h-3 w-3 text-orange-400" />
            <span className="font-mono text-[10px] text-orange-300">{book.readingStreak}d</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {book.status !== 'planned' && (
        <>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-slate-500">
                p. {book.currentPage} / {book.totalPages}
              </span>
              <span className="font-mono text-[10px] text-cyan-400">{Math.round(pct)}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Today pages */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Today</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={cn(
                  'font-display text-sm font-bold leading-none',
                  book.todayPages >= book.dailyGoalPages ? 'text-emerald-400' : 'text-white'
                )}>{book.todayPages}</span>
                <span className="font-mono text-[10px] text-slate-600">/ {book.dailyGoalPages} pg</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onAddPages(book.id, -1)}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 border border-white/8 text-slate-400 hover:bg-white/10 transition-colors"
              >
                <Minus className="h-2.5 w-2.5" />
              </button>
              <button
                onClick={() => onAddPages(book.id, 1)}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/25 transition-colors"
              >
                <Plus className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>
        </>
      )}

      {book.status === 'planned' && (
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-slate-500">{book.totalPages} pages</span>
          <span className="font-mono text-[10px] text-slate-600">·</span>
          <span className="font-mono text-[10px] text-slate-500">Goal: {book.dailyGoalPages} pg/day</span>
        </div>
      )}

      {/* Highlight */}
      {book.highlight && (
        <div className="rounded bg-white/3 border border-white/5 px-2 py-1.5">
          <p className="font-sans text-[10px] text-slate-400 italic leading-relaxed line-clamp-2">{book.highlight}</p>
        </div>
      )}
    </div>
  )
}

interface Props {
  books: Book[]
  onAddPages: (id: string, delta: number) => void
}

export function ReadingTracker({ books, onAddPages }: Props) {
  const reading = books.filter(b => b.status === 'reading')
  const totalPages = reading.reduce((s, b) => s + b.todayPages, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.14 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Reading</h3>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500">{totalPages} pages today</span>
          <span className="font-mono text-[10px] text-cyan-400">{reading.length} active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <BookCard book={book} onAddPages={onAddPages} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
