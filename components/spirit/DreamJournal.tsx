'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Star, Plus, X } from 'lucide-react'
import { emotionalTones } from '@/lib/spirit-mock-data'
import type { DreamEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

function StarRating({ value, max = 5, onChange }: { value: number; max?: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}>
          <Star className={cn('h-4 w-4 transition-colors', i < value ? 'text-violet-400 fill-violet-400' : 'text-slate-700')} />
        </button>
      ))}
    </div>
  )
}

interface RecentDreamProps {
  entry: DreamEntry
}

function RecentDreamCard({ entry }: RecentDreamProps) {
  return (
    <div className="rounded-lg border border-white/6 bg-white/3 px-4 py-3">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div>
          <h4 className="font-display text-xs font-bold text-white">{entry.title}</h4>
          <span className="font-mono text-[10px] text-slate-500">{entry.date}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <div className="font-mono text-[9px] text-slate-500">lucid</div>
            <div className="font-display text-xs font-bold text-violet-400">{entry.lucidityLevel}/5</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] text-slate-500">vivid</div>
            <div className="font-display text-xs font-bold text-indigo-400">{entry.vividnessLevel}/5</div>
          </div>
        </div>
      </div>
      <p className="font-sans text-[11px] text-slate-400 leading-relaxed line-clamp-2">{entry.description}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {entry.dreamSigns.slice(0, 3).map(sign => (
          <span key={sign} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 uppercase tracking-widest">
            {sign}
          </span>
        ))}
        {entry.lucidityAchieved && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 uppercase tracking-widest">
            Lucid
          </span>
        )}
      </div>
    </div>
  )
}

interface Props {
  entries: DreamEntry[]
  onSave: (entry: DreamEntry) => void
}

export function DreamJournal({ entries, onSave }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lucidity, setLucidity] = useState(0)
  const [vividness, setVividness] = useState(0)
  const [tone, setTone] = useState('')
  const [signInput, setSignInput] = useState('')
  const [signs, setSigns] = useState<string[]>([])
  const [realityCheck, setRealityCheck] = useState(false)
  const [lucidAchieved, setLucidAchieved] = useState(false)
  const [saved, setSaved] = useState(false)

  function addSign() {
    const trimmed = signInput.trim()
    if (trimmed && !signs.includes(trimmed)) {
      setSigns(prev => [...prev, trimmed])
      setSignInput('')
    }
  }

  function handleSave() {
    if (!title.trim() || !description.trim()) return
    onSave({
      id: `d-${Date.now()}`,
      date: 'Just now',
      title: title.trim(),
      description: description.trim(),
      lucidityLevel: lucidity,
      vividnessLevel: vividness,
      emotionalTone: tone || 'Foggy',
      dreamSigns: signs,
      realityCheckDone: realityCheck,
      lucidityAchieved: lucidAchieved,
    })
    setTitle(''); setDescription(''); setLucidity(0); setVividness(0)
    setTone(''); setSigns([]); setRealityCheck(false); setLucidAchieved(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="rounded-xl border border-white/6 bg-[#0d0d1a] p-5"
      style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #0c0b1f 100%)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/15 border border-indigo-500/20">
          <Moon className="h-3.5 w-3.5 text-indigo-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Dream Journal</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{entries.length} recorded</span>
      </div>

      {/* Title */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Dream title..."
        className="w-full rounded-lg bg-white/4 border border-white/8 px-4 py-2.5 font-display text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 transition-colors mb-3"
      />

      {/* Description */}
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe the dream while it is still fresh..."
        rows={4}
        className="w-full rounded-lg bg-white/4 border border-white/8 px-4 py-3 font-sans text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-indigo-500/40 transition-colors mb-3"
      />

      {/* Ratings */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">Lucidity</span>
          <StarRating value={lucidity} onChange={setLucidity} />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">Vividness</span>
          <StarRating value={vividness} onChange={setVividness} />
        </div>
      </div>

      {/* Emotional tone */}
      <div className="mb-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">Emotional Tone</span>
        <div className="flex flex-wrap gap-1.5">
          {emotionalTones.map(t => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={cn(
                'rounded px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-all border',
                tone === t
                  ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300'
                  : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Dream signs */}
      <div className="mb-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-1.5">Dream Signs</span>
        <div className="flex gap-2 mb-2">
          <input
            value={signInput}
            onChange={e => setSignInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSign()}
            placeholder="Add sign..."
            className="flex-1 rounded-lg bg-white/4 border border-white/8 px-3 py-1.5 font-sans text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/30 transition-colors"
          />
          <button onClick={addSign} className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/25 transition-colors">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {signs.map(sign => (
            <span key={sign} className="flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 uppercase tracking-widest">
              {sign}
              <button onClick={() => setSigns(prev => prev.filter(s => s !== sign))}>
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-4 mb-4">
        {[
          { label: 'Reality Check Done', value: realityCheck, set: setRealityCheck },
          { label: 'Lucid Achieved', value: lucidAchieved, set: setLucidAchieved },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => item.set(!item.value)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all border',
              item.value
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-white/6 bg-white/3 text-slate-500 hover:text-slate-300'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={!title.trim() || !description.trim()}
        className={cn(
          'w-full rounded-lg py-2.5 font-display text-xs font-semibold transition-all border',
          title.trim() && description.trim()
            ? saved
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-indigo-500/30 bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25'
            : 'border-white/6 bg-white/3 text-slate-600 cursor-not-allowed'
        )}
      >
        {saved ? 'Dream Recorded' : 'Record Dream'}
      </button>

      {/* Recent */}
      {entries.length > 0 && (
        <div className="mt-4 space-y-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block">Recent Dreams</span>
          {entries.slice(0, 3).map(e => <RecentDreamCard key={e.id} entry={e} />)}
        </div>
      )}
    </motion.div>
  )
}
