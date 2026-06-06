import styles from './WaterDivider.module.css'

/**
 * Living water surface divider. Three stacked wave layers drift horizontally at
 * different speeds to suggest a calm, breathing sea ("nagi"). Drop-in between
 * sections; `fill` sets the colour the wave resolves into (defaults to the page
 * background so it blends into the section below).
 *
 * Each layer is its own SVG sized to 200% width with a wave tiled twice across
 * a 2880-unit viewBox, so a CSS translateX(-50%) loops with no seam.
 * Decorative only (aria-hidden). Honors prefers-reduced-motion via CSS.
 */
type Props = {
  /** CSS colour the water settles into — usually the next section's background */
  fill?: string
  /** flip vertically when the divider sits at the top of a section */
  flip?: boolean
  className?: string
}

// Wave tiled twice across a 2880-wide viewBox (repeats every 1440).
const WAVE =
  'M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 ' +
  'C1680,80 1920,0 2160,40 C2400,80 2640,0 2880,40 ' +
  'L2880,120 L0,120 Z'

const layers = [
  { cls: 'l1', opacity: 0.4 },
  { cls: 'l2', opacity: 0.6 },
  { cls: 'l3', opacity: 1 },
] as const

export default function WaterDivider({ fill = 'var(--bg)', flip = false, className }: Props) {
  return (
    <div
      className={`${styles.water} ${flip ? styles.flip : ''} ${className ?? ''}`}
      aria-hidden="true"
    >
      {layers.map((l) => (
        <svg
          key={l.cls}
          className={`${styles.layer} ${styles[l.cls]}`}
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
        >
          <path d={WAVE} fill={fill} fillOpacity={l.opacity} />
        </svg>
      ))}
    </div>
  )
}
