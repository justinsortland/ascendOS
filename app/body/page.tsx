import { BodyShell } from '@/components/body/BodyShell'
import { getHabits } from '@/lib/data/body'

export const dynamic = 'force-dynamic'

export default async function BodyPage() {
  const { habits, source } = await getHabits()

  return <BodyShell initialHabits={habits} dataSource={source} />
}
