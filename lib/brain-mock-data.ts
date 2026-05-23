import type {
  Project,
  LeetCodeProblem,
  LearningTrack,
  VocabCard,
  Book,
  SkillNode,
  BrainInsight,
} from './types'

// ─── Brain score base ─────────────────────────────────────────

export const INITIAL_BRAIN_SCORE = 74
export const INITIAL_BRAIN_XP = 2850
export const FOCUS_MODE = 'Interview + Shipping'

// ─── Projects ─────────────────────────────────────────────────

export const initialProjects: Project[] = [
  {
    id: 'p1',
    name: 'Counterparty',
    description: 'AI-powered permit review and revision tracking platform.',
    status: 'active',
    priority: 'high',
    currentSprint: 'AI permit review improvements',
    nextTask: 'Improve revision comparison UI',
    progress: 68,
    shipStreak: 3,
    lastWorked: 'Today',
    recentMilestones: [
      'Shipped AI review diff engine',
      'Integrated GPT extraction pipeline',
      'Deployed v2 permit parser',
    ],
    githubUrl: 'https://github.com',
    xp: 1200,
  },
  {
    id: 'p2',
    name: 'AscendOS',
    description: 'Personal self-improvement command center and optimization OS.',
    status: 'building',
    priority: 'high',
    currentSprint: 'Brain dashboard — Phase 3',
    nextTask: 'Finish LeetCode tracker + skill tree',
    progress: 42,
    shipStreak: 2,
    lastWorked: 'Today',
    recentMilestones: [
      'Shipped Phase 1 dashboard',
      'Shipped Phase 2 Body page',
      'Completed typography refactor',
    ],
    githubUrl: 'https://github.com',
    xp: 750,
  },
  {
    id: 'p3',
    name: 'Alpha Lab',
    description: 'Quantitative research and trading strategy experimentation lab.',
    status: 'planning',
    priority: 'medium',
    currentSprint: 'Strategy + prototype framework',
    nextTask: 'Define first backtest experiment',
    progress: 18,
    shipStreak: 0,
    lastWorked: '4 days ago',
    recentMilestones: [
      'Defined core thesis',
      'Sketched data pipeline architecture',
    ],
    xp: 150,
  },
]

// ─── LeetCode ─────────────────────────────────────────────────

export const weeklyLeetCodeGoal = 10

