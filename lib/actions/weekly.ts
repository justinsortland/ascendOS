'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function saveWeeklyReview(data: {
  wins: string
  misses: string
  heavy: string
  momentum: string
  reduce: string
  repeat: string
  adjustment: string
  summary: string
}) {
  try {
    const plan = await prisma.weeklyPlan.findFirst({ orderBy: { weekStart: 'desc' } })
    if (!plan) return

    await prisma.weeklyReview.create({
      data: { ...data, planId: plan.id },
    })
    revalidatePath('/weekly')
  } catch (e) {
    console.error('saveWeeklyReview failed:', e)
  }
}

export async function updateWeeklyTheme(theme: string) {
  try {
    const plan = await prisma.weeklyPlan.findFirst({ orderBy: { weekStart: 'desc' } })
    if (!plan) return

    await prisma.weeklyPlan.update({
      where: { id: plan.id },
      data: { theme },
    })
    revalidatePath('/weekly')
  } catch (e) {
    console.error('updateWeeklyTheme failed:', e)
  }
}

export async function updateGoalProgress(goalId: string, current: number) {
  try {
    await prisma.weeklyGoal.update({
      where: { id: goalId },
      data: { current },
    })
    revalidatePath('/weekly')
  } catch (e) {
    console.error('updateGoalProgress failed:', e)
  }
}
