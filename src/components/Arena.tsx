import { ArrowLeft, Clock3, Swords } from 'lucide-react'
import { Challenge, CheckInStatus, SettlementStatus, SubmissionStatus } from '../types/arena'
import { ChallengePanel } from './ChallengePanel'
import { CodeEditor } from './CodeEditor'
import { OpponentProgress } from './OpponentProgress'
import { SubmissionStatus as SubmissionStatusCard } from './SubmissionStatus'
import { WalletCheckIn } from './WalletCheckIn'

type ArenaProps = {
  challenge: Challenge
  code: string
  elapsedSeconds: number
  opponentProgress: number
  checkInStatus: CheckInStatus
  submissionStatus: SubmissionStatus
  settlementStatus: SettlementStatus
  onBack: () => void
  onCodeChange: (code: string) => void
  onCheckIn: () => void
  onSubmit: () => void
  onResetCode: () => void
  onResetMatch: () => void
}

const MATCH_DURATION = 600

export function Arena({ challenge, code, elapsedSeconds, opponentProgress, checkInStatus, submissionStatus, settlementStatus, onBack, onCodeChange, onCheckIn, onSubmit, onResetCode, onResetMatch }: ArenaProps) {
  const remainingSeconds = Math.max(MATCH_DURATION - elapsedSeconds, 0)
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0')
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0')
  const canSubmit = checkInStatus === 'checked-in' && submissionStatus === 'idle'

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="arena-grid min-h-screen px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-2 sm:py-4">
          <button className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-medium text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70" type="button" onClick={onBack}><ArrowLeft size={17} /> <span className="hidden sm:inline">Back to landing</span></button>
          <div className="flex items-center gap-2 text-sm font-semibold tracking-tight"><Swords size={20} /> CodeGladiator <span className="hidden rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-100 sm:inline">Arena preview</span></div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold tabular-nums"><Clock3 size={15} className="text-amber-100" /> {minutes}:{seconds}</div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.75fr)] lg:items-start">
          <div className="space-y-5"><ChallengePanel challenge={challenge} remainingSeconds={remainingSeconds} /><CodeEditor code={code} canSubmit={canSubmit} onChange={onCodeChange} onSubmit={onSubmit} onResetCode={onResetCode} /></div>
          <aside className="space-y-5"><OpponentProgress progress={opponentProgress} /><WalletCheckIn status={checkInStatus} onCheckIn={onCheckIn} /><SubmissionStatusCard submissionStatus={submissionStatus} settlementStatus={settlementStatus} onReset={onResetMatch} /></aside>
        </div>
        <p className="mx-auto mt-7 max-w-7xl text-center text-xs leading-5 text-white/30">This is an interactive product preview. Nimiq Pay, sandbox judging, WebSockets, signatures, and escrow contracts are not connected yet.</p>
      </div>
    </main>
  )
}
