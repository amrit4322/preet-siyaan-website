# Preetsiyaan Entertainment

A production-ready React/Vite website for Preetsiyaan Entertainment, designed around a royal Punjabi celebration aesthetic. Content, theme values, services, events, social destinations, FAQs and contact details are controlled from one JSON file.

## Quick start

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Project structure

- `src/data/siteContent.json` — all editable business content and theme tokens
- `src/sections/` — page sections
- `src/components/` — shared layout, UI and three-dimensional visual components
- `src/utils/` — content validation, event/date behaviour and WhatsApp link generation
- `public/images/` — approved website imagery
- `CONTENT_GUIDE.md` — nontechnical editing instructions

## Verified and configurable content

The official Linktree was used to verify the public service profile and social destinations. Confirmed services are Live Jago, Punjabi folk artists, event and wedding hosting, dhol, and DJ/lighting/sound. The WhatsApp destination resolves to `+61 422 542 030`.

Sangeet and other cultural-celebration categories are visibly marked `draft`. Production events, gallery media and testimonials are empty because no genuine approved entries were supplied. Demo event fixtures live in `sampleEvents` and are never rendered.

## Contact form

The form validates locally and generates a fully prefilled WhatsApp enquiry. Direct server submission is deliberately disabled unless an endpoint is configured.

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTACT_FORM_ENDPOINT` to an HTTPS endpoint that accepts JSON.
3. Restart Vite.

Secrets must stay on the server. Do not add private API keys to `siteContent.json` or any `VITE_` variable.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import it in Vercel.
3. Keep the detected framework preset as **Vite**.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Add `VITE_CONTACT_FORM_ENDPOINT` in Project Settings → Environment Variables only if direct delivery is configured.
6. Deploy, attach the production domain and confirm the canonical URL in `index.html` and `src/data/siteContent.json`.

The included `vercel.json` provides a safe single-page fallback.

## Media and licensing

The hero is original AI-generated concept artwork created for this project. It is labelled as concept artwork in the interface. Add only business-owned, licensed or otherwise authorised performance media. Instagram content is linked, never scraped.

## Technology

React 19, Vite, Tailwind CSS, Motion for React, React Three Fiber, Drei, Lucide React and Vitest.

