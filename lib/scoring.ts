import type { Task } from './types'

export function calculateMomentumScore(tasks: Task[]): number {
  const nonNeg = tasks.filter(t => t.tier === 'non-negotiable')
  const enhancers = tasks.filter(t => t.tier === 'enhancer')
  const optional = tasks.filter(t => t.tier === 'optional')

  const pct = (arr: Task[]) =>
    arr.length === 0 ? 0 : (arr.filter(t => t.completed).length / arr.length) * 100

  return Math.round(pct(nonNeg) * 0.6 + pct(enhancers) * 0.3 + pct(optional) * 0.1)
}

export function calculateXPEarned(tasks: Task[]): number {
  return tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0)
}

export function getLevelFromXP(totalXP: number): number {
  return Math.floor(totalXP / 500) + 1
}

export function getRank(level: number): string {
  if (level < 5) return 'Initiate'
  if (level < 10) return 'Seeker'
  if (level < 15) return 'Ascendant I'
  if (level < 20) return 'Ascendant II'
  if (level < 30) return 'Ascendant III'
  return 'Transcendent'
}

export function isMVDComplete(tasks: Task[]): boolean {
  const nonNeg = tasks.filter(t => t.tier === 'non-negotiable')
  return nonNeg.length > 0 && nonNeg.every(t => t.completed)
}
