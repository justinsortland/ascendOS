import type {
  GratitudeEntry,
  DreamEntry,
  MeditationSession,
  VisualizationSession,
  EveningReviewEntry,
  SpiritInsight,
} from './types'

// ─── Spirit score base ─────────────────────────────────────────

export const INITIAL_SPIRIT_SCORE = 68
export const INITIAL_SPIRIT_XP = 1920
export const REFLECTION_MODE = 'Quiet Rebuild'

export const MEDITATION_STREAK = 6
export const GRATITUDE_STREAK = 9
export const DREAM_RECALL_SCORE = 7 // out of 10
export const LUCID_PRACTICE_THIS_WEEK = 4 // out of 7
export const VISUALIZATION_THIS_WEEK = 3 // out of 5

// ─── Gratitude ─────────────────────────────────────────────────

export const gratitudePrompts = [
  'What made today less beige?',
  'What is one thing you are building that future you will thank you for?',
  'Who or what made life feel more colorful today?',
  'What did you handle better than you would have a year ago?',
  'What is one small sign that momentum is returning?',
  'What is one thing you have that you used to want?',
  'What is one conversation that felt real today?',
  'What part of today would you want to keep?',
]

export const gratitudeTags = [
  'Body', 'Career', 'Friends', 'Family', 'Faith',
  'Confidence', 'Progress', 'Peace', 'Memory', 'Future',
]

export const initialGratitudeEntries: GratitudeEntry[] = [
  {
    id: 'g1',
    date: 'Yesterday',
    prompt: 'What is one thing you are building that future you will thank you for?',
    content: 'Counterparty is actually working. The AI diff engine ships cleanly and the client reaction was real. That matters.',
    moodBefore: 'neutral',
    moodAfter: 'good',
    tags: ['Career', 'Progress'],
  },
  {
    id: 'g2',
    date: '2 days ago',
    prompt: 'What made today less beige?',
    content: 'Morning workout was solid. Hit 185g protein. Small but it counts. Also had a good phone call with my brother.',
    moodBefore: 'neutral',
    moodAfter: 'good',
    tags: ['Body', 'Family'],
  },
  {
    id: 'g3',
    date: '3 days ago',
    prompt: 'What did you handle better than you would have a year ago?',
    content: 'Did not spiral after a frustrating debug session. Took a walk, reset, came back and found the issue in 20 minutes.',
    moodBefore: 'low',
    moodAfter: 'neutral',
    tags: ['Confidence', 'Progress'],
  },
]

// ─── Dreams ────────────────────────────────────────────────────

export const emotionalTones = [
  'Calm', 'Anxious', 'Curious', 'Vivid', 'Foggy',
  'Nostalgic', 'Adventurous', 'Unsettled', 'Peaceful', 'Strange',
]

export const initialDreamSigns = [
  'Campus', 'Parties / events', 'Old classmates',
  'Unusual buildings', 'Water', 'Phones not working', 'Flying / floating',
]

export const initialDreamEntries: DreamEntry[] = [
  {
    id: 'd1',
    date: 'Last night',
    title: 'Campus Maze',
    description: 'Was back in the university library but the layout kept shifting. Could not find the exit. Found an old classmate who pointed me up a staircase that did not exist before.',
    lucidityLevel: 1,
    vividnessLevel: 4,
    emotionalTone: 'Anxious',
    dreamSigns: ['Campus', 'Old classmates', 'Unusual buildings'],
    realityCheckDone: false,
    lucidityAchieved: false,
  },
  {
    id: 'd2',
    date: '2 nights ago',
    title: 'Festival Night',
    description: 'Outdoor festival with lights everywhere. Music was real. I almost noticed I was dreaming when I could not read a sign correctly, but the dream shifted.',
    lucidityLevel: 2,
    vividnessLevel: 5,
    emotionalTone: 'Adventurous',
    dreamSigns: ['Parties / events', 'Phones not working'],
    realityCheckDone: true,
    lucidityAchieved: false,
  },
  {
    id: 'd3',
    date: '4 nights ago',
    title: 'Floating City',
    description: 'Brief but clear. Standing on a platform above clouds. Calm and very vivid. Knew I was dreaming for about 30 seconds before it collapsed.',
    lucidityLevel: 4,
    vividnessLevel: 5,
    emotionalTone: 'Peaceful',
    dreamSigns: ['Flying / floating', 'Unusual buildings'],
    realityCheckDone: true,
    lucidityAchieved: true,
  },
]

// ─── Meditation ────────────────────────────────────────────────

export const initialMeditationSessions: MeditationSession[] = [
  { id: 'm1', date: 'Yesterday', durationMins: 10, moodBefore: 'neutral', moodAfter: 'good', notes: 'Body scan. Quieter than usual.', completed: true },
  { id: 'm2', date: '2 days ago', durationMins: 10, moodBefore: 'low', moodAfter: 'neutral', completed: true },
  { id: 'm3', date: '3 days ago', durationMins: 15, moodBefore: 'neutral', moodAfter: 'great', notes: 'Stayed longer. Felt clear after.', completed: true },
  { id: 'm4', date: '4 days ago', durationMins: 10, moodBefore: 'neutral', moodAfter: 'good', completed: true },
  { id: 'm5', date: '5 days ago', durationMins: 10, moodBefore: 'good', moodAfter: 'great', notes: 'Morning session. Best in a while.', completed: true },
]

// ─── Visualization / SATS ──────────────────────────────────────

export const desiredStates = [
  'Locked-in builder',
  'Lean and confident',
  'Elite technical candidate',
  'Socially magnetic postgrad life',
  'Calm, abundant, colorful future',
]

