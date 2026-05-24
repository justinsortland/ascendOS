'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Check, ShoppingCart } from 'lucide-react'
import { mealPrepAIResponse } from '@/lib/weekly-mock-data'
import type { WeeklyMealPrepIdea, GroceryItem, GroceryCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

const groceryCategoryConfig: Record<GroceryCategory, { label: string; color: string }> = {
  protein: { label: 'Protein', color: 'text-cyan-400' },
  carbs: { label: 'Carbs', color: 'text-amber-400' },
  fats: { label: 'Fats', color: 'text-yellow-400' },
  produce: { label: 'Produce', color: 'text-emerald-400' },
  extras: { label: 'Extras', color: 'text-slate-400' },
}

interface Props {
  meals: WeeklyMealPrepIdea[]
  grocery: GroceryItem[]
  onToggleMeal: (id: string) => void
  onToggleGrocery: (id: string) => void
}

export function MealPrepPlanner({ meals, grocery, onToggleMeal, onToggleGrocery }: Props) {
  const [showAI, setShowAI] = useState(false)
  const totalProtein = meals.reduce((s, m) => s + (m.prepped ? m.protein : 0), 0)
  const preppedCount = meals.filter(m => m.prepped).length
  const purchasedCount = grocery.filter(g => g.purchased).length

  const categories = [...new Set(grocery.map(g => g.category))] as GroceryCategory[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.09 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-500/20">
          <UtensilsCrossed className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <h3 className="font-display text-sm font-bold text-white">Meal Prep Planner</h3>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">
          {preppedCount}/{meals.length} prepped · {totalProtein}g protein
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Meal ideas */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-2">Meal Ideas</span>
          <div className="space-y-1.5">
            {meals.map(meal => (
              <button
                key={meal.id}
                onClick={() => onToggleMeal(meal.id)}
                className={cn(
                  'w-full flex items-center justify-between rounded-lg px-3 py-2.5 border transition-all text-left',
                  meal.prepped
                    ? 'border-emerald-500/20 bg-emerald-500/6'
                    : 'border-white/6 bg-white/3 hover:bg-white/5'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'h-4 w-4 rounded-full border flex items-center justify-center flex-shrink-0',
                    meal.prepped ? 'border-emerald-500/50 bg-emerald-500/20' : 'border-white/20'
                  )}>
                    {meal.prepped && <Check className="h-2.5 w-2.5 text-emerald-400" />}
                  </div>
                  <span className={cn('font-display text-xs font-medium', meal.prepped ? 'text-slate-400 line-through' : 'text-white')}>
                    {meal.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-emerald-400">{meal.protein}g pro</span>
                  <span className="font-mono text-[10px] text-slate-600">{meal.calories} kcal</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grocery list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <ShoppingCart className="h-3 w-3 text-slate-500" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Grocery List</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">{purchasedCount}/{grocery.length}</span>
          </div>
          <div className="space-y-3">
            {categories.map(cat => {
              const items = grocery.filter(g => g.category === cat)
              const cfg = groceryCategoryConfig[cat]
              return (
                <div key={cat}>
                  <span className={cn('font-mono text-[9px] uppercase tracking-widest block mb-1', cfg.color)}>{cfg.label}</span>
                  <div className="space-y-1">
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => onToggleGrocery(item.id)}
                        className="w-full flex items-center gap-2 text-left"
                      >
                        <div className={cn(
                          'h-3.5 w-3.5 rounded border flex items-center justify-center flex-shrink-0',
                          item.purchased ? 'border-emerald-500/50 bg-emerald-500/20' : 'border-white/20'
                        )}>
                          {item.purchased && <Check className="h-2 w-2 text-emerald-400" />}
                        </div>
                        <span className={cn('font-sans text-xs', item.purchased ? 'text-slate-600 line-through' : 'text-slate-300')}>
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* AI plan */}
      <div className="mt-4">
        <button
          onClick={() => setShowAI(s => !s)}
          className="font-mono text-[10px] uppercase tracking-widest text-amber-400/70 hover:text-amber-400 transition-colors"
        >
          {showAI ? 'Hide' : 'Show'} AI Meal Prep Plan
        </button>
        {showAI && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-lg bg-amber-500/5 border border-amber-500/15 px-4 py-3"
          >
            <p className="font-sans text-xs text-slate-300 leading-relaxed">{mealPrepAIResponse}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
