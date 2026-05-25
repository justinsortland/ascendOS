'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function toggleTask(id: string, completed: boolean) {
  try {
    await prisma.task.update({
      where: { id },
      data: { completed },
    })
    revalidatePath('/')
  } catch (e) {
    console.error('toggleTask failed:', e)
  }
}

export async function createTask(data: {
  title: string
  tier: string
  category: string
  xp: number
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.task.create({
      data: {
        ...data,
        userId: user.id,
        date: new Date(),
      },
    })
    revalidatePath('/')
  } catch (e) {
    console.error('createTask failed:', e)
  }
}

export async function toggleBonusQuest(id: string, completed: boolean) {
  try {
    await prisma.bonusQuest.update({
      where: { id },
      data: { completed },
    })
    revalidatePath('/')
  } catch (e) {
    console.error('toggleBonusQuest failed:', e)
  }
}
