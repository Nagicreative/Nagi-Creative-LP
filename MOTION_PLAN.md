# Nagi Creative — Whole-Site Motion Plan (v1)

Date: 2026-06-07. Grounded in the actual implementations of the sites Kyoka picked, not guesses.

## 1. What your references actually do (verified)

| Site | How it's built (real) | The "wow" mechanic |
|---|---|---|
| **towerdoors.com.au** | Astro + **GSAP 3.13** (ScrollSmoother + ScrollTrigger) | Buttery **smooth scroll**; a **pinned, scroll-scrubbed canvas image-sequence hero** (you scroll, the product renders frame-by-frame); a **preloader counter** wired to real image loading; pinned section where info panels reveal one by one with **drawing indicator lines** + fade/scale text. |
| **sliderrevolution** | sr7 engine + GSAP + **WebGL** | Cinematic slide transitions, **WebGL image distortion**, layered parallax. |
| **wibify.agency** | Dark cinematic, **3D/WebGL hero centerpiece** | A floating **3D object** (monolith + orbiting asteroid) as the hero focal point; **mixed kinetic type**: bold sans + lime **italic-serif accent words** with **hand-drawn underlines**; editorial index markers "[01]", a stat strip. |

**The through-line (your taste):** dark/cinematic, **smooth-scrolled**, **scroll-driven storytelling across the
whole page**, with a **hero centerpiece** (3D or scrubbed sequence) and **kinetic editorial typography**.
This is GSAP-class, whole-site choreography — not the isolated anime.js tricks we shipped first.

## 2. The technical pivot

To get this feel we change the engine:
- **Smooth scroll:** Lenis (or GSAP ScrollSmoother). Everything below rides on this.
- **Scroll choreography:** **GSAP + ScrollTrigger** (pin, scrub, stagger). This is what towerdoors uses.
- **Kinetic type:** SplitType (or GSAP SplitText) for line/word/char reveals.
- **Hero centerpiece (optional, highest wow):** a scroll-scrubbed **image/video sequence on canvas**
  (towerdoors' move, very achievable) or a light **Three.js** 3D object (wibify's move, heavier).
- anime.js stays for small ambient bits; GSAP owns the scroll story.

We keep the React/Vite app in `web/`. GSAP layers in cleanly alongside the current components.

## 3. Brand identity → cinematic, without losing Nagi

