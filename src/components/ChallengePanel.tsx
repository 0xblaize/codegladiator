import { Award, Building2, CircleDot, Clock3, ShieldCheck } from 'lucide-react'
import { Challenge } from '../types/arena'

type ChallengePanelProps = {
  challenge: Challenge
  remainingSeconds: number
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainder = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

export function ChallengePanel({ challenge, remainingSeconds }: ChallengePanelProps) {
  return (
    <section className="liquid-glass rounded-[1.75rem] p-5 sm:p-6" aria-labelledby="challenge-title">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-black"><Building2 size={21} /></div>
          <div>
            <p className="text-sm font-semibold text-white">{challenge.sponsor}</p>
            <p className="text-xs text-white/45">{challenge.sponsorRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
          <ShieldCheck size={14} /> Escrow sponsored
        </div>
      </div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Live challenge</p>
          <h2 id="challenge-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{challenge.title}</h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-semibold text-white">{challenge.bounty}</p>
          <p className="text-xs text-white/45">{challenge.currency} bounty</p>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/80"><CircleDot size={13} /> {challenge.difficulty}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/80"><Clock3 size={13} /> {formatTime(remainingSeconds)} remaining</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/80"><Award size={13} /> First to pass wins</span>
      </div>
      <p className="max-w-2xl text-sm leading-7 text-white/68">{challenge.prompt}</p>
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Acceptance criteria</p>
        <ul className="grid gap-2 text-sm text-white/65 sm:grid-cols-3">
          {challenge.criteria.map((criterion) => <li key={criterion} className="flex gap-2"><span className="text-emerald-300">+</span>{criterion}</li>)}
        </ul>
      </div>
    </section>
  )
}
