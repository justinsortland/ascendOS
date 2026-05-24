import type {
  DailyMomentumPoint,
  NutritionDay,
  StudyMinutesData,
  Bottleneck,
  AnalyticsReportCard,
} from './types'

// ─── Overview ─────────────────────────────────────────────────

export const OVERALL_MOMENTUM = 78
export const ANALYTICS_WEEKLY_RANK = 'Locked In'
export const TOTAL_XP = 12450
export const CURRENT_TITLE = 'Ascendant II'
export const BEST_CATEGORY = 'Brain'
export const WEAKEST_CATEGORY = 'Spirit'
export const CURRENT_BOTTLENECK = 'Inconsistent evening review + cardio gaps'

export const CURRENT_LEVEL = 12
export const XP_TO_NEXT = 550
export const LEVEL_XP_CAP = 1000
export const WEEKLY_XP = 1840

export const categoryXP = {
  body: 3200,
  brain: 2850,
  spirit: 1920,
  execution: 4480,
}

// ─── Rank system ───────────────────────────────────────────────

export const ranks = [
  'Drifting',
  'Warming Up',
  'Rebuilding',
  'Locked In',
  'Machine Mode',
  'Ascendant',
  'Mythic Week',
]

export const rankThresholds = [0, 30, 50, 65, 80, 90, 97]

// ─── Momentum trend ────────────────────────────────────────────

export const momentumTrend: DailyMomentumPoint[] = [
  { day: 'Mon', score: 62 },
  { day: 'Tue', score: 71 },
  { day: 'Wed', score: 58 },
  { day: 'Thu', score: 80 },
  { day: 'Fri', score: 77 },
  { day: 'Sat', score: 69 },
  { day: 'Sun', score: 84 },
]

// ─── Body analytics ────────────────────────────────────────────

export const nutritionTrend: NutritionDay[] = [
  { day: 'Mon', calories: 2280, protein: 178 },
  { day: 'Tue', calories: 2310, protein: 185 },
  { day: 'Wed', calories: 2050, protein: 148 },
  { day: 'Thu', calories: 2340, protein: 182 },
  { day: 'Fri', calories: 2290, protein: 176 },
  { day: 'Sat', calories: 2180, protein: 168 },
  { day: 'Sun', calories: 0, protein: 0 },
]

export const workoutFrequency = [
  { day: 'Mon', trained: true, sets: 24 },
  { day: 'Tue', trained: true, sets: 18 },
  { day: 'Wed', trained: true, sets: 22 },
  { day: 'Thu', trained: false, sets: 0 },
  { day: 'Fri', trained: false, sets: 0 },
  { day: 'Sat', trained: false, sets: 0 },
  { day: 'Sun', trained: false, sets: 0 },
]

export const BODY_CONSISTENCY_SCORE = 74
export const WEEKLY_CARDIO_MINS = 80
export const BODY_INSIGHTS = [
  { id: 'bi1', message: 'Protein consistency is strong but water is lagging below 64oz on 3 of 7 days.', priority: 'medium' as const },
  { id: 'bi2', message: 'Cardio is consistent on training days but absent on rest days. Add a 20-min walk on off days.', priority: 'medium' as const },
  { id: 'bi3', message: 'Cut adherence is best when meals are preplanned. The 2 days below target had no meal prep.', priority: 'high' as const },
]

// ─── Brain analytics ───────────────────────────────────────────

export const studyMinutes: StudyMinutesData[] = [
  { track: 'System Design', minutes: 80, target: 120, color: '#06b6d4' },
  { track: 'Machine Learning', minutes: 30, target: 90, color: '#a78bfa' },
  { track: 'OS', minutes: 80, target: 120, color: '#3b82f6' },
  { track: 'Quant Dev', minutes: 40, target: 90, color: '#f59e0b' },
  { track: 'Quant Research', minutes: 55, target: 90, color: '#f59e0b' },
  { track: 'Zetamac', minutes: 24, target: 0, color: '#f43f5e' },
]

export const lcByDifficulty = [
  { name: 'Easy', count: 2, color: '#10b981' },
  { name: 'Medium', count: 3, color: '#f59e0b' },
  { name: 'Hard', count: 1, color: '#f43f5e' },
]

export const LEET_SOLVED_WEEK = 6
export const LEET_REVISIT_QUEUE = 5
export const PROJECT_SHIP_STREAK = 3
export const POMODOROS_WEEK = 13
export const LANGUAGE_MINS_WEEK = 85
export const READING_PAGES_WEEK = 48

export const BRAIN_INSIGHTS = [
  { id: 'bri1', message: 'Project shipping is strong this week. Counterparty and AscendOS both have active commits.', priority: 'high' as const },
  { id: 'bri2', message: 'LeetCode revisit queue is growing — 5 problems need a second pass before adding new ones.', priority: 'high' as const },
  { id: 'bri3', message: 'OS is behind target but highly aligned with quant dev prep. Keep it in the rotation.', priority: 'medium' as const },
]

// ─── Spirit analytics ──────────────────────────────────────────

export const moodTrend = [
  { day: 'Mon', mood: 2 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 2 },
  { day: 'Thu', mood: 4 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 2 },
  { day: 'Sun', mood: 4 },
]

export const spiritHabitData = [
  { habit: 'Meditation', completed: 6, target: 7 },
  { habit: 'Gratitude', completed: 5, target: 7 },
  { habit: 'Dream Journal', completed: 3, target: 7 },
  { habit: 'Evening Review', completed: 2, target: 7 },
  { habit: 'Visualization', completed: 3, target: 5 },
]

