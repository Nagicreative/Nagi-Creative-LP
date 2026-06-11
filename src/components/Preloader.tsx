import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { NAGI_STROKES as STROKES } from '../motion/nagiStrokes'
import styles from './Preloader.module.css'

/*
 * 凪 draws itself stroke by stroke, the wind line sweeps through,
 * then the curtain lifts onto the golden-hour sea.
 */

const SEEN_KEY = 'nagi-preloader-seen'

export default function Preloader() {
  const [gone, setGone] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    return sessionStorage.getItem(SEEN_KEY) === '1'
  })
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gone) return
    const root = rootRef.current
    if (!root) return

    sessionStorage.setItem(SEEN_KEY, '1')
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const paths = Array.from(root.querySelectorAll<SVGPathElement>('path'))
    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setGone(true)
      },
    })

    paths.forEach((p) => {
      tl.to(p, { strokeDashoffset: 0, duration: 0.22, ease: 'power1.inOut' }, '>-0.02')
    })
    tl.fromTo(
      `.${styles.word}`,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '>-0.1',
    )
    tl.fromTo(
      `.${styles.windline}`,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.55, ease: 'power3.inOut' },
      '<',
    )
    tl.to(root, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
      delay: 0.32,
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [gone])

  if (gone) return null

  return (
    <div ref={rootRef} className={styles.veil} aria-hidden>
      <div className={styles.center}>
        <svg viewBox="0 0 109 109" className={styles.kanji}>
          {STROKES.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <span className={styles.windline} />
        <span className={styles.word}>the wind rests</span>
      </div>
    </div>
  )
}
