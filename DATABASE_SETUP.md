# AscendOS — Database Setup

AscendOS uses **Prisma** + **Supabase Postgres**. The app works fully with mock data
if `DATABASE_URL` is not set — every data access function has a mock fallback.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. After provisioning, go to **Settings → Database → Connection String**.
3. Copy the **Transaction** pooler string (port 6543) — use this for `DATABASE_URL`.
4. Copy the **Session** / direct string (port 5432) — use this for `DIRECT_URL`.

---

## 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your Supabase connection strings.

---

## 3. Generate Prisma Client

```bash
npm run db:generate
```

This reads `prisma/schema.prisma` and generates the type-safe client in `node_modules/@prisma/client`.

---

## 4. Push Schema to Database

For initial setup or schema changes:

```bash
npm run db:push
```

Or use migrations (recommended for production):

```bash
npm run db:migrate
```

---

## 5. Seed the Database

Populate with initial mock-matching data:

```bash
npm run db:seed
```

The seed creates one `User` (Justin) plus all initial tasks, habits, projects,
LeetCode problems, learning tracks, books, vocab cards, journal entries,
meditation sessions, and the current weekly plan.

---

## 6. Open Prisma Studio (optional)

Browse and edit your data visually:

```bash
npm run db:studio
```

---

## Schema Overview

| Model | Description |
|---|---|
| `User` | Single user profile, level, XP, streak |
| `Task` | Daily tasks with tier/category |
| `BonusQuest` | Optional bonus objectives |
| `PomodoroSession` | Focus timer sessions |
| `Habit` | Morning habits |
| `HabitCompletion` | Daily habit check-ins |
| `MacroGoal` | Calorie/macro targets |
| `Meal` | Daily meal log |
| `WorkoutSession` | Gym sessions |
| `ExerciseSet` | Individual sets per exercise |
| `CardioSession` | Cardio logs |
| `Project` | Brain projects (Counterparty, AscendOS, Alpha Lab) |
| `LeetCodeProblem` | Problem tracker |
| `LearningTrack` | Study track progress |
| `LearningSession` | Individual study sessions |
| `VocabCard` | Language vocab flashcards |
| `Book` | Reading list |
| `ReadingLog` | Daily pages read |
| `JournalEntry` | Gratitude journal entries |
| `DreamEntry` | Dream journal |
| `MeditationSession` | Meditation logs |
| `VisualizationSession` | SATS / visualization sessions |
| `EveningReview` | Evening review forms |
| `WeeklyPlan` | Weekly theme + goals container |
| `WeeklyGoal` | Individual weekly goals |
| `WeeklyReview` | Weekly review entries |
| `XPEntry` | XP audit log |

---

## Mock Fallback Behavior

All data access functions in `lib/data/` use try/catch:

- If `DATABASE_URL` is missing → Prisma client throws → mock data returned
- If DB is empty (fresh DB, no seed) → mock data returned
- If DB is seeded → live data returned

This means the app **always works** even without a database configured.
