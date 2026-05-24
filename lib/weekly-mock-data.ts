import type {
  WeeklyGoal,
  WeeklyMealPrepIdea,
  GroceryItem,
  WeeklyWorkoutDay,
  TechBlock,
  WeeklyResetItem,
  WeeklyReviewEntry,
} from './types'

// ─── Week meta ─────────────────────────────────────────────────

export const CURRENT_WEEK = 'May 20–26'
export const WEEKLY_RANK = 'Locked In'
export const MAIN_FOCUS = 'Body consistency + project shipping'

export const weeklyThemes = [
  'Rebuild Momentum',
  'Cut Cleanly',
  'Ship Aggressively',
  'Become Dangerous Again',
  'Machine Mode',
  'Quiet Rebuild',
  'Interview Prep Week',
  'Body Recomp Week',
  'Deep Work Week',
  'Social / Language Expansion',
]

export const themeInterpretations: Record<string, string> = {
  'Rebuild Momentum': 'Do not try to do everything. Pick 3 non-negotiables and execute them every day. Momentum compounds from repetition, not ambition.',
  'Cut Cleanly': 'This week is about clean execution: hit protein, keep workouts consistent, ship one visible project feature, and avoid overloading optional rituals.',
  'Ship Aggressively': 'Deep work is the priority. Protect your technical blocks. Each session should produce something that ships. Reduce decision fatigue everywhere else.',
  'Become Dangerous Again': 'Compress your social output. Study hard, ship hard, and let the results speak. This is a week to sharpen your edge, not display it.',
  'Machine Mode': 'Pure execution. No friction on decisions. Pre-plan meals, workouts, and study blocks. Show up consistently. Results accumulate quietly.',
  'Quiet Rebuild': 'Low noise, high standards. Restore the foundation: sleep, protein, morning ritual, deep work. Skip optional extras until the core is solid.',
  'Interview Prep Week': 'LeetCode revisit discipline is the priority. 2 structured sessions daily. System design second. Everything else supports this.',
  'Body Recomp Week': 'Protein first, deficit second. Do not let the brain workload crowd out the physical work. Meal prep sets the week.',
  'Deep Work Week': 'Block all non-essential communication. Every morning session is protected technical time. Build the thing that matters.',
  'Social / Language Expansion': 'Language daily. Reconnect with 1–2 people. Keep it light in other areas. Let social presence restore energy this week.',
}

// ─── Weekly goals ──────────────────────────────────────────────

export const initialWeeklyGoals: WeeklyGoal[] = [
  // Body
  { id: 'wg-b1', category: 'body', title: 'Hit 180g protein', target: 6, current: 4, unit: 'days', priority: 'high', status: 'on-track' },
  { id: 'wg-b2', category: 'body', title: 'Lift 4 times', target: 4, current: 3, unit: 'sessions', priority: 'high', status: 'on-track' },
  { id: 'wg-b3', category: 'body', title: 'Cardio 3 times', target: 3, current: 1, unit: 'sessions', priority: 'medium', status: 'behind' },
  { id: 'wg-b4', category: 'body', title: 'Meal prep 4 meals/day', target: 5, current: 3, unit: 'days', priority: 'high', status: 'on-track' },
  // Brain
  { id: 'wg-br1', category: 'brain', title: 'Ship 2 AscendOS features', target: 2, current: 1, unit: 'features', priority: 'high', status: 'on-track' },
  { id: 'wg-br2', category: 'brain', title: 'Finish 8 LeetCode problems', target: 8, current: 6, unit: 'problems', priority: 'high', status: 'on-track' },
  { id: 'wg-br3', category: 'brain', title: 'Study OS 120 minutes', target: 120, current: 80, unit: 'min', priority: 'medium', status: 'on-track' },
  { id: 'wg-br4', category: 'brain', title: 'Complete 5 language sessions', target: 5, current: 3, unit: 'sessions', priority: 'medium', status: 'on-track' },
  // Spirit
  { id: 'wg-s1', category: 'spirit', title: 'Meditate 5/7 days', target: 5, current: 4, unit: 'days', priority: 'high', status: 'on-track' },
  { id: 'wg-s2', category: 'spirit', title: 'Gratitude journal 5/7 days', target: 5, current: 4, unit: 'entries', priority: 'high', status: 'on-track' },
  { id: 'wg-s3', category: 'spirit', title: 'Dream journal 4/7 days', target: 4, current: 2, unit: 'entries', priority: 'medium', status: 'behind' },
  { id: 'wg-s4', category: 'spirit', title: 'Evening review 4/7 days', target: 4, current: 2, unit: 'entries', priority: 'medium', status: 'behind' },
  // Execution
  { id: 'wg-e1', category: 'execution', title: 'Complete 20 Pomodoros', target: 20, current: 13, unit: 'sessions', priority: 'high', status: 'on-track' },
  { id: 'wg-e2', category: 'execution', title: 'Plan each day (AM)', target: 7, current: 4, unit: 'days', priority: 'medium', status: 'on-track' },
  { id: 'wg-e3', category: 'execution', title: 'Weekly review on Sunday', target: 1, current: 0, unit: 'reviews', priority: 'high', status: 'not-started' },
  { id: 'wg-e4', category: 'execution', title: 'Minimum viable day kept', target: 7, current: 5, unit: 'days', priority: 'high', status: 'on-track' },
]

