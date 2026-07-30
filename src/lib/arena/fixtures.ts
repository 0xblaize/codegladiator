import { Arena } from '../../types/domain'

export const ACTIVE_ARENAS: Arena[] = [
  {
    id: 'array-manipulation',
    title: 'Array Manipulation',
    sponsor: 'Web3Corp',
    bounty: '150',
    currency: 'USDT',
    entryFee: '1 NIM',
    difficulty: 'Intermediate',
    status: 'live',
    opponent: '@Dev_0x44',
    prompt: 'Write a function findMax(arr) that returns the largest number in an array. Handle negative values and return null for an empty array.',
    starterCode: 'function findMax(arr: number[]): number | null {\n  // Write your code here\n  return null\n}',
    criteria: ['Works with negative values', 'Returns null for empty arrays', 'Linear time complexity'],
  },
  {
    id: 'smart-contract-bug',
    title: 'Fix Smart Contract Bug',
    sponsor: 'DeFi Protocol',
    bounty: '500',
    currency: 'USDT',
    entryFee: '1 NIM',
    difficulty: 'Advanced',
    status: 'waiting',
    opponent: '@Dev_0x19',
    prompt: 'Identify and fix the state transition bug in a token vesting contract without changing the public interface.',
    starterCode: 'function release(address beneficiary) external {\n  // Find and fix the bug\n}',
    criteria: ['Preserves access control', 'Prevents double release', 'Keeps accounting exact'],
  },
]
