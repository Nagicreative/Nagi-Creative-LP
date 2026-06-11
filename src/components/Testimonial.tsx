import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonial.module.css'

gsap.registerPlugin(ScrollTrigger)

const QUOTE =
  'Nagi Creative absolutely nailed our new website. It is not only beautiful, it works. Our direct bookings have never been better.'

export default function Testimonial() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const words = sec.querySelectorAll<HTMLElement>(`.${styles.word}`)
      if (reduce) {
        gsap.set(words, { opacity: 1, filter: 'none' })
        return
      }
      gsap.fromTo(
        words,
        { opacity: 0.12, filter: 'blur(5px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: {
            trigger: sec,
            start: 'top 70%',
            end: 'center 45%',
            scrub: 0.4,
          },
        },
      )
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} className={styles.testi} data-theme="evening" data-sea="glass">
      <div className="wrap">
        <div className={styles.inner}>
          <span className={`jp ${styles.mark}`} aria-hidden>&ldquo;</span>
          <p className={styles.quote} aria-label={QUOTE}>
            {QUOTE.split(' ').map((w, i) => (
              <span key={i} className={styles.word} aria-hidden>
                {w}&nbsp;
              </span>
            ))}
          </p>
          <div className={styles.by} data-reveal>
            <span className={styles.byRule} aria-hidden />
            Jess &amp; Tom, Salt House Hotel
          </div>
        </div>
      </div>
    </section>
  )
}