// ─── Meal prep ─────────────────────────────────────────────────

export const initialMealPrepIdeas: WeeklyMealPrepIdea[] = [
  { id: 'mp1', name: 'Chicken rice bowls', protein: 48, calories: 620, prepped: true },
  { id: 'mp2', name: 'Turkey taco bowls', protein: 44, calories: 580, prepped: true },
  { id: 'mp3', name: 'Greek yogurt protein bowls', protein: 38, calories: 310, prepped: false },
  { id: 'mp4', name: 'Salmon + potatoes', protein: 42, calories: 680, prepped: false },
  { id: 'mp5', name: 'Cottage cheese protein bowl', protein: 35, calories: 280, prepped: false },
  { id: 'mp6', name: 'Lean beef quesadilla', protein: 46, calories: 590, prepped: false },
]

export const initialGroceryItems: GroceryItem[] = [
  { id: 'gr1', name: 'Chicken breast (2 lbs)', category: 'protein', purchased: true },
  { id: 'gr2', name: 'Turkey mince (1 lb)', category: 'protein', purchased: true },
  { id: 'gr3', name: 'Salmon fillets', category: 'protein', purchased: false },
  { id: 'gr4', name: 'Lean ground beef', category: 'protein', purchased: false },
  { id: 'gr5', name: 'Greek yogurt 0% (large)', category: 'protein', purchased: false },
  { id: 'gr6', name: 'Cottage cheese', category: 'protein', purchased: false },
  { id: 'gr7', name: 'White rice (2 lb bag)', category: 'carbs', purchased: true },
  { id: 'gr8', name: 'Potatoes (2 lbs)', category: 'carbs', purchased: false },
  { id: 'gr9', name: 'Tortillas (whole wheat)', category: 'carbs', purchased: false },
  { id: 'gr10', name: 'Broccoli', category: 'produce', purchased: true },
  { id: 'gr11', name: 'Salsa (for taco bowls)', category: 'extras', purchased: true },
  { id: 'gr12', name: 'Protein isolate powder', category: 'extras', purchased: false },
  { id: 'gr13', name: 'Olive oil', category: 'fats', purchased: true },
  { id: 'gr14', name: 'Avocado (3)', category: 'fats', purchased: false },
]

export const mealPrepAIResponse = 'Prep 2 protein bases and 2 carb bases. Use chicken rice bowls and turkey taco bowls as anchors, then Greek yogurt bowls as flexible high-protein filler. Aim for 45g+ protein per meal. Batch cook Sunday afternoon — 90 minutes is enough for the week.'

// ─── Workout split ─────────────────────────────────────────────

