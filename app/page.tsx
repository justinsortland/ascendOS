import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { getDashboardTasks, getBonusQuests, getDailyMission, getUserStats } from '@/lib/data/dashboard'

export default async function DashboardPage() {
  const [tasks, quests, mission, stats] = await Promise.all([
    getDashboardTasks(),
    getBonusQuests(),
    getDailyMission(),
    getUserStats(),
  ])

  return (
    <DashboardShell
      initialTasks={tasks}
      initialQuests={quests}
      initialMission={mission}
      initialStats={stats}
    />
  )
}