export const initialLeetCodeProblems: LeetCodeProblem[] = [
  // Solved this week
  { id: 'lc1', title: 'Two Sum', difficulty: 'easy', pattern: 'Array / HashMap', status: 'mastered', timeMins: 8, solvedDate: 'Mon' },
  { id: 'lc2', title: 'Valid Parentheses', difficulty: 'easy', pattern: 'Stack', status: 'mastered', timeMins: 10, solvedDate: 'Mon' },
  { id: 'lc3', title: 'Merge Intervals', difficulty: 'medium', pattern: 'Intervals / Sorting', status: 'solved-help', timeMins: 35, notes: 'Missed edge case: overlapping at boundary', solvedDate: 'Tue' },
  { id: 'lc4', title: 'Task Scheduler', difficulty: 'medium', pattern: 'Heap / Greedy', status: 'solved-help', timeMins: 50, notes: 'Needed hint on idle slot calculation', solvedDate: 'Wed' },
  { id: 'lc5', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', pattern: 'BFS / Tree', status: 'solved-independent', timeMins: 22, solvedDate: 'Thu' },
  { id: 'lc6', title: 'Longest Increasing Subsequence', difficulty: 'medium', pattern: 'Dynamic Programming', status: 'attempted', timeMins: 60, notes: 'Got O(n²) solution, could not optimize to O(n log n)', solvedDate: 'Thu' },
  // Revisit queue
  { id: 'lc7', title: 'Meeting Rooms III', difficulty: 'hard', pattern: 'Heap / Interval Simulation', status: 'revisit', notes: 'Struggled with event ordering and room allocation logic', url: 'https://leetcode.com' },
  { id: 'lc8', title: 'Reorganize String', difficulty: 'medium', pattern: 'Heap / Greedy', status: 'revisit', notes: 'Max heap pattern not fully internalized' },
  { id: 'lc9', title: 'Non-overlapping Intervals', difficulty: 'medium', pattern: 'Greedy / Intervals', status: 'revisit', notes: 'Greedy selection criterion needs review' },
  { id: 'lc10', title: 'IPO', difficulty: 'hard', pattern: 'Heap / Greedy', status: 'revisit', notes: 'Two-heap approach not yet solid' },
  { id: 'lc11', title: 'Cheapest Flights Within K Stops', difficulty: 'medium', pattern: 'Graph / BFS / Bellman-Ford', status: 'revisit', notes: 'Confused Bellman-Ford with Dijkstra constraints' },
]

export const recommendedProblem = initialLeetCodeProblems[6] // Meeting Rooms III

export const weakTopics = [
  'Heap / Priority Queue',
  'Greedy Intervals',
  'Dynamic Programming — O(n log n)',
  'Graph Traversal (BFS variants)',
  'Backtracking Optimization',
]

// ─── Learning tracks ──────────────────────────────────────────

export const initialLearningTracks: LearningTrack[] = [
  {
    id: 'system-design',
    name: 'System Design',
    icon: '⚙️',
    currentTopic: 'Rate limiters + message queues',
    targetMins: 120,
    completedMins: 45,
    nextAction: 'Design URL shortener with scaling constraints',
    skillLevel: 4,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: '🧠',
    currentTopic: 'Backprop + optimization algorithms',
    targetMins: 90,
    completedMins: 30,
    nextAction: 'Review gradient descent variants (SGD, Adam, RMSProp)',
    skillLevel: 4,
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: '💾',
    currentTopic: 'Virtual memory + paging',
    targetMins: 120,
    completedMins: 80,
    nextAction: 'Study page replacement algorithms (LRU, CLOCK, optimal)',
    skillLevel: 3,
  },
  {
    id: 'quant-dev',
    name: 'Quant Dev',
    icon: '⚡',
    currentTopic: 'C++ latency + networking fundamentals',
    targetMins: 90,
    completedMins: 40,
    nextAction: 'Review TCP/UDP, market data feeds, and FIX protocol basics',
    skillLevel: 3,
  },
  {
    id: 'quant-research',
    name: 'Quant Research',
    icon: '📊',
    currentTopic: 'Probability + expected value',
    targetMins: 90,
    completedMins: 55,
    nextAction: 'Solve 3 conditional probability / EV problems',
    skillLevel: 4,
  },
  {
    id: 'zetamac',
    name: 'Zetamac',
    icon: '⚡',
    currentTopic: 'Mental math speed — mixed operations',
    targetMins: 0,
    completedMins: 0,
    targetSessions: 5,
    completedSessions: 2,
    nextAction: '2-minute speed round — target 80+ average',
    skillLevel: 5,
  },
]

// ─── Language ─────────────────────────────────────────────────

export const initialVocabCards: VocabCard[] = [
  { id: 'v1', word: 'rutina', translation: 'routine', example: 'Mi rutina matutina', reviewed: false },
  { id: 'v2', word: 'proteína', translation: 'protein', example: '180g de proteína al día', reviewed: false },
  { id: 'v3', word: 'entrenar', translation: 'to train', example: 'Necesito entrenar hoy', reviewed: false },
  { id: 'v4', word: 'objetivo', translation: 'goal / objective', example: 'Mi objetivo es mejorar cada día', reviewed: false },
  { id: 'v5', word: 'constancia', translation: 'consistency', example: 'La constancia es clave', reviewed: false },
]

export const languageData = {
  language: 'Spanish',
  level: 'B1',
  streak: 5,
  weeklyMinutes: 85,
  weeklyTarget: 105,
  vocabReviewed: 42,
  newWords: 8,
  confidenceScore: 62,
  dailyQuestCompleted: false,
  aiPrompt: 'Practice a conversation about going to the gym, ordering a high-protein meal, and describing your training routine.',
}

// ─── Reading ──────────────────────────────────────────────────

export const initialBooks: Book[] = [
  {
    id: 'b1',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    currentPage: 218,
    totalPages: 562,
    status: 'reading',
    dailyGoalPages: 12,
    readingStreak: 4,
    todayPages: 0,
    highlight: '"The limits of reliable distributed systems are more fundamental than any single implementation detail."',
  },
  {
    id: 'b2',
    title: 'Introduction to Statistical Learning',
    author: 'James, Witten, Hastie, Tibshirani',
    currentPage: 142,
    totalPages: 426,
    status: 'reading',
    dailyGoalPages: 8,
    readingStreak: 2,
    todayPages: 0,
    highlight: undefined,
  },
  {
    id: 'b3',
    title: 'The Laws of Human Nature',
    author: 'Robert Greene',
    currentPage: 0,
    totalPages: 592,
    status: 'planned',
    dailyGoalPages: 10,
    readingStreak: 0,
    todayPages: 0,
  },
]

// ─── AI coach responses ───────────────────────────────────────

export const brainAIResponses: Record<string, { title: string; body: string }> = {
  'plan-day': {
    title: 'Today\'s Technical Block',
    body: 'Pomodoro 1–2: Ship AscendOS — wire Brain overview stats. Pomodoro 3: Meeting Rooms III without hints (45 min attempt). Pomodoro 4: OS — virtual memory paging, 5 bullet notes. Language: 5 min vocab before bed.',
  },
  'next-leetcode': {
    title: 'Next LeetCode Problem',
    body: 'Meeting Rooms III. Your heap scheduling and interval simulation need a direct revisit. Attempt independently for 45 min — no hints. If stuck, trace the event queue on paper first.',
  },
  'project-task': {
    title: 'Project Task Suggestion',
    body: 'AscendOS: Wire Brain overview stats to live state derived from LeetCode, tracks, and projects. This unblocks the Brain Score calculation and is the next visible MVP milestone.',
  },
  'system-design': {
    title: 'System Design Prompt',
    body: 'Design a URL shortener supporting 1B+ requests/day. Address: consistent hashing for sharding, Redis caching for hot URLs, SQL vs NoSQL for the mapping table, and CDN placement for redirect latency.',
  },
  'os-study': {
    title: 'OS Study Block',
    body: 'Virtual memory deep dive — 30 minutes. Write 5 bullet notes on page replacement algorithms: LRU, CLOCK, and optimal (Belady\'s). Then 15 min on TLB mechanics and why TLB miss is expensive.',
  },
  'ml-study': {
    title: 'ML Study Block',
    body: 'Vanishing gradient: causes (saturating activations), solutions (batch norm, residual connections, weight init). Then implement a 2-layer forward pass from scratch in numpy — no PyTorch.',
  },
  'quant-practice': {
    title: 'Quant Practice Block',
    body: 'Solve 3 expected value problems: biased coin variants, game theory EV, and conditional probability. Then 1 Zetamac round for speed baseline — target 80+ in 2 minutes.',
  },
  'language': {
    title: 'Language Practice',
    body: 'Keep it light and daily: 5 min vocab review (rutina, constancia, entrenar, objetivo, proteína). 5 min shadow a native speaker clip. 5 min AI conversation — describe your training routine in Spanish.',
  },
  'review': {
    title: 'Brain Progress Review',
    body: 'Brain Score: 74. Strongest signal: Projects (3-day Counterparty ship streak). Needs attention: OS and Quant Dev are both below 50% of weekly target. LeetCode revisit queue has 5 unsolved — Meeting Rooms III is the priority.',
  },
}

// ─── Skill nodes ──────────────────────────────────────────────

export const skillNodes: SkillNode[] = [
  { id: 'sn1', name: 'Projects', icon: '🚀', level: 7, xp: 2100, progress: 52, status: 'active' },
  { id: 'sn2', name: 'LeetCode', icon: '⚡', level: 5, xp: 1400, progress: 60, status: 'needs-attention' },
  { id: 'sn3', name: 'System Design', icon: '⚙️', level: 4, xp: 950, progress: 38, status: 'active' },
  { id: 'sn4', name: 'Machine Learning', icon: '🧠', level: 4, xp: 880, progress: 33, status: 'active' },
  { id: 'sn5', name: 'Operating Systems', icon: '💾', level: 3, xp: 540, progress: 67, status: 'behind' },
  { id: 'sn6', name: 'Quant Dev', icon: '📡', level: 3, xp: 420, progress: 44, status: 'behind' },
  { id: 'sn7', name: 'Language', icon: '🌐', level: 6, xp: 1650, progress: 81, status: 'locked-in' },
  { id: 'sn8', name: 'Reading', icon: '📖', level: 5, xp: 1100, progress: 53, status: 'active' },
]

// ─── Brain insights ───────────────────────────────────────────

export const brainInsights: BrainInsight[] = [
  { id: 'bi1', message: 'Project shipping is your highest-leverage career signal this week. Counterparty and AscendOS both have clear next tasks.', priority: 'high' },
  { id: 'bi2', message: 'LeetCode revisit discipline is weak — 5 unsolved in queue. Revisit before adding new problems.', priority: 'high' },
  { id: 'bi3', message: 'OS study supports quant dev prep directly. Keep it in the weekly rotation — don\'t let it slip to zero.', priority: 'medium' },
  { id: 'bi4', message: 'Language learning should stay a daily minimum (15 min). Do not replace deep work with it, but do not skip it either.', priority: 'medium' },
  { id: 'bi5', message: 'Do not try to study every track every day. Rotate 2–3 tracks per day with deep focus. Breadth daily = depth never.', priority: 'medium' },
  { id: 'bi6', message: 'Alpha Lab is stalled. Even 30 minutes on defining the first backtest experiment counts as progress.', priority: 'low' },
]
