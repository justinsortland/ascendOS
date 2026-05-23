import type {
  MorningHabit,
  MacroTargets,
  BodyMeal,
  WorkoutSession,
  CardioSession,
  BodyInsight,
  WeeklyDay,
  BodyMode,
} from './types'

// ─── Mode & targets ───────────────────────────────────────────

export const bodyMode: BodyMode = 'cut'

export const macroTargets: MacroTargets = {
  calories: 2300,
  protein: 180,
  carbs: 210,
  fat: 70,
  waterOz: 120,
}

// ─── Morning habits ───────────────────────────────────────────

export const morningHabits: MorningHabit[] = [
  {
    id: 'mh1',
    label: 'Brush Teeth',
    tier: 'core',
    tierLabel: 'Core',
    streak: 30,
    duration: '2 min',
    description: 'AM brush. Non-negotiable.',
    completed: true,
  },
  {
    id: 'mh2',
    label: 'Floss',
    tier: 'core',
    tierLabel: 'Core',
    streak: 12,
    duration: '1 min',
    description: 'Gum health compounds over time.',
    completed: true,
  },
  {
    id: 'mh3',
    label: 'Vitamins',
    tier: 'enhancer',
    tierLabel: 'Enhancer',
    streak: 8,
    duration: '1 min',
    description: 'Vitamin D3, K2, Mag, Omega-3.',
    completed: false,
  },
  {
    id: 'mh4',
    label: 'Cold Shower',
    tier: 'optional',
    tierLabel: 'Optional',
    streak: 5,
    duration: '5 min',
    description: 'Mental toughness + circulation boost.',
    completed: false,
  },
  {
    id: 'mh5',
    label: 'Oil Pulling',
    tier: 'optional',
    tierLabel: 'Experimental',
    streak: 2,
    duration: '10 min',
    description: 'Coconut oil, 10 min. Unproven but harmless.',
    completed: false,
  },
  {
    id: 'mh6',
    label: 'Mastic Gum',
    tier: 'optional',
    tierLabel: 'Optional',
    streak: 3,
    duration: '5 min',
    description: 'Jaw / digestive. Use sparingly — skip if jaw fatigue.',
    completed: false,
  },
]

// ─── Today's meals ────────────────────────────────────────────

export const initialMeals: BodyMeal[] = [
  {
    id: 'm1',
    name: 'Protein Latte',
    time: '7:30 AM',
    calories: 290,
    protein: 28,
    carbs: 22,
    fat: 8,
    source: 'manual',
    notes: 'Espresso + protein powder + oat milk',
  },
  {
    id: 'm2',
    name: 'Chicken Rice Bowl',
    time: '12:00 PM',
    calories: 650,
    protein: 55,
    carbs: 72,
    fat: 12,
    source: 'meal-prep',
    notes: '200g chicken, 150g rice, broccoli',
  },
  {
    id: 'm3',
    name: 'Greek Yogurt + Protein',
    time: '3:30 PM',
    calories: 220,
    protein: 32,
    carbs: 14,
    fat: 3,
    source: 'manual',
    notes: '0% FAGE + 1 scoop isolate',
  },
  {
    id: 'm4',
    name: 'Salmon + Potatoes',
    time: '7:00 PM',
    calories: 660,
    protein: 47,
    carbs: 58,
    fat: 18,
    source: 'meal-prep',
    notes: '180g salmon fillet, 200g roasted potatoes',
  },
]

// Derived: calories from meals sum to 1820, protein 162 (close to spec)
// Adjust water separately as it's tracked independently

export const initialWaterOz = 72

// ─── Workout ─────────────────────────────────────────────────

export const todaysWorkout: WorkoutSession = {
  id: 'w1',
  split: 'pull',
  name: 'Pull Day',
  date: '2026-05-23',
  estimatedCalories: 380,
  completed: false,
  exercises: [
    {
      id: 'ex1',
      name: 'Pull-ups',
      sets: [
        { id: 's1-1', reps: 10, weight: 'BW', completed: false },
        { id: 's1-2', reps: 10, weight: 'BW', completed: false },
        { id: 's1-3', reps: 8, weight: 'BW', completed: false },
      ],
    },
    {
      id: 'ex2',
      name: 'Barbell Row',
      sets: [
        { id: 's2-1', reps: 8, weight: '135 lb', completed: false },
        { id: 's2-2', reps: 8, weight: '135 lb', completed: false },
        { id: 's2-3', reps: 8, weight: '135 lb', completed: false },
        { id: 's2-4', reps: 8, weight: '135 lb', completed: false },
      ],
    },
    {
      id: 'ex3',
      name: 'Lat Pulldown',
      sets: [
        { id: 's3-1', reps: 10, weight: '120 lb', completed: false },
        { id: 's3-2', reps: 10, weight: '120 lb', completed: false },
        { id: 's3-3', reps: 10, weight: '115 lb', completed: false },
      ],
    },
    {
      id: 'ex4',
      name: 'Seated Cable Row',
      sets: [
        { id: 's4-1', reps: 10, weight: '110 lb', completed: false },
        { id: 's4-2', reps: 10, weight: '110 lb', completed: false },
        { id: 's4-3', reps: 10, weight: '110 lb', completed: false },
      ],
    },
    {
      id: 'ex5',
      name: 'Face Pulls',
      sets: [
        { id: 's5-1', reps: 15, weight: '40 lb', completed: false },
        { id: 's5-2', reps: 15, weight: '40 lb', completed: false },
        { id: 's5-3', reps: 15, weight: '40 lb', completed: false },
      ],
    },
    {
      id: 'ex6',
      name: 'Bicep Curls',
      sets: [
        { id: 's6-1', reps: 12, weight: '35 lb', completed: false },
        { id: 's6-2', reps: 12, weight: '35 lb', completed: false },
        { id: 's6-3', reps: 10, weight: '35 lb', completed: false },
      ],
    },
  ],
}