export const initialWorkoutDays: WeeklyWorkoutDay[] = [
  { day: 'Mon', split: 'Push', cardio: true, completed: true },
  { day: 'Tue', split: 'Pull', cardio: false, completed: true },
  { day: 'Wed', split: 'Legs', cardio: false, completed: true },
  { day: 'Thu', split: 'Rest', cardio: false, completed: false, notes: 'Walk / mobility' },
  { day: 'Fri', split: 'Push', cardio: false, completed: false },
  { day: 'Sat', split: 'Pull', cardio: true, completed: false },
  { day: 'Sun', split: 'Reset', cardio: false, completed: false, notes: 'Mobility / weekly reset' },
]

// ─── Technical schedule ────────────────────────────────────────

export const initialTechBlocks: TechBlock[] = [
  { id: 'tb1', name: 'Counterparty', type: 'project', target: 3, completed: 2, unit: 'blocks', color: '#06b6d4' },
  { id: 'tb2', name: 'AscendOS', type: 'project', target: 4, completed: 3, unit: 'blocks', color: '#8b5cf6' },
  { id: 'tb3', name: 'Alpha Lab', type: 'project', target: 1, completed: 0, unit: 'blocks', color: '#f59e0b' },
  { id: 'tb4', name: 'LeetCode', type: 'study', target: 8, completed: 6, unit: 'problems', color: '#10b981' },
  { id: 'tb5', name: 'System Design', type: 'study', target: 2, completed: 1, unit: 'sessions', color: '#06b6d4' },
  { id: 'tb6', name: 'OS Study', type: 'study', target: 2, completed: 1, unit: 'sessions', color: '#3b82f6' },
  { id: 'tb7', name: 'ML Study', type: 'study', target: 1, completed: 0, unit: 'sessions', color: '#a78bfa' },
  { id: 'tb8', name: 'Quant', type: 'study', target: 2, completed: 1, unit: 'sessions', color: '#f59e0b' },
  { id: 'tb9', name: 'Zetamac', type: 'study', target: 5, completed: 2, unit: 'sessions', color: '#f43f5e' },
]

export const techScheduleAIResponse = 'This week should prioritize AscendOS shipping and LeetCode revisit discipline. Front-load technical blocks before noon. Keep ML and Quant as lighter rotation — do not force both on the same day. Zetamac: 2-minute rounds only, do not let it crowd deep work.'

// ─── Language schedule ─────────────────────────────────────────

export const langConversationThemes = [
  'Gym routine and training goals',
  'Ordering high-protein food',
  'Explaining your work and projects',
  'Making plans for the weekend',
  'Describing a recent dream',
]

export const LANG_DAILY_MIN = 15
export const LANG_WEEKLY_TARGET = 120
export const LANG_WEEKLY_COMPLETED = 85

export const langDayStatus = [
  { day: 'Mon', completed: true, durationMins: 15 },
  { day: 'Tue', completed: true, durationMins: 20 },
  { day: 'Wed', completed: false, durationMins: 0 },
  { day: 'Thu', completed: true, durationMins: 15 },
  { day: 'Fri', completed: true, durationMins: 35 },
  { day: 'Sat', completed: false, durationMins: 0 },
  { day: 'Sun', completed: false, durationMins: 0 },
]

// ─── Weekly reset checklist ────────────────────────────────────

export const initialResetItems: WeeklyResetItem[] = [
  { id: 'ri1', label: 'Review last week', category: 'general', xp: 50, estimatedMins: 10, completed: false },
  { id: 'ri2', label: 'Set weekly theme', category: 'general', xp: 25, estimatedMins: 3, completed: false },
  { id: 'ri3', label: 'Plan meals for the week', category: 'body', xp: 50, estimatedMins: 10, completed: false },
  { id: 'ri4', label: 'Build grocery list', category: 'body', xp: 25, estimatedMins: 5, completed: false },
  { id: 'ri5', label: 'Plan workout split', category: 'body', xp: 25, estimatedMins: 5, completed: false },
  { id: 'ri6', label: 'Plan technical blocks', category: 'brain', xp: 50, estimatedMins: 10, completed: false },
  { id: 'ri7', label: 'Plan language blocks', category: 'brain', xp: 25, estimatedMins: 5, completed: false },
  { id: 'ri8', label: 'Choose LeetCode focus topics', category: 'brain', xp: 25, estimatedMins: 5, completed: false },
  { id: 'ri9', label: 'Clean up task backlog', category: 'execution', xp: 25, estimatedMins: 10, completed: false },
  { id: 'ri10', label: 'Define minimum viable day', category: 'execution', xp: 50, estimatedMins: 5, completed: false },
  { id: 'ri11', label: "Set tomorrow's anchor task", category: 'execution', xp: 25, estimatedMins: 3, completed: false },
]

