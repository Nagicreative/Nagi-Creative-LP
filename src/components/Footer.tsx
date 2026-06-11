import Waveline from './Waveline'
import styles from './Footer.module.css'

const TICKER = 'Gold Coast · 日本 · Hospitality only · Web design · Motion · '

export default function Footer() {
  return (
    <footer className={styles.ft} data-theme="night" data-sea="nagi">
      {/* the moon glint: a near-still gold line on black water */}
      <div className={styles.glint} aria-hidden>
        <Waveline height={22} wavelength={300} seaScale={0.25} velScale={0.1} baseAmp={0.5} speed={0.5} className={styles.glintLine} />
      </div>

      <div className={`wrap ${styles.main}`}>
        <div className={styles.lead}>
          <div className={styles.brandRow}>
            <span className={`jp ${styles.brandKanji}`} aria-hidden>凪</span>
            <span className={styles.brandName}>
              Nagi <em>Creative</em>
            </span>
          </div>
          <p className={styles.motto}>
            We tune the atmosphere of small brands into a world worth choosing.
          </p>
          <p className={`jp ${styles.mottoJp}`}>
            小さなブランドの空気を整えて、選ばれる世界観に変えるWeb studio
          </p>
        </div>

        <div className={styles.info}>
          <a className={styles.infoRow} href="mailto:hello@nagicreative.com">
            hello@nagicreative.com
          </a>
          <span className={styles.infoRow}>Gold Coast, Queensland, Australia</span>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/nagicreative"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="10" height="10" rx="2.5" />
                <circle cx="8" cy="8" r="2.5" />
                <circle cx="11" cy="5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerTrack}>
          <span>{TICKER}{TICKER}{TICKER}</span>
          <span>{TICKER}{TICKER}{TICKER}</span>
        </div>
      </div>

      <div className={`wrap ${styles.fine}`}>
        <span>© 2026 Nagi Creative</span>
        <span className={styles.fineNagi}>
          凪 <i>nagi</i>: the moment the wind rests
        </span>
      </div>

      <span className={`jp ${styles.watermark}`} aria-hidden>凪</span>
    </footer>
  )
}
