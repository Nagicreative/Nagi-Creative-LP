import ArrowIcon from './ArrowIcon'
import WaterDivider from './WaterDivider'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <video className={styles.heroBg} autoPlay muted loop playsInline preload="auto">
        <source src="/hero-video.mp4" type="video/mp4" />
        <img src="/hero-section.png" alt="" />
      </video>
      <div className={styles.heroTint} />

      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.heroCopy}>
          <h1 className={styles.h1}>
            We tune the feeling<br />of your space—<br />into a world
          </h1>
          <span className={styles.scriptline}>worth choosing.</span>
          <p className={styles.heroLede}>
            Boutique web design for cafés, stays and small hospitality brands. We refine
            your atmosphere into a website guests trust, remember, and keep coming back to.
          </p>
          <div className={styles.heroCta}>
            <a className="btn btnPrimary" href="#contact">
              Start your project
              <span className="icoArrow"><ArrowIcon /></span>
            </a>
            <a className="btnLink" href="#work">
              View our work
              <span className="icoArrow"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <svg viewBox="0 0 20 28" width="20" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="1" width="8" height="14" rx="4"/>
          <circle cx="10" cy="5" r="1.5" fill="currentColor" stroke="none"/>
          <path d="M10 21l-3 3 3 3 3-3-3-3z"/>
        </svg>
      </div>

      <WaterDivider fill="var(--bg)" />
    </section>
  )
}
