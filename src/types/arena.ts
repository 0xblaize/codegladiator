export type CheckInStatus = 'not-checked-in' | 'checking' | 'checked-in'
export type SubmissionStatus = 'idle' | 'submitting' | 'judging' | 'passed' | 'failed'
export type SettlementStatus = 'not-available' | 'pending' | 'settled'

export type Challenge = {
  sponsor: string
  sponsorRole: string
  title: string
  difficulty: 'Intermediate' | 'Advanced'
  bounty: string
  currency: string
  prompt: string
  criteria: string[]
}

export type ArenaState = {
  code: string
  elapsedSeconds: number
  opponentProgress: number
  checkInStatus: CheckInStatus
  submissionStatus: SubmissionStatus
  settlementStatus: SettlementStatus
}
