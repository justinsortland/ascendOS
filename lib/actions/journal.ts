'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function saveGratitudeEntry(data: {
  prompt: string
  content: string
  moodBefore: string
  moodAfter: string
  tags: string[]
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.journalEntry.create({
      data: { ...data, userId: user.id, date: new Date() },
    })
    revalidatePath('/spirit')
  } catch (e) {
    console.error('saveGratitudeEntry failed:', e)
  }
}

export async function saveDreamEntry(data: {
  title: string
  description: string
  lucidityLevel: number
  vividnessLevel: number
  emotionalTone: string
  dreamSigns: string[]
  realityCheckDone: boolean
  lucidityAchieved: boolean
}): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return { success: false, error: 'No user found in database' }

    const created = await prisma.dreamEntry.create({
      data: { ...data, userId: user.id, date: new Date() },
    })

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[journal/action] saveDreamEntry: created id="${created.id}" title="${created.title}"`)
    }

    revalidatePath('/spirit')
    return { success: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[journal/action] saveDreamEntry failed:', msg)
    return { success: false, error: msg }
  }
}

export async function saveMeditationSession(data: {
  durationMins: number
  moodBefore: string
  moodAfter: string
  notes?: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.meditationSession.create({
      data: { ...data, userId: user.id, completed: true, date: new Date() },
    })
    revalidatePath('/spirit')
  } catch (e) {
    console.error('saveMeditationSession failed:', e)
  }
}

export async function saveVisualizationSession(data: {
  desiredState: string
  script?: string
  durationMins: number
  notes?: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.visualizationSession.create({
      data: { ...data, userId: user.id, completed: true, date: new Date() },
    })
    revalidatePath('/spirit')
  } catch (e) {
    console.error('saveVisualizationSession failed:', e)
  }
}

export async function saveEveningReview(data: {
  wentWell: string
  feltHeavy: string
  avoided: string
  toRepair: string
  proudOf: string
  anchorTask: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.eveningReview.create({
      data: { ...data, userId: user.id, date: new Date() },
    })
    revalidatePath('/spirit')
  } catch (e) {
    console.error('saveEveningReview failed:', e)
  }
}