export const visualizationPrompts = [
  'Imagine yourself ending the day with your workout complete, protein hit, Counterparty shipped, and your future feeling less beige.',
  'See yourself in the interview — calm, sharp, answering cleanly. The work you put in is visible in how you move.',
  'Feel what it is like to wake up with momentum already built. The compound interest of showing up is paying.',
  'Step into the version of yourself one year from now. What did he do consistently that made the difference?',
  'You are already the person. The only gap is repetitions.',
]

export const initialVisualizationSessions: VisualizationSession[] = [
  {
    id: 'v1',
    date: 'Yesterday',
    desiredState: 'Locked-in builder',
    script: 'Ended the session with a clear sense of what shipping feels like. Calm confidence.',
    completed: true,
    durationMins: 8,
  },
  {
    id: 'v2',
    date: '2 days ago',
    desiredState: 'Elite technical candidate',
    completed: true,
    durationMins: 6,
    notes: 'Held the interview scene for longer this time.',
  },
  {
    id: 'v3',
    date: '4 days ago',
    desiredState: 'Calm, abundant, colorful future',
    completed: true,
    durationMins: 10,
    notes: 'Felt real. Kept it grounded — no specific imagery, just the feeling.',
  },
]

// ─── Evening Review ────────────────────────────────────────────

export const aiReflectionMock = 'You did not need a perfect day. You needed proof of continuity. Tomorrow, anchor on protein, one deep work block, and a clean morning reset.'

export const initialEveningReviews: EveningReviewEntry[] = [
  {
    id: 'er1',
    date: 'Yesterday',
    wentWell: 'Shipped the AI diff update. Morning workout complete. Good protein day.',
    feltHeavy: 'Mid-afternoon slump. Spent too long on Slack.',
    avoided: 'Did not start the revision comparison UI.',
    toRepair: 'Start earlier on the hardest task tomorrow.',
    proudOf: 'Did not let the slump become a writeoff. Reset and got one more thing done.',
    anchorTask: 'Wire Brain overview stats before noon.',
  },
  {
    id: 'er2',
    date: '2 days ago',
    wentWell: 'LeetCode problem solved independently. Good deep work session.',
    feltHeavy: 'Tired after gym. Wanted to skip evening work.',
    avoided: 'Quant research reading.',
    toRepair: 'Block quant reading for morning when brain is fresh.',
    proudOf: 'Went to gym even when I did not want to.',
    anchorTask: 'Meeting Rooms III — 45 min independent attempt.',
  },
]

// ─── Spirit AI responses ───────────────────────────────────────

export const spiritAIResponses: Record<string, { title: string; body: string }> = {
  'gratitude-prompt': {
    title: 'Gratitude Prompt',
    body: 'What is one small sign that momentum is returning? Not a victory — just a signal. A rep you did when you did not want to. A conversation that felt real. A day that ended slightly better than it started.',
  },
  'dream-pattern': {
    title: 'Dream Pattern Analysis',
    body: 'Your dream signs this week cluster around campus, movement, and social spaces. These are consistent enough to use as triggers. Before sleep: state clearly — "if I see a campus or a crowd, I will do a reality check." Keep it one sentence.',
  },
  'lucid-routine': {
    title: 'Tonight\'s Lucid Routine',
    body: 'Write 3 dream signs before sleep. Set one clear intention: "I will recognize I am dreaming." Do a reality check now. Set a 5-hour alarm for WBTB if you want to go deeper. Keep recall as the only win — everything else is bonus.',
  },
  'sats-visualization': {
    title: 'SATS / Visualization',
    body: 'Lie still, eyes closed. Feel the scene from the inside — not watching yourself, but being yourself in it. Use one sensory anchor: the sound of the keyboard, the feeling of the chair, the weight of the work being done. Hold the feeling, not the image. Drift from there.',
  },
  'reflect-day': {
    title: 'Day Reflection',
    body: 'You did not need a perfect day. You needed proof of continuity. Small proof beats dramatic reinvention. What is the one thing that happened today that slightly bends the trajectory? That is enough.',
  },
  'meditation-reset': {
    title: 'Meditation Reset',
    body: 'Ten minutes. Sit, close eyes, breathe slowly. When a thought arrives, acknowledge it and return to the breath. You are not trying to empty the mind — you are practicing the return. Each return is a rep. Ten minutes, done.',
  },
  'emotional-anchor': {
    title: 'Tomorrow\'s Emotional Anchor',
    body: 'Your anchor for tomorrow: small proof beats dramatic reinvention. One clean morning. One hard thing done before noon. One protein goal hit. That is the version of tomorrow that matters. Nothing else needs to be decided tonight.',
  },
}

// ─── Insights ──────────────────────────────────────────────────

export const spiritInsights: SpiritInsight[] = [
  { id: 'si1', message: 'Meditation is your highest-leverage reset habit this week. Even 10 minutes compounds over a 6-day streak.', priority: 'high' },
  { id: 'si2', message: 'Dream recall improves when you journal immediately after waking — before checking your phone.', priority: 'high' },
  { id: 'si3', message: 'SATS and lucid dreaming are bonus rituals. Do not let them crowd out sleep or deep work.', priority: 'medium' },
  { id: 'si4', message: 'Gratitude should not deny frustration — it should widen the frame around it.', priority: 'medium' },
  { id: 'si5', message: 'Evening review is most useful when short and honest. One sentence per field is enough.', priority: 'medium' },
  { id: 'si6', message: 'Visualization works best when you feel the state, not watch it. First person, present tense, sensory anchor.', priority: 'low' },
]
