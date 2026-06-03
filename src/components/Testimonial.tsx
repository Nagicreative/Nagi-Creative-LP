import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section className={styles.testi}>
      <div className={styles.testiBg}>
        <img
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1800&q=80&auto=format&fit=crop"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="wrap">
        <div className={styles.testiQuote} data-reveal>
          <span className={styles.mark}>&ldquo;</span>
          <p className={styles.quote}>
            Nagi Creative absolutely nailed our new website.<br />
            It&apos;s not only beautiful, it works—our direct bookings<br />
            have never been better.
          </p>
          <div className={styles.by}>— Jess &amp; Tom, Salt House Hotel</div>
        </div>
      </div>
    </section>
  )
}
