'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import { BodyOverview } from '@/components/body/BodyOverview'
import { MorningRoutineCard } from '@/components/body/MorningRoutineCard'
import { MacroTracker } from '@/components/body/MacroTracker'
import { MealLog } from '@/components/body/MealLog'
import { EatNextCard } from '@/components/body/EatNextCard'
import { GymTracker } from '@/components/body/GymTracker'
import { CardioTracker } from '@/components/body/CardioTracker'
import { MealPrepPreview } from '@/components/body/MealPrepPreview'
import { BodyInsightsPanel } from '@/components/body/BodyInsightsPanel'
import {
  macroTargets,
  initialMeals,
  initialWaterOz,
  todaysWorkout,
  bodyMode,
  bodyInsights,
} from '@/lib/body-mock-data'
import { toggleHabit as dbToggleHabit } from '@/lib/actions/habits'
import type { BodyMeal, MorningHabit, WorkoutSession } from '@/lib/types'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

interface Props {
  initialHabits: MorningHabit[]
  dataSource: 'db' | 'mock'
}

export function BodyShell({ initialHabits, dataSource }: Props) {
  const [habits, setHabits] = useState<MorningHabit[]>(initialHabits)
  const [meals, setMeals] = useState<BodyMeal[]>(initialMeals)
  const [waterOz, setWaterOz] = useState(initialWaterOz)
  const [workout, setWorkout] = useState<WorkoutSession>(todaysWorkout)
  const [cardioCompleted, setCardioCompleted] = useState(false)

  const handleToggleHabit = useCallback(async (id: string) => {
    const habit = habits.find(h => h.id === id)
    if (!habit) return
    const newCompleted = !habit.completed

    // Optimistic update
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: newCompleted } : h))

    if (dataSource === 'mock') {
      console.warn(
        `[BodyShell] Using mock data — habit toggle for "${id}" is session-local only.` +
        ' Configure DATABASE_URL and run `npm run db:seed` to enable persistence.'
      )
      return
    }

    await dbToggleHabit(id, newCompleted)
  }, [habits, dataSource])

  function addMeal(meal: Omit<BodyMeal, 'id'>) {
    setMeals(m => [...m, { ...meal, id: `meal-${Date.now()}` }])
  }

  const workoutCompleted = workout.completed

  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
          <Dumbbell className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-white">Body</h1>
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">Physical Optimization Cockpit</p>
        </div>
      </motion.div>

      {/* Overview */}
      <BodyOverview
        meals={meals}
        waterOz={waterOz}
        targets={macroTargets}
        mode={bodyMode}
        habits={habits}
        workoutCompleted={workoutCompleted}
        cardioCompleted={cardioCompleted}
        workoutName={workout.name}
      />

      {/* Nutrition */}
      <SectionLabel label="Nutrition" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <MacroTracker meals={meals} targets={macroTargets} waterOz={waterOz} onWaterChange={setWaterOz} />
        </div>
        <div>
          <MorningRoutineCard habits={habits} onToggle={handleToggleHabit} />
        </div>
      </div>

      {/* Meal log */}
      <SectionLabel label="Meal Log" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <MealLog meals={meals} onAdd={addMeal} />
        </div>
        <div>
          <EatNextCard meals={meals} targets={macroTargets} />
        </div>
      </div>

      {/* Training */}
      <SectionLabel label="Training" />
      <GymTracker workout={workout} onWorkoutChange={setWorkout} />

      {/* Cardio + Meal prep */}
      <SectionLabel label="Cardio & Recovery" />
      <div className="grid grid-cols-2 gap-4">
        <CardioTracker />
        <MealPrepPreview />
      </div>

      {/* Insights */}
      <SectionLabel label="Insights" />
      <BodyInsightsPanel insights={bodyInsights} />

      <div className="h-8" />
    </div>
  )
}
