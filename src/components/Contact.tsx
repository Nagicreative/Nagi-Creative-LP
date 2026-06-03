import { useState } from 'react'
import ArrowIcon from './ArrowIcon'
import styles from './Contact.module.css'

// ── Activate the form ──────────────────────────────────────────────
// 1. Go to https://web3forms.com, enter hello@nagicreative.com, and copy
//    the free Access Key they email you.
// 2. Paste it below. Submissions then arrive straight in your inbox —
//    no backend, no monthly fee.
const WEB3FORMS_ACCESS_KEY = 'f538e27d-39e3-4d6f-a1af-38e4a22a63aa'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New enquiry from nagicreative.com',
          from_name: 'Nagi Creative website',
          // reply straight to the prospect when you hit "reply"
          replyto: data.email,
          ...data,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.contact} id="contact">
        <div className="wrap">
          <div className={styles.thanks}>
            <div className={styles.thanksMark} aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="cap">Message sent</span>
            <h2 className={styles.thanksTitle}>
              Thank you—it&apos;s on its way! <span className={styles.scriptline}>🌿</span>
            </h2>
            <p className={styles.thanksLede}>
              Your message just landed in our inbox. We&apos;ll reply within one business
              day, usually with a few first ideas already in mind.
            </p>
            <button className={styles.again} type="button" onClick={() => setStatus('idle')}>
              Send another message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.intro} data-reveal>
          <span className="cap">Get in touch</span>
          <h2 className={styles.h2}>
            Ready to turn your atmosphere<br />
            into a <span className={styles.scriptline}>world worth choosing?</span>
          </h2>
          <p className={styles.lede}>
            Tell us a little about your venue. We&apos;ll reply within one business day—
            often with a few first ideas already in mind.
          </p>
          <a className={styles.altMail} href="mailto:hello@nagicreative.com">
            or email hello@nagicreative.com
          </a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} data-reveal>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Name</span>
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label className={styles.field}>
              <span>Email</span>
              <input type="email" name="email" required autoComplete="email" />
            </label>
          </div>
          <label className={styles.field}>
            <span>Business / venue</span>
            <input type="text" name="business" autoComplete="organization" />
          </label>
          <label className={styles.field}>
            <span>What are you after?</span>
            <textarea name="message" rows={4} required />
          </label>

          {/* simple anti-spam honeypot */}
          <input type="checkbox" name="botcheck" tabIndex={-1} className={styles.honeypot} aria-hidden />

          <button className="btn btnPrimary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            <span className="icoArrow"><ArrowIcon /></span>
          </button>

          {status === 'error' && (
            <p className={styles.errorMsg} role="alert">
              Something went wrong. Please try again, or email hello@nagicreative.com directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
