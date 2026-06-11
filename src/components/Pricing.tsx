import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowIcon from './ArrowIcon'
import styles from './Pricing.module.css'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: 1800,
    suffix: '',
    unit: 'AUD',
    tagline: 'One beautiful page to put you on the map.',
    features: [
      'Single-page website',
      'Mobile-first, photography-led design',
      'Contact form + Google Map',
      'SEO foundations (get found on Google)',
      '1 revision round',
      'Launch in 5 to 7 days',
    ],
    featured: false,
  },
  {
    name: 'Studio',
    price: 3200,
    suffix: '',
    unit: 'AUD',
    tagline: 'Our most-loved package for growing venues.',
    features: [
      'Up to 8 pages',
      'Scroll animations & micro-interactions',
      'Booking flow integration',
      'Copy & brand positioning',
      'Local SEO + Google Business Profile',
      '3 revision rounds',
      'Launch in 10 to 14 days',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: 5500,
    suffix: '+',
    unit: 'AUD',
    tagline: 'A full world, in two languages.',
    features: [
      'Everything in Studio',
      'Unlimited pages',
      'Multi-language (English / 日本語)',
      'Advanced, custom animations',
      'Advanced integrations & features',
      'Photography art direction & priority support',
    ],
    featured: false,
  },
]

/**
 * Night falls on pricing: dark cards, and the Studio plan sits in the
 * lamp light. Prices count up as they surface.
 */
export default function Pricing() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) return
      sec.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = `$${Math.round(obj.v).toLocaleString('en-AU')}`
          },
        })
      })
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} className={styles.pricing} id="pricing" data-theme="night" data-sea="glass">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">Investment</span>
          <h2 className={styles.h2}>
            Considered pricing for a<br />
            <span className={`script ${styles.scriptline}`}>world worth choosing.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {plan.featured && <span className={styles.badge}>Most popular</span>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planTagline}>{plan.tagline}</p>
              <div className={styles.priceRow}>
                <span className={styles.from}>from</span>
                <span className={styles.price} data-count={plan.price}>
                  ${plan.price.toLocaleString('en-AU')}
                </span>
                {plan.suffix && <span className={styles.suffix}>{plan.suffix}</span>}
                <span className={styles.unit}>{plan.unit}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className={styles.check} aria-hidden>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${plan.featured ? 'btnPrimary' : `btnGhost ${styles.ghost}`}`}
                href="#contact"
              >
                Start your project
                <span className="icoArrow"><ArrowIcon /></span>
              </a>
            </div>
          ))}
        </div>

        <p className={styles.fine} data-reveal>
          All prices in AUD. Half on booking, half on launch. Care plan from $150 a month
          covers hosting, security and small updates.
        </p>
      </div>
    </section>
  )
}
