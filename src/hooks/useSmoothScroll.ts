import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Direction A foundation: Lenis smooth scroll driving GSAP ScrollTrigger.
 * Everything scroll-driven (the scrubbed hero, pinned reveals) rides on this.
 *
 * Pattern from the AURA scroll-landing recipe:
 *  - Lenis owns the scroll; we feed its rAF from gsap.ticker (one loop, in sync).
 *  - lenis.on('scroll', ScrollTrigger.update) keeps triggers exact.
 *  - window.__lenis / window.__ST exposed as dev hooks for preview debugging.
 *
 * Honors prefers-reduced-motion (native scroll, no smoothing) and cleans up fully.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // gentle, premium easing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    const w = window as unknown as { __lenis?: Lenis; __ST?: typeof ScrollTrigger }
    w.__lenis = lenis
    w.__ST = ScrollTrigger

    lenis.on('scroll', ScrollTrigger.update)

    const onRaf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      delete w.__lenis
      delete w.__ST
    }
  }, [])
}
