'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Archive, Heart, Moon, Wind, Focus, Sunset } from 'lucide-react'
import type {
  GratitudeEntry,
  DreamEntry,
  MeditationSession,
  VisualizationSession,
  EveningReviewEntry,
  SpiritEntryType,
  MoodLevel,
} from '@/lib/types'
import { cn } from '@/lib/utils'

type Tab = 'all' | SpiritEntryType

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'gratitude', label: 'Gratitude' },
  { key: 'dream', label: 'Dreams' },
  { key: 'meditation', label: 'Meditation' },
  { key: 'visualization', label: 'Visualization' },
  { key: 'review', label: 'Review' },
]

const typeConfig: Record<SpiritEntryType, { icon: typeof Heart; color: string; bg: string; label: string }> = {
  gratitude: { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Gratitude' },
  dream: { icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: 'Dream' },
  meditation: { icon: Wind, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Meditation' },
  visualization: { icon: Focus, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Visualization' },
  review: { icon: Sunset, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Review' },
}

const moodColor: Record<MoodLevel, string> = {
  low: 'text-rose-400', neutral: 'text-slate-400', good: 'text-cyan-400', great: 'text-emerald-400',
}

interface ArchiveItem {
  type: SpiritEntryType
  id: string
  date: string
  preview: string
  meta?: string
  mood?: MoodLevel
  tags?: string[]
}

function toArchiveItems(
  gratitude: GratitudeEntry[],
  dreams: DreamEntry[],
  meditation: MeditationSession[],
  visualization: VisualizationSession[],
  reviews: EveningReviewEntry[],
): ArchiveItem[] {
  return [
    ...gratitude.map(e => ({ type: 'gratitude' as const, id: e.id, date: e.date, preview: e.content, mood: e.moodAfter, tags: e.tags })),
    ...dreams.map(e => ({ type: 'dream' as const, id: e.id, date: e.date, preview: e.description, meta: `Lucid ${e.lucidityLevel}/5 · Vivid ${e.vividnessLevel}/5` })),
    ...meditation.map(e => ({ type: 'meditation' as const, id: e.id, date: e.date, preview: e.notes ?? `${e.durationMins} min session`, mood: e.moodAfter })),
    ...visualization.map(e => ({ type: 'visualization' as const, id: e.id, date: e.date, preview: e.desiredState, meta: `${e.durationMins} min${e.completed ? ' · Done' : ''}` })),
    ...reviews.map(e => ({ type: 'review' as const, id: e.id, date: e.date, preview: e.anchorTask })),
  ]
}

interface Props {
  gratitudeEntries: GratitudeEntry[]
  dreamEntries: DreamEntry[]
  meditationSessions: MeditationSession[]
  visualizationSessions: VisualizationSession[]
  eveningReviews: EveningReviewEntry[]
}

export function SpiritArchive({ gratitudeEntries, dreamEntries, meditationSessions, visualizationSessions, eveningReviews }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const allItems = toArchiveItems(gratitudeEntries, dreamEntries, meditationSessions, visualizationSessions, eveningReviews)
  const filtered = activeTab === 'all' ? allItems : allItems.filter(item => item.type === activeTab)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Archive className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Spirit Archive</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{allItems.length} entries</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white/4 rounded-lg p-0.5 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'flex-shrink-0 rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap',
              activeTab === t.key
                ? 'bg-violet-500/20 text-violet-300'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <p className="font-mono text-[11px] text-slate-600 text-center py-6">No entries yet.</p>
      ) : (
        <div className="space-y-2">
          {filtered.slice(0, 8).map((item, i) => {
            const cfg = typeConfig[item.type]
            const Icon = cfg.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/3 px-3 py-2.5"
              >
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0 mt-0.5', cfg.bg)}>
                  <Icon className={cn('h-3 w-3', cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn('font-mono text-[9px] uppercase tracking-widest', cfg.color)}>{cfg.label}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.date}</span>
                    {item.mood && <span className={cn('font-mono text-[10px]', moodColor[item.mood])}>↑ {item.mood}</span>}
                  </div>
                  <p className="font-sans text-xs text-slate-300 truncate">{item.preview}</p>
                  {item.meta && <p className="font-mono text-[10px] text-slate-600 mt-0.5">{item.meta}</p>}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-violet-500/8 border border-violet-500/12 text-violet-500 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