export const SPIRIT_INSIGHTS = [
  { id: 'spi1', message: 'Dream recall improves after immediate morning journaling — before checking your phone.', priority: 'high' as const },
  { id: 'spi2', message: 'Evening review is inconsistent but highly stabilizing when done. It is your highest-ROI evening habit.', priority: 'high' as const },
  { id: 'spi3', message: 'Meditation streak is the strongest spiritual habit and the easiest to maintain. Protect it.', priority: 'medium' as const },
]

// ─── Execution analytics ───────────────────────────────────────

export const pomodoroByDay = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 6 },
  { day: 'Fri', count: 4 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 0 },
]

export const tierCompletion = [
  { tier: 'Non-Negotiable', completed: 82, color: '#10b981' },
  { tier: 'Enhancer', completed: 63, color: '#06b6d4' },
  { tier: 'Optional', completed: 44, color: '#64748b' },
]

export const DEEP_WORK_HOURS = 9.5
export const TASK_COMPLETION_RATE = 71
export const MVD_COMPLETION = 5
export const BONUS_QUESTS = 3

export const EXECUTION_INSIGHTS = [
  { id: 'ei1', message: 'Tier 1 completion is the single best predictor of day quality. Keep it above 80%.', priority: 'high' as const },
  { id: 'ei2', message: 'Deep work is strongest before 3 PM. Schedule the hardest blocks in the AM.', priority: 'high' as const },
  { id: 'ei3', message: 'Bonus quests are fine but should not crowd out non-negotiables on high-friction days.', priority: 'medium' as const },
]

// ─── Bottlenecks ───────────────────────────────────────────────

export const bottlenecks: Bottleneck[] = [
  {
    id: 'bn1',
    name: 'Evening Review Consistency',
    severity: 'high',
    why: 'You complete the evening review only 2/7 days. This disrupts morning clarity and weekly reflection depth.',
    fix: 'Set a hard stop at 10pm — 5 minutes, 6 questions. Keep it short enough that you cannot skip it.',
    category: 'spirit',
  },
  {
    id: 'bn2',
    name: 'LeetCode Revisit Discipline',
    severity: 'high',
    why: 'Revisit queue has 5 problems. You are solving new problems but not closing weak patterns.',
    fix: 'Schedule 2 revisit-only sessions this week — no new problems until queue drops below 3.',
    category: 'brain',
  },
  {
    id: 'bn3',
    name: 'Cardio Consistency',
    severity: 'medium',
    why: 'Cardio happened once this week. It is behind target and rest days are completely sedentary.',
    fix: 'Attach cardio to pull days — low friction. Incline walk on rest days as a minimum.',
    category: 'body',
  },
  {
    id: 'bn4',
    name: 'Water Intake',
    severity: 'low',
    why: 'Below 64oz on 3 of 7 days. Not critical but affects energy and focus consistency.',
    fix: 'Keep a 32oz bottle on the desk. Refill twice daily as a habit anchor.',
    category: 'body',
  },
  {
    id: 'bn5',
    name: 'Optional Ritual Overload',
    severity: 'low',
    why: 'Some days have too many optional habits queued, creating decision fatigue before core work.',
    fix: 'Choose 1–2 optional rituals per day. Do not run the full list unless core habits are already done.',
    category: 'spirit',
  },
]

// ─── Report card ───────────────────────────────────────────────

export const weeklyReportCard: AnalyticsReportCard = {
  body: 'B+',
  brain: 'A-',
  spirit: 'B',
  execution: 'B+',
  overall: 'B+',
  biggestWin: 'Shipped AscendOS Phase 3 Brain page + Counterparty AI diff engine',
  biggestMiss: 'Evening review inconsistency and cardio below target',
  bestDay: 'Thursday — 80 momentum, 6 Pomodoros, protein hit, meditation done',
  worstDay: 'Wednesday — low energy, missed cardio, evening review skipped',
  adjustment: 'Reduce optional rituals, protect technical blocks earlier in the day, anchor evenings at 10pm',
}

// ─── Analytics AI responses ────────────────────────────────────

export const analyticsAIResponses: Record<string, { title: string; body: string }> = {
  'analyze-week': {
    title: 'Week Analysis',
    body: 'Your best days share three traits: protein was planned, deep work started before 10am, and optional rituals stayed optional. Thursday was your clearest example. Recreate that structure 4+ times next week.',
  },
  'find-bottleneck': {
    title: 'Primary Bottleneck',
    body: 'Evening review. You are running 2/7 on the habit that most directly shapes the next morning. It takes 5 minutes. The ROI per minute is higher than almost anything else in your stack.',
  },
  'next-week-focus': {
    title: 'Next Week Focus',
    body: 'Three priorities: LeetCode revisit discipline (close the queue), evening review as a non-negotiable (not optional), and cardio attached to pull days so it requires zero decision. Everything else maintains current level.',
  },
  'best-day': {
    title: 'Best Day Analysis',
    body: 'Thursday: protein was pre-planned, technical block started at 9am, no decision overhead on food. You hit 80 momentum because the inputs were already set the night before. That is the pattern to replicate.',
  },
  'worst-day': {
    title: 'Worst Day Analysis',
    body: 'Wednesday: evening review skipped Tuesday night → foggy morning → late start on deep work → energy crash at 3pm. One missed habit compounded across 16 hours. That is why the review matters.',
  },
  'rebalance': {
    title: 'Category Rebalance',
    body: 'Spirit is the lagging category (B vs A- Brain). Evening review and dream journal need 2 more completions this week. Do not add new spirit habits — improve consistency on the existing ones.',
  },
  'weekly-report': {
    title: 'Weekly Report',
    body: 'Overall: B+. Strongest in Brain and Execution. Spirit is the gap. If you close the evening review habit, Spirit moves to B+ and your morning quality improves measurably. Ship the habit, not just the feature.',
  },
}
