import { notFound } from 'next/navigation'
import { getArena } from '../../../src/lib/arena/repository'
import { ArenaSession } from '../../../src/components/ArenaSession'

export default async function ArenaPage({ params }: { params: Promise<{ arenaId: string }> }) {
  const { arenaId } = await params
  const arena = await getArena(arenaId)
  if (!arena) notFound()
  return <ArenaSession arena={arena} />
}
