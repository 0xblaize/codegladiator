import { Check, LockKeyhole, WalletCards } from 'lucide-react'
import { CheckInStatus } from '../types/arena'

type WalletCheckInProps = { status: CheckInStatus; onCheckIn: () => void }

export function WalletCheckIn({ status, onCheckIn }: WalletCheckInProps) {
  const isChecking = status === 'checking'
  const isCheckedIn = status === 'checked-in'
  return (
    <section className="liquid-glass rounded-[1.75rem] p-5" aria-labelledby="check-in-title">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-amber-200/15 text-amber-100"><WalletCards size={18} /></div><div><h2 id="check-in-title" className="text-sm font-semibold text-white">Arena check-in</h2><p className="text-xs text-white/45">Required before submission</p></div></div>
        {isCheckedIn ? <span className="flex items-center gap-1.5 rounded-full bg-emerald-300/10 px-2.5 py-1 text-xs text-emerald-200"><Check size={13} /> Ready</span> : <LockKeyhole size={16} className="text-white/35" />}
      </div>
      <button className="flex min-h-11 w-full items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white transition-colors hover:bg-white/15 disabled:cursor-wait disabled:text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/70" type="button" onClick={onCheckIn} disabled={isChecking || isCheckedIn}>{isChecking ? 'Checking wallet…' : isCheckedIn ? 'Wallet checked in' : 'Check in wallet'}</button>
      <p className="mt-3 text-xs leading-5 text-white/40">Demo only — no wallet connection, NIM transaction, or signature was used.</p>
    </section>
  )
}
