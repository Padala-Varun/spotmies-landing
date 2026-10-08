# Spotmies — landing page redesign

A redesigned homepage for [spotmies.com](https://www.spotmies.com), built with Next.js 16, Tailwind CSS v4, Motion, Lenis and React Three Fiber.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Edit content

All copy and data (services, projects, testimonials, FAQ, contact details, logos) live in [`lib/content.ts`](lib/content.ts). Images are in `public/` (`logos/`, `works/`, `founders/`, `people/`, `expertise/`, `designs/`, `brand/`).

## Contact form

The form posts to `app/api/contact/route.ts`. Set `CONTACT_WEBHOOK_URL` (Slack, Zapier, Make, Formspree, a CRM…) to receive submissions as JSON. Without it, the form opens the visitor's email app with the message prefilled to `info@spotmies.com`.

## Structure

- `components/sections/` — one file per page section, in page order in `app/page.tsx`
- `components/ui/` — shared pieces (reveals, magnetic buttons, spotlight cards, velocity marquee, cursor)
- `components/webgl/` — hero particle core (loaded client-only, skipped for reduced motion / no WebGL)

## Accessibility & performance

- `prefers-reduced-motion` turns off smooth scroll, the intro, the WebGL scene and continuous animations.
- The intro plays once per browser session.
- The showreel videos load only when the section is near the viewport and can be paused or muted.
