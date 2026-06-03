import styles from './WhyNagi.module.css'

const features = [
  {
    icon: (
      <svg viewBox="0 0 44 44" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22,6 28,16 40,18 31,27 33,39 22,33 11,39 13,27 4,18 16,16" />
      </svg>
    ),
    title: 'Direct bookings focus',
    desc: 'Every design decision is made to drive more direct bookings and reduce OTA reliance.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8l2.5 7.5L32 18l-7.5 2.5L22 28l-2.5-7.5L12 18l7.5-2.5z" />
        <path d="M34 28l1.2 3.8L39 33l-3.8 1.2L34 38l-1.2-3.8L29 33l3.8-1.2z" />
      </svg>
    ),
    title: 'Premium first impressions',
    desc: 'Beautiful, minimal design that reflects the quality of your property and builds trust.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="6" width="16" height="32" rx="3" />
        <circle cx="22" cy="33" r="1" fill="currentColor" stroke="none" />
        <path d="M18 10h8" />
      </svg>
    ),
    title: 'Mobile-first experience',
    desc: 'Flawless on every device, so guests can book with ease wherever they are browsing.',
  },
  {
    icon: (
      <svg viewBox="0 0 44 44" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22c0 0 6-10 16-10s16 10 16 10-6 10-16 10S6 22 6 22z" />
        <circle cx="22" cy="22" r="4" />
        <circle cx="22" cy="22" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Story-led design',
    desc: 'We help you tell your story with clarity, authenticity and style.',
  },
]

export default function WhyNagi() {
  return (
    <section className={styles.why}>
      <div className={`wrap ${styles.wrapInner}`}>
        <div className={styles.whyGrid}>
          <div data-reveal>
            <span className="cap">Why Nagi</span>
            <h2 className={styles.h2}>
              We refine the feeling<br />of small brands into<br />
              a world{' '}
              <span className={styles.scriptline}>guests</span>
              <br />choose to stay in.
            </h2>
          </div>
          <div className={styles.whyFeats}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={styles.whyFeat}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.ico}>{f.icon}</div>
                <h4 className={styles.featTitle}>{f.title}</h4>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
        className={styles.secPlant}
        src="/plant2.png"
        alt=""
        aria-hidden
        loading="lazy"
      />
    </section>
  )
}
