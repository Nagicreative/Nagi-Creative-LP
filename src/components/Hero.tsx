import { useEffect, useState } from 'react'
import ArrowIcon from './ArrowIcon'
import styles from './Hero.module.css'

export default function Hero() {
  const [screenOn, setScreenOn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setScreenOn(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.hero} id="top">
      <video className={styles.heroBg} autoPlay muted loop playsInline preload="auto">
        <source src="/hero-video.mp4" type="video/mp4" />
        <img src="/hero-section.png" alt="" />
      </video>
      <div className={styles.heroTint} />

      {/* LP overlay on the laptop visible in the video */}
      <div className={styles.laptopOverlay}>
        <img src="/LP pc Nagi.png" alt="" className={styles.laptopScreen} />
        <div className={`${styles.screenDark} ${screenOn ? styles.screenOn : ''}`} />
      </div>

      {/* Watermark cover – blends with bottom-right of video */}
      <div className={styles.wmCover} />

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

      <svg
        className={styles.wave}
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,52 C200,98 420,8 720,42 C1000,72 1240,98 1440,48 L1440,96 L0,96 Z"
          fill="var(--bg)"
        />
      </svg>
    </section>
  )
}
