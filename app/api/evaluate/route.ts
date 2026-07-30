import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getArena } from '../../../src/lib/arena/repository'
import { evaluateMock } from '../../../src/lib/judge/mock-judge'

const requestSchema = z.object({
  arenaId: z.string().min(1).max(80),
  code: z.string().min(1).max(20_000),
  language: z.literal('typescript'),
})

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid evaluation request.' }, { status: 400 })
  const arena = await getArena(parsed.data.arenaId)
  if (!arena) return NextResponse.json({ error: 'Arena not found.' }, { status: 404 })
  return NextResponse.json(evaluateMock(arena.id, parsed.data.code))
}
