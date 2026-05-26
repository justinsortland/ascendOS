import { prisma } from '@/lib/db'
import {
  initialGratitudeEntries,
  initialDreamEntries,
  initialMeditationSessions,
  initialVisualizationSessions,
  initialEveningReviews,
} from '@/lib/spirit-mock-data'
import type {
  GratitudeEntry,
  DreamEntry,
  MeditationSession,
  VisualizationSession,
  EveningReviewEntry,
} from '@/lib/types'

export type SpiritDataSource = 'db' | 'mock'

export type GratitudeResult = { entries: GratitudeEntry[]; source: SpiritDataSource }

export async function getGratitudeEntries(): Promise<GratitudeResult> {
  try {
    const dbEntries = await prisma.journalEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    if (dbEntries.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[spirit/data] getGratitudeEntries: DB returned 0 rows → mock fallback.')
      }
      return { entries: initialGratitudeEntries, source: 'mock' }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[spirit/data] getGratitudeEntries: ${dbEntries.length} entries from DB`)
    }
    return {
      source: 'db',
      entries: dbEntries.map((e) => ({
        id: e.id,
        date: e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        prompt: e.prompt,
        content: e.content,
        moodBefore: e.moodBefore as GratitudeEntry['moodBefore'],
        moodAfter: e.moodAfter as GratitudeEntry['moodAfter'],
        tags: e.tags,
      })),
    }
  } catch (e) {
    console.error('[spirit/data] getGratitudeEntries: DB error → mock fallback:', e)
    return { entries: initialGratitudeEntries, source: 'mock' }
  }
}

export type DreamResult = { entries: DreamEntry[]; source: SpiritDataSource }

export async function getDreamEntries(): Promise<DreamResult> {
  try {
    const dbEntries = await prisma.dreamEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    if (dbEntries.length === 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[spirit/data] getDreamEntries: DB returned 0 rows → mock fallback.')
      }
      return { entries: initialDreamEntries, source: 'mock' }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[spirit/data] getDreamEntries: ${dbEntries.length} entries from DB`)
    }
    return {
      source: 'db',
      entries: dbEntries.map((e) => ({
        id: e.id,
        date: e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        title: e.title,
        description: e.description,
        lucidityLevel: e.lucidityLevel,
        vividnessLevel: e.vividnessLevel,
        emotionalTone: e.emotionalTone,
        dreamSigns: e.dreamSigns,
        realityCheckDone: e.realityCheckDone,
        lucidityAchieved: e.lucidityAchieved,
      })),
    }
  } catch (e) {
    console.error('[spirit/data] getDreamEntries: DB error → mock fallback:', e)
    return { entries: initialDreamEntries, source: 'mock' }
  }
}

export async function getMeditationSessions(): Promise<MeditationSession[]> {
  try {
    const dbSessions = await prisma.meditationSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    if (dbSessions.length === 0) return initialMeditationSessions

    return dbSessions.map((s) => ({
      id: s.id,
      date: s.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      durationMins: s.durationMins,
      moodBefore: s.moodBefore as MeditationSession['moodBefore'],
      moodAfter: s.moodAfter as MeditationSession['moodAfter'],
      notes: s.notes ?? undefined,
      completed: s.completed,
    }))
  } catch {
    return initialMeditationSessions
  }
}

export async function getVisualizationSessions(): Promise<VisualizationSession[]> {
  try {
    const dbSessions = await prisma.visualizationSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    if (dbSessions.length === 0) return initialVisualizationSessions

    return dbSessions.map((s) => ({
      id: s.id,
      date: s.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      desiredState: s.desiredState,
      script: s.script ?? undefined,
      completed: s.completed,
      durationMins: s.durationMins,
      notes: s.notes ?? undefined,
    }))
  } catch {
    return initialVisualizationSessions
  }
}

export async function getEveningReviews(): Promise<EveningReviewEntry[]> {
  try {
    const dbReviews = await prisma.eveningReview.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    if (dbReviews.length === 0) return initialEveningReviews

    return dbReviews.map((r) => ({
      id: r.id,
      date: r.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      wentWell: r.wentWell,
      feltHeavy: r.feltHeavy,
      avoided: r.avoided,
      toRepair: r.toRepair,
      proudOf: r.proudOf,
      anchorTask: r.anchorTask,
    }))
  } catch {
    return initialEveningReviews
  }
}
