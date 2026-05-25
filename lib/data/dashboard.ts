import { prisma } from '@/lib/db'
import { mockTasks, mockBonusQuests, mockDailyMission, mockUserStats } from '@/lib/mock-data'
import type { Task, BonusQuest } from '@/lib/types'

export async function getDashboardTasks(): Promise<Task[]> {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dbTasks = await prisma.task.findMany({
      where: {
        date: { gte: today, lt: tomorrow },
      },
      orderBy: { createdAt: 'asc' },
    })

    if (dbTasks.length === 0) return mockTasks

    return dbTasks.map((t) => ({
      id: t.id,
      title: t.title,
      tier: t.tier as Task['tier'],
      category: t.category as Task['category'],
      completed: t.completed,
      xp: t.xp,
    }))
  } catch {
    return mockTasks
  }
}

export async function getBonusQuests(): Promise<BonusQuest[]> {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dbQuests = await prisma.bonusQuest.findMany({
      where: { date: { gte: today, lt: tomorrow } },
      orderBy: { createdAt: 'asc' },
    })

    if (dbQuests.length === 0) return mockBonusQuests

    return dbQuests.map((q) => ({
      id: q.id,
      title: q.title,
      xp: q.xp,
      category: q.category as BonusQuest['category'],
      completed: q.completed,
    }))
  } catch {
    return mockBonusQuests
  }
}

export async function getUserStats() {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return mockUserStats

    return {
      level: user.level,
      xp: user.xp,
      xpToNextLevel: Math.ceil(user.level * 1000 * 1.15),
      momentumScore: 78, // derived — computed separately
      streakDays: user.streakDays,
      rank: user.rank,
    }
  } catch {
    return mockUserStats
  }
}

export type DailyMissionData = typeof mockDailyMission

export async function getDailyMission(): Promise<DailyMissionData> {
  // Daily mission is currently not stored in DB — return mock
  return mockDailyMission
}
