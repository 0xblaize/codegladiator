import Link from 'next/link'
import { ArrowRight, Code2, Swords, Trophy } from 'lucide-react'

const VIDEO_SOURCE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video className="absolute inset-0 h-full w-full translate-y-[17%] object-cover opacity-70" src={VIDEO_SOURCE} autoPlay muted loop playsInline aria-hidden="true" />
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.25)_42%,rgba(0,0,0,.9)_100%)]" aria-hidden="true" />
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8"><Link href="/" className="flex items-center gap-2 text-lg font-semibold"><Swords size={23} /> CodeGladiator</Link><Link href="/lobby" className="liquid-glass rounded-full px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10">Open lobby</Link></header>
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-cyan-100/70"><Code2 size={15} /> The Web3 bounty arena</div>
        <h1 className="max-w-4xl text-5xl leading-[.95] tracking-tight sm:text-7xl lg:text-8xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Prove your skill.<br /><em className="text-cyan-100">Claim the bounty.</em></h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">CodeGladiator turns real developer challenges into live, merit-based competitions. Enter an arena, solve the problem first, and earn sponsor-funded rewards — no luck, no middlemen, just proof.</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row"><Link href="/lobby" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">Explore live arenas <ArrowRight size={17} /></Link><span className="inline-flex items-center gap-2 text-xs text-white/45"><Trophy size={14} /> Built for builders who ship</span></div>
      </section>
      <footer className="relative z-10 px-6 pb-8 text-center text-xs text-white/35">Demo mode · No wallet, judge, or funds connected yet.</footer>
    </main>
  )
}
