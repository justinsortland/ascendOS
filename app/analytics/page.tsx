import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-500/15 border border-slate-500/20">
          <BarChart3 className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Analytics</h1>
          <p className="text-xs text-slate-500">Trends, streaks, XP history</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-white/8 bg-white/3 p-8 text-center">
        <p className="text-sm text-slate-400 font-semibold">Coming in Phase 2</p>
        <p className="text-xs text-slate-500 mt-1">XP charts, momentum trends, streak heatmap, Recharts</p>
      </div>
    </div>
  )
}
