import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Process.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Discover', desc: 'We learn about your venue, your guests and your goals.' },
  { num: '02', title: 'Strategise', desc: 'We craft a tailored plan that aligns your brand with your business goals.' },
  { num: '03', title: 'Design', desc: 'We design a custom website that is beautiful, intuitive and built to convert.' },
  { num: '04', title: 'Build', desc: 'We develop a fast, secure and SEO-friendly website that works flawlessly.' },
  { num: '05', title: 'Launch', desc: 'We test, refine and launch. Then we support you to grow your direct bookings.' },
]

/**
 * The tide line. A vertical waterline draws itself down the page as you
 * scroll; each step surfaces beside it, alternating shores.
 */
export default function Process() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) return
      gsap.fromTo(
        `.${styles.lineFill}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: `.${styles.steps}`,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        },
      )
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} className={styles.process} id="process" data-theme="evening" data-sea="glass">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">Our process</span>
          <h2 className={styles.h2}>
            Five steps to <span className="script">still water.</span>
          </h2>
        </div>

        <div className={styles.steps}>
          <div className={styles.line} aria-hidden>
            <span className={styles.lineFill} />
          </div>
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`${styles.step} ${i % 2 ? styles.stepRight : ''}`}
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 60}ms` }}
            >
              <span className={styles.dot} aria-hidden />
              <div className={styles.card}>
                <span className={styles.num}>{s.num}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
