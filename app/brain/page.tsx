import { Brain } from 'lucide-react'

export default function BrainPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/20">
          <Brain className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Brain</h1>
          <p className="text-xs text-slate-500">Projects, LeetCode, learning, reading</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-cyan-500/10 bg-cyan-950/20 p-8 text-center">
        <p className="text-sm text-cyan-400 font-semibold">Coming in Phase 2</p>
        <p className="text-xs text-slate-500 mt-1">Project tracker, LeetCode log, study modules</p>
      </div>
    </div>
  )
}
