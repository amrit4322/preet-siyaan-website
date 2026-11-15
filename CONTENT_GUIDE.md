# Content editing guide

Almost everything a business owner needs to update is in:

`src/data/siteContent.json`

Use a plain-text editor. Keep quotation marks and commas in place. After each edit, run `npm run build`; malformed JSON will stop the build and show the line that needs attention.

## Add a genuine event

1. Open `src/data/siteContent.json`.
2. Find the production `"events": []` array. Do not use `sampleEvents` for real content.
3. Copy one object from `sampleEvents` into `events`.
4. Remove `"isDemo": true` and set `"visibility": "public"`.
5. Replace every sample value, especially dates, venue, status and links.
6. Use an ISO date with a Melbourne offset, for example `2027-02-20T18:00:00+11:00`.

Supported `bookingType` values:

- `paid` — requires a genuine HTTPS `externalTicketUrl`
- `free` — add a genuine `registrationUrl` only when registration exists
- `enquiry` — opens the contact section
- `coming-soon` — safely disables ticket action

Supported `ticketStatus` values include `available`, `coming-soon`, `sold-out`, `cancelled`, `postponed` and `private`.

Past events are calculated automatically. Demo-only and hidden events never appear.

## Update a ticket link

Find the event by its unique `id` and replace `externalTicketUrl` or `registrationUrl` with the complete HTTPS URL. Never use a shortened or test URL in production.

## Add a service

1. Copy a service object inside `services`.
2. Give it a unique `id` and `slug`.
3. Update the name, descriptions, highlights and CTA.
4. Set `status` to `confirmed` only after the business approves it; otherwise use `draft`.
5. Set `displayOrder` to control its position.

The card is created automatically. Supported icons currently include `Lamp`, `Sparkles`, `Mic2`, `Drum`, `AudioLines`, `Gem`, `Music2` and `PartyPopper`.

## Update Instagram or another social link

Edit the matching entry inside `socialMedia`. The Instagram URL and handle flow into the navigation, gallery, contact area and social calls to action. Footer links are also editable under `footer.columns`.

Leave an unconfigured platform URL empty. Do not add access tokens.

## Add approved gallery media

Add an object to `gallery`:

```json
{
  "id": "unique-media-id",
  "type": "image",
  "src": "/images/approved-photo.webp",
  "thumbnail": "/images/approved-photo-thumb.webp",
  "alt": "A concise description of the visible moment",
  "caption": "Approved caption",
  "category": "Live Jago",
  "featured": true,
  "instagramUrl": "https://www.instagram.com/p/genuine-post-id/"
}
```

Place the image in `public/images`. Use only owned or licensed media. Never copy Instagram media unless permission covers website reuse.

## Add a verified testimonial

Add an object to `testimonials` with a unique `id`, customer name, exact approved review, event type, date, genuine rating and a `sourceUrl` where available. The whole section stays hidden while the array is empty.

## Replace images or video

Put approved files in `public/images` and use a path beginning with `/images/`. Keep hero images wide, compress images for the web, and provide meaningful `alt` text in JSON. Avoid autoplay audio or video with sound.

## Change the brand colours

Edit `theme.colors`. These values update CSS variables across the website. Use valid hex colours such as `#4A1024`, then check text contrast before publishing.

## Hide a section

In `features`, switch the relevant value from `true` to `false`. Empty testimonials hide automatically; empty events and gallery arrays show intentional, honest empty states.

## Change or disable the opening performance reveal

Edit the `introAnimation` group in `siteContent.json`. `durationMs` controls the complete reveal timeline, while `performers.left` and `performers.right` define the independent foreground layers. Keep performer files in `public/images/intro` and use root-relative paths beginning with `/images/intro/`. The current people are AI-generated 2.5D photographic cutouts with subtle positional motion—not video or skeletal character animation.

Set `playOncePerSession` to `false` to replay on every page load, hide the skip control with `showSkipButton`, or disable the reveal with `features.enableIntroAnimation`. Visitors who prefer reduced motion receive only a short fade to the live homepage. For layout inspection, append `?introProgress=0`, `0.25`, `0.5`, `0.75`, or `1` to freeze a representative frame; append `?intro=force` to replay without clearing session storage.

## Configure direct form delivery

Set `VITE_CONTACT_FORM_ENDPOINT` in `.env.local` and in the deployment provider’s environment settings. The endpoint must accept JSON and protect its own email/API secrets server-side. Without it, the website correctly says direct delivery is unconfigured and offers a prefilled WhatsApp message.

## Final publishing checklist

- Replace draft service copy or hide drafts with `showDraftServices: false`.
- Supply the approved logo path under `branding.logo`.
- Add genuine events, testimonials and media only.
- Confirm the phone, social destinations, domain and canonical URL.
- Run `npm test` and `npm run build`.
- Test the booking form and every external link on mobile.
