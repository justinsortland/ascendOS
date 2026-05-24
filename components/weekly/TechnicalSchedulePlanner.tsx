'use client'

import { motion } from 'framer-motion'
import { Code2, Plus, Minus } from 'lucide-react'
import { techScheduleAIResponse } from '@/lib/weekly-mock-data'
import type { TechBlock } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  blocks: TechBlock[]
  onUpdateBlock: (id: string, delta: number) => void
}

export function TechnicalSchedulePlanner({ blocks, onUpdateBlock }: Props) {
  const [showAI, setShowAI] = useState(false)

  const projects = blocks.filter(b => b.type === 'project')
  const study = blocks.filter(b => b.type === 'study')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.13 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-500/20">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Technical Schedule</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Projects */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Projects</span>
          <div className="space-y-2">
            {projects.map(block => {
              const pct = Math.min((block.completed / block.target) * 100, 100)
              return (
                <div key={block.id} className="rounded-lg border border-white/6 bg-white/3 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-xs font-bold text-white">{block.name}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateBlock(block.id, -1)}
                        className="h-5 w-5 flex items-center justify-center rounded bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span className="font-mono text-[10px] text-white w-8 text-center">
                        {block.completed}/{block.target}
                      </span>
                      <button
                        onClick={() => onUpdateBlock(block.id, 1)}
                        className="h-5 w-5 flex items-center justify-center rounded border text-xs font-bold transition-colors"
                        style={{ borderColor: `${block.color}40`, backgroundColor: `${block.color}15`, color: block.color }}
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: block.color }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">{block.unit}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Study */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Study Tracks</span>
          <div className="space-y-2">
            {study.map(block => {
              const pct = Math.min((block.completed / block.target) * 100, 100)
              return (
                <div key={block.id} className="rounded-lg border border-white/6 bg-white/3 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-xs font-medium text-white">{block.name}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateBlock(block.id, -1)}
                        className="h-5 w-5 flex items-center justify-center rounded bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span className="font-mono text-[10px] text-white w-8 text-center">
                        {block.completed}/{block.target}
                      </span>
                      <button
                        onClick={() => onUpdateBlock(block.id, 1)}
                        className="h-5 w-5 flex items-center justify-center rounded border transition-colors"
                        style={{ borderColor: `${block.color}40`, backgroundColor: `${block.color}15`, color: block.color }}
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: block.color }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">{block.unit}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Rotation rule */}
      <div className="mt-4 rounded-lg bg-cyan-500/4 border border-cyan-500/12 px-3 py-2.5">
        <p className="font-sans text-xs text-slate-400 leading-relaxed">
          <span className="text-cyan-400 font-medium">Rotation rule:</span> Do not study every track every day. Rotate deep focus — 2–3 tracks per day maximum.
        </p>
      </div>

      {/* AI schedule */}
      <div className="mt-3">
        <button onClick={() => setShowAI(s => !s)} className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 hover:text-cyan-400 transition-colors">
          {showAI ? 'Hide' : 'Show'} AI Recommendation
        </button>
        {showAI && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 rounded-lg bg-cyan-500/4 border border-cyan-500/12 px-4 py-3">
            <p className="font-sans text-xs text-slate-300 leading-relaxed">{techScheduleAIResponse}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
