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

// ─── Brain module ───────────────────────────────────────────────

export type ProjectStatus = 'active' | 'building' | 'planning' | 'paused' | 'shipped'
export type ProjectPriority = 'high' | 'medium' | 'low'
export type LeetCodeDifficulty = 'easy' | 'medium' | 'hard'
export type LeetCodeStatus =
  | 'not-started'
  | 'attempted'
  | 'solved-help'
  | 'solved-independent'
  | 'revisit'
  | 'mastered'
export type SkillNodeStatus = 'active' | 'needs-attention' | 'locked-in' | 'behind'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  currentSprint: string
  nextTask: string
  progress: number // 0–100
  shipStreak: number
  lastWorked: string
  recentMilestones: string[]
  githubUrl?: string
  xp: number
}

export interface LeetCodeProblem {
  id: string
  title: string
  difficulty: LeetCodeDifficulty
  pattern: string
  status: LeetCodeStatus
  timeMins?: number
  notes?: string
  url?: string
  solvedDate?: string
}

export interface LearningTrack {
  id: string
  name: string
  icon: string
  currentTopic: string
  targetMins: number
  completedMins: number
  nextAction: string
  skillLevel: number // 1–10
  targetSessions?: number   // for session-based tracks (Zetamac)
  completedSessions?: number
}

export interface VocabCard {
  id: string
  word: string
  translation: string
  example?: string
  reviewed: boolean
}

export interface Book {
  id: string
  title: string
  author: string
  currentPage: number
  totalPages: number
  status: 'reading' | 'paused' | 'finished' | 'planned'
  dailyGoalPages: number
  readingStreak: number
  todayPages: number
  highlight?: string
}

export interface SkillNode {
  id: string
  name: string
  icon: string
  level: number
  xp: number
  progress: number // 0–100
  status: SkillNodeStatus
}

export interface BrainInsight {
  id: string
  message: string
  priority: 'high' | 'medium' | 'low'
}

// ─── Spirit module ───────────────────────────────────────────────

export type MoodLevel = 'low' | 'neutral' | 'good' | 'great'
export type SpiritEntryType = 'gratitude' | 'dream' | 'meditation' | 'visualization' | 'review'

export interface GratitudeEntry {
  id: string
  date: string
  prompt: string
  content: string
  moodBefore: MoodLevel
  moodAfter: MoodLevel
  tags: string[]
}

export interface DreamEntry {
  id: string
  date: string
  title: string
  description: string
  lucidityLevel: number // 0–5
  vividnessLevel: number // 0–5
  emotionalTone: string
  dreamSigns: string[]
  realityCheckDone: boolean
  lucidityAchieved: boolean
}

export interface MeditationSession {
  id: string
  date: string
  durationMins: number
  moodBefore: MoodLevel
  moodAfter: MoodLevel
  notes?: string
  completed: boolean
}

export interface VisualizationSession {
  id: string
  date: string
  desiredState: string
  script?: string
  completed: boolean
  durationMins: number
  notes?: string
}

export interface EveningReviewEntry {
  id: string
  date: string
  wentWell: string
  feltHeavy: string
  avoided: string
  toRepair: string
  proudOf: string
  anchorTask: string
}

export interface SpiritInsight {
  id: string
  message: string
  priority: 'high' | 'medium' | 'low'
}

// ─── Weekly module ───────────────────────────────────────────────

export type WeeklyGoalCategory = 'body' | 'brain' | 'spirit' | 'execution'
export type WeeklyGoalStatus = 'on-track' | 'behind' | 'complete' | 'not-started'
export type GroceryCategory = 'protein' | 'carbs' | 'fats' | 'produce' | 'extras'

export interface WeeklyGoal {
  id: string
  category: WeeklyGoalCategory
  title: string
  target: number
  current: number
  unit: string
  priority: 'high' | 'medium' | 'low'
  status: WeeklyGoalStatus
}

export interface WeeklyMealPrepIdea {
  id: string
  name: string
  protein: number
  calories: number
  prepped: boolean
}

export interface GroceryItem {
  id: string
  name: string
  category: GroceryCategory
  purchased: boolean
}

export interface WeeklyWorkoutDay {
  day: string
  split: string
  cardio: boolean
  completed: boolean
  notes?: string
}

export interface TechBlock {
  id: string
  name: string
  type: 'project' | 'study'
  target: number
  completed: number
  unit: string
  color: string
}

export interface WeeklyResetItem {
  id: string
  label: string
  category: 'body' | 'brain' | 'spirit' | 'execution' | 'general'
  xp: number
  estimatedMins: number
  completed: boolean
}

export interface WeeklyReviewEntry {
  id: string
  date: string
  wins: string
  misses: string
  heavy: string
  momentum: string
  reduce: string
  repeat: string
  adjustment: string
  summary: string
}

// ─── Analytics module ───────────────────────────────────────────────

export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F'

export interface DailyMomentumPoint {
  day: string
  score: number
}

export interface NutritionDay {
  day: string
  calories: number
  protein: number
}

export interface StudyMinutesData {
  track: string
  minutes: number
  target: number
  color: string
}

export interface Bottleneck {
  id: string
  name: string
  severity: 'high' | 'medium' | 'low'
  why: string
  fix: string
  category: 'body' | 'brain' | 'spirit' | 'execution'
}

export interface AnalyticsReportCard {
  body: Grade
  brain: Grade
  spirit: Grade
  execution: Grade
  overall: Grade
  biggestWin: string
  biggestMiss: string
  bestDay: string
  worstDay: string
  adjustment: string
}
