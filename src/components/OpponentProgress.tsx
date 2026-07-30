import { Activity, Radio, UserRound } from 'lucide-react'

type OpponentProgressProps = {
  progress: number
}

export function OpponentProgress({ progress }: OpponentProgressProps) {
  return (
    <section className="liquid-glass rounded-[1.75rem] p-5" aria-labelledby="opponent-title">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-fuchsia-300/15 text-fuchsia-100"><UserRound size={19} /></div>
          <div>
            <h2 id="opponent-title" className="text-sm font-semibold text-white">Opponent telemetry</h2>
            <p className="text-xs text-white/45">Dev_0x42 · live simulation</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-fuchsia-200"><Radio size={13} className="animate-pulse" /> Live</span>
      </div>
      <div className="mb-3 flex items-end justify-between"><span className="text-sm text-white/55">Hidden test cases</span><span className="text-2xl font-semibold text-white">{progress}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label="Simulated opponent test progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-300 to-violet-300 transition-[width] duration-700" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-white/45"><Activity size={14} /> Your submission is judged first when it reaches the sandbox.</p>
    </section>
  )
}
