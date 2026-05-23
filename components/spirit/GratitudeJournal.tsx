'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RefreshCw, Tag, ChevronDown, ChevronUp } from 'lucide-react'
import { gratitudePrompts, gratitudeTags } from '@/lib/spirit-mock-data'
import type { GratitudeEntry, MoodLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

const moodOptions: { value: MoodLevel; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-rose-400' },
  { value: 'neutral', label: 'Neutral', color: 'text-slate-400' },
  { value: 'good', label: 'Good', color: 'text-cyan-400' },
  { value: 'great', label: 'Great', color: 'text-emerald-400' },
]

const moodColor: Record<MoodLevel, string> = {
  low: 'text-rose-400', neutral: 'text-slate-400', good: 'text-cyan-400', great: 'text-emerald-400',
}

interface RecentEntryProps {
  entry: GratitudeEntry
}

function RecentEntry({ entry }: RecentEntryProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="rounded-lg border border-white/6 bg-white/3 overflow-hidden">
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-[10px] text-slate-500">{entry.date}</span>
            <span className={cn('font-mono text-[10px]', moodColor[entry.moodAfter])}>→ {entry.moodAfter}</span>
          </div>
          <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">{entry.content}</p>
        </div>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-slate-600 flex-shrink-0 mt-0.5" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-600 flex-shrink-0 mt-0.5" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2 border-t border-white/5 pt-2">
              <p className="font-sans text-[11px] text-slate-500 italic">{entry.prompt}</p>
              <div className="flex flex-wrap gap-1">
                {entry.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface Props {
  entries: GratitudeEntry[]
  onSave: (entry: GratitudeEntry) => void
}

export function GratitudeJournal({ entries, onSave }: Props) {
  const [prompt, setPrompt] = useState(gratitudePrompts[0])
  const [content, setContent] = useState('')
  const [moodBefore, setMoodBefore] = useState<MoodLevel>('neutral')
  const [moodAfter, setMoodAfter] = useState<MoodLevel>('neutral')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  function generatePrompt() {
    const current = gratitudePrompts.indexOf(prompt)
    const next = (current + 1) % gratitudePrompts.length
    setPrompt(gratitudePrompts[next])
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  function handleSave() {
    if (!content.trim()) return
    onSave({
      id: `g-${Date.now()}`,
      date: 'Just now',
      prompt,
      content: content.trim(),
      moodBefore,
      moodAfter,
      tags: selectedTags,
    })
    setContent('')
    setSelectedTags([])
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
          <Heart className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Gratitude Journal</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{entries.length} entries</span>
      </div>

      {/* Prompt */}
      <div className="rounded-lg bg-violet-500/6 border border-violet-500/15 px-4 py-3 mb-3 flex items-start justify-between gap-3">
        <p className="font-sans text-xs text-violet-200 leading-relaxed italic flex-1">{prompt}</p>
        <button
          onClick={generatePrompt}
          className="flex-shrink-0 text-violet-500 hover:text-violet-300 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write here..."
        rows={4}
        className="w-full rounded-lg bg-white/4 border border-white/8 px-4 py-3 font-sans text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-violet-500/40 transition-colors mb-3"
      />

      {/* Mood row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {(['before', 'after'] as const).map(when => {
          const current = when === 'before' ? moodBefore : moodAfter
          const setter = when === 'before' ? setMoodBefore : setMoodAfter
          return (
            <div key={when}>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">
                Mood {when}
              </span>
              <div className="flex gap-1">
                {moodOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setter(opt.value)}
                    className={cn(
                      'flex-1 rounded py-1 font-mono text-[9px] uppercase tracking-widest transition-all border',
                      current === opt.value
                        ? 'border-violet-500/40 bg-violet-500/15 text-violet-300'
                        : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="h-3 w-3 text-slate-600" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Tags</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {gratitudeTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'rounded px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-all border',
                selectedTags.includes(tag)
                  ? 'border-violet-500/40 bg-violet-500/15 text-violet-300'
                  : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={!content.trim()}
        className={cn(
          'w-full rounded-lg py-2.5 font-display text-xs font-semibold transition-all border',
          content.trim()
            ? saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-violet-500/30 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25'
            : 'border-white/6 bg-white/3 text-slate-600 cursor-not-allowed'
        )}
      >
        {saved ? 'Saved' : 'Save Entry'}
      </button>

      {/* Recent entries */}
      {entries.length > 0 && (
        <div className="mt-4 space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent</span>
          {entries.slice(0, 3).map(entry => <RecentEntry key={entry.id} entry={entry} />)}
        </div>
      )}
    </motion.div>
  )
}
