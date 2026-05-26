import { SpiritShell } from '@/components/spirit/SpiritShell'
import { getGratitudeEntries, getDreamEntries } from '@/lib/data/spirit'

export const dynamic = 'force-dynamic'

export default async function SpiritPage() {
  const [{ entries: gratitudeEntries, source }, { entries: dreamEntries }] = await Promise.all([
    getGratitudeEntries(),
    getDreamEntries(),
  ])

  return (
    <SpiritShell
      initialGratitudeEntries={gratitudeEntries}
      initialDreamEntries={dreamEntries}
      dataSource={source}
    />
  )
}