Your DNA still leads; we just film it more cinematically:
- **凪 (calm sea)** → a **dusk / golden-hour ocean** hero that breathes. Calm, but moody and premium.
- **Editorial serif + script signature** → mixed kinetic type: serif headline + a lime/gold **italic accent
  word** with a **drawn underline** (the wibify move, in Nagi's gold not lime).
- **Palm / botanical** → foreground depth layers in the hero, parallaxed on scroll.
- **The wave divider** → becomes a real scroll-driven transition between sections.
- Editorial scaffolding: **"[01] BOUTIQUE WEB DESIGN"** index markers + a small **stat strip**
  ("Gold Coast · Japan", "hospitality only", etc).

## 4. The one decision: how far toward dark/cinematic

Your references are dark. Nagi sells *warm hospitality*. Three honest levels:

- **A — Warm cinematic (recommended).** Keep the cream/navy/gold identity but elevate it: dusk-ocean hero,
  smooth scroll, GSAP scroll-storytelling, kinetic gold-accent type. Premium + on-brand for hospitality.
- **B — Dusk / split.** Hero and a couple of "moments" go dark/moody (dusk, night-swim), body stays light.
  More drama, a bigger departure, still warm where it counts.
- **C — Full dark cinematic.** Near-black + gold throughout, wibify/towerdoors energy. Most "wow",
  furthest from the current warm hospitality feel.

## 5. Whole-site motion architecture (section by section)

1. **Preloader** — a short counter (0→100) tied to asset loading, then a wave/curtain wipe. *(towerdoors)*
2. **Hero** — smooth-scroll pinned; **scrubbed dusk-ocean sequence** (or 3D object) behind a kinetic serif
   headline with a gold italic accent + drawn underline; foreground palm parallax; stat strip; "[01]" marker.
   *(wibify type + towerdoors scrub)*
3. **Intro / WhyNagi** — pinned panel where 2–3 lines reveal sequentially with drawing hairlines. *(towerdoors info panels)*
4. **Services** — horizontal-scroll or scrub-staggered cards as you move through. *(wibify / sliderrevolution)*
5. **Featured work** — cards rise + **WebGL/clip image reveal** on enter; hover distortion. *(sliderrevolution)*
6. **Process** — a vertical scroll timeline that draws a line connecting steps. *(towerdoors indicators)*
7. **Pricing** — staggered reveal, number count-up on enter.
8. **Testimonial** — large kinetic pull-quote, word-by-word.
9. **Contact / Footer** — oversized kinetic CTA, gold underline draw, marquee of "Gold Coast · Japan".
10. **Global** — custom cursor, section-to-section wave transitions, smooth scroll throughout.

## 6. Build phases (after a direction is approved)
1. Foundations: Lenis smooth scroll + GSAP/ScrollTrigger wired into `web/`, reduced-motion safe.
2. Hero rebuild (the centerpiece) — biggest wow first.
3. Section choreography (WhyNagi, Services, Work) one by one.
4. Process timeline + Contact CTA.
5. Polish: cursor, transitions, performance pass (lazy-load the sequence/3D).

## 7. Materials I may ask you for
- A **dusk/golden-hour ocean clip or image sequence** of the Gold Coast (for the scrubbed hero) — or I
  can generate one. Current `view.png` / `hero-video.mp4` may work as a start.
- Transparent **palm/botanical** cutouts (we have `palm-tree-t.png`, `gv-palm.png`).
- Final say on the **accent word** in the headline (which word goes gold-italic + underlined).
- Direction A / B / C from section 4.

> Nothing gets built until you pick a direction. Then we do the hero first so you see the "wow" early.

---

## DECISION: Direction A (warm cinematic). Build log + assets

Recipe source: the `aura-landing` skill (GSAP ScrollTrigger pin + Lenis + scroll-scrubbed
background video + glass/gold). We mirror it in the React app at `web/` (NOT `nagi-motion/`,
which is the other chat's Framer-Motion build).

**Done (2026-06-07):**
- Installed `gsap@3.15` + `lenis@1.3.23` in `web/`.
- `src/hooks/useSmoothScroll.ts` — Lenis smooth scroll feeding GSAP ScrollTrigger; dev hooks
  `window.__lenis` / `window.__ST`; reduced-motion safe; verified live (html.lenis class, no errors).

**Next:** scroll-scrubbed dusk-ocean hero (pin + scrub video `currentTime`), using the existing
`public/hero-video.mp4` as a placeholder until Kyoka's dusk clip lands, then swap via the aura
ffmpeg all-keyframe re-encode.

### Asset prompt — dusk-ocean hero clip (Kyoka generates, e.g. Higgsfield / Kling)
> Cinematic, ultra-slow aerial push over a calm, glassy ocean at golden hour on the Gold Coast.
> Almost-still water (a "nagi" — a windless calm sea) with soft, low rolling swells catching warm
> amber and rose light from a low sun. The camera drifts forward and slightly down toward the water,
> perfectly smooth, one continuous move, no cuts. Warm cream-gold highlights, deep navy-teal shadows,
> hazy soft horizon, gentle film grain, subtle anamorphic, photoreal, serene and premium. Over the
> shot the light deepens slightly from golden hour toward dusk. No people, no birds, no boats, no text.
> Locked exposure. 10 seconds, seamless loop-friendly.

Format: 1080p+ (4K ideal), 16:9, 24–30fps, .mp4. I re-encode to all-keyframe for smooth scrubbing
(`ffmpeg -i clip.mp4 -an -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/hero-video.mp4`).
Optional variants worth generating too: a slow shoreline-foam pull-back, and a palm-silhouette dusk.
