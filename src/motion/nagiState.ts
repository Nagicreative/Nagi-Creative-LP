/**
 * Shared, mutable motion state for the 凪 (Still Water) concept.
 * One orchestrator writes it every frame; wavelines and widgets read it.
 * Kept as a plain module singleton so no React re-renders are involved.
 */

export type SeaState = 'choppy' | 'settling' | 'calm' | 'glass' | 'nagi'
export type Theme = 'dawn' | 'day' | 'dusk' | 'evening' | 'night'

export interface NagiState {
  /** smoothed scroll velocity, roughly px/frame, signed */
  velocity: number
  /** |velocity| eased toward zero when still */
  energy: number
  sea: SeaState
  theme: Theme
  reducedMotion: boolean
}

export const nagiState: NagiState = {
  velocity: 0,
  energy: 0,
  sea: 'choppy',
  theme: 'dawn',
  reducedMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
}

/** Fired on the window whenever sea state or theme changes. */
export const NAGI_EVENT = 'nagi:state'

/** Base waveline amplitude (px) for each sea state. */
export const SEA_AMP: Record<SeaState, number> = {
  choppy: 5,
  settling: 3.2,
  calm: 1.8,
  glass: 0.8,
  nagi: 0,
}

