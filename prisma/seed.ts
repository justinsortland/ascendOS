import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ─── User ────────────────────────────────────────────────────────
  const user = await prisma.user.upsert({
    where: { email: 'justin@ascendos.app' },
    update: {},
    create: {
      name: 'Justin',
      email: 'justin@ascendos.app',
      level: 12,
      xp: 12450,
      streakDays: 14,
      rank: 'Locked In',
    },
  })
  console.log('User:', user.id)

  // ─── Tasks ───────────────────────────────────────────────────────
  const today = new Date()

  const taskData = [
    { title: 'Hit protein goal (180g)', tier: 'non-negotiable', category: 'body', xp: 50, completed: true },
    { title: 'Gym — push day', tier: 'non-negotiable', category: 'body', xp: 75, completed: false },
    { title: 'Deep work block (3h)', tier: 'non-negotiable', category: 'brain', xp: 100, completed: false },
    { title: 'LeetCode (1 problem)', tier: 'non-negotiable', category: 'brain', xp: 50, completed: true },
    { title: 'AscendOS progress', tier: 'non-negotiable', category: 'brain', xp: 75, completed: false },
    { title: 'Read 30 mins', tier: 'enhancer', category: 'brain', xp: 30, completed: false },
    { title: 'Meditation (10 mins)', tier: 'enhancer', category: 'spirit', xp: 25, completed: true },
    { title: 'Gratitude journal', tier: 'enhancer', category: 'spirit', xp: 20, completed: false },
    { title: 'Meal prep', tier: 'enhancer', category: 'body', xp: 30, completed: false },
    { title: 'Water (3L)', tier: 'enhancer', category: 'body', xp: 20, completed: true },
    { title: 'Cold shower', tier: 'optional', category: 'body', xp: 10, completed: false },
    { title: 'Dream journal', tier: 'optional', category: 'spirit', xp: 10, completed: false },
    { title: 'SATS visualization', tier: 'optional', category: 'spirit', xp: 15, completed: false },
  ]

  for (const t of taskData) {
    await prisma.task.create({ data: { ...t, userId: user.id, date: today } })
  }

  // ─── Bonus Quests ────────────────────────────────────────────────
  const questData = [
    { title: 'Zetamac 80+ average', xp: 30, category: 'brain', completed: false },
    { title: '30 min Spanish practice', xp: 25, category: 'brain', completed: false },
    { title: 'System design review (1h)', xp: 40, category: 'brain', completed: false },
    { title: '20 min cardio', xp: 30, category: 'body', completed: false },
  ]
  for (const q of questData) {
    await prisma.bonusQuest.create({ data: { ...q, userId: user.id, date: today } })
  }

  // ─── Macro Goal ──────────────────────────────────────────────────
  await prisma.macroGoal.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      calories: 2200,
      protein: 180,
      carbs: 220,
      fat: 60,
      waterOz: 128,
      mode: 'cut',
    },
  })

  // ─── Habits ──────────────────────────────────────────────────────
  const habitData = [
    { label: 'No phone first 30 min', tier: 'core', tierLabel: 'Non-Negotiable', duration: '30 min', description: 'No phone, apps, or social media first thing.', streak: 9 },
    { label: 'Sunlight / outdoor walk', tier: 'core', tierLabel: 'Non-Negotiable', duration: '10 min', description: 'Get outside within 60 min of waking.', streak: 6 },
    { label: 'Whey protein + creatine', tier: 'core', tierLabel: 'Non-Negotiable', duration: '2 min', description: 'Take immediately upon waking.', streak: 14 },
    { label: 'Weigh in (fasted)', tier: 'core', tierLabel: 'Non-Negotiable', duration: '1 min', description: 'Fasted weigh-in for tracking.', streak: 11 },
    { label: 'Cold shower', tier: 'enhancer', tierLabel: 'Strong Enhancer', duration: '3 min', description: '2–3 min cold exposure.', streak: 4 },
    { label: 'Journaling (5 min)', tier: 'enhancer', tierLabel: 'Strong Enhancer', duration: '5 min', description: 'Morning pages or gratitude.', streak: 7 },
    { label: 'Oil pulling', tier: 'optional', tierLabel: 'Optional Ritual', duration: '10 min', description: '10 min coconut oil swishing.', streak: 2 },
    { label: 'Mastic gum', tier: 'optional', tierLabel: 'Optional Ritual', duration: '15 min', description: 'Jaw strengthening.', streak: 3 },
  ]
  for (const h of habitData) {
    await prisma.habit.create({ data: { ...h, userId: user.id } })
  }

  // ─── Projects ────────────────────────────────────────────────────
  const projectData = [
    {
      name: 'Counterparty',
      description: 'Quant trading infrastructure with backtesting engine, order management, and live paper trading.',
      status: 'active',
      priority: 'high',
      currentSprint: 'WebSocket feed reconnect + position reconciler',
      nextTask: 'Fix order_id desync in OMS reconciler',
      progress: 62,
      shipStreak: 5,
      lastWorked: 'Today',
      recentMilestones: ['IBKR live paper trading connected', 'Backtester v2 Sharpe ≥ 1.8', 'Order state machine refactored'],
      xp: 4200,
    },
    {
      name: 'AscendOS',
      description: 'Personal RPG command center for self-mastery tracking across Body, Brain, Spirit, and Execution.',
      status: 'building',
      priority: 'high',
      currentSprint: 'Phase 6 — Supabase persistence layer',
      nextTask: 'Wire dashboard to DB-backed initial data',
      progress: 78,
      shipStreak: 12,
      lastWorked: 'Today',
      recentMilestones: ['Brain + Spirit pages complete', 'Weekly + Analytics pages shipped', 'Prisma schema created'],
      xp: 3100,
    },
    {
      name: 'Alpha Lab',
      description: 'Research sandbox: ML signal generation, factor modeling, and Rust data pipelines.',
      status: 'planning',
      priority: 'medium',
      currentSprint: 'LSTM price signal prototype',
      nextTask: 'Finalize feature engineering pipeline',
      progress: 28,
      shipStreak: 0,
      lastWorked: '3 days ago',
      recentMilestones: ['Feature engineering v1 complete', 'First ML model baseline set'],
      xp: 890,
    },
  ]
  for (const p of projectData) {
    await prisma.project.create({ data: { ...p, userId: user.id } })
  }

  // ─── LeetCode Problems ───────────────────────────────────────────
  const lcData = [
    { title: 'Two Sum', difficulty: 'easy', pattern: 'Hash Map', status: 'mastered', timeMins: 4, solvedDate: '2026-05-10', url: 'https://leetcode.com/problems/two-sum/' },
    { title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', pattern: 'Sliding Window', status: 'mastered', timeMins: 6, solvedDate: '2026-05-11', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', pattern: 'Sliding Window', status: 'solved-independent', timeMins: 18, solvedDate: '2026-05-14', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { title: 'Valid Parentheses', difficulty: 'easy', pattern: 'Stack', status: 'mastered', timeMins: 7, solvedDate: '2026-05-12', url: 'https://leetcode.com/problems/valid-parentheses/' },
    { title: 'Merge Two Sorted Lists', difficulty: 'easy', pattern: 'Linked List', status: 'solved-help', timeMins: 14, solvedDate: '2026-05-13', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
    { title: 'Binary Tree Inorder Traversal', difficulty: 'easy', pattern: 'DFS', status: 'solved-independent', timeMins: 10, solvedDate: '2026-05-15', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
    { title: 'Climbing Stairs', difficulty: 'easy', pattern: 'Dynamic Programming', status: 'mastered', timeMins: 5, solvedDate: '2026-05-16', url: 'https://leetcode.com/problems/climbing-stairs/' },
    { title: 'Maximum Subarray', difficulty: 'medium', pattern: 'Dynamic Programming', status: 'solved-independent', timeMins: 20, solvedDate: '2026-05-17', url: 'https://leetcode.com/problems/maximum-subarray/' },
    { title: 'Number of Islands', difficulty: 'medium', pattern: 'BFS / DFS', status: 'revisit', timeMins: 35, solvedDate: '2026-05-19', notes: 'BFS version was shaky, revisit', url: 'https://leetcode.com/problems/number-of-islands/' },
    { title: 'Word Break', difficulty: 'medium', pattern: 'Dynamic Programming', status: 'attempted', timeMins: 45, notes: 'Memo DP not working — try bottom-up', url: 'https://leetcode.com/problems/word-break/' },
    { title: 'Median of Two Sorted Arrays', difficulty: 'hard', pattern: 'Binary Search', status: 'not-started', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
  ]
  for (const lc of lcData) {
    await prisma.leetCodeProblem.create({ data: { ...lc, userId: user.id } })
  }

  // ─── Learning Tracks ─────────────────────────────────────────────
  const trackData = [
    { name: 'System Design', icon: '🏗', currentTopic: 'Rate limiting & API gateway patterns', targetMins: 60, completedMins: 40, nextAction: 'Finish Grokking Ch. 7 on rate limiters', skillLevel: 5 },
    { name: 'Machine Learning', icon: '🧠', currentTopic: 'Gradient boosting & XGBoost', targetMins: 60, completedMins: 25, nextAction: 'Implement XGBoost on housing dataset', skillLevel: 4 },
    { name: 'Operating Systems', icon: '⚙', currentTopic: 'Memory management & paging', targetMins: 45, completedMins: 45, nextAction: 'Read OSTEP Ch. 18–22 on virtual memory', skillLevel: 3 },
    { name: 'Quant / Finance', icon: '📈', currentTopic: 'Statistical arbitrage & pairs trading', targetMins: 60, completedMins: 15, nextAction: 'Implement cointegration test in Python', skillLevel: 5 },
    { name: 'LeetCode Patterns', icon: '🧩', currentTopic: 'Dynamic programming — tabulation', targetMins: 0, completedMins: 0, targetSessions: 3, completedSessions: 1, nextAction: 'Solve 2 more DP problems from Blind 75', skillLevel: 4 },
    { name: 'Spanish', icon: '🇪🇸', currentTopic: 'Subjunctive mood (presente de subjuntivo)', targetMins: 30, completedMins: 20, nextAction: 'Anki deck 20 new cards + 1 conversation practice', skillLevel: 6 },
  ]
  for (const t of trackData) {
    await prisma.learningTrack.create({ data: { ...t, userId: user.id } })
  }

  // ─── Books ───────────────────────────────────────────────────────
  const bookData = [
    { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', currentPage: 112, totalPages: 242, status: 'reading', dailyGoalPages: 20, readingStreak: 8, todayPages: 12, highlight: '"Seek wealth, not money or status."' },
    { title: 'Atomic Habits', author: 'James Clear', currentPage: 248, totalPages: 320, status: 'reading', dailyGoalPages: 15, readingStreak: 3, todayPages: 0, highlight: '"Every action is a vote for the person you want to become."' },
    { title: 'The Art of Learning', author: 'Josh Waitzkin', currentPage: 0, totalPages: 265, status: 'planned', dailyGoalPages: 20, readingStreak: 0, todayPages: 0, highlight: undefined },
  ]
  for (const b of bookData) {
    await prisma.book.create({ data: { ...b, userId: user.id } })
  }

  // ─── Vocab Cards ─────────────────────────────────────────────────
  const vocabData = [
    { word: 'ojalá', translation: 'hopefully / I hope', example: 'Ojalá que llueva café.', reviewed: false },
    { word: 'sin embargo', translation: 'however / nevertheless', example: 'Sin embargo, no estoy de acuerdo.', reviewed: true },
    { word: 'aunque', translation: 'although / even though', example: 'Aunque es difícil, lo haré.', reviewed: false },
    { word: 'a propósito', translation: 'on purpose / by the way', example: 'A propósito, ¿dónde está Juan?', reviewed: false },
    { word: 'en cambio', translation: 'on the other hand / instead', example: 'Él estudia; en cambio, ella trabaja.', reviewed: true },
  ]
  for (const v of vocabData) {
    await prisma.vocabCard.create({ data: { ...v, userId: user.id } })
  }

  // ─── Journal Entries ─────────────────────────────────────────────
  await prisma.journalEntry.createMany({
    data: [
      { userId: user.id, prompt: 'What are three things you are grateful for today?', content: 'Grateful for: a productive deep work session this morning, the gym actually feeling good, and this project coming together.', moodBefore: 'neutral', moodAfter: 'good', tags: ['Progress', 'Body', 'Career'], date: new Date('2026-05-24') },
      { userId: user.id, prompt: 'What would make today great?', content: 'Getting the Prisma schema done and wiring up the dashboard. Eating clean. Hitting the gym without excuses.', moodBefore: 'good', moodAfter: 'great', tags: ['Career', 'Body', 'Progress'], date: new Date('2026-05-23') },
    ],
  })

  // ─── Meditation Sessions ─────────────────────────────────────────
  await prisma.meditationSession.createMany({
    data: [
      { userId: user.id, durationMins: 10, moodBefore: 'neutral', moodAfter: 'good', completed: true, date: new Date('2026-05-24') },
      { userId: user.id, durationMins: 15, moodBefore: 'low', moodAfter: 'neutral', completed: true, date: new Date('2026-05-23') },
      { userId: user.id, durationMins: 10, moodBefore: 'good', moodAfter: 'great', completed: true, date: new Date('2026-05-22') },
    ],
  })

  // ─── Weekly Plan ─────────────────────────────────────────────────
  const weekStart = new Date('2026-05-20')
  const weekEnd = new Date('2026-05-26')

  const weeklyPlan = await prisma.weeklyPlan.upsert({
    where: { userId_weekStart: { userId: user.id, weekStart } },
    update: {},
    create: {
      userId: user.id,
      weekStart,
      weekEnd,
      theme: 'Cut Cleanly',
      mainFocus: 'Body consistency + project shipping',
    },
  })

  const weeklyGoalData = [
    { category: 'body', title: 'Hit protein ≥ 180g per day', target: 7, current: 5, unit: 'days', priority: 'high', status: 'on-track' },
    { category: 'body', title: 'Gym sessions', target: 5, current: 3, unit: 'sessions', priority: 'high', status: 'on-track' },
    { category: 'body', title: 'Cardio sessions', target: 3, current: 1, unit: 'sessions', priority: 'medium', status: 'behind' },
    { category: 'body', title: 'Stay under 2200 cal', target: 7, current: 4, unit: 'days', priority: 'high', status: 'on-track' },
    { category: 'brain', title: 'Deep work hours', target: 15, current: 9, unit: 'hours', priority: 'high', status: 'on-track' },
    { category: 'brain', title: 'LeetCode problems', target: 10, current: 6, unit: 'problems', priority: 'high', status: 'on-track' },
    { category: 'brain', title: 'System design study', target: 5, current: 2, unit: 'hours', priority: 'medium', status: 'behind' },
    { category: 'brain', title: 'Spanish practice', target: 5, current: 3, unit: 'sessions', priority: 'medium', status: 'on-track' },
    { category: 'spirit', title: 'Meditation', target: 7, current: 4, unit: 'sessions', priority: 'medium', status: 'on-track' },
    { category: 'spirit', title: 'Gratitude journal', target: 7, current: 3, unit: 'entries', priority: 'medium', status: 'behind' },
    { category: 'spirit', title: 'Dream journal', target: 5, current: 2, unit: 'entries', priority: 'low', status: 'behind' },
    { category: 'spirit', title: 'Evening review', target: 7, current: 3, unit: 'entries', priority: 'medium', status: 'behind' },
    { category: 'execution', title: 'Daily task completion ≥ 80%', target: 7, current: 5, unit: 'days', priority: 'high', status: 'on-track' },
    { category: 'execution', title: 'Pomodoro sessions', target: 20, current: 13, unit: 'sessions', priority: 'high', status: 'on-track' },
    { category: 'execution', title: 'Weekly review done', target: 1, current: 0, unit: 'review', priority: 'high', status: 'not-started' },
    { category: 'execution', title: 'Zero day rule (no zero output)', target: 7, current: 6, unit: 'days', priority: 'high', status: 'on-track' },
  ]
  for (const g of weeklyGoalData) {
    await prisma.weeklyGoal.create({ data: { ...g, planId: weeklyPlan.id } })
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
