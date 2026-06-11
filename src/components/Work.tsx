import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowIcon from './ArrowIcon'
import styles from './Work.module.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    href: 'https://palm-and-salt.netlify.app',
    img: '/palm-salt.jpg',
    logo: '/palm-salt-logo.png',
    alt: 'Palm & Salt, a Gold Coast beachfront café landing page',
    name: 'Palm & Salt',
    meta: 'Beachfront Café · Gold Coast',
    time: 'Morning',
    blurb:
      'A beachfront café built to feel like nine in the morning on the sand: bright, salty and unhurried.',
  },
  {
    href: 'https://driftwood-palm-beach.netlify.app',
    img: '/driftwood.jpg',
    alt: 'Driftwood, a Palm Beach boutique guesthouse landing page',
    name: 'Driftwood',
    meta: 'Boutique Stay · Palm Beach',
    time: 'Golden hour',
    blurb:
      'A five room guesthouse where the scroll moves like a slow afternoon: sun, salt and long shadows.',
  },
  {
    href: 'https://ember-and-vine.netlify.app',
    img: '/ember-vine.jpg',
    alt: 'Ember & Vine, a candlelit laneway wine bar landing page',
    name: 'Ember & Vine',
    meta: 'Wine Bar · Burleigh Heads',
    time: 'After dark',
    blurb:
      'A candlelit laneway wine bar that plays like one long night, side A to side B.',
  },
]

/**
 * The day passes through the work: morning, golden hour, after dark.
 * Each project is a full editorial row; the image unveils with a clip
 * reveal and drifts gently inside its frame as you scroll past.
 * All three are live sites, and the row sends you straight to them.
 */
export default function Work() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) return
      sec.querySelectorAll<HTMLElement>(`.${styles.frame}`).forEach((frame) => {
        const img = frame.querySelector('img')
        gsap.fromTo(
          frame,
          { clipPath: 'inset(12% 6% 88% 6% round 14px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 14px)',
            duration: 1.25,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: frame, start: 'top 78%' },
          },
        )
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -9, scale: 1.18 },
            {
              yPercent: 9,
              scale: 1.18,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} className={styles.sec} id="work" data-theme="dusk" data-sea="calm">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">Featured projects</span>
          <h2 className={styles.h2}>
            Three venues,<br />one passing <span className="script">day.</span>
          </h2>
          <p className={styles.headNote}>
            Every project below is a live site. Open them, scroll them, tap the
            bookings. This is the level your venue gets.
          </p>
        </div>

        <div className={styles.rows}>
          {projects.map((p, i) => (
            <a
              key={p.name}
              className={`${styles.row} ${i % 2 ? styles.rowFlip : ''}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.frame}>
                <img src={p.img} alt={p.alt} loading="lazy" />
                {'logo' in p && p.logo && (
                  <img className={styles.frameLogo} src={p.logo} alt="" loading="lazy" />
                )}
                <span className={styles.timeTag}>{p.time}</span>
              </div>
              <div className={styles.copy}>
                <span className={styles.ix}>[{String(i + 1).padStart(2, '0')}]</span>
                <h3 className={styles.name} data-reveal>{p.name}</h3>
                <p className={styles.meta}>{p.meta}</p>
                <p className={styles.blurb}>{p.blurb}</p>
                <span className={`btnLink ${styles.visit}`}>
                  Visit the live site
                  <span className="icoArrow"><ArrowIcon /></span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
