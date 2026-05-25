'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function addMeal(data: {
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  source?: string
  notes?: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.meal.create({
      data: {
        ...data,
        source: data.source ?? 'manual',
        userId: user.id,
        date: new Date(),
      },
    })
    revalidatePath('/body')
  } catch (e) {
    console.error('addMeal failed:', e)
  }
}

export async function deleteMeal(id: string) {
  try {
    await prisma.meal.delete({ where: { id } })
    revalidatePath('/body')
  } catch (e) {
    console.error('deleteMeal failed:', e)
  }
}
