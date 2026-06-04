import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.ft}>
      <div className="wrap">
        <div className={styles.ftMain}>
          <div className={styles.ftLead} data-reveal>
            <img
              src="/logo-rectangle.png"
              alt="Nagi Creative"
              className={styles.ftLogoImg}
            />
            <p className={styles.ftMotto}>
              We tune the atmosphere of small brands into a world worth choosing.
            </p>
          </div>

          <div className={styles.ftInfo}>
            <div className={styles.ftBrand}>Nagi Creative</div>
            <p className={styles.ftTagline}>Web design for hospitality brands</p>

            <div className={styles.contactRow}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3.5" width="12" height="9" rx="1" />
                <path d="M2.5 4.5l5.5 4 5.5-4" />
              </svg>
              hello@nagicreative.com
            </div>

            <div className={styles.contactRow}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 14c-3-4-5-6.5-5-9a5 5 0 0 1 10 0c0 2.5-2 5-5 9z" />
                <circle cx="8" cy="5.5" r="1.5" />
              </svg>
              Gold Coast, Queensland, Australia
            </div>

            <div className={styles.ftFollow}>
              <span className="cap">Follow us</span>
              <div className={styles.socials}>
                <a href="#" aria-label="Instagram" className={styles.socialLink}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="10" height="10" rx="2.5" />
                    <circle cx="8" cy="8" r="2.5" />
                    <circle cx="11" cy="5" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className={styles.socialLink}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 4h-1.5C7.7 4 7 4.7 7 5.5V8H5.5v2H7v3.5h2V10h1.7l.3-2H9V6c0-.6.4-.5 1-.5h.5V4z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="10" height="10" rx="1.5" />
                    <rect x="5" y="7" width="1.5" height="4.5" fill="currentColor" stroke="none" />
                    <circle cx="5.75" cy="5.5" r="0.7" fill="currentColor" stroke="none" />
                    <path d="M8 11.5V8c0-.5 1-1 1.5-1s1.5.3 1.5 1.5V11.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ftFine}>
          <span>© 2026 Nagi Creative</span>
          <span>Gold Coast, Queensland, Australia</span>
        </div>
      </div>
    </footer>
  )
}