// ─── Weekly reviews ────────────────────────────────────────────

export const initialWeeklyReviews: WeeklyReviewEntry[] = [
  {
    id: 'wr1',
    date: 'Last Sunday',
    wins: 'Shipped the AI diff engine for Counterparty. Hit protein 5/7 days. Meditation streak intact.',
    misses: 'Evening review only 2/7. Cardio only once.',
    heavy: 'Mid-week energy crash. Relied too much on caffeine Thursday.',
    momentum: 'Mornings with pre-planned meals and early deep work. Those days felt locked in.',
    reduce: 'Optional rituals before securing non-negotiables. Social media midday.',
    repeat: 'Early morning technical block. Pre-planned chicken rice bowls.',
    adjustment: 'Schedule cardio for pull days to reduce decision overhead. Evening review as a 5-min hard stop at 10pm.',
    summary: 'Good shipping week. Body consistency was solid mid-week. Evening review is the missing habit.',
  },
]

export const weeklyReviewAIResponse = 'You were strongest when the day had a simple anchor: protein, lift, one deep work block. Next week, reduce optional rituals and protect technical blocks earlier in the day. The biggest compound return right now is shipping + protein + sleep — everything else is additive, not foundational.'

// ─── Weekly AI strategist responses ───────────────────────────

export const weeklyAIResponses: Record<string, { title: string; body: string }> = {
  'weekly-plan': {
    title: 'Weekly Plan',
    body: 'Anchor the week on 3 fundamentals: protein every day, a technical block before noon, and one ship per project. Fill the rest around those. Monday sets the tone — make it clean.',
  },
  'meal-prep': {
    title: 'Meal Prep Plan',
    body: 'Prep 2 protein bases and 2 carb bases Sunday. Chicken rice bowls and turkey taco bowls as anchors. Greek yogurt bowls as fast fillers. Total prep time: 90 minutes. That covers 5 days.',
  },
  'workout-split': {
    title: 'Workout Split',
    body: 'Push Mon, Pull Tue, Legs Wed, Rest Thu, Push Fri, Pull+Cardio Sat, Reset Sun. Cardio on pull days — lower central fatigue. Incline walk: 15% grade, 3.1 mph, 40 min.',
  },
  'tech-schedule': {
    title: 'Technical Schedule',
    body: 'Mon/Tue: AscendOS deep blocks. Wed: Counterparty. Thu: LeetCode + OS. Fri: LeetCode revisit only. Sat: language + Zetamac. Do not try to hit every track every day. Rotate depth.',
  },
  'lang-schedule': {
    title: 'Language Schedule',
    body: '15 min daily minimum — vocab or shadowing. One deep block Saturday: 45-min AI conversation practice. Review day Sunday. Target 50 new words this week. Streak above habits.',
  },
  'review-last-week': {
    title: 'Last Week Review',
    body: 'Strong shipping signals. Protein consistency was solid mid-week. Evening review is the main gap — it compounds into morning clarity. Cardio is optional but helps mood consistency.',
  },
  'mvw': {
    title: 'Minimum Viable Week',
    body: 'Minimum viable week: 4 lifts, 6 protein days, 12 Pomodoros, 5 LeetCode sessions, 5 language sessions, and 3 short reflection nights. Everything else is additive.',
  },
  'rebalance': {
    title: 'Rebalance Week',
    body: 'Spirit habits are lagging. Add evening review as a 5-min non-negotiable at 10pm. Cut one optional ritual from daily rotation (Zetamac can go to 3x/week). Protect sleep before optional extras.',
  },
}
