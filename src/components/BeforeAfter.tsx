import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BeforeAfter.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * The difference, felt. A draggable shoreline between a typical template
 * and Driftwood. The divider sweeps once on entry, then it is yours.
 * The "before" side is an honest pastiche we built, not a real client site.
 */
export default function BeforeAfter() {
  const boxRef = useRef<HTMLDivElement>(null)
  const pos = useRef(50)
  const dragging = useRef(false)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const after = box.querySelector<HTMLElement>(`.${styles.after}`)
    const handle = box.querySelector<HTMLElement>(`.${styles.handle}`)
    if (!after || !handle) return

    const apply = (p: number) => {
      pos.current = Math.min(96, Math.max(4, p))
      after.style.clipPath = `inset(0 0 0 ${pos.current}%)`
      handle.style.left = `${pos.current}%`
      box.setAttribute('aria-valuenow', String(Math.round(pos.current)))
    }
    apply(reduce ? 50 : 88)

    // entry sweep: the tide comes in once (killed if the visitor grabs it)
    let sweepTween: gsap.core.Tween | null = null
    if (!reduce) {
      const sweep = { v: 88 }
      sweepTween = gsap.to(sweep, {
        v: 42,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => apply(sweep.v),
        scrollTrigger: { trigger: box, start: 'top 70%' },
      })
    }

    const toPct = (clientX: number) => {
      const r = box.getBoundingClientRect()
      return ((clientX - r.left) / r.width) * 100
    }
    const onDown = (e: PointerEvent) => {
      sweepTween?.kill()
      sweepTween = null
      dragging.current = true
      box.setPointerCapture(e.pointerId)
      apply(toPct(e.clientX))
    }
    const onMove = (e: PointerEvent) => {
      if (dragging.current) apply(toPct(e.clientX))
    }
    const onUp = () => {
      dragging.current = false
    }
    box.addEventListener('pointerdown', onDown)
    box.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      sweepTween?.scrollTrigger?.kill()
      sweepTween?.kill()
      box.removeEventListener('pointerdown', onDown)
      box.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <section className={styles.sec} data-theme="evening" data-sea="calm">
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <span className="cap">The difference</span>
          <h2 className={styles.h2}>
            Drag the <span className="script">shoreline.</span>
          </h2>
          <p className={styles.note}>
            Left: the template most venues settle for. Right: Driftwood.
            Same guesthouse, different world.
          </p>
        </div>

        <div
          ref={boxRef}
          className={styles.stage}
          data-reveal
          role="slider"
          aria-label="Compare a typical template with Driftwood by Nagi. Drag to reveal."
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            const after = boxRef.current?.querySelector<HTMLElement>(`.${styles.after}`)
            const handle = boxRef.current?.querySelector<HTMLElement>(`.${styles.handle}`)
            if (!after || !handle) return
            if (e.key === 'ArrowLeft') pos.current -= 5
            else if (e.key === 'ArrowRight') pos.current += 5
            else return
            pos.current = Math.min(96, Math.max(4, pos.current))
            after.style.clipPath = `inset(0 0 0 ${pos.current}%)`
            handle.style.left = `${pos.current}%`
          }}
        >
          {/* before: the generic template, deliberately lifeless */}
          <div className={styles.before} aria-hidden>
            <div className={styles.tplBar}>
              <i /><i /><i />
            </div>
            <div className={styles.tplBody}>
              <p className={styles.tplTitle}>WELCOME TO OUR GUESTHOUSE</p>
              <p className={styles.tplSub}>Best rooms in town. Book your stay today.</p>
              <div className={styles.tplBtn}>BOOK NOW</div>
              <div className={styles.tplGrid}>
                <span /><span /><span />
              </div>
              <div className={styles.tplLines}>
                <span /><span /><span style={{ width: '62%' }} />
              </div>
            </div>
            <span className={styles.tagBefore}>A typical template</span>
          </div>

          {/* after: the real thing, full hero of the live site */}
          <div className={styles.after} aria-hidden>
            <img src="/driftwood-site.jpg" alt="" loading="lazy" />
            <span className={styles.tagAfter}>Driftwood, by Nagi</span>
          </div>

          <div className={styles.handle} aria-hidden>
            <span className={styles.handleLine} />
            <span className={styles.handleKnob}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
