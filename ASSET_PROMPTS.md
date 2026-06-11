# 凪 Still Water — asset prompts (image first, then image-to-video)

Workflow: generate the STILL first, check it against the look notes, then animate that
exact image with the MOTION prompt. Camera is LOCKED in every motion prompt: a fixed
camera is what makes a loop seamless (any push-in jumps at the loop point, and a
ping-pong return makes the water visibly play backwards).

The LP ships with the old `public/hero-video.mp4` as a placeholder (it carries a
generator watermark, masked with CSS for now). Asset 1 is required; asset 2 is polish.

## 1. REQUIRED — dusk ocean hero

### 1a. Still image prompt
> Photoreal cinematic still of a calm, glassy ocean at golden hour on the Gold Coast,
> Australia. Almost perfectly still water (a "nagi", a windless calm sea) with soft,
> low swells catching warm amber and rose light from a low sun. Hazy soft horizon line
> in the upper third. Warm cream gold highlights, deep navy teal shadows, gentle film
> grain, subtle anamorphic feel, serene and premium, like a quiet luxury hotel film.
> Shot slightly elevated above the water looking out to sea. No people, no birds, no
> boats, no land in frame, no text, no watermark. 16:9, high resolution.

Look notes (reject the still if any fail):
- The left half stays soft and uncluttered (the headline sits there).
- Horizon roughly in the upper third, not center.
- Warm cream and gold dominate; shadows leaning navy, not gray.
- Nothing sharp or busy in the bottom right corner.

### 1b. Image-to-video motion prompt (animate the approved still)
> Locked camera, completely static framing, like a camera on a tripod. Only the water
> moves: slow, gentle swells rolling through, soft glints of golden light shifting on
> the surface, a barely visible shimmer near the horizon. Very subtle, very slow,
> serene. No camera movement, no zoom, no pan, no parallax. No objects entering frame.
> Constant exposure and color. 10 seconds, seamless loop.

Specs: 16:9, 1080p minimum (4K ideal), 24 to 30 fps, .mp4, no watermark.
Drop the files at:
- still: `web/public/hero-poster-raw.png` (or .jpg)
- video: `web/public/hero-video-raw.mp4`

I then re-encode the scrub-ready copy and wire both in:
```
ffmpeg -i public/hero-video-raw.mp4 -an -c:v libx264 -preset slow -crf 18 -g 1 \
  -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/hero-video.mp4
```
And delete the corner-mask gradient in `src/components/Hero.module.css` (the line
commented "masks the placeholder clip's corner mark").

## 2. OPTIONAL — night sea with lamp light (contact/footer backdrop)

### 2a. Still image prompt
> Photoreal cinematic still of a very dark, calm night ocean seen from the shore on
> the Gold Coast. The water is almost perfectly still, like black glass. A single warm
> golden light from a distant jetty lamp leaves one long, gently broken gold
> reflection line across the water toward the camera. Deep indigo sky, faint stars,
> soft moon glow behind thin cloud. Minimal, serene, premium. No people, no boats, no
> text, no watermark. 16:9, high resolution.

### 2b. Image-to-video motion prompt
> Locked camera, completely static framing. Only the gold reflection line shimmers
> and sways very slowly on the black water; faint, slow movement in the clouds. No
> camera movement, no zoom, no pan. Constant exposure. 8 to 10 seconds, seamless loop.

Drop at: `web/public/night-sea-raw.mp4` (+ the still as `night-sea-still.png`).
Use: faint background behind the contact section. The flat night navy already works,
so this is polish, not a blocker.

## Notes
- Never anything with a visible generator watermark on the live site.
- All site copy avoids dash punctuation; keep that in any future edits.
