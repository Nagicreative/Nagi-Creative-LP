import styles from './Services.module.css'

const services = [
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="32" height="20" rx="2" />
        <path d="M14 34h16M22 30v4" />
        <path d="M11 15h22M11 19h14" />
      </svg>
    ),
    title: 'Website design',
    desc: 'Custom, atmosphere-led websites with a clean, premium look that feels unmistakably yours.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 34l4-1 16-16-3-3-16 16-1 4z" />
        <path d="M27 14l3 3" />
        <path d="M9 38h22" />
      </svg>
    ),
    title: 'Copy & brand positioning',
    desc: 'Clear messaging that connects with your ideal guests and strengthens your brand.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="8" width="24" height="28" rx="2" />
        <path d="M16 16h12M16 21h12M16 26h8" />
        <circle cx="31" cy="31" r="5" />
        <path d="M34.5 34.5l3 3" />
      </svg>
    ),
    title: 'Booking flow optimisation',
    desc: 'Seamless booking journeys that increase direct bookings and reduce friction.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="12" width="28" height="20" rx="2" />
        <circle cx="22" cy="22" r="6" />
        <circle cx="22" cy="22" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="30" cy="14" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Photography direction',
    desc: 'Guiding imagery that captures your space, story and guest experience.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="10" />
        <path d="M28 28l7 7" />
      </svg>
    ),
    title: 'SEO foundations',
    desc: 'Built-in SEO best practices to help your hotel get found on Google.',
  },
]

export default function Services() {
  return (
    <section className={styles.sec} id="services">
      <div className="wrap">
        <div className={styles.secLabel} data-reveal><span className="cap">What we do</span></div>
        <div className={styles.servicesGrid}>
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className={styles.svc}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.ico}>{svc.icon}</div>
              <h4 className={styles.svcTitle}>
                {svc.title}
                <span className={styles.ul} />
              </h4>
              <p className={styles.svcDesc}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