export const recentWorkouts = [
  { day: 'Mon', split: 'push', completed: true },
  { day: 'Tue', split: 'legs', completed: true },
  { day: 'Wed', split: 'rest', completed: true },
  { day: 'Thu', split: 'pull', completed: false },
]

export const weeklyDays: WeeklyDay[] = [
  { day: 'Mon', sets: 42, trained: true },
  { day: 'Tue', sets: 38, trained: true },
  { day: 'Wed', sets: 0, trained: false },
  { day: 'Thu', sets: 0, trained: false },
  { day: 'Fri', sets: 0, trained: false },
  { day: 'Sat', sets: 0, trained: false },
  { day: 'Sun', sets: 0, trained: false },
]

// ─── Cardio ───────────────────────────────────────────────────

export const cardioPreset: Omit<CardioSession, 'id' | 'completed'> = {
  type: 'Incline Walk',
  durationMins: 40,
  incline: 15,
  speedMph: 3.1,
  distanceMi: 2.1,
  estimatedCalories: 480,
  notes: '15% incline / 3.1 mph — steady state',
}

// ─── Meal prep ────────────────────────────────────────────────

export const mealPrepIdeas = [
  { id: 'mp1', name: 'Chicken Rice Bowls', protein: 55, cal: 650 },
  { id: 'mp2', name: 'Turkey Taco Bowls', protein: 48, cal: 580 },
  { id: 'mp3', name: 'Greek Yogurt Protein Bowls', protein: 35, cal: 320 },
  { id: 'mp4', name: 'Salmon + Roasted Potatoes', protein: 45, cal: 660 },
]

// ─── Body insights ────────────────────────────────────────────

export const bodyInsights: BodyInsight[] = [
  {
    id: 'bi1',
    message:
      'Protein consistency is the highest-leverage body variable today. Hit 180g before you optimize anything else.',
    priority: 'high',
  },
  {
    id: 'bi2',
    message:
      "You're 18g protein short from target. Prioritize lean protein over snack calories — not both.",
    priority: 'high',
  },
  {
    id: 'bi3',
    message:
      "If you train Pull today, keep cardio moderate — 30–40 min walk is sufficient. Don't stack fatigue.",
    priority: 'medium',
  },
  {
    id: 'bi4',
    message:
      'Optional rituals are bonus only. Oil pulling and mastic gum do not move the needle like lifting, macros, and sleep do.',
    priority: 'low',
  },
  {
    id: 'bi5',
    message:
      "On a cut, preserve muscle above all else. High protein + progressive overload is the formula. Don't add cardio at the expense of recovery.",
    priority: 'medium',
  },
]

// ─── AI meal suggestions ──────────────────────────────────────

export const eatNextSuggestions = {
  default: [
    'Greek yogurt + protein powder (35g protein, 320 cal)',
    'Grilled chicken salad (40g protein, 380 cal)',
    'Cottage cheese bowl + fruit (30g protein, 280 cal)',
  ],
  highProtein: [
    'Chicken breast + egg whites (50g protein, 400 cal)',
    'Canned tuna + rice cakes (38g protein, 310 cal)',
    'Protein shake + banana (30g protein, 280 cal)',
  ],
  lowCal: [
    'Egg white omelette + greens (22g protein, 180 cal)',
    'Greek yogurt 0% plain (17g protein, 100 cal)',
    'Shrimp + cucumber (20g protein, 140 cal)',
  ],
  mealPrep: [
    'Prepped chicken rice bowl (55g protein, 650 cal)',
    'Turkey taco bowl (48g protein, 580 cal)',
    'Prepped salmon + potatoes (45g protein, 660 cal)',
  ],
}
