export type ArenaStatus = 'live' | 'waiting' | 'completed'

export type Arena = {
  id: string
  title: string
  sponsor: string
  bounty: string
  currency: 'USDT'
  entryFee: string
  difficulty: 'Intermediate' | 'Advanced'
  status: ArenaStatus
  opponent: string
  prompt: string
  starterCode: string
  criteria: string[]
}

export type EvaluationResult = {
  mode: 'mock'
  arenaId: string
  status: 'passed' | 'failed'
  passedTests: number
  totalTests: number
  feedback: string[]
}
