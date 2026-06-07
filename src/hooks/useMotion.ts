import { useLayoutEffect } from 'react'
import {
  animate,
  createTimeline,
  onScroll,
  splitText,
  stagger,
  utils,
} from 'animejs'

/**
 * Bold, editorial motion powered by anime.js v4.
 *
 * Three signature moves, each isolated so it never fights the existing CSS:
 *  1. Hero headline — masked word rise on load (splitText).
 *  2. Hero background — cinematic scrubbed zoom tied to scroll (onScroll sync).
 *  3. Featured project cards — a scrubbed-feel staggered entrance that rises +
 *     rotates the cards in, then hands the transform back to CSS so the existing
 *     hover-lift, `.lifted` offset and photo zoom keep working untouched.
 *
 * Honors prefers-reduced-motion (everything stays static and fully visible) and
 * is StrictMode-safe (all instances are reverted on cleanup).
 */
export default function useMotion() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let cancelled = false
    const cleanups: Array<() => void> = []

    // ── 1. Hero headline ──────────────────────────────────────────────
    // Hide pre-paint so the full title never flashes before it animates.
    const title = document.querySelector<HTMLElement>('[data-hero-title]')
    if (title) title.style.opacity = '0'

    const revealTitle = () => {
      if (!title || cancelled) return
      try {
        const split = splitText(title, { lines: true, words: true })
        utils.set(split.lines, { overflow: 'hidden', paddingBottom: '0.08em' })
        utils.set(split.words, { display: 'inline-block', willChange: 'transform' })
        title.style.opacity = '1'
        const anim = animate(split.words, {
          y: ['115%', '0%'],
          rotate: [6, 0],
          opacity: [0, 1],
          duration: 1100,
          ease: 'out(3)',
          delay: stagger(50, { start: 200 }),
        })
        cleanups.push(() => {
          anim.revert()
          split.revert()
        })
      } catch {
        // If splitting ever fails, just show the headline plainly.
        title.style.opacity = '1'
      }
    }
    // Wait for webfonts so line-splitting measures the final glyphs.
    if (document.fonts?.ready) document.fonts.ready.then(revealTitle)
    else revealTitle()

    // ── 2. Hero background — scrubbed cinematic zoom ───────────────────
    const heroBg = document.querySelector<HTMLElement>('[data-hero-bg]')
    if (heroBg) {
      const bgAnim = animate(heroBg, {
        scale: [1, 1.12],
        y: [0, -40],
        ease: 'linear',
        autoplay: onScroll({
          target: heroBg.closest('section') || heroBg,
          enter: 'top top',
          leave: 'bottom top',
          sync: true,
        }),
      })
      cleanups.push(() => bgAnim.revert())
    }

    // ── 3. Featured project cards — bold staggered entrance ────────────
    const grid = document.querySelector<HTMLElement>('[data-work-grid]')
    const cards = grid
      ? Array.from(grid.querySelectorAll<HTMLElement>('[data-work-card]'))
      : []

    if (grid && cards.length) {
      // Real CSS perspective on the parent so the cards' rotateY reads as 3D.
      // (anime treats `perspective` as a transform function, not the CSS prop.)
      grid.style.perspective = '1200px'
      utils.set(cards, { opacity: 0, y: 90, rotateY: -22, scale: 0.94 })
      // Kill the CSS transform transition while anime drives the entrance,
      // otherwise the .5s transition smears every frame.
      cards.forEach((c) => (c.style.transition = 'none'))

      let played = false
      const play = () => {
        if (cancelled || played) return
        played = true
        const tl = createTimeline({
          defaults: { duration: 1100, ease: 'out(3)' },
          onComplete: () => {
            // Hand transform control back to CSS (hover-lift, .lifted, zoom).
            cards.forEach((c) => {
              c.style.transition = ''
              c.style.transform = ''
              c.style.opacity = ''
            })
          },
        })
        tl.add(
          cards,
          {
            opacity: [0, 1],
            y: [90, 0],
            rotateY: [-22, 0],
            scale: [0.94, 1],
            delay: stagger(120),
          },
          0,
        )
        cleanups.push(() => tl.revert())
      }

      // Play once when the grid scrolls into view (or right away if already in).
      const vh = window.innerHeight
      if (!vh || grid.getBoundingClientRect().top < vh * 0.9) {
        // No reliable viewport height? Reveal now rather than risk hiding content.
        play()
      } else {
        const io = new IntersectionObserver(
          (entries, obs) => {
            if (entries.some((e) => e.isIntersecting)) {
              play()
              obs.disconnect()
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
        )
        io.observe(grid)
        cleanups.push(() => io.disconnect())
        // Safety net: never leave the cards hidden if the observer never fires.
        const fallback = window.setTimeout(play, 3000)
        cleanups.push(() => window.clearTimeout(fallback))
      }
    }

    return () => {
      cancelled = true
      cleanups.forEach((fn) => {
        try {
          fn()
        } catch {
          /* noop */
        }
      })
      if (title) title.style.opacity = ''
    }
  }, [])
}
