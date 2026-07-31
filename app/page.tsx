'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Code2, Globe, Swords } from 'lucide-react'

const VIDEO_SOURCE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeFrameRef = useRef<number | null>(null)
  const restartTimeoutRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)
  const opacityRef = useRef(0)
  const [videoOpacity, setVideoOpacity] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const cancelFade = () => {
      if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current)
      fadeFrameRef.current = null
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
        if (progress < 1) fadeFrameRef.current = requestAnimationFrame(animate)
        else fadeFrameRef.current = null
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
      restartTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0
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
      if (restartTimeoutRef.current !== null) window.clearTimeout(restartTimeoutRef.current)
      video.removeEventListener('loadeddata', fadeIn)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])


  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video ref={videoRef} className="absolute inset-0 h-full w-full translate-y-[17%] object-cover" style={{ opacity: videoOpacity }} src={VIDEO_SOURCE} autoPlay muted playsInline loop={false} aria-hidden="true" />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.18)_45%,rgba(0,0,0,.82)_100%)]" aria-hidden="true" />

      <nav className="relative z-20 px-6 py-6" aria-label="Main navigation">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white"><Globe size={24} /><span>CodeGladiator</span></Link>
            <div className="hidden items-center gap-8 md:flex"><Link className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="/lobby">Arena</Link><Link className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="/sponsor">Sponsors</Link><Link className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="/about">About</Link></div>
          </div>
          <div className="flex items-center gap-4"><button className="hidden text-sm font-medium text-white transition-colors hover:text-white/70 sm:block" type="button">Sign Up</button><Link className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5" href="/lobby">Login</Link></div>
        </div>
      </nav>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-start px-6 pt-8 text-center sm:pt-10">
        <div>
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[.28em] text-white/60"><Code2 size={14} /><span>Merit over chance</span></div>
          <h1 className="mb-5 whitespace-nowrap text-5xl tracking-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Built for the competitive</h1>
          <p className="px-4 text-sm leading-relaxed text-white">Solve real challenges. Prove your skill.<br />Win sponsor-funded bounties.</p>
        </div>
        <Link href="/lobby" className="liquid-glass absolute bottom-3 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 sm:bottom-5">Enter the arena</Link>
      </section>
    </main>
  )
}
