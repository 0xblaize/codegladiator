import Link from 'next/link'
import { ArrowLeft, Trophy } from 'lucide-react'

export default async function ResultPage({ params }: { params: Promise<{ arenaId: string }> }) {
  const { arenaId } = await params
  return <main className="arena-grid flex min-h-screen items-center justify-center px-5"><section className="liquid-glass w-full max-w-lg rounded-[2rem] p-8 text-center sm:p-12"><Trophy className="mx-auto text-emerald-200" size={46} /><p className="mt-7 text-xs font-semibold uppercase tracking-[.25em] text-emerald-100/70">Victory screen</p><h1 className="mt-3 text-5xl font-semibold">VICTORY!</h1><p className="mt-5 text-base leading-7 text-white/65">All 5/5 hidden test cases passed. The payout flow is ready to be connected to the sponsor escrow.</p><div className="mt-8 rounded-2xl bg-emerald-300/10 p-5 text-xl font-semibold text-emerald-100">150 USDT <span className="text-sm font-normal text-emerald-100/60">demo payout</span></div><p className="mt-5 text-xs leading-5 text-white/35">No cryptographic proof, blockchain claim, or wallet transfer occurred in mock mode.</p><Link href={`/arena/${arenaId}`} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black"><ArrowLeft size={16} /> Return to arena</Link></section></main>
}
