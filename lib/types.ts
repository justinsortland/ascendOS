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

// ─── Body module ───────────────────────────────────────────────

export type HabitTier = 'core' | 'enhancer' | 'optional'
export type BodyMode = 'cut' | 'bulk' | 'maintenance'
export type MealSource = 'manual' | 'ai-estimate' | 'restaurant' | 'meal-prep'
export type WorkoutSplit = 'push' | 'pull' | 'legs' | 'rest' | 'upper' | 'lower'

export interface MorningHabit {
  id: string
  label: string
  tier: HabitTier
  tierLabel: string
  streak: number
  duration: string
  description: string
  completed: boolean
}

export interface MacroTargets {
  calories: number
  protein: number
  carbs: number
  fat: number
  waterOz: number
}

export interface BodyMeal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  source: MealSource
  notes?: string
}

export interface GymSet {
  id: string
  reps: number
  weight: string
  completed: boolean
}

export interface ExercisePlan {
  id: string
  name: string
  sets: GymSet[]
  notes?: string
}

export interface WorkoutSession {
  id: string
  split: WorkoutSplit
  name: string
  date: string
  exercises: ExercisePlan[]
  estimatedCalories: number
  completed: boolean
}

export interface CardioSession {
  id: string
  type: string
  durationMins: number
  incline?: number
  speedMph?: number
  distanceMi?: number
  estimatedCalories: number
  notes?: string
  completed: boolean
}

export interface BodyInsight {
  id: string
  message: string
  priority: 'high' | 'medium' | 'low'
}

export interface WeeklyDay {
  day: string
  sets: number
  trained: boolean
}
