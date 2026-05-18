# PresentAIQ — Cinematic Landing Page

A premium, single-page cinematic scroll experience built with Vite + React + TypeScript, Tailwind CSS, GSAP/ScrollTrigger, and Lenis smooth scrolling.

## Quick Start

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Where to Put Assets

Place optional media files in `public/assets/`:

| File | Purpose |
|---|---|
| `hero.mp4` | Looping background video for the Hero scene |
| `hero-poster.jpg` | Video poster / fallback image |
| `visual_01.jpg` … `visual_06.jpg` | Optional section images |

If files are absent the site falls back to cinematic CSS gradients — it still looks premium.

## Tweaking Colors & Typography

All design tokens live in two places:

### `src/styles/globals.css` — CSS variables
```css
:root {
  --gold: #C9A84C;        /* primary accent */
  --gold-light: #E0C06A;  /* hover / highlight */
  --gold-dark: #9E7A2E;   /* shadow / muted */
  --bg: #0E0E0E;          /* page background */
  --bg-1: #141414;        /* card / section background */
  --bg-2: #1A1A1A;        /* deeper surface */
  --text: #F2EDE5;        /* primary text */
  --text-muted: rgba(242,237,229,0.55);  /* secondary text */
  --border: rgba(201,168,76,0.18);       /* subtle borders */
}
```

### `tailwind.config.js` — Tailwind theme extension
Contains the same color palette, font families, and type scale. Edit either location and the changes propagate everywhere.

### Fonts
Currently using Google Fonts (loaded in `globals.css`):
- **Headings:** Playfair Display (serif)
- **Body/UI:** Inter (sans-serif)

To swap fonts: update the `@import` at the top of `globals.css` and the `fontFamily` values in `tailwind.config.js`.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Nav.tsx              # Fixed nav with scroll-aware background
│   ├── sections/
│   │   ├── Hero.tsx             # Scene 1 — sticky cinematic intro
│   │   ├── Manifesto.tsx        # Scene 2 — what we do + pillars
│   │   ├── Stats.tsx            # Scene 3 — proof numbers with count-up
│   │   ├── Services.tsx         # Scene 4 — service cards grid
│   │   ├── Process.tsx          # Scene 5 — 4-step process with line draw
│   │   ├── Testimonials.tsx     # Scene 6 — rotating quotes
│   │   └── Contact.tsx          # Scene 7 — CTA + form + footer
│   └── ui/
│       ├── GrainOverlay.tsx     # Film grain + vignette (fixed overlay)
│       └── ScrollCue.tsx        # Animated scroll indicator
├── lib/
│   └── animations/
│       ├── lenis.ts             # Lenis init (respects prefers-reduced-motion)
│       └── gsapDefaults.ts      # Reusable GSAP reveal helpers
└── styles/
    └── globals.css              # All global styles + design tokens
```

## Animation Notes

- **Lenis** handles smooth scrolling and feeds `ScrollTrigger.update` via `gsap.ticker`.
- **GSAP ScrollTrigger** drives all scroll-linked animations (staggered reveals, count-up, parallax, progress line draw).
- **Reduced motion:** If `prefers-reduced-motion: reduce` is detected, Lenis is disabled and CSS zeroes all transitions/animations globally.

## Wiring the Contact Form

The form in `Contact.tsx` uses a mock `setTimeout` submit. To wire a real backend:

```ts
// Example with Formspree
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setStatus('sending');
  const res = await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  setStatus(res.ok ? 'sent' : 'idle');
};
```

## Performance

- Hero video autoplays only when the browser allows it; CSS gradient fallback is always visible underneath.
- Production bundle: ~350 KB JS / 17 KB CSS uncompressed (~116 KB / 5 KB gzipped).
- Add `loading="lazy"` to any `<img>` tags you introduce below the fold.
