'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UtensilsCrossed, Plus, ChefHat, Store, Package, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FoodEstimateModal } from './FoodEstimateModal'
import type { BodyMeal, MealSource } from '@/lib/types'
import { cn } from '@/lib/utils'

const sourceStyle: Record<MealSource, { label: string; color: string; icon: React.ElementType }> = {
  manual: { label: 'Manual', color: 'text-slate-400 border-white/10 bg-white/5', icon: Plus },
  'ai-estimate': { label: 'AI Est.', color: 'text-violet-400 border-violet-500/30 bg-violet-500/10', icon: ChefHat },
  restaurant: { label: 'Restaurant', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', icon: Store },
  'meal-prep': { label: 'Meal Prep', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', icon: Package },
}

interface Props {
  meals: BodyMeal[]
  onAdd: (meal: Omit<BodyMeal, 'id'>) => void
}

function MealRow({ meal, index }: { meal: BodyMeal; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const src = sourceStyle[meal.source]
  const SrcIcon = src.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
      className="rounded-lg border border-white/6 bg-white/3"
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold text-white truncate">{meal.name}</span>
            <Badge variant="outline" className={cn('h-4 px-1.5 text-[9px] flex-shrink-0', src.color)}>
              <SrcIcon className="h-2.5 w-2.5 mr-1" />
              {src.label}
            </Badge>
          </div>
          <span className="font-mono text-[10px] text-slate-500">{meal.time}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="font-mono text-xs font-bold text-white">{meal.calories} kcal</p>
            <p className="font-mono text-[10px] text-emerald-400">{meal.protein}g pro</p>
          </div>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-600" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-3 pb-3 pt-2">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'KCAL', value: meal.calories, color: 'text-orange-400' },
                  { label: 'PRO', value: `${meal.protein}g`, color: 'text-emerald-400' },
                  { label: 'CARB', value: `${meal.carbs}g`, color: 'text-cyan-400' },
                  { label: 'FAT', value: `${meal.fat}g`, color: 'text-amber-400' },
                ].map(s => (
                  <div key={s.label} className="rounded bg-white/5 p-1.5 text-center">
                    <p className={`font-mono text-xs font-bold ${s.color}`}>{s.value}</p>
                    <p className="font-mono text-[9px] text-slate-600">{s.label}</p>
                  </div>
                ))}
              </div>
              {meal.notes && (
                <p className="font-sans text-[11px] text-slate-500 mt-2 italic">{meal.notes}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AddMealDialog({ onAdd, source }: { onAdd: (meal: Omit<BodyMeal, 'id'>) => void; source: MealSource }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '', notes: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.calories) return
    onAdd({
      name: form.name,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      calories: Number(form.calories),
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
      source,
      notes: form.notes || undefined,
    })
    setForm({ name: '', calories: '', protein: '', carbs: '', fat: '', notes: '' })
    setOpen(false)
  }

  const labels: Record<MealSource, string> = {
    manual: 'Add Manually',
    restaurant: 'Restaurant Entry',
    'meal-prep': 'From Meal Prep',
    'ai-estimate': 'AI Estimate',
  }
  const icon = sourceStyle[source]
  const Icon = icon.icon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className={cn('h-8 text-xs border', icon.color)}>
          <Icon className="h-3.5 w-3.5 mr-1.5" />
          {labels[source]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d1a] border-white/10 text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-sm font-bold">{labels[source]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2.5 mt-1">
          <Input placeholder="Meal name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Calories" type="number" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
            <Input placeholder="Protein (g)" type="number" value={form.protein} onChange={e => setForm(f => ({ ...f, protein: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Carbs (g)" type="number" value={form.carbs} onChange={e => setForm(f => ({ ...f, carbs: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
            <Input placeholder="Fat (g)" type="number" value={form.fat} onChange={e => setForm(f => ({ ...f, fat: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
          </div>
          <Input placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-9" />
          <Button type="submit" size="sm" className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-white border-0 h-9 text-xs">
            Add Meal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function MealLog({ meals, onAdd }: Props) {
  const totalCal = meals.reduce((s, m) => s + m.calories, 0)
  const totalProt = meals.reduce((s, m) => s + m.protein, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-emerald-400" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Meal Log</h3>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">
              {meals.length} meals · {totalCal} kcal · {totalProt}g protein
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {meals.map((meal, i) => (
          <MealRow key={meal.id} meal={meal} index={i} />
        ))}
        {meals.length === 0 && (
          <p className="font-mono text-[11px] text-slate-600 text-center py-6">No meals logged yet.</p>
        )}
      </div>

      {/* Add buttons */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <AddMealDialog onAdd={onAdd} source="manual" />
        <FoodEstimateModal onAdd={onAdd} />
        <AddMealDialog onAdd={onAdd} source="restaurant" />
        <AddMealDialog onAdd={onAdd} source="meal-prep" />
      </div>
    </motion.div>
  )
}
