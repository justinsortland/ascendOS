'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function toggleExerciseSet(setId: string, completed: boolean) {
  try {
    await prisma.exerciseSet.update({
      where: { id: setId },
      data: { completed },
    })
    revalidatePath('/body')
  } catch (e) {
    console.error('toggleExerciseSet failed:', e)
  }
}

export async function completeWorkout(sessionId: string) {
  try {
    await prisma.workoutSession.update({
      where: { id: sessionId },
      data: { completed: true },
    })
    revalidatePath('/body')
  } catch (e) {
    console.error('completeWorkout failed:', e)
  }
}
