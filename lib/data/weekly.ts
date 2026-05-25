import { prisma } from '@/lib/db'
import {
  initialWeeklyGoals,
  initialWeeklyReviews,
  CURRENT_WEEK,
  WEEKLY_RANK,
  MAIN_FOCUS,
} from '@/lib/weekly-mock-data'
import type { WeeklyGoal, WeeklyReviewEntry } from '@/lib/types'

export async function getCurrentWeeklyPlan() {
  try {
    const plan = await prisma.weeklyPlan.findFirst({
      orderBy: { weekStart: 'desc' },
      include: { goals: true, reviews: { orderBy: { createdAt: 'desc' } } },
    })
    if (!plan) return null

    return {
      id: plan.id,
      weekRange: `${plan.weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${plan.weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      theme: plan.theme,
      mainFocus: plan.mainFocus,
      goals: plan.goals.map((g) => ({
        id: g.id,
        category: g.category as WeeklyGoal['category'],
        title: g.title,
        target: g.target,
        current: g.current,
        unit: g.unit,
        priority: g.priority as WeeklyGoal['priority'],
        status: g.status as WeeklyGoal['status'],
      })),
      reviews: plan.reviews.map((r) => ({
        id: r.id,
        date: r.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        wins: r.wins,
        misses: r.misses,
        heavy: r.heavy,
        momentum: r.momentum,
        reduce: r.reduce,
        repeat: r.repeat,
        adjustment: r.adjustment,
        summary: r.summary,
      })),
    }
  } catch {
    return null
  }
}

export async function getWeeklyGoals(): Promise<WeeklyGoal[]> {
  try {
    const plan = await prisma.weeklyPlan.findFirst({
      orderBy: { weekStart: 'desc' },
      include: { goals: true },
    })
    if (!plan || plan.goals.length === 0) return initialWeeklyGoals

    return plan.goals.map((g) => ({
      id: g.id,
      category: g.category as WeeklyGoal['category'],
      title: g.title,
      target: g.target,
      current: g.current,
      unit: g.unit,
      priority: g.priority as WeeklyGoal['priority'],
      status: g.status as WeeklyGoal['status'],
    }))
  } catch {
    return initialWeeklyGoals
  }
}

export async function getWeeklyReviews(): Promise<WeeklyReviewEntry[]> {
  try {
    const plan = await prisma.weeklyPlan.findFirst({
      orderBy: { weekStart: 'desc' },
      include: { reviews: { orderBy: { createdAt: 'desc' } } },
    })
    if (!plan || plan.reviews.length === 0) return initialWeeklyReviews

    return plan.reviews.map((r) => ({
      id: r.id,
      date: r.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      wins: r.wins,
      misses: r.misses,
      heavy: r.heavy,
      momentum: r.momentum,
      reduce: r.reduce,
      repeat: r.repeat,
      adjustment: r.adjustment,
      summary: r.summary,
    }))
  } catch {
    return initialWeeklyReviews
  }
}

export async function getWeeklyMeta() {
  try {
    const plan = await prisma.weeklyPlan.findFirst({ orderBy: { weekStart: 'desc' } })
    if (!plan) return { weekRange: CURRENT_WEEK, rank: WEEKLY_RANK, mainFocus: MAIN_FOCUS, theme: 'Cut Cleanly' }

    return {
      weekRange: `${plan.weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${plan.weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      rank: WEEKLY_RANK,
      mainFocus: plan.mainFocus,
      theme: plan.theme,
    }
  } catch {
    return { weekRange: CURRENT_WEEK, rank: WEEKLY_RANK, mainFocus: MAIN_FOCUS, theme: 'Cut Cleanly' }
  }
}
