import { useEffect } from 'react'

/**
 * Reveals any element marked with `data-reveal` as it scrolls into view.
 * Elements start hidden (see `.reveal-ready [data-reveal]` in index.css) and
 * get the `reveal-in` class once they enter the viewport.
 *
 * Robustness: elements already on screen at load are revealed immediately, and
 * reduced-motion / missing IntersectionObserver fall back to showing everything.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    const vh = window.innerHeight
    els.forEach((el) => {
      // Reveal anything already in (or near) the first viewport right away,
      // observe the rest for a fade-up as the visitor scrolls.
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add('reveal-in')
      } else {
        io.observe(el)
      }
    })

    return () => io.disconnect()
  }, [])
}
