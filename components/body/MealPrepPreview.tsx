'use client'

import { motion } from 'framer-motion'
import { Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { mealPrepIdeas } from '@/lib/body-mock-data'

export function MealPrepPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-white/8 bg-[#0d0d1a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Package className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white">Meal Prep</h3>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">4 meals/day · ~180g protein target</p>
          </div>
        </div>
      </div>

      {/* Prep ideas */}
      <div className="space-y-1.5 mb-4">
        {mealPrepIdeas.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-center justify-between rounded-lg bg-white/5 border border-white/6 px-3 py-2"
          >
            <span className="font-display text-xs font-medium text-white">{idea.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-emerald-400">{idea.protein}g pro</span>
              <span className="font-mono text-[10px] text-slate-600">{idea.cal} kcal</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grocery hint */}
      <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2 mb-4">
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wide mb-1">Grocery List</p>
        <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
          Chicken breast · Salmon fillets · Turkey mince · Greek yogurt (0%) ·
          White rice · Potatoes · Broccoli · Protein isolate
        </p>
      </div>

      <Link href="/weekly">
        <Button
          size="sm"
          variant="outline"
          className="w-full h-8 text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/8 hover:bg-emerald-500/15"
        >
          Plan This Week&apos;s Meals
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </Link>
    </motion.div>
  )
}
