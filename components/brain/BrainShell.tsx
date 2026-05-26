'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit } from 'lucide-react'
import { BrainOverview } from '@/components/brain/BrainOverview'
import { BrainInsightsPanel } from '@/components/brain/BrainInsightsPanel'
import { ProjectCampaigns } from '@/components/brain/ProjectCampaigns'
import { LeetCodeTracker } from '@/components/brain/LeetCodeTracker'
import { LearningTracks } from '@/components/brain/LearningTracks'
import { LanguageLearningCard } from '@/components/brain/LanguageLearningCard'
import { ReadingTracker } from '@/components/brain/ReadingTracker'
import { BrainAICoachPanel } from '@/components/brain/BrainAICoachPanel'
import { BrainSkillTree } from '@/components/brain/BrainSkillTree'
import {
  INITIAL_BRAIN_SCORE,
  INITIAL_BRAIN_XP,
  FOCUS_MODE,
  initialProjects,
  weeklyLeetCodeGoal,
  weakTopics,
  initialLearningTracks,
  initialVocabCards,
  languageData,
  initialBooks,
  skillNodes,
  brainInsights,
} from '@/lib/brain-mock-data'
import { updateProblemStatus } from '@/lib/actions/leetcode'
import type { Book, VocabCard, LeetCodeProblem, LeetCodeStatus } from '@/lib/types'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

interface Props {
  initialProblems: LeetCodeProblem[]
  /** Real DB id of the recommended problem (or the mock id if source === 'mock') */
  initialRecommendedId: string | null
  dataSource: 'db' | 'mock'
}

const SOLVED_STATUSES = ['solved-independent', 'solved-help', 'mastered']

export function BrainShell({ initialProblems, initialRecommendedId, dataSource }: Props) {
  const [problems, setProblems] = useState<LeetCodeProblem[]>(initialProblems)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [vocabCards, setVocabCards] = useState<VocabCard[]>(initialVocabCards)

  const handleStatusChange = useCallback(async (id: string, status: LeetCodeStatus) => {
    const snapshot = problems.find(p => p.id === id)

    // Optimistic update
    setProblems(prev => prev.map(p => {
      if (p.id !== id) return p
      const solvedDate = SOLVED_STATUSES.includes(status)
        ? (p.solvedDate ?? new Date().toISOString().split('T')[0])
        : status === 'not-started' ? undefined : p.solvedDate
      return { ...p, status, solvedDate }
    }))
    setUpdatingId(id)

    if (dataSource === 'mock') {
      console.warn(
        `[BrainShell] Using mock data — status change for "${id}" is session-local only.` +
        ' Configure DATABASE_URL and run `npm run db:seed` to enable persistence.'
      )
      setUpdatingId(null)
      return
    }

    const result = await updateProblemStatus(id, status)

    if (!result.success) {
      console.error(`[BrainShell] status update failed for id "${id}":`, result.error)
      if (snapshot) {
        setProblems(prev => prev.map(p => p.id === id ? snapshot : p))
      }
    }
    setUpdatingId(null)
  // problems is referenced via closure; dataSource is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problems, dataSource])

  function handleAddPages(id: string, delta: number) {
    setBooks(prev => prev.map(b =>
      b.id === id
        ? {
            ...b,
            todayPages: Math.max(0, b.todayPages + delta),
            currentPage: Math.min(b.totalPages, Math.max(0, b.currentPage + delta)),
          }
        : b
    ))
  }

  function handleReviewCard(id: string) {
    setVocabCards(prev => prev.map(c => c.id === id ? { ...c, reviewed: true } : c))
  }

  // Derive from live state using the ID passed from the server (real DB id or mock id).
  // Falls back to first revisit, then first problem overall — never touches mock data.
  const recommendedProblem =
    problems.find(p => p.id === initialRecommendedId) ??
    problems.find(p => p.status === 'revisit') ??
    problems[0]

  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/20">
          <BrainCircuit className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-white">Brain</h1>
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">Technical Training Cockpit</p>
        </div>
      </motion.div>

      {/* Overview */}
      <BrainOverview
        brainScore={INITIAL_BRAIN_SCORE}
        brainXp={INITIAL_BRAIN_XP}
        focusMode={FOCUS_MODE}
        projects={initialProjects}
        leetcodeProblems={problems}
        tracks={initialLearningTracks}
        books={books}
      />

      {/* Projects */}
      <SectionLabel label="Project Campaigns" />
      <ProjectCampaigns projects={initialProjects} />

      {/* LeetCode */}
      <SectionLabel label="LeetCode" />
      <LeetCodeTracker
        problems={problems}
        recommendedProblem={recommendedProblem}
        weeklyGoal={weeklyLeetCodeGoal}
        weakTopics={weakTopics}
        onStatusChange={handleStatusChange}
        updatingId={updatingId}
      />

      {/* Learning + Language */}
      <SectionLabel label="Learning Tracks" />
      <LearningTracks tracks={initialLearningTracks} />

      <SectionLabel label="Language & Reading" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LanguageLearningCard
          data={languageData}
          vocabCards={vocabCards}
          onReviewCard={handleReviewCard}
        />
        <ReadingTracker books={books} onAddPages={handleAddPages} />
      </div>

      {/* AI Coach */}
      <SectionLabel label="AI Coach" />
      <BrainAICoachPanel />

      {/* Skill Tree */}
      <SectionLabel label="Skill Tree" />
      <BrainSkillTree nodes={skillNodes} />

      {/* Insights */}
      <SectionLabel label="Insights" />
      <BrainInsightsPanel insights={brainInsights} />

      <div className="h-8" />
    </div>
  )
}
