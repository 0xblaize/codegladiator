'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, CircleDollarSign, Clock3, LoaderCircle, Play, ShieldCheck, Swords, Trophy } from 'lucide-react'
import { Arena, EvaluationResult } from '../types/domain'
import { sendArenaCheckIn, NimiqWalletError } from '../lib/wallet/nimiq'
import { CodeMirrorEditor } from './CodeMirrorEditor'

export function ArenaSession({ arena }: { arena: Arena }) {
  const [code, setCode] = useState(arena.starterCode)
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkingIn, setCheckingIn] = useState(false)
  const [checkInError, setCheckInError] = useState<string | null>(null)
  const [evaluating, setEvaluating] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)

  const checkIn = async () => {
    if (checkingIn || checkedIn) return
    setCheckingIn(true)
    setCheckInError(null)
    try {
      await sendArenaCheckIn()
      setCheckedIn(true)
    } catch (error) {
      setCheckInError(error instanceof NimiqWalletError ? error.message : 'The NIM check-in was rejected.')
    } finally {
      setCheckingIn(false)
    }
  }

  const submit = async () => {
    if (!checkedIn || evaluating) return
    setEvaluating(true)
    setResult(null)
    try {
      const response = await fetch('/api/evaluate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ arenaId: arena.id, language: 'typescript', code }) })
      const nextResult = await response.json() as EvaluationResult
      setResult(nextResult)
    } finally {
      setEvaluating(false)
    }
  }

  return (
    <main className="arena-grid min-h-screen px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-2 sm:py-4">
        <Link href="/lobby" className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm text-white/60 hover:text-white"><ArrowLeft size={17} /><span className="hidden sm:inline">Back to lobby</span></Link>
        <div className="flex items-center gap-2 text-sm font-semibold"><Swords size={20} /> CodeGladiator <span className="hidden rounded-full bg-cyan-200/10 px-2.5 py-1 text-[10px] uppercase tracking-[.18em] text-cyan-100 sm:inline">Arena</span></div>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm font-semibold tabular-nums"><Clock3 size={15} className="text-amber-100" /> 09:42</div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(310px,.75fr)]">
        <div className="space-y-5">
          <section className="liquid-glass rounded-[1.75rem] p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.2em] text-white/40">{arena.sponsor} · Live challenge</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{arena.title}</h1></div><div className="text-right"><p className="text-2xl font-semibold">{arena.bounty} {arena.currency}</p><p className="text-xs text-white/45">First to pass wins</p></div></div><div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-xs font-semibold uppercase tracking-[.15em] text-cyan-100/65">Task</p><p className="mt-3 text-sm leading-7 text-white/75">{arena.prompt}</p></div><div className="mt-5 flex flex-wrap gap-2 text-xs text-white/55">{arena.criteria.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-1.5">{item}</span>)}</div></section>
          <section className="liquid-glass rounded-[1.75rem] p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-sm font-semibold">Your solution</h2><p className="mt-1 text-xs text-white/45">Edit locally, then send it to the evaluation service.</p></div><span className="rounded-full bg-amber-200/10 px-3 py-1.5 text-xs text-amber-100">Secure judge required</span></div><CodeMirrorEditor value={code} onChange={setCode} /><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/55 hover:text-white" onClick={() => setCode(arena.starterCode)}>Reset code</button><button type="button" disabled={!checkedIn || evaluating} onClick={submit} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35">{evaluating ? <><LoaderCircle size={16} className="animate-spin" /> Judging…</> : <><Play size={16} fill="currentColor" /> Submit for {arena.bounty} USDT</>}</button></div></section>
        </div>

        <aside className="space-y-5">
          <section className="liquid-glass rounded-[1.75rem] p-5"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-white/40">Opponent tracker</p><p className="mt-2 text-sm font-semibold">{arena.opponent}</p></div><span className="rounded-full bg-fuchsia-300/10 px-3 py-1.5 text-xs text-fuchsia-100">2/5 tests</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[40%] rounded-full bg-gradient-to-r from-fuchsia-300 to-violet-300" /></div><p className="mt-3 text-xs text-white/40">Live opponent progress is not connected yet.</p></section>
          <section className="liquid-glass rounded-[1.75rem] p-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-amber-200/10 text-amber-100"><CircleDollarSign size={18} /></div><div><h2 className="text-sm font-semibold">Arena check-in</h2><p className="text-xs text-white/45">Real NIM payment · {arena.entryFee}</p></div></div><button type="button" disabled={checkedIn || checkingIn} onClick={checkIn} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white/10 text-sm font-medium hover:bg-white/15 disabled:text-white/45">{checkingIn ? <><LoaderCircle size={15} className="animate-spin" /> Confirming 1 NIM…</> : checkedIn ? <><CheckCircle2 size={15} className="text-emerald-200" /> Checked in</> : 'Check in with Nimiq Pay'}</button>{checkInError && <p className="mt-3 rounded-xl border border-rose-300/20 bg-rose-300/10 p-3 text-xs leading-5 text-rose-100">{checkInError}</p>}<p className="mt-3 text-xs leading-5 text-white/40">This opens the official Nimiq Pay confirmation flow. The app must be opened inside Nimiq Pay.</p></section>
          {result && <section className={`liquid-glass rounded-[1.75rem] p-5 ${result.status === 'passed' ? 'border-emerald-300/25' : 'border-rose-300/25'}`}><div className="flex items-center gap-3">{result.status === 'passed' ? <Trophy className="text-emerald-200" size={22} /> : <ShieldCheck className="text-rose-200" size={22} />}<div><h2 className="text-sm font-semibold">{result.status === 'passed' ? 'VICTORY!' : 'Keep fighting'}</h2><p className="text-xs text-white/50">{result.passedTests}/{result.totalTests} hidden tests passed</p></div></div><p className="mt-4 text-sm leading-6 text-white/70">{result.status === 'passed' ? `${arena.bounty} USDT evaluation passed.` : 'Revise your solution and submit again.'}</p><div className="mt-4 space-y-2 text-xs text-white/55">{result.feedback.map((item) => <p key={item} className="flex gap-2"><CheckCircle2 size={14} className="shrink-0 text-emerald-200" /> {item}</p>)}</div></section>}
        </aside>
      </div>
      <p className="mx-auto mt-7 max-w-7xl text-center text-xs text-white/30">NIM check-in is connected through the Nimiq Mini App SDK. Judge, ECDSA proof, USDT escrow, and realtime opponent events require their production services.</p>
    </main>
  )
}
