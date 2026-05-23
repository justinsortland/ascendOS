'use client'

import { useState } from 'react'
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
  initialLeetCodeProblems,
  recommendedProblem,
  weeklyLeetCodeGoal,
  weakTopics,
  initialLearningTracks,
  initialVocabCards,
  languageData,
  initialBooks,
  skillNodes,
  brainInsights,
} from '@/lib/brain-mock-data'
import type { Book, VocabCard } from '@/lib/types'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

export default function BrainPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [vocabCards, setVocabCards] = useState<VocabCard[]>(initialVocabCards)

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
        leetcodeProblems={initialLeetCodeProblems}
        tracks={initialLearningTracks}
        books={books}
      />

      {/* Projects */}
      <SectionLabel label="Project Campaigns" />
      <ProjectCampaigns projects={initialProjects} />

      {/* LeetCode */}
      <SectionLabel label="LeetCode" />
      <LeetCodeTracker
        problems={initialLeetCodeProblems}
        recommendedProblem={recommendedProblem}
        weeklyGoal={weeklyLeetCodeGoal}
        weakTopics={weakTopics}
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
