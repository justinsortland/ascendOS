'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { WeeklyOverview } from '@/components/weekly/WeeklyOverview'
import { WeeklyThemeSelector } from '@/components/weekly/WeeklyThemeSelector'
import { WeeklyGoals } from '@/components/weekly/WeeklyGoals'
import { MealPrepPlanner } from '@/components/weekly/MealPrepPlanner'
import { WorkoutSplitPlanner } from '@/components/weekly/WorkoutSplitPlanner'
import { TechnicalSchedulePlanner } from '@/components/weekly/TechnicalSchedulePlanner'
import { LanguageSchedulePlanner } from '@/components/weekly/LanguageSchedulePlanner'
import { WeeklyResetChecklist } from '@/components/weekly/WeeklyResetChecklist'
import { WeeklyReview } from '@/components/weekly/WeeklyReview'
import { WeeklyAIStrategistPanel } from '@/components/weekly/WeeklyAIStrategistPanel'
import {
  CURRENT_WEEK,
  WEEKLY_RANK,
  MAIN_FOCUS,
  initialWeeklyGoals,
  initialMealPrepIdeas,
  initialGroceryItems,
  initialWorkoutDays,
  initialTechBlocks,
  initialResetItems,
  initialWeeklyReviews,
} from '@/lib/weekly-mock-data'
import type {
  WeeklyGoal,
  WeeklyMealPrepIdea,
  GroceryItem,
  WeeklyWorkoutDay,
  TechBlock,
  WeeklyResetItem,
  WeeklyReviewEntry,
} from '@/lib/types'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

export default function WeeklyPage() {
  const [theme, setTheme] = useState('Cut Cleanly')
  const [goals, setGoals] = useState<WeeklyGoal[]>(initialWeeklyGoals)
  const [mealPrepItems, setMealPrepItems] = useState<WeeklyMealPrepIdea[]>(initialMealPrepIdeas)
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(initialGroceryItems)
  const [workoutDays, setWorkoutDays] = useState<WeeklyWorkoutDay[]>(initialWorkoutDays)
  const [techBlocks, setTechBlocks] = useState<TechBlock[]>(initialTechBlocks)
  const [resetItems, setResetItems] = useState<WeeklyResetItem[]>(initialResetItems)
  const [weeklyReviews, setWeeklyReviews] = useState<WeeklyReviewEntry[]>(initialWeeklyReviews)

  function toggleMeal(id: string) {
    setMealPrepItems(prev => prev.map(m => m.id === id ? { ...m, prepped: !m.prepped } : m))
  }

  function toggleGrocery(id: string) {
    setGroceryItems(prev => prev.map(g => g.id === id ? { ...g, purchased: !g.purchased } : g))
  }

  function toggleWorkoutDay(day: string) {
    setWorkoutDays(prev => prev.map(d => d.day === day ? { ...d, completed: !d.completed } : d))
  }

  function updateTechBlock(id: string, delta: number) {
    setTechBlocks(prev => prev.map(b =>
      b.id === id ? { ...b, completed: Math.max(0, Math.min(b.target, b.completed + delta)) } : b
    ))
  }

  function toggleResetItem(id: string) {
    setResetItems(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r))
  }

  function saveReview(entry: WeeklyReviewEntry) {
    setWeeklyReviews(prev => [entry, ...prev])
  }

  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/20">
          <CalendarDays className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-white">Weekly Reset</h1>
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">Strategy Room</p>
        </div>
      </motion.div>

      {/* Overview */}
      <WeeklyOverview
        weekRange={CURRENT_WEEK}
        theme={theme}
        rank={WEEKLY_RANK}
        mainFocus={MAIN_FOCUS}
        goals={goals}
        resetItems={resetItems}
      />

      {/* Theme + Goals */}
      <SectionLabel label="Theme & Goals" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyThemeSelector theme={theme} onThemeChange={setTheme} />
        <WeeklyGoals goals={goals} />
      </div>

      {/* Body planning */}
      <SectionLabel label="Body Planning" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MealPrepPlanner
          meals={mealPrepItems}
          grocery={groceryItems}
          onToggleMeal={toggleMeal}
          onToggleGrocery={toggleGrocery}
        />
        <WorkoutSplitPlanner days={workoutDays} onToggleDay={toggleWorkoutDay} />
      </div>

      {/* Brain planning */}
      <SectionLabel label="Brain Planning" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TechnicalSchedulePlanner blocks={techBlocks} onUpdateBlock={updateTechBlock} />
        <LanguageSchedulePlanner />
      </div>

      {/* Reset checklist */}
      <SectionLabel label="Reset Checklist" />
      <WeeklyResetChecklist items={resetItems} onToggle={toggleResetItem} />

      {/* Review + AI */}
      <SectionLabel label="Weekly Review" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyReview entries={weeklyReviews} onSave={saveReview} />
        <WeeklyAIStrategistPanel />
      </div>

      <div className="h-8" />
    </div>
  )
}
