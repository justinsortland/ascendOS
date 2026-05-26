import { BrainShell } from '@/components/brain/BrainShell'
import { getLeetCodeProblems } from '@/lib/data/brain'

export const dynamic = 'force-dynamic'

// This title is the canonical "recommended" problem — must match the seed.
const RECOMMENDED_TITLE = 'Meeting Rooms III'

export default async function BrainPage() {
  const { problems, source } = await getLeetCodeProblems()

  // Derive recommended problem ID from real data so BrainShell never falls back to a mock ID.
  const recommended =
    problems.find(p => p.title === RECOMMENDED_TITLE) ??
    problems.find(p => p.status === 'revisit') ??
    problems[0]

  return (
    <BrainShell
      initialProblems={problems}
      initialRecommendedId={recommended?.id ?? null}
      dataSource={source}
    />
  )
}
