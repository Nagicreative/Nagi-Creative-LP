# Motion notes — self-site (nagicreative.com)

Goal: add bold, editorial motion to the React self-site in `web/`. Engine of choice: **anime.js v4.4.1**,
cloned to `../vendor/anime/` (source + `dist/` + 24 official examples). The site currently has no anim
library, only `src/hooks/useScrollReveal.ts`.

## anime.js v4 — the APIs that matter (verified from the cloned examples)

Import from the ESM build:
```js
import { animate, createTimeline, stagger, onScroll, splitText, utils } from 'animejs';
```

1. **Scroll-driven timelines** (`onScroll`) — the core of "bold scroll motion".
   From `examples/onscroll-sticky`:
   ```js
   createTimeline({
     defaults: { ease: 'linear', duration: 500 },
     autoplay: onScroll({
       target: '.section',
       enter: 'top top',     // when section top hits viewport top
       leave: 'bottom bottom',
       sync: 0.5,            // ties progress to scroll position (scrubbing)
       // debug: true,       // draws the trigger guides while developing
     }),
   })
   .add('.card', { rotateY: [-180, 0], y: '-60%', delay: stagger(1) }, 0)
   .init();
   ```
   `sync` is the key: with it, the animation scrubs with the scrollbar instead of just firing once.

2. **Split-text reveals** (`splitText`) — for headlines/hero. From `examples/text/split-effects`:
   ```js
   const split = splitText('h1', { lines: true, words: true });
   split.addEffect(s => createTimeline()
     .add(s.lines, { y: ['100%', '0%'], opacity: [0,1] }, stagger(80)));
   ```
   Use for Hero headline + section titles. Looks expensive, is one call.

3. **Stagger** — the secret behind premium feel. `stagger(value, { from, start, modifier })`.
   Used everywhere: card delays, brightness ramps, line-by-line text.

4. **Hover via `animate()`** — `onmouseenter/leave` with `composition: 'blend'` so hover and the
   scroll timeline coexist without fighting (see onscroll-sticky bottom).

Local examples worth copying directly:
`onscroll-sticky`, `onscroll-responsive-scope`, `text/split-effects`, `text/scramble`,
`stagger`, `svg-line-drawing`, `draggable-infinite-auto-carousel`.

## Inspiration sites (studied) — what to steal, and where it fits Nagi

| Site | Technique to copy | Apply to Nagi section |
|---|---|---|
| **Epic** (epic.net) | Typography that morphs/shifts on scroll; choreographed transitions | Hero headline, section titles (splitText + onScroll sync) |
| **Unseen Studio** (unseen.co) | Bold oversized type + custom cursor + animated nav | Nav + Hero |
| **Uncommon Studio** (uncommonstudio.com.au) | Staggered scroll-triggered progressive reveals | Services, Process, Pricing reveal-in |
| **Eszter Bial** (eszterbial.com) | Restraint: elegant timing, minimal motion | Tone guardrail — keep it tasteful, not gimmicky |
| **Apple** product pages | Cinematic scrub: element reveals tied to scroll position | FeaturedProjects (cards reveal/rotate as you scroll) |
| **Active Theory** (activetheory.net) | Theatrical full-screen scroll scenes | Hero "wow" moment |
| **Lusion** (lusion.co) | Cursor-reactive abstract field (WebGL — aspirational, heavier) | Optional hero background, stretch goal |
| **Rive** (rive.app) | Playful elements reacting to scroll + cursor | Micro-interactions on cards/buttons |

Awwwards galleries to keep open while building:
- https://www.awwwards.com/websites/animation/
- https://www.awwwards.com/websites/gsap/

## Recommended motion plan for the self-site (bold but tasteful)
1. **Hero**: splitText line-reveal on load + a slow parallax/scrub on the hero image.
2. **Section titles**: each animates in word-by-word via `onScroll` (fire-once, no sync).
3. **FeaturedProjects**: cards rise + slight rotateY, staggered, scrubbed with `sync` (the Apple move).
4. **Services / Pricing / Process**: staggered reveal-in, replace `useScrollReveal` where it's stronger.
5. **Hover**: cards lift with `composition:'blend'` so it layers over the scroll state.
Keep durations 400–800ms, easings `inOut(2)` / `inOutQuad`. Eszter Bial is the restraint benchmark.

## Implemented (2026-06-07) — `src/hooks/useMotion.ts`
anime.js v4.4.1 installed in `web/`. New hook `useMotion()` (called in `App.tsx` alongside
`useScrollReveal`) adds three isolated, conflict-free moves:
1. **Hero headline** — `splitText` masked word-rise on load. The h1 is excluded from the old CSS
   `heroRise` (`Hero.module.css`: `.heroCopy > *:not(.h1)`) so anime owns it. Pre-paint hide via
   `useLayoutEffect` avoids any flash; splits after `document.fonts.ready`.
2. **Hero background** — `onScroll({ sync:true })` cinematic scrub (scale 1→1.12, y 0→-40). Safe
   because `.heroBg` already overflows the section by 130px (no gaps). `data-hero-bg` on the video.
3. **Featured cards** — staggered 3D entrance (y/rotateY/scale) triggered when the grid enters view,
   then `onComplete` clears the inline transform so the existing CSS hover-lift, `.lifted` offset and
   photo zoom keep working untouched. `data-work-grid` / `data-work-card`; grid gets a real CSS
   `perspective` (anime's `perspective` is a transform fn, not the CSS prop, so it's set directly).

Robustness: honors `prefers-reduced-motion` (early return, everything static + visible), StrictMode-safe
(all instances reverted on cleanup), and the card entrance has a "reveal now" fallback if the viewport
height is unreadable plus a 3s safety timeout, so content can never get stuck hidden.

Reference current date: 2026-06-07. anime.js latest is v4.4.1 (cloned to ../vendor/anime).
