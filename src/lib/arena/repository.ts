import { ACTIVE_ARENAS } from './fixtures'
import { Arena } from '../../types/domain'

export async function listActiveArenas(): Promise<Arena[]> {
  return ACTIVE_ARENAS
}

export async function getArena(arenaId: string): Promise<Arena | null> {
  return ACTIVE_ARENAS.find((arena) => arena.id === arenaId) ?? null
}
