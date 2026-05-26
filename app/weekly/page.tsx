import { WeeklyShell } from '@/components/weekly/WeeklyShell'
import { getWeeklyMeta, getWeeklyReviews } from '@/lib/data/weekly'

export const dynamic = 'force-dynamic'

export default async function WeeklyPage() {
  const [meta, reviews] = await Promise.all([getWeeklyMeta(), getWeeklyReviews()])

  return (
    <WeeklyShell
      initialTheme={meta.theme}
      initialWeekRange={meta.weekRange}
      initialMainFocus={meta.mainFocus}
      initialReviews={reviews}
      dataSource={meta.source}
    />
  )
}
