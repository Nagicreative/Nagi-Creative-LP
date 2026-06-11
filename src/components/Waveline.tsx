import { useEffect, useRef } from 'react'
import { nagiState, SEA_AMP } from '../motion/nagiState'

interface Props {
  /** extra amplitude per unit of scroll energy (0 disables velocity response) */
  velScale?: number
  /** multiplies the sea-state base amplitude (0 ignores sea state) */
  seaScale?: number
  /** fixed base amplitude in px, added on top */
  baseAmp?: number
  /** horizontal wavelength in px */
  wavelength?: number
  /** phase speed */
  speed?: number
  height?: number
  className?: string
}

/**
 * A living water line. Draws a sine-blend line on canvas whose amplitude is
 * (sea-state base x seaScale) + (scroll energy x velScale): scroll fast and the
 * water ruffles, stop and it settles back toward a flat 凪 line.
 * Inherits its stroke color from CSS `color` (use `currentColor` theming).
 * Pauses entirely when offscreen. Renders a static flat line under reduced motion.
 */
export default function Waveline({
  velScale = 0.18,
  seaScale = 1,
  baseAmp = 0,
  wavelength = 140,
  speed = 0.9,
  height = 24,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = false
    let raf = 0
    let t = Math.random() * 100
    let amp = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const drawFlat = () => {
      const w = canvas.clientWidth
      ctx.clearRect(0, 0, w, height)
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(w, height / 2)
      ctx.strokeStyle = getComputedStyle(canvas).color
      ctx.lineWidth = 1.1
      ctx.stroke()
    }

    const resize = () => {
      const w = canvas.clientWidth
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // resizing clears the canvas; the static line must be redrawn by hand
      if (nagiState.reducedMotion) drawFlat()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      const w = canvas.clientWidth
      const mid = height / 2
      const target =
        SEA_AMP[nagiState.sea] * seaScale + baseAmp + nagiState.energy * velScale
      amp += (Math.min(target, mid - 1.5) - amp) * 0.07
      t += 0.016 * speed * (1 + nagiState.energy * 0.04)

      ctx.clearRect(0, 0, w, height)
      ctx.beginPath()
      const k1 = (Math.PI * 2) / wavelength
      const k2 = (Math.PI * 2) / (wavelength * 0.53)
      for (let x = 0; x <= w; x += 3) {
        const y =
          mid +
          Math.sin(x * k1 + t * 2.1) * amp * 0.72 +
          Math.sin(x * k2 - t * 1.4) * amp * 0.28
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = getComputedStyle(canvas).color
      ctx.lineWidth = 1.1
      ctx.stroke()

      if (running) raf = requestAnimationFrame(draw)
    }

    if (nagiState.reducedMotion) {
      drawFlat()
      return () => ro.disconnect()
    }

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !running) {
        running = true
        raf = requestAnimationFrame(draw)
      } else if (!visible && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [velScale, seaScale, baseAmp, wavelength, speed, height])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: '100%', height, display: 'block' }}
      aria-hidden
    />
  )
}
