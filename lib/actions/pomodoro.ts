'use server'

import { prisma } from '@/lib/db'

export async function savePomodoroSession(data: {
  focusMins: number
  breakMins: number
  label?: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.pomodoroSession.create({
      data: {
        ...data,
        userId: user.id,
        completedAt: new Date(),
      },
    })
  } catch (e) {
    console.error('savePomodoroSession failed:', e)
  }
}
