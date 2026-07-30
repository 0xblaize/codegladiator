import Link from 'next/link'
import { ArrowRight, LoaderCircle, Swords } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getArena } from '../../../../src/lib/arena/repository'

export default async function WaitingRoomPage({ params }: { params: Promise<{ arenaId: string }> }) {
  const { arenaId } = await params
  const arena = await getArena(arenaId)
  if (!arena) notFound()
  return <main className="arena-grid flex min-h-screen items-center justify-center px-5"><section className="liquid-glass w-full max-w-lg rounded-[2rem] p-8 text-center sm:p-12"><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-cyan-200/10 text-cyan-100"><Swords size={26} /></div><p className="mt-7 text-xs font-semibold uppercase tracking-[.25em] text-cyan-100/70">Waiting room</p><h1 className="mt-3 text-3xl font-semibold">Authenticating Gladiator…</h1><p className="mt-5 text-sm leading-7 text-white/60">You&apos;re joining <span className="text-white">{arena.title}</span> for the {arena.bounty} {arena.currency} sponsor bounty.</p><div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/55"><LoaderCircle size={18} className="animate-spin text-cyan-100" /> Waiting for opponent…</div><Link href={`/arena/${arena.id}`} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black">Enter live arena <ArrowRight size={16} /></Link><p className="mt-5 text-xs text-white/35">Check-in and matchmaking are simulated in this preview.</p></section></main>
}
