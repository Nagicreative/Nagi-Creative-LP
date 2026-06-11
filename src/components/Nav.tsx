import { useEffect, useRef, useState } from 'react'
import type Lenis from 'lenis'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
  if (lenis) lenis.scrollTo(target, { offset: -64 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > 420 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // menu open: hold the sea still
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  const onLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    // wait one frame so the scroll lock releases before we travel
    requestAnimationFrame(() => scrollToHash(href))
  }

  return (
    <>
      <header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
          hidden && !open ? styles.hidden : ''
        }`}
      >
        <a
          className={styles.brand}
          href="#top"
          aria-label="Nagi Creative, back to top"
          onClick={(e) => onLink(e, '#top')}
        >
          <img
            className={styles.logo}
            src="/logo-transparent.png"
            alt="Nagi Creative"
            width={104}
            height={64}
          />
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => onLink(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className={`btn btnPrimary ${styles.cta}`}
          href="#contact"
          onClick={(e) => onLink(e, '#contact')}
        >
          Book a call
        </a>

        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} aria-hidden={!open}>
        <span className={`jp ${styles.sheetKanji}`} aria-hidden>凪</span>
        <nav className={styles.sheetLinks} aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
              onClick={(e) => onLink(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a className={styles.sheetMail} href="mailto:hello@nagicreative.com">
          hello@nagicreative.com
        </a>
      </div>
    </>
  )
}
