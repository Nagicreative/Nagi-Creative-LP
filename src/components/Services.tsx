import ArrowIcon from './ArrowIcon'
import styles from './Services.module.css'

const services = [
  {
    title: 'Website design',
    desc: 'Custom, atmosphere-led websites with a clean, premium look that feels unmistakably yours.',
    note: 'The core of every project',
  },
  {
    title: 'Signature motion',
    desc: 'Scroll-driven storytelling, considered reveals and micro-interactions that make a page feel alive without ever feeling busy.',
    note: 'What you are feeling on this page',
  },
  {
    title: 'Copy & brand positioning',
    desc: 'Clear messaging that connects with your ideal guests and strengthens your brand.',
    note: 'Written with you, in your voice',
  },
  {
    title: 'Booking flow optimisation',
    desc: 'Seamless booking journeys that increase direct bookings and reduce friction.',
    note: 'Fewer taps between look and book',
  },
  {
    title: 'SEO foundations',
    desc: 'Built-in best practices so guests searching the Gold Coast actually find you.',
    note: 'Plus Google Business Profile',
  },
]

/**
 * "What we tune": editorial index rows. Each row reveals with a drawn
 * hairline; hovering sends a slow sheen of light across, like sun on water.
 */
export default function Services() {
  return (
    <section className={styles.sec} id="services" data-theme="day" data-sea="settling">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">What we do</span>
          <h2 className={styles.h2}>
            We tune every layer<br />of the <span className="script">atmosphere.</span>
          </h2>
        </div>

        <div className={styles.rows}>
          {services.map((svc, i) => (
            <div key={svc.title} className={styles.row} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <span className={styles.ix}>[{String(i + 1).padStart(2, '0')}]</span>
              <h3 className={styles.title}>{svc.title}</h3>
              <div className={styles.body}>
                <p className={styles.desc}>{svc.desc}</p>
                <p className={styles.note}>{svc.note}</p>
              </div>
              <span className={styles.sheen} aria-hidden />
            </div>
          ))}
        </div>

        <div className={styles.foot} data-reveal>
          <a className="btnLink" href="#pricing">
            See what it costs
            <span className="icoArrow"><ArrowIcon /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
