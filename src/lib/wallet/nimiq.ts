import { init } from '@nimiq/mini-app-sdk'

const LUNAS_PER_NIM = 100_000

export class NimiqWalletError extends Error {}

export async function sendArenaCheckIn(): Promise<{ address: string; transaction: string }> {
  const recipient = process.env.NEXT_PUBLIC_NIMIQ_CHECKIN_RECIPIENT
  if (!recipient) throw new NimiqWalletError('NIM check-in recipient is not configured.')

  let nimiq
  try {
    nimiq = await init()
  } catch {
    throw new NimiqWalletError('Open CodeGladiator inside Nimiq Pay to check in.')
  }

  const accounts = await nimiq.listAccounts()
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new NimiqWalletError('No Nimiq account was authorized.')
  }

  const transaction = await nimiq.sendBasicTransaction({
    recipient,
    value: LUNAS_PER_NIM,
  })

  if (typeof transaction !== 'string') {
    throw new NimiqWalletError(transaction.error?.message ?? 'The NIM check-in was rejected.')
  }

  return { address: accounts[0], transaction }
}
