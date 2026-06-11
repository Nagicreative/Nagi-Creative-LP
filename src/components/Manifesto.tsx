import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAGI_STROKES } from '../motion/nagiStrokes'
import styles from './Manifesto.module.css'

gsap.registerPlugin(ScrollTrigger)

const STATEMENT =
  'The market is loud. Crowded feeds, popups, templates shouting for attention. Your venue is not loud. It is a feeling, and a website should hold that feeling perfectly still.'

/**
 * The definition of 凪. A pinned statement where the noise of the market
 * fades word by word into stillness, while a giant 凪 draws itself stroke
 * by stroke beside it, then breathes gently like slack water.
 */
export default function Manifesto() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const words = sec.querySelectorAll<HTMLElement>(`.${styles.word}`)
      const strokes = sec.querySelectorAll<SVGPathElement>(`.${styles.kanjiSvg} path`)
      strokes.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = reduce ? '0' : `${len}`
      })

      if (reduce) {
        gsap.set(words, { opacity: 1 })
        return
      }

      gsap.fromTo(
        words,
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.6,
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        },
      )

      // the giant kanji writes itself as the statement settles
      const draw = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: '75% bottom',
          scrub: 0.5,
        },
      })
      strokes.forEach((p) => {
        draw.to(p, { strokeDashoffset: 0, duration: 1, ease: 'none' }, '>')
      })

      // then it floats on slack water
      gsap.to(`.${styles.kanjiStack}`, {
        y: -10,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        `.${styles.defBody}`,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sec, start: 'top 45%' },
        },
      )
      gsap.fromTo(
        `.${styles.defRule}`,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        },
      )
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} className={styles.sec} data-theme="day" data-sea="settling">
      <div className={styles.sticky}>
        <span className={`jpRail ${styles.rail}`} aria-hidden>
          風がやみ、海が鏡になる時間。
        </span>

        <div className={`wrap ${styles.inner}`}>
          <p className={styles.statement} aria-label={STATEMENT}>
            {STATEMENT.split(' ').map((w, i) => (
              <span key={i} className={styles.word} aria-hidden>
                {w}&nbsp;
              </span>
            ))}
          </p>

          <aside className={styles.def} aria-label="nagi, noun, Japanese: the moment the wind rests and the sea turns to glass.">
            <div className={styles.kanjiStack} aria-hidden>
              <svg viewBox="0 0 109 109" className={styles.kanjiSvg}>
                {NAGI_STROKES.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
            </div>
            <div className={styles.defBody}>
              <p className={styles.defWord}>
                nagi <span className={styles.defPos}>noun &middot; Japanese</span>
              </p>
              <span className={styles.defRule} />
              <p className={styles.defText}>
                The moment the wind rests and the sea turns to glass. The calm we
                are named after, and the calm we build.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
