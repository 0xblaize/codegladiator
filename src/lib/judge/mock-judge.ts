import { EvaluationResult } from '../../types/domain'

export function evaluateMock(arenaId: string, code: string): EvaluationResult {
  const normalized = code.toLowerCase()
  const looksLikeSolution = normalized.includes('findmax') && (normalized.includes('math.max') || normalized.includes('for') || normalized.includes('reduce'))
  const totalTests = 5
  const passedTests = looksLikeSolution ? 5 : 2
  return {
    mode: 'mock',
    arenaId,
    status: passedTests === totalTests ? 'passed' : 'failed',
    passedTests,
    totalTests,
    feedback: passedTests === totalTests ? ['Handles empty arrays.', 'Supports negative values.', 'Linear solution detected.'] : ['Complete findMax before submitting.', 'The demo judge only recognizes the configured fixture challenge.'],
  }
}
