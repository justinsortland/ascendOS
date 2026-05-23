'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Flame, ChevronRight, Check } from 'lucide-react'
import type { VocabCard } from '@/lib/types'
import { cn } from '@/lib/utils'

interface VocabCardFlipProps {
  card: VocabCard
  onReview: (id: string) => void
}

function VocabCardFlip({ card, onReview }: VocabCardFlipProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-lg border p-2.5 transition-all select-none',
        card.reviewed
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : 'border-white/8 bg-white/4 hover:bg-white/6'
      )}
      onClick={() => setFlipped(f => !f)}
    >
      <AnimatePresence mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between"
          >
            <span className="font-display text-xs font-bold text-white">{card.word}</span>
            <ChevronRight className="h-3 w-3 text-slate-600" />
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-cyan-300">{card.translation}</span>
              {!card.reviewed && (
                <button
                  onClick={e => { e.stopPropagation(); onReview(card.id) }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  <Check className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
            {card.example && (
              <p className="font-sans text-[10px] text-slate-500 italic leading-relaxed">{card.example}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface LanguageData {
  language: string
  level: string
  streak: number
  weeklyMinutes: number
  weeklyTarget: number
  vocabReviewed: number
  newWords: number
  confidenceScore: number
  dailyQuestCompleted: boolean
  aiPrompt: string
}

interface Props {
  data: LanguageData
  vocabCards: VocabCard[]
  onReviewCard: (id: string) => void
}

export function LanguageLearningCard({ data, vocabCards, onReviewCard }: Props) {
  const weeklyPct = Math.min((data.weeklyMinutes / data.weeklyTarget) * 100, 100)
  const reviewedCount = vocabCards.filter(c => c.reviewed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-white">Language</h3>
          <p className="font-mono text-[10px] text-slate-500">{data.language} · {data.level}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="font-mono text-[11px] font-bold text-orange-300">{data.streak}</span>
          <span className="font-mono text-[10px] text-slate-500">day streak</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg bg-white/4 border border-white/6 px-2.5 py-2 text-center">
          <div className="font-display text-base font-bold text-white">{data.weeklyMinutes}</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">min / week</div>
        </div>
        <div className="rounded-lg bg-white/4 border border-white/6 px-2.5 py-2 text-center">
          <div className="font-display text-base font-bold text-cyan-400">{data.vocabReviewed}</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">vocab reviewed</div>
        </div>
        <div className="rounded-lg bg-white/4 border border-white/6 px-2.5 py-2 text-center">
          <div className="font-display text-base font-bold text-emerald-400">{data.confidenceScore}%</div>
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">confidence</div>
        </div>
      </div>

      {/* Weekly progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Weekly Target</span>
          <span className="font-mono text-[10px] text-cyan-400">{data.weeklyMinutes}/{data.weeklyTarget} min</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${weeklyPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
      </div>

      {/* Vocab cards */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Today's Vocab</span>
          <span className="font-mono text-[10px] text-slate-400">{reviewedCount}/{vocabCards.length} reviewed</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {vocabCards.map(card => (
            <VocabCardFlip key={card.id} card={card} onReview={onReviewCard} />
          ))}
        </div>
      </div>

      {/* AI prompt */}
      <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/15 p-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500 block mb-1.5">Practice Prompt</span>
        <p className="font-sans text-[11px] text-slate-300 leading-relaxed">{data.aiPrompt}</p>
      </div>
    </motion.div>
  )
}
