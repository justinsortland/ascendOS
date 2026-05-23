'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DailyMissionCard } from '@/components/dashboard/DailyMissionCard'
import { MomentumScoreCard } from '@/components/dashboard/MomentumScoreCard'
import { XPLevelCard } from '@/components/dashboard/XPLevelCard'
import { CommandCard } from '@/components/dashboard/CommandCard'
import { TaskList } from '@/components/dashboard/TaskList'
import { MinimumViableDayCard } from '@/components/dashboard/MinimumViableDayCard'
import { BonusQuestsCard } from '@/components/dashboard/BonusQuestsCard'
import { PomodoroCard } from '@/components/dashboard/PomodoroCard'
import { AICoachPanel } from '@/components/dashboard/AICoachPanel'
import { QuickAddModal } from '@/components/dashboard/QuickAddModal'
import {
  mockTasks,
  mockCommandCards,
  mockDailyMission,
  mockAIMessages,
  mockBonusQuests,
  mockUserStats,
} from '@/lib/mock-data'
import { calculateMomentumScore, calculateXPEarned } from '@/lib/scoring'
import type { Task } from '@/lib/types'

const TODAY = new Date('2026-05-22').toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [mission, setMission] = useState(mockDailyMission)

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function addTask(task: Omit<Task, 'id' | 'completed'>) {
    setTasks(prev => [
      ...prev,
      { ...task, id: `custom-${Date.now()}`, completed: false },
    ])
  }

  const momentum = calculateMomentumScore(tasks)
  const xpEarned = calculateXPEarned(tasks)
  const stats = { ...mockUserStats, xp: mockUserStats.xp + xpEarned, momentumScore: momentum }

  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-6"
      >
        <div>
          <h1 className="font-display text-xl font-bold text-white tracking-tight">
            System online, Justin.
          </h1>
          <p className="font-mono text-[11px] text-slate-500 mt-0.5 tracking-wide">{TODAY}</p>
        </div>
        <div className="flex items-center gap-2">
          <QuickAddModal onAdd={addTask} />
        </div>
      </motion.div>

      {/* Row 1: Mission + stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <DailyMissionCard
            mission={mission}
            onComplete={() => setMission(m => ({ ...m, completed: true }))}
          />
        </div>
        <div className="space-y-4">
          <MomentumScoreCard score={momentum} streakDays={stats.streakDays} />
        </div>
      </div>

      {/* Row 2: XP + Command Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="col-span-1">
          <XPLevelCard stats={stats} />
        </div>
        {mockCommandCards.map((card, i) => (
          <div key={card.category} className="col-span-1">
            <CommandCard card={card} index={i} />
          </div>
        ))}
      </div>

      {/* Row 3: Tasks + Side panel */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <TaskList tasks={tasks} onToggle={toggleTask} />
        </div>
        <div className="space-y-4">
          <MinimumViableDayCard tasks={tasks} />
          <AICoachPanel messages={mockAIMessages} />
        </div>
      </div>

      {/* Row 4: Bonus + Pomodoro */}
      <div className="grid grid-cols-2 gap-4">
        <BonusQuestsCard quests={mockBonusQuests} />
        <PomodoroCard />
      </div>
    </div>
  )
}
