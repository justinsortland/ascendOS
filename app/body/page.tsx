import { Dumbbell } from 'lucide-react'

export default function BodyPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/20">
          <Dumbbell className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Body</h1>
          <p className="text-xs text-slate-500">Macros, gym, cardio, meal prep</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-8 text-center">
        <p className="text-sm text-emerald-400 font-semibold">Coming in Phase 2</p>
        <p className="text-xs text-slate-500 mt-1">Macro tracker, gym log, cardio, meal prep</p>
      </div>
    </div>
  )
}
