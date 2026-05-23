'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Loader2, Plus, Sparkles } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { BodyMeal } from '@/lib/types'

interface EstimateResult {
  calories: number
  protein: number
  carbs: number
  fat: number
  confidence: 'high' | 'medium' | 'low'
}

function getMockEstimate(input: string): EstimateResult {
  const s = input.toLowerCase()
  if (s.includes('salmon')) return { calories: 980, protein: 52, carbs: 75, fat: 52, confidence: 'medium' }
  if (s.includes('chicken') && s.includes('rice')) return { calories: 650, protein: 55, carbs: 72, fat: 12, confidence: 'high' }
  if (s.includes('chicken')) return { calories: 520, protein: 48, carbs: 20, fat: 14, confidence: 'high' }
  if (s.includes('yogurt') || s.includes('fage')) return { calories: 220, protein: 32, carbs: 14, fat: 3, confidence: 'high' }
  if (s.includes('burger') || s.includes('cheeseburger')) return { calories: 870, protein: 44, carbs: 62, fat: 48, confidence: 'medium' }
  if (s.includes('taco')) return { calories: 560, protein: 36, carbs: 48, fat: 22, confidence: 'medium' }
  if (s.includes('oat') || s.includes('oatmeal')) return { calories: 380, protein: 14, carbs: 68, fat: 8, confidence: 'high' }
  if (s.includes('shake') || s.includes('protein')) return { calories: 280, protein: 30, carbs: 22, fat: 4, confidence: 'high' }
  // fallback — spread across keywords
  const words = s.split(' ').filter(Boolean)
  const seed = words.reduce((a, w) => a + (w.charCodeAt(0) || 0), 0)
  const opts: EstimateResult[] = [
    { calories: 680, protein: 35, carbs: 58, fat: 28, confidence: 'medium' },
    { calories: 450, protein: 28, carbs: 42, fat: 16, confidence: 'low' },
    { calories: 820, protein: 42, carbs: 78, fat: 32, confidence: 'medium' },
    { calories: 340, protein: 24, carbs: 38, fat: 10, confidence: 'low' },
  ]
  return opts[seed % opts.length]
}

const confidenceStyle = {
  high: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  medium: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  low: 'text-red-400 border-red-500/30 bg-red-500/10',
}

interface Props {
  onAdd: (meal: Omit<BodyMeal, 'id'>) => void
}

export function FoodEstimateModal({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [mealName, setMealName] = useState('')

  function handleEstimate() {
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setMealName(input.trim())
    setTimeout(() => {
      setResult(getMockEstimate(input))
      setLoading(false)
    }, 1400)
  }

  function handleAdd() {
    if (!result) return
    onAdd({
      name: mealName || input,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      source: 'ai-estimate',
      notes: `AI estimate — confidence: ${result.confidence}`,
    })
    setOpen(false)
    setInput('')
    setResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 hover:text-violet-300 text-xs"
        >
          <Bot className="h-3.5 w-3.5 mr-1.5" />
          AI Estimate
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d1a] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-sm font-bold flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/20">
              <Bot className="h-3.5 w-3.5 text-violet-400" />
            </div>
            Ask AI to Estimate
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-1">
          <Textarea
            placeholder='Describe what you ate… e.g. "smoked salmon rollers and cheese curds"'
            value={input}
            onChange={e => setInput(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm resize-none h-20"
          />

          <Button
            onClick={handleEstimate}
            disabled={!input.trim() || loading}
            className="w-full bg-violet-600/80 hover:bg-violet-600 text-white border-0 text-xs h-9"
          >
            {loading ? (
              <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Estimating…</>
            ) : (
              <><Sparkles className="h-3.5 w-3.5 mr-1.5" />Estimate Macros</>
            )}
          </Button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-xs font-semibold text-white">Estimated Macros</p>
                  <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border ${confidenceStyle[result.confidence]}`}>
                    {result.confidence.toUpperCase()} CONFIDENCE
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'KCAL', value: result.calories, color: 'text-orange-400' },
                    { label: 'PRO', value: `${result.protein}g`, color: 'text-emerald-400' },
                    { label: 'CARB', value: `${result.carbs}g`, color: 'text-cyan-400' },
                    { label: 'FAT', value: `${result.fat}g`, color: 'text-amber-400' },
                  ].map(s => (
                    <div key={s.label} className="rounded bg-white/5 p-2 text-center">
                      <p className={`font-mono text-xs font-bold ${s.color}`}>{s.value}</p>
                      <p className="font-mono text-[9px] text-slate-600 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleAdd}
                  size="sm"
                  className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-white border-0 text-xs h-8"
                >
                  <Plus className="h-3 w-3 mr-1.5" />
                  Add to Meal Log
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
