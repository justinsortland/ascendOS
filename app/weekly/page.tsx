import { CalendarDays } from 'lucide-react'

export default function WeeklyPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/20">
          <CalendarDays className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Weekly</h1>
          <p className="text-xs text-slate-500">Weekly reset, review, planning</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-amber-500/10 bg-amber-950/20 p-8 text-center">
        <p className="text-sm text-amber-400 font-semibold">Coming in Phase 2</p>
        <p className="text-xs text-slate-500 mt-1">Weekly review, planning rituals, habit heatmap</p>
      </div>
    </div>
  )
}
