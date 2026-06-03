import ArrowIcon from './ArrowIcon'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Starter',
    price: '$1,800',
    unit: 'AUD',
    tagline: 'One beautiful page to put you on the map.',
    features: [
      'Single-page website',
      'Mobile-first, photography-led design',
      'Contact form + Google Map',
      'SEO foundations (get found on Google)',
      '1 revision round',
      'Launch in ~5–7 days',
    ],
    featured: false,
  },
  {
    name: 'Studio',
    price: '$3,200',
    unit: 'AUD',
    tagline: 'Our most-loved package for growing venues.',
    features: [
      'Up to 8 pages',
      'Scroll animations & micro-interactions',
      'Booking flow integration',
      'Copy & brand positioning',
      'Local SEO + Google Business Profile',
      '3 revision rounds',
      'Launch in ~10–14 days',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$5,500+',
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

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">Investment</span>
          <h2 className={styles.h2}>
            Considered pricing for a<br />
            <span className={styles.scriptline}>world worth choosing.</span>
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
                <span className={styles.price}>{plan.price}</span>
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
                className={`btn ${plan.featured ? 'btnPrimary' : styles.btnGhost}`}
                href="#contact"
              >
                Start your project
                <span className="icoArrow"><ArrowIcon /></span>
              </a>
            </div>
          ))}
        </div>

        <p className={styles.fine} data-reveal>
          Every project: 50% deposit to begin, 50% on launch. Add-ons available —
          redesign / refresh from $1,800, local SEO from $600, and a care plan from
          $150/mo. Not sure which fits? We&apos;ll guide you on a quick call.
        </p>
      </div>
    </section>
  )
}
