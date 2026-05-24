'use client'

import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { AnalyticsOverview } from '@/components/analytics/AnalyticsOverview'
import { XPLevelSystem } from '@/components/analytics/XPLevelSystem'
import { MomentumTrendChart } from '@/components/analytics/MomentumTrendChart'
import { CategoryBalanceChart } from '@/components/analytics/CategoryBalanceChart'
import { BodyAnalytics } from '@/components/analytics/BodyAnalytics'
import { BrainAnalytics } from '@/components/analytics/BrainAnalytics'
import { SpiritAnalytics } from '@/components/analytics/SpiritAnalytics'
import { ExecutionAnalytics } from '@/components/analytics/ExecutionAnalytics'
import { BottleneckDetector } from '@/components/analytics/BottleneckDetector'
import { WeeklyReportCard } from '@/components/analytics/WeeklyReportCard'
import { AnalyticsAICoachPanel } from '@/components/analytics/AnalyticsAICoachPanel'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="px-6 py-6 max-w-6xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/15 border border-slate-500/20">
          <BarChart3 className="h-5 w-5 text-slate-300" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-white">Analytics</h1>
          <p className="font-mono text-[11px] text-slate-500 tracking-wide">Performance Cockpit</p>
        </div>
      </motion.div>

      {/* Overview */}
      <AnalyticsOverview />

      {/* XP + Trend charts */}
      <SectionLabel label="Progress & Trends" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <XPLevelSystem />
        <div className="flex flex-col gap-4">
          <MomentumTrendChart />
          <CategoryBalanceChart />
        </div>
      </div>

      {/* Category analytics */}
      <SectionLabel label="Body" />
      <BodyAnalytics />

      <SectionLabel label="Brain" />
      <BrainAnalytics />

      <SectionLabel label="Spirit" />
      <SpiritAnalytics />

      <SectionLabel label="Execution" />
      <ExecutionAnalytics />

      {/* Diagnostics */}
      <SectionLabel label="Diagnostics" />
      <BottleneckDetector />

      {/* Report + AI */}
      <SectionLabel label="Report & Coaching" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyReportCard />
        <AnalyticsAICoachPanel />
      </div>

      <div className="h-8" />
    </div>
  )
}
