import { useEffect, useRef, useState } from 'react'
import { Arena } from './components/Arena'
import { LandingHero } from './components/LandingHero'
import { Challenge, CheckInStatus, SettlementStatus, SubmissionStatus } from './types/arena'

const INITIAL_CODE = `function firstUniqueChar(input: string): string | null {
  const counts = new Map<string, number>()

  for (const char of input) {
    counts.set(char, (counts.get(char) ?? 0) + 1)
  }

  for (const char of input) {
    if (counts.get(char) === 1) return char
  }

  return null
}`

const CHALLENGE: Challenge = {
  sponsor: 'Northstar Labs',
  sponsorRole: 'Protocol infrastructure team',
  title: 'The first signal',
  difficulty: 'Intermediate',
  bounty: '250',
  currency: 'USDT',
  prompt: 'Given a string, return the first character that appears exactly once. Return null when every character repeats. Your solution should remain linear in time and work with mixed-case input.',
  criteria: ['O(n) time complexity', 'Handles empty input', 'Returns null when needed'],
}

type AppView = 'landing' | 'arena'

function App() {
  const [view, setView] = useState<AppView>('landing')
  const [code, setCode] = useState(INITIAL_CODE)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [opponentProgress, setOpponentProgress] = useState(18)
  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus>('not-checked-in')
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [settlementStatus, setSettlementStatus] = useState<SettlementStatus>('not-available')
  const timeoutsRef = useRef<number[]>([])

  const clearPendingTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout))
    timeoutsRef.current = []
  }

  useEffect(() => {
    if (view !== 'arena' || submissionStatus !== 'idle') return
    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => Math.min(current + 1, 600))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [view, submissionStatus])

  useEffect(() => {
    if (view !== 'arena' || submissionStatus !== 'idle') return
    const interval = window.setInterval(() => {
      setOpponentProgress((current) => Math.min(current + 2, 94))
    }, 4200)
    return () => window.clearInterval(interval)
  }, [view, submissionStatus])

  useEffect(() => () => clearPendingTimeouts(), [])

  const enterArena = () => {
    setView('arena')
    window.setTimeout(() => document.getElementById('challenge-title')?.focus(), 0)
  }

  const resetMatch = () => {
    clearPendingTimeouts()
    setElapsedSeconds(0)
    setOpponentProgress(18)
    setCheckInStatus('not-checked-in')
    setSubmissionStatus('idle')
    setSettlementStatus('not-available')
    setCode(INITIAL_CODE)
  }

  const checkIn = () => {
    if (checkInStatus !== 'not-checked-in') return
    setCheckInStatus('checking')
    const timeout = window.setTimeout(() => setCheckInStatus('checked-in'), 1200)
    timeoutsRef.current.push(timeout)
  }

  const submitSolution = () => {
    if (checkInStatus !== 'checked-in' || submissionStatus !== 'idle' || !code.trim()) return
    setSubmissionStatus('submitting')
    const judgingTimeout = window.setTimeout(() => setSubmissionStatus('judging'), 900)
    const resultTimeout = window.setTimeout(() => {
      setSubmissionStatus('passed')
      setSettlementStatus('pending')
    }, 2500)
    const settlementTimeout = window.setTimeout(() => setSettlementStatus('settled'), 4200)
    timeoutsRef.current.push(judgingTimeout, resultTimeout, settlementTimeout)
  }

  if (view === 'landing') return <LandingHero onEnterArena={enterArena} />

  return <Arena challenge={CHALLENGE} code={code} elapsedSeconds={elapsedSeconds} opponentProgress={opponentProgress} checkInStatus={checkInStatus} submissionStatus={submissionStatus} settlementStatus={settlementStatus} onBack={() => { clearPendingTimeouts(); setView('landing') }} onCodeChange={setCode} onCheckIn={checkIn} onSubmit={submitSolution} onResetCode={() => setCode(INITIAL_CODE)} onResetMatch={resetMatch} />
}

export default App
