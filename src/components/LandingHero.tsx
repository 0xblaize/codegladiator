import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowRight, Camera, Code2, Globe, Send, Swords } from 'lucide-react'

const VIDEO_SOURCE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

type LandingHeroProps = {
  onEnterArena: () => void
}

export function LandingHero({ onEnterArena }: LandingHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeFrameRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)
  const opacityRef = useRef(0)
  const [videoOpacity, setVideoOpacity] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let restartTimeout: number | null = null

    const cancelFade = () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current)
        fadeFrameRef.current = null
      }
    }

    const fadeTo = (target: number, duration: number) => {
      cancelFade()
      const startedAt = performance.now()
      const startingOpacity = opacityRef.current

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const nextOpacity = startingOpacity + (target - startingOpacity) * progress
        opacityRef.current = nextOpacity
        setVideoOpacity(nextOpacity)
        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(animate)
        } else {
          fadeFrameRef.current = null
        }
      }

      fadeFrameRef.current = requestAnimationFrame(animate)
    }

    const fadeIn = () => {
      fadingOutRef.current = false
      fadeTo(1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return
      if (video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true
        fadeTo(0, 500)
      }
    }

    const handleEnded = () => {
      cancelFade()
      opacityRef.current = 0
      setVideoOpacity(0)
      restartTimeout = window.setTimeout(() => {
        video.currentTime = 0
        fadingOutRef.current = false
        void video.play()
        fadeIn()
      }, 100)
    }

    video.addEventListener('loadeddata', fadeIn)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    void video.play().catch(() => undefined)

    return () => {
      cancelFade()
      if (restartTimeout !== null) window.clearTimeout(restartTimeout)
      video.removeEventListener('loadeddata', fadeIn)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full translate-y-[17%] object-cover"
        style={{ opacity: videoOpacity }}
        src={VIDEO_SOURCE}
        autoPlay
        muted
        playsInline
        loop={false}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.74)_100%)]" aria-hidden="true" />

      <nav className="relative z-20 px-6 py-6" aria-label="Main navigation">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-8">
            <a href="#top" className="flex items-center gap-2 text-lg font-semibold text-white">
              <Swords size={24} strokeWidth={1.8} />
              <span>CodeGladiator</span>
            </a>
            <div className="hidden items-center gap-8 md:flex">
              <button className="text-sm font-medium text-white/80 transition-colors hover:text-white" type="button" onClick={onEnterArena}>Arena</button>
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="#sponsors">For Sponsors</a>
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="#about">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-medium text-white transition-colors hover:text-white/70 sm:block" type="button">Sign Up</button>
            <button className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5" type="button">Login</button>
          </div>
        </div>
      </nav>

      <section id="top" className="relative z-10 flex flex-1 -translate-y-[14%] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-white/60">
          <Code2 size={14} />
          <span>Merit over chance</span>
        </div>
        <h1 className="mb-8 max-w-4xl text-5xl tracking-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Compete for what you&apos;re worth
        </h1>
        <div className="w-full max-w-xl space-y-4">
          <form onSubmit={handleSubmit} className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/40" type="email" placeholder="Enter your email for early access" aria-label="Email for early access" />
            <button className="rounded-full bg-white p-3 text-black transition-transform hover:scale-105" type="submit" aria-label="Join the waitlist"><ArrowRight size={20} /></button>
          </form>
          <p className="px-4 text-sm leading-relaxed text-white">Solve real challenges. Prove your skill. Win sponsor-funded bounties in a live coding arena built for the curious.</p>
          <button className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5" type="button" onClick={onEnterArena}>Enter the arena</button>
        </div>
      </section>

      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="#instagram" aria-label="Instagram"><Camera size={20} /></a>
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="#twitter" aria-label="Twitter"><Send size={20} /></a>
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="#website" aria-label="Website"><Globe size={20} /></a>
      </footer>
    </main>
  )
}
