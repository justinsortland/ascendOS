'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function updateProblemStatus(id: string, status: string) {
  try {
    await prisma.leetCodeProblem.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/brain')
  } catch (e) {
    console.error('updateProblemStatus failed:', e)
  }
}

export async function addLeetCodeProblem(data: {
  title: string
  difficulty: string
  pattern: string
  url?: string
}) {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return

    await prisma.leetCodeProblem.create({
      data: { ...data, userId: user.id, status: 'not-started' },
    })
    revalidatePath('/brain')
  } catch (e) {
    console.error('addLeetCodeProblem failed:', e)
  }
}
