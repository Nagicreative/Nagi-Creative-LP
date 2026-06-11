import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowIcon from './ArrowIcon'
import Waveline from './Waveline'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const LINE_1 = 'When everything'
const LINE_2 = 'goes still,'

/**
 * The golden-hour sea. The headline drifts in the breeze; as you scroll
 * through the pinned hero, the wind dies char by char until the type sits
 * perfectly still. The horizon waveline reacts to scroll velocity all along.
 */
export default function Hero() {
  const secRef = useRef<HTMLElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const progress = useRef(0)

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = charsRef.current.filter(Boolean)

    const ctx = gsap.context(() => {
      if (reduce) {
        // the sea holds still too
        sec.querySelector('video')?.pause()
        return
      }

      // entrance: the type surfaces
      gsap.fromTo(
        chars,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.024,
          delay: 0.15,
        },
      )
      gsap.fromTo(
        `.${styles.rise}`,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.12, delay: 0.7 },
      )

      // scrub: wind dies + the sea pulls back as you leave
      const video = sec.querySelector<HTMLVideoElement>('video')
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (st) => {
          progress.current = st.progress
          if (video) gsap.set(video, { scale: 1.09 - st.progress * 0.09 })
        },
      })

      // the breeze: per-char bobbing whose amplitude fades with scroll progress.
      // It writes to the .charClip parent so it never fights the entrance
      // tween, which animates the .char itself.
      let t = 0
      const breeze = (_time: number, delta: number) => {
        t += delta / 1000
        const amp = 5 * Math.max(0, 1 - progress.current * 1.6)
        for (let i = 0; i < chars.length; i++) {
          const clip = chars[i].parentElement
          if (!clip) continue
          clip.style.transform = `translateY(${Math.sin(t * 1.5 + i * 0.55) * amp}px) rotate(${
            Math.sin(t * 1.1 + i * 0.8) * amp * 0.12
          }deg)`
        }
      }
      gsap.ticker.add(breeze)
      return () => gsap.ticker.remove(breeze)
    }, sec)

    return () => ctx.revert()
  }, [])

  let charIndex = 0
  // chars live inside per-word nowrap spans so lines only break between words;
  // the space sits OUTSIDE the nowrap span or it would collapse away
  const renderLine = (line: string) =>
    line.split(' ').flatMap((word, w) => [
      <span key={w} className={styles.word}>
        {word.split('').map((ch, i) => {
          const idx = charIndex++
          return (
            <span key={i} className={styles.charClip}>
              <span
                className={styles.char}
                ref={(el) => {
                  if (el) charsRef.current[idx] = el
                }}
              >
                {ch}
              </span>
            </span>
          )
        })}
      </span>,
      ' ',
    ])

  return (
    <section
      className={styles.hero}
      id="top"
      ref={secRef}
      data-theme="dawn"
      data-sea="choppy"
    >
      <div className={styles.sticky}>
        <video
          className={styles.bg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.tint} />

        <div className={`wrap ${styles.inner}`}>
          <div className={styles.copy}>
          <p className={`cap ${styles.kicker} ${styles.rise}`}>
            Web design for hospitality &middot; Gold Coast &amp; Japan
          </p>
          <h1 className={styles.h1} aria-label={`${LINE_1} ${LINE_2} guests choose you.`}>
            <span aria-hidden className={styles.line}>{renderLine(LINE_1)}</span>
            <span aria-hidden className={styles.line}>{renderLine(LINE_2)}</span>
            <span className={`script ${styles.scriptline} ${styles.rise}`} aria-hidden>
              guests choose you.
            </span>
          </h1>
          <p className={`${styles.lede} ${styles.rise}`}>
            Nagi is the moment the wind rests and the sea turns to glass. We build
            that calm into websites for caf&eacute;s, stays and small hospitality
            brands, so the first impression feels like walking in.
          </p>
          <div className={`${styles.ctas} ${styles.rise}`}>
            <a className={`btn ${styles.btnGold}`} href="#contact">
              Start your project
              <span className="icoArrow"><ArrowIcon /></span>
            </a>
            <a className={`btnLink ${styles.linkLight}`} href="#work">
              See the work
              <span className="icoArrow"><ArrowIcon /></span>
            </a>
          </div>
          </div>
        </div>

        <div className={`${styles.stats} ${styles.rise}`}>
          <span>Hospitality only</span>
          <span>English &middot; 日本語</span>
          <span>Live in under 14 days</span>
        </div>

        <div className={styles.horizon}>
          <Waveline height={30} wavelength={220} seaScale={0.6} velScale={0.3} speed={0.8} className={styles.horizonLine} />
        </div>
      </div>
    </section>
  )
}
