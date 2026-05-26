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
  initialMeditationSessions,
  initialVisualizationSessions,
  initialEveningReviews,
  spiritInsights,
} from '@/lib/spirit-mock-data'
import {
  saveGratitudeEntry,
  saveDreamEntry,
  saveMeditationSession,
  saveVisualizationSession,
  saveEveningReview,
} from '@/lib/actions/journal'
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

interface Props {
  initialGratitudeEntries: GratitudeEntry[]
  initialDreamEntries: DreamEntry[]
  dataSource: 'db' | 'mock'
}

export function SpiritShell({ initialGratitudeEntries, initialDreamEntries, dataSource }: Props) {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>(initialGratitudeEntries)
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>(initialDreamEntries)
  const [meditationSessions, setMeditationSessions] = useState<MeditationSession[]>(initialMeditationSessions)
  const [visualizationSessions, setVisualizationSessions] = useState<VisualizationSession[]>(initialVisualizationSessions)
  const [eveningReviews, setEveningReviews] = useState<EveningReviewEntry[]>(initialEveningReviews)

  async function handleSaveGratitude(entry: GratitudeEntry) {
    setGratitudeEntries(prev => [entry, ...prev])
    if (dataSource === 'mock') {
      console.warn('[SpiritShell] Mock mode — gratitude entry is session-local only.')
      return
    }
    await saveGratitudeEntry({
      prompt: entry.prompt,
      content: entry.content,
      moodBefore: entry.moodBefore,
      moodAfter: entry.moodAfter,
      tags: entry.tags,
    })
  }

  async function handleSaveDream(entry: DreamEntry) {
    setDreamEntries(prev => [entry, ...prev])
    if (dataSource === 'mock') {
      console.warn('[SpiritShell] Mock mode — dream entry is session-local only. Run `npm run db:seed`.')
      return
    }
    const result = await saveDreamEntry({
      title: entry.title,
      description: entry.description,
      lucidityLevel: entry.lucidityLevel,
      vividnessLevel: entry.vividnessLevel,
      emotionalTone: entry.emotionalTone,
      dreamSigns: entry.dreamSigns,
      realityCheckDone: entry.realityCheckDone,
      lucidityAchieved: entry.lucidityAchieved,
    })
    if (!result.success) {
      console.error('[SpiritShell] saveDreamEntry failed:', result.error)
    }
  }

  async function handleSaveMeditation(session: MeditationSession) {
    setMeditationSessions(prev => [session, ...prev])
    if (dataSource === 'mock') {
      console.warn('[SpiritShell] Mock mode — meditation session is session-local only.')
      return
    }
    await saveMeditationSession({
      durationMins: session.durationMins,
      moodBefore: session.moodBefore,
      moodAfter: session.moodAfter,
      notes: session.notes,
    })
  }

  async function handleSaveVisualization(session: VisualizationSession) {
    setVisualizationSessions(prev => [session, ...prev])
    if (dataSource === 'mock') {
      console.warn('[SpiritShell] Mock mode — visualization session is session-local only.')
      return
    }
    await saveVisualizationSession({
      desiredState: session.desiredState,
      script: session.script,
      durationMins: session.durationMins,
      notes: session.notes,
    })
  }

  async function handleSaveReview(entry: EveningReviewEntry) {
    setEveningReviews(prev => [entry, ...prev])
    if (dataSource === 'mock') {
      console.warn('[SpiritShell] Mock mode — evening review is session-local only.')
      return
    }
    await saveEveningReview({
      wentWell: entry.wentWell,
      feltHeavy: entry.feltHeavy,
      avoided: entry.avoided,
      toRepair: entry.toRepair,
      proudOf: entry.proudOf,
      anchorTask: entry.anchorTask,
    })
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
        <GratitudeJournal entries={gratitudeEntries} onSave={handleSaveGratitude} />
        <DreamJournal entries={dreamEntries} onSave={handleSaveDream} />
      </div>

      {/* Practice */}
      <SectionLabel label="Practice" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MeditationTracker
          sessions={meditationSessions}
          streak={MEDITATION_STREAK}
          onSave={handleSaveMeditation}
        />
        <LucidDreamingPractice
          lucidCountThisMonth={2}
          practiceStreak={5}
        />
      </div>

      {/* Visualization & Evening Review */}
      <SectionLabel label="Visualization & Review" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VisualizationCard sessions={visualizationSessions} onSave={handleSaveVisualization} />
        <EveningReview entries={eveningReviews} onSave={handleSaveReview} />
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
