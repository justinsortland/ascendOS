'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SpiritOverview } from '@/components/spirit/SpiritOverview'
import { GratitudeJournal } from '@/components/spirit/GratitudeJournal'
import { DreamJournal } from '@/components/spirit/DreamJournal'
import { MeditationTracker } from '@/components/spirit/MeditationTracker'
import { LucidDreamingPractice } from '@/components/spirit/LucidDreamingPractice'
import { VisualizationCard } from '@/components/spirit/VisualizationCard'
import { EveningReview } from '@/components/spirit/EveningReview'
import { SpiritAIGuidePanel } from '@/components/spirit/SpiritAIGuidePanel'
import { SpiritInsightsPanel } from '@/components/spirit/SpiritInsightsPanel'
import { SpiritArchive } from '@/components/spirit/SpiritArchive'
import {
  INITIAL_SPIRIT_SCORE,
  INITIAL_SPIRIT_XP,
  REFLECTION_MODE,
  MEDITATION_STREAK,
  GRATITUDE_STREAK,
  DREAM_RECALL_SCORE,
  LUCID_PRACTICE_THIS_WEEK,
  VISUALIZATION_THIS_WEEK,
  initialGratitudeEntries,
  initialDreamEntries,
  initialMeditationSessions,
  initialVisualizationSessions,
  initialEveningReviews,
  spiritInsights,
} from '@/lib/spirit-mock-data'
import type {
  GratitudeEntry,
  DreamEntry,
  MeditationSession,
  VisualizationSession,
  EveningReviewEntry,
} from '@/lib/types'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-7 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/4" />
    </div>
  )
}

export default function SpiritPage() {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>(initialGratitudeEntries)
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>(initialDreamEntries)
  const [meditationSessions, setMeditationSessions] = useState<MeditationSession[]>(initialMeditationSessions)
  const [visualizationSessions, setVisualizationSessions] = useState<VisualizationSession[]>(initialVisualizationSessions)
  const [eveningReviews, setEveningReviews] = useState<EveningReviewEntry[]>(initialEveningReviews)

  function saveGratitude(entry: GratitudeEntry) {
    setGratitudeEntries(prev => [entry, ...prev])
  }
  function saveDream(entry: DreamEntry) {
    setDreamEntries(prev => [entry, ...prev])
  }
  function saveMeditation(session: MeditationSession) {
    setMeditationSessions(prev => [session, ...prev])
  }
  function saveVisualization(session: VisualizationSession) {
    setVisualizationSessions(prev => [session, ...prev])
  }
  function saveReview(entry: EveningReviewEntry) {
    setEveningReviews(prev => [entry, ...prev])
  }

  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <Sparkles className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-white">Spirit</h1>
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">Reflection Chamber</p>
        </div>
      </motion.div>

      {/* Overview */}
      <SpiritOverview
        spiritScore={INITIAL_SPIRIT_SCORE}
        spiritXp={INITIAL_SPIRIT_XP}
        reflectionMode={REFLECTION_MODE}
        meditationStreak={MEDITATION_STREAK}
        gratitudeStreak={GRATITUDE_STREAK}
        dreamRecallScore={DREAM_RECALL_SCORE}
        lucidPracticeThisWeek={LUCID_PRACTICE_THIS_WEEK}
        visualizationThisWeek={VISUALIZATION_THIS_WEEK}
      />

      {/* Journals */}
      <SectionLabel label="Journals" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GratitudeJournal entries={gratitudeEntries} onSave={saveGratitude} />
        <DreamJournal entries={dreamEntries} onSave={saveDream} />
      </div>

      {/* Practice */}
      <SectionLabel label="Practice" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MeditationTracker
          sessions={meditationSessions}
          streak={MEDITATION_STREAK}
          onSave={saveMeditation}
        />
        <LucidDreamingPractice
          lucidCountThisMonth={2}
          practiceStreak={5}
        />
      </div>

      {/* Visualization & Evening Review */}
      <SectionLabel label="Visualization & Review" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VisualizationCard sessions={visualizationSessions} onSave={saveVisualization} />
        <EveningReview entries={eveningReviews} onSave={saveReview} />
      </div>

      {/* AI Guide */}
      <SectionLabel label="AI Guide" />
      <SpiritAIGuidePanel />

      {/* Archive */}
      <SectionLabel label="Archive" />
      <SpiritArchive
        gratitudeEntries={gratitudeEntries}
        dreamEntries={dreamEntries}
        meditationSessions={meditationSessions}
        visualizationSessions={visualizationSessions}
        eveningReviews={eveningReviews}
      />

      {/* Insights */}
      <SectionLabel label="Insights" />
      <SpiritInsightsPanel insights={spiritInsights} />

      <div className="h-8" />
    </div>
  )
}
