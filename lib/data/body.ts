import { prisma } from '@/lib/db'
import {
  morningHabits as initialHabits,
  initialMeals,
  initialWaterOz,
  todaysWorkout as initialWorkout,
  macroTargets,
} from '@/lib/body-mock-data'
import type { MorningHabit, BodyMeal, WorkoutSession, MacroTargets } from '@/lib/types'

export async function getHabits(): Promise<MorningHabit[]> {
  try {
    const dbHabits = await prisma.habit.findMany({ orderBy: { createdAt: 'asc' } })
    if (dbHabits.length === 0) return initialHabits

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const completions = await prisma.habitCompletion.findMany({
      where: { date: { gte: today, lt: tomorrow } },
    })
    const completedIds = new Set(completions.map((c: { habitId: string }) => c.habitId))

    return dbHabits.map((h) => ({
      id: h.id,
      label: h.label,
      tier: h.tier as MorningHabit['tier'],
      tierLabel: h.tierLabel,
      streak: h.streak,
      duration: h.duration,
      description: h.description,
      completed: completedIds.has(h.id),
    }))
  } catch {
    return initialHabits
  }
}

export async function getMacroTargets(): Promise<MacroTargets> {
  try {
    const goal = await prisma.macroGoal.findFirst()
    if (!goal) return macroTargets

    return {
      calories: goal.calories,
      protein: goal.protein,
      carbs: goal.carbs,
      fat: goal.fat,
      waterOz: goal.waterOz,
    }
  } catch {
    return macroTargets
  }
}

export async function getTodayMeals(): Promise<BodyMeal[]> {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dbMeals = await prisma.meal.findMany({
      where: { date: { gte: today, lt: tomorrow } },
      orderBy: { createdAt: 'asc' },
    })

    if (dbMeals.length === 0) return initialMeals

    return dbMeals.map((m) => ({
      id: m.id,
      name: m.name,
      time: m.time,
      calories: m.calories,
      protein: m.protein,
      carbs: m.carbs,
      fat: m.fat,
      source: m.source as BodyMeal['source'],
      notes: m.notes ?? undefined,
    }))
  } catch {
    return initialMeals
  }
}

export async function getTodayWater(): Promise<number> {
  // Water tracking is currently local state — return default
  return initialWaterOz
}

export async function getTodayWorkout(): Promise<WorkoutSession> {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dbSession = await prisma.workoutSession.findFirst({
      where: { date: { gte: today, lt: tomorrow } },
      include: { exercises: true },
    })

    if (!dbSession) return initialWorkout

    return {
      id: dbSession.id,
      split: dbSession.split as WorkoutSession['split'],
      name: dbSession.name,
      date: dbSession.date.toISOString().split('T')[0],
      estimatedCalories: dbSession.estimatedCalories,
      completed: dbSession.completed,
      exercises: dbSession.exercises.map((e) => ({
        id: e.id,
        name: e.exerciseName,
        sets: [
          {
            id: e.id,
            reps: e.reps,
            weight: e.weight,
            completed: e.completed,
          },
        ],
      })),
    }
  } catch {
    return initialWorkout
  }
}
