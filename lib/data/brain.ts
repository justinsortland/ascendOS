import { prisma } from '@/lib/db'
import {
  initialProjects,
  initialLeetCodeProblems,
  initialLearningTracks,
  initialVocabCards,
  initialBooks,
} from '@/lib/brain-mock-data'
import type { Project, LeetCodeProblem, LearningTrack, VocabCard, Book } from '@/lib/types'

export async function getProjects(): Promise<Project[]> {
  try {
    const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'asc' } })
    if (dbProjects.length === 0) return initialProjects

    return dbProjects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status as Project['status'],
      priority: p.priority as Project['priority'],
      currentSprint: p.currentSprint,
      nextTask: p.nextTask,
      progress: p.progress,
      shipStreak: p.shipStreak,
      lastWorked: p.lastWorked,
      recentMilestones: p.recentMilestones,
      githubUrl: p.githubUrl ?? undefined,
      xp: p.xp,
    }))
  } catch {
    return initialProjects
  }
}

export type LeetCodeResult = {
  problems: LeetCodeProblem[]
  source: 'db' | 'mock'
}

export async function getLeetCodeProblems(): Promise<LeetCodeResult> {
  try {
    const dbProblems = await prisma.leetCodeProblem.findMany({ orderBy: { createdAt: 'asc' } })

    if (dbProblems.length === 0) {
      console.warn('[brain/data] getLeetCodeProblems: DB returned 0 rows → mock fallback. Run `npm run db:seed`.')
      return { problems: initialLeetCodeProblems, source: 'mock' }
    }

    console.log(
      `[brain/data] getLeetCodeProblems: ${dbProblems.length} rows from DB` +
      ` (ids: ${dbProblems.slice(0, 3).map(p => p.id).join(', ')}...)`
    )

    return {
      source: 'db',
      problems: dbProblems.map((p) => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty as LeetCodeProblem['difficulty'],
        pattern: p.pattern,
        status: p.status as LeetCodeProblem['status'],
        timeMins: p.timeMins ?? undefined,
        notes: p.notes ?? undefined,
        url: p.url ?? undefined,
        solvedDate: p.solvedDate ?? undefined,
      })),
    }
  } catch (e) {
    console.error('[brain/data] getLeetCodeProblems: DB error → mock fallback:', e)
    return { problems: initialLeetCodeProblems, source: 'mock' }
  }
}

export async function getLearningTracks(): Promise<LearningTrack[]> {
  try {
    const dbTracks = await prisma.learningTrack.findMany({ orderBy: { createdAt: 'asc' } })
    if (dbTracks.length === 0) return initialLearningTracks

    return dbTracks.map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      currentTopic: t.currentTopic,
      targetMins: t.targetMins,
      completedMins: t.completedMins,
      nextAction: t.nextAction,
      skillLevel: t.skillLevel,
      targetSessions: t.targetSessions ?? undefined,
      completedSessions: t.completedSessions ?? undefined,
    }))
  } catch {
    return initialLearningTracks
  }
}

export async function getVocabCards(): Promise<VocabCard[]> {
  try {
    const dbCards = await prisma.vocabCard.findMany({ orderBy: { createdAt: 'asc' } })
    if (dbCards.length === 0) return initialVocabCards

    return dbCards.map((c) => ({
      id: c.id,
      word: c.word,
      translation: c.translation,
      example: c.example ?? undefined,
      reviewed: c.reviewed,
    }))
  } catch {
    return initialVocabCards
  }
}

export async function getBooks(): Promise<Book[]> {
  try {
    const dbBooks = await prisma.book.findMany({ orderBy: { createdAt: 'asc' } })
    if (dbBooks.length === 0) return initialBooks

    return dbBooks.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      currentPage: b.currentPage,
      totalPages: b.totalPages,
      status: b.status as Book['status'],
      dailyGoalPages: b.dailyGoalPages,
      readingStreak: b.readingStreak,
      todayPages: b.todayPages,
      highlight: b.highlight ?? undefined,
    }))
  } catch {
    return initialBooks
  }
}
