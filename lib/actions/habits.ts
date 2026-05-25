'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function toggleHabit(habitId: string, completed: boolean) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (completed) {
      await prisma.habitCompletion.upsert({
        where: { habitId_date: { habitId, date: today } },
        update: {},
        create: { habitId, date: today },
      })
    } else {
      await prisma.habitCompletion.deleteMany({
        where: { habitId, date: today },
      })
    }
    revalidatePath('/body')
  } catch (e) {
    console.error('toggleHabit failed:', e)
  }
}
