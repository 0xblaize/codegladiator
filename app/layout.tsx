import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeGladiator — The Web3 Bounty Arena',
  description: 'Prove your skill. Claim the bounty. No intermediaries.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
