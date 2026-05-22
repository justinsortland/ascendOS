import type { Task, BonusQuest, CommandCardData, DailyMission, AICoachMessage, UserStats } from './types'

export const mockUserStats: UserStats = {
  level: 12,
  xp: 3420,
  xpToNextLevel: 4000,
  momentumScore: 78,
  streakDays: 14,
  rank: 'Ascendant II',
}

export const mockTasks: Task[] = [
  // Non-negotiables
  { id: '1', title: 'Hit protein goal (180g)', tier: 'non-negotiable', category: 'body', completed: true, xp: 50 },
  { id: '2', title: 'Gym — push day', tier: 'non-negotiable', category: 'body', completed: false, xp: 75 },
  { id: '3', title: 'Deep work block (3h)', tier: 'non-negotiable', category: 'brain', completed: false, xp: 100 },
  { id: '4', title: 'LeetCode (1 problem)', tier: 'non-negotiable', category: 'brain', completed: true, xp: 50 },
  { id: '5', title: 'AscendOS progress', tier: 'non-negotiable', category: 'brain', completed: false, xp: 75 },
  // Enhancers
  { id: '6', title: 'Read 30 mins', tier: 'enhancer', category: 'brain', completed: false, xp: 30 },
  { id: '7', title: 'Meditation (10 mins)', tier: 'enhancer', category: 'spirit', completed: true, xp: 25 },
  { id: '8', title: 'Gratitude journal', tier: 'enhancer', category: 'spirit', completed: false, xp: 20 },
  { id: '9', title: 'Meal prep', tier: 'enhancer', category: 'body', completed: false, xp: 30 },
  { id: '10', title: 'Water (3L)', tier: 'enhancer', category: 'body', completed: true, xp: 20 },
  // Optional rituals
  { id: '11', title: 'Cold shower', tier: 'optional', category: 'body', completed: false, xp: 10 },
  { id: '12', title: 'Dream journal', tier: 'optional', category: 'spirit', completed: false, xp: 10 },
  { id: '13', title: 'SATS visualization', tier: 'optional', category: 'spirit', completed: false, xp: 15 },
]

export const mockCommandCards: CommandCardData[] = [
  { category: 'body', title: 'Body', xpPool: 175, streak: 14, progress: 40 },
  { category: 'brain', title: 'Brain', xpPool: 225, streak: 7, progress: 33 },
  { category: 'spirit', title: 'Spirit', xpPool: 55, streak: 21, progress: 25 },
  { category: 'execution', title: 'Execution', xpPool: 100, streak: 5, progress: 60 },
]

export const mockDailyMission: DailyMission = {
  title: 'The Deep Work Gauntlet',
  description:
    'Complete 3 hours of deep work on AscendOS + solve 1 LeetCode hard problem before 6 PM.',
  xp: 250,
  deadline: '6:00 PM',
  completed: false,
}

export const mockAIMessages: AICoachMessage[] = [
  {
    id: '1',
    message:
      "You've hit protein 6 days straight. Don't break the chain today — finish that gym session.",
    type: 'encouragement',
    timestamp: '8:00 AM',
  },
  {
    id: '2',
    message: 'Deep work is your #1 lever today. Silence the phone, open the IDE.',
    type: 'tip',
    timestamp: '9:30 AM',
  },
  {
    id: '3',
    message: "It's 2 PM and the gym session is still open. Your future self will thank you.",
    type: 'warning',
    timestamp: '2:00 PM',
  },
]

export const mockBonusQuests: BonusQuest[] = [
  { id: 'b1', title: 'Zetamac 80+ average', xp: 30, category: 'brain', completed: false },
  { id: 'b2', title: '30 min Spanish practice', xp: 25, category: 'brain', completed: false },
  { id: 'b3', title: 'System design review (1h)', xp: 40, category: 'brain', completed: false },
  { id: 'b4', title: '20 min cardio', xp: 30, category: 'body', completed: false },
]
