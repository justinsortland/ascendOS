export type TaskTier = 'non-negotiable' | 'enhancer' | 'optional'
export type Category = 'body' | 'brain' | 'spirit' | 'execution'
export type PomodoroPhase = 'idle' | 'focus' | 'break'

export interface Task {
  id: string
  title: string
  tier: TaskTier
  category: Category
  completed: boolean
  xp: number
}

export interface BonusQuest {
  id: string
  title: string
  xp: number
  category: Category
  completed: boolean
}

export interface CommandCardData {
  category: Category
  title: string
  xpPool: number
  streak: number
  progress: number // 0-100
}

export interface DailyMission {
  title: string
  description: string
  xp: number
  deadline: string
  completed: boolean
}

export interface AICoachMessage {
  id: string
  message: string
  type: 'encouragement' | 'warning' | 'tip'
  timestamp: string
}

export interface UserStats {
  level: number
  xp: number
  xpToNextLevel: number
  momentumScore: number
  streakDays: number
  rank: string
}
