import { useEffect } from 'react'
import { gsap } from 'gsap'
import type Lenis from 'lenis'
import { nagiState, NAGI_EVENT, type SeaState, type Theme } from '../motion/nagiState'

/**
 * One loop that drives the whole 凪 narrative:
 *  - reads scroll velocity (from Lenis when present, scroll deltas otherwise)
 *  - finds the section under the viewport center and applies its
 *    data-theme (day fades to night) and data-sea (the sea calms) to <body>
 *  - spawns a small ripple ring on pointerdown (the "still water" touch)
 *
 * Sections opt in by declaring data-theme / data-sea attributes.
 * Theme changes crossfade via the body background/color transition in index.css.
 */
export default function useNagiOrchestrator() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nagiState.reducedMotion = reduce
    document.body.dataset.theme = 'dawn'
    document.body.dataset.sea = 'choppy'

    let lastY = window.scrollY
    let lastCheck = 0

    const tick = (time: number) => {
      // velocity: prefer lenis, fall back to raw deltas
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
      let v: number
      if (lenis) {
        v = lenis.velocity
      } else {
        const y = window.scrollY
        v = y - lastY
        lastY = y
      }
      nagiState.velocity = v
      // energy eases out so water keeps swaying briefly after you stop
      nagiState.energy += (Math.min(Math.abs(v), 60) - nagiState.energy) * 0.06

      // section check ~6x/sec is plenty
      if (time - lastCheck > 0.16) {
        lastCheck = time
        const mid = window.innerHeight * 0.5
        // body carries data-theme too (we set it), so scope to real sections
        const sections = document.querySelectorAll<HTMLElement>(
          'section[data-theme], footer[data-theme]',
        )
        let theme: Theme | null = null
        let sea: SeaState | null = null
        sections.forEach((s) => {
          const r = s.getBoundingClientRect()
          if (r.top <= mid && r.bottom > mid) {
            theme = (s.dataset.theme as Theme) ?? null
            sea = (s.dataset.sea as SeaState) ?? null
          }
        })
        if (theme && theme !== nagiState.theme) {
          nagiState.theme = theme
          document.body.dataset.theme = theme
          window.dispatchEvent(new CustomEvent(NAGI_EVENT))
        }
        if (sea && sea !== nagiState.sea) {
          nagiState.sea = sea
          document.body.dataset.sea = sea
          window.dispatchEvent(new CustomEvent(NAGI_EVENT))
        }
      }
    }
    gsap.ticker.add(tick)

    // touch the water: a single calm ring where you click
    const onPointerDown = (e: PointerEvent) => {
      if (reduce) return
      const ring = document.createElement('span')
      ring.className = 'nagi-ripple'
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
      document.body.appendChild(ring)
      ring.addEventListener('animationend', () => ring.remove())
    }
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])
}
