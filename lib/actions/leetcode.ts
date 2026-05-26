'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

const SOLVED_STATUSES = ['solved-independent', 'solved-help', 'mastered']

export async function updateProblemStatus(
  id: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const data: { status: string; solvedDate?: string | null } = { status }
    if (SOLVED_STATUSES.includes(status)) {
      data.solvedDate = new Date().toISOString().split('T')[0]
    } else if (status === 'not-started') {
      data.solvedDate = null
    }

    // updateMany returns { count } instead of throwing when no record matches.
    const result = await prisma.leetCodeProblem.updateMany({ where: { id }, data })

    if (result.count === 0) {
      const msg = `No LeetCode problem found for id "${id}". Is the DB seeded? Run npm run db:seed.`
      console.error(`[leetcode/action] ${msg}`)
      return { success: false, error: msg }
    }

    console.log(`[leetcode/action] Updated problem id="${id}" → status="${status}"`)
    revalidatePath('/brain')
    return { success: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error(`[leetcode/action] updateProblemStatus threw for id="${id}":`, msg)
    return { success: false, error: msg }
  }
}

export async function addLeetCodeProblem(data: {
  title: string
  difficulty: string
  pattern: string
  url?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findFirst()
    if (!user) return { success: false, error: 'No user found in database' }

    await prisma.leetCodeProblem.create({
      data: { ...data, userId: user.id, status: 'not-started' },
    })
    revalidatePath('/brain')
    return { success: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[leetcode/action] addLeetCodeProblem failed:', msg)
    return { success: false, error: msg }
  }
}
