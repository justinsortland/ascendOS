import { Sparkles } from 'lucide-react'

export default function SpiritPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 border border-violet-500/20">
          <Sparkles className="h-4 w-4 text-violet-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Spirit</h1>
          <p className="text-xs text-slate-500">Gratitude, dream journal, meditation, SATS</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-violet-500/10 bg-violet-950/20 p-8 text-center">
        <p className="text-sm text-violet-400 font-semibold">Coming in Phase 2</p>
        <p className="text-xs text-slate-500 mt-1">Journals, meditation tracker, visualization log</p>
      </div>
    </div>
  )
}
