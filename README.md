# Nagi Creative — Studio Website

> **小さなブランドの空気を整えて、選ばれる世界観に変えるWeb studio.**
> We tune the atmosphere of small brands into a world worth choosing.

The marketing site for **Nagi Creative** — a boutique web design studio for cafés,
stays and small hospitality brands on the Gold Coast (QLD, Australia) and in Japan.
Founded by Kyoka Nakayama (中山京香). Bilingual EN / 日本語.

---

## What this site says

- **Motto:** 小さなブランドの空気を整えて、選ばれる世界観に変える
- **Promise:** We refine your atmosphere into a website guests trust, remember, and
  keep coming back to.
- **Focus:** Hospitality — cafés, stays, lodges, small venues.
- **Differentiator:** "We build before you buy" — prospects see a custom mockup of
  their site before committing.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- CSS Modules per component, global design tokens in `src/index.css`
- No UI framework — hand-built, photography-forward, warm palette (cream / navy / gold)
- Fonts: Cormorant Garamond (display), Pinyon Script (accent), Jost (UI)

## Run locally

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Structure

```
web/
├─ public/                 # video, images, logo, favicon (served as-is)
├─ src/
│  ├─ App.tsx              # page composition + scroll-reveal hook
│  ├─ index.css            # design tokens, buttons, reveal animation
│  ├─ hooks/
│  │  └─ useScrollReveal.ts  # IntersectionObserver fade-up on scroll
│  └─ components/          # Nav, Hero, Services, FeaturedProjects,
│                          # WhyNagi, Testimonial, Process, Pricing, Footer
```

### Sections (top → bottom)

`Nav · Hero · Services · FeaturedProjects · WhyNagi · Testimonial · Process · Pricing · Footer`

## Conventions

- Each component owns a sibling `*.module.css`. Match the existing spacing,
  uppercase letter-spaced labels (`.cap`), and serif/script accents.
- **Animation:** add `data-reveal` to any element to fade it up on scroll. Stagger
  groups with an inline `transitionDelay`. Avoid `transform` on revealed elements
  that also need a static offset (use `margin` instead — see the Pricing featured card).
- Reduced-motion is honoured globally.

## Brand voice

Warm, direct, confident — not corporate, not salesy. Speak to the venue, lead with
feeling and atmosphere. Pricing is in **AUD**. Never mention the AI tools used to build.

> Full business context lives in `../NAGI_CREATIVE_CONTEXT.md`.
