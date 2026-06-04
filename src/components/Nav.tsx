import { useEffect, useState } from 'react'
import ArrowIcon from './ArrowIcon'
import styles from './Nav.module.css'

export default function Nav() {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  return (
    <header className={`${styles.nav} ${sticky ? styles.sticky : ''}`} id="nav">
      <div className={`wrap ${styles.navInner}`}>
        <a href="#top" className={styles.brand} onClick={(e) => handleAnchorClick(e, '#top')}>
          <img
            src="/logo-transparent.png"
            alt="Nagi Creative"
            width={150}
            height={93}
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </a>
        <nav className={styles.navLinks}>
          <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Services</a>
          <a href="#work" onClick={(e) => handleAnchorClick(e, '#work')}>Work</a>
          <a href="#process" onClick={(e) => handleAnchorClick(e, '#process')}>Process</a>
          <a href="#pricing" onClick={(e) => handleAnchorClick(e, '#pricing')}>Pricing</a>
          <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a>
        </nav>
        <a className="btn btnPrimary" href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>
          Book a call
          <span className="icoArrow"><ArrowIcon /></span>
        </a>
      </div>
    </header>
  )
}
