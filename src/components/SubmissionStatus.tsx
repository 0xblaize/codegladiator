import { CheckCircle2, Circle, LoaderCircle, RotateCcw, Sparkles, Trophy } from 'lucide-react'
import { SettlementStatus, SubmissionStatus as SubmissionState } from '../types/arena'

type SubmissionStatusProps = { submissionStatus: SubmissionState; settlementStatus: SettlementStatus; onReset: () => void }

const statusCopy: Record<SubmissionState, string> = { idle: 'Ready for your first submission.', submitting: 'Your code is entering the sandbox…', judging: 'Running hidden test cases in the demo judge…', passed: 'All hidden test cases passed.', failed: 'The demo judge found a failing case.' }

export function SubmissionStatus({ submissionStatus, settlementStatus, onReset }: SubmissionStatusProps) {
  const isBusy = submissionStatus === 'submitting' || submissionStatus === 'judging'
  const hasResult = submissionStatus === 'passed' || submissionStatus === 'failed'
  return (
    <section className="liquid-glass rounded-[1.75rem] p-5" aria-labelledby="status-title" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className={`flex size-10 items-center justify-center rounded-xl ${submissionStatus === 'passed' ? 'bg-emerald-300/15 text-emerald-200' : 'bg-violet-300/15 text-violet-200'}`}>{submissionStatus === 'passed' ? <Trophy size={19} /> : <Sparkles size={19} />}</div><div><h2 id="status-title" className="text-sm font-semibold text-white">Judge status</h2><p className="text-xs text-white/45">{statusCopy[submissionStatus]}</p></div></div>{isBusy && <LoaderCircle size={18} className="animate-spin text-violet-200" />}</div>
      <div className="space-y-3 text-xs text-white/55">
        <StatusRow label="Solution submitted" complete={hasResult || isBusy} active={submissionStatus === 'submitting'} />
        <StatusRow label="Hidden tests evaluated" complete={submissionStatus === 'passed' || submissionStatus === 'failed'} active={submissionStatus === 'judging'} />
        <StatusRow label="Sponsor escrow settlement" complete={settlementStatus === 'settled'} active={settlementStatus === 'pending'} />
      </div>
      {submissionStatus === 'passed' && <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">Demo result: you won the sponsored bounty. Settlement is simulated locally for this preview.</div>}
      {submissionStatus === 'failed' && <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm leading-6 text-rose-100">Demo result: revise the solution and submit again. No real judge or transaction ran.</div>}
      <button className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70" type="button" onClick={onReset}><RotateCcw size={15} /> Reset match demo</button>
    </section>
  )
}

function StatusRow({ label, complete, active }: { label: string; complete: boolean; active: boolean }) {
  return <div className="flex items-center gap-3">{complete ? <CheckCircle2 size={16} className="text-emerald-200" /> : active ? <LoaderCircle size={16} className="animate-spin text-violet-200" /> : <Circle size={16} className="text-white/25" />}<span className={complete ? 'text-white/85' : active ? 'text-white' : ''}>{label}</span></div>
}
