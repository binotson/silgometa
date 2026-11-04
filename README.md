# SILGO META LIMITED — Corporate Website

The corporate website for **SILGO META LIMITED** (RC No. 679305), an independent corporate advisory
and strategic financial facilitation company connecting businesses with suitable funding
opportunities. Five service pillars: strategic capital access and funding facilitation, capital
markets readiness and transaction advisory, corporate finance and strategic advisory, technology and
infrastructure advisory, and business development and institutional capacity building, plus a
complementary strategy and market development practice.

- Production domain: <https://silgometa.com.ng> (hosted on Hostinger)
- Repository: <https://github.com/binotson/silgometa>

## Technology stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, static prerendering) with TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) icons
- [Vitest](https://vitest.dev) unit tests
- Fonts: Source Serif 4 (headings) and Inter (body), self-hosted via `next/font`

## Prerequisites

- Node.js 20.9 or later (developed on Node 24)
- npm

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; only needed for the contact form or indexing
npm run dev
```

Open <http://localhost:3000>. If port 3000 is in use, run `npm run dev -- --port 3001`.

## Scripts

| Command             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Development server                          |
| `npm run build`     | Production build                            |
| `npm start`         | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm test`          | Unit tests (contact validation, email routing, contact API with a mocked SMTP transport) |
| `npm run check`     | Lint, type-check and test                   |

## Project structure

```
src/
  app/                 Routes (pages, API route, sitemap, robots, icons, OG image)
    api/contact/       Contact form endpoint (server-side)
  components/          Header, footer, logo, shared sections, contact form
  content/             ALL company content: site facts, corporate profile, services, projects, insights, brand
  lib/                 Contact validation (shared), server-only email routing and SMTP mailer, metadata helpers
```

Company content lives in `src/content/`. Edit those files to update text; pages render from them.

## Environment variables

See `.env.example`. None are required to run the site locally.

| Variable               | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Defaults to `https://silgometa.com.ng`. Build time.         |
| `ALLOW_INDEXING`       | `true` only in production. Otherwise robots.txt and meta tags block indexing. Build time. Vercel production is detected automatically. |
| `SMTP_HOST`            | `smtp.hostinger.com`                                                       |
| `SMTP_PORT`            | `465`                                                                      |
| `SMTP_SECURE`          | `true` (SSL/TLS)                                                           |
| `SMTP_USER`            | `infor@silgometa.com.ng`                                                   |
| `SMTP_PASS`            | Password of the `infor@` mailbox. Host environment only; never commit.     |
| `CONTACT_FROM_EMAIL`   | `infor@silgometa.com.ng` (must match `SMTP_USER`).                         |

"Build time" variables are baked into the prerendered pages: redeploy (rebuild) after changing them.
SMTP variables are read by the server at request time: restart or redeploy the app after changing them.

Never commit `.env*` files; they are ignored by Git.

## Contact form

The form validates input in the browser and again on the server (`src/app/api/contact/route.ts`),
with a honeypot field, a minimum completion time (a missing start time counts as automated), size
limits, and best-effort rate limiting per IP, per email address and overall.

Email is sent with [Nodemailer](https://nodemailer.com) through Hostinger SMTP, from
`infor@silgometa.com.ng`, with the visitor's address as Reply-To. The recipient is chosen **on the
server** from the enquiry type (`src/lib/contact-routing.ts`); the browser cannot supply one:

| Enquiry type                             | Recipient                      |
| ---------------------------------------- | ------------------------------ |
| Capital markets & deal structuring       | `mdahmad@silgometa.com.ng`     |
| Strategy & marketing consultancy         | `sales@silgometa.com.ng`       |
| Infrastructure & technology              | `support@silgometa.com.ng`     |
| Business consulting & capacity building  | `fadil@silgometa.com.ng`       |
| Careers                                  | `secretariat@silgometa.com.ng` |
| General enquiry                          | `infor@silgometa.com.ng`       |

The API reports success only after the SMTP server accepts the message. SMTP errors are logged by
code only and never shown to visitors. **Until `SMTP_PASS` is configured, the form does not send
messages.** It tells the visitor that online sending is not yet enabled and offers a pre-filled
email to `infor@silgometa.com.ng` instead.

After deployment, submit one test enquiry per enquiry type and confirm each arrives in the right
mailbox.

## Official logo and brand colours

The official logo is the "SM" emblem (grey lettering, compass and rising arrow, gold bar chart).
The artwork contains no company name, so the site sets "SILGO META LIMITED" in type beside it
(`src/components/logo.tsx`).

| File                                   | Use                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| `public/images/silgo-meta-logo.jpg`    | Original file as supplied (1536×1534), kept unaltered.              |
| `public/images/silgo-meta-emblem.png`  | Web version: same artwork, white margin and faint edge line trimmed. Used in header and footer. |
| `src/app/icon.png`, `apple-icon.png`   | Browser and home-screen icons derived from the emblem.              |
| `src/app/opengraph-image.tsx`          | Social-sharing image featuring the emblem.                          |

The logo is shown on a white tile (its own background) so it reads correctly on both the light
header and the dark footer. If a transparent PNG/SVG or a reversed version is supplied later,
update `src/content/brand.ts`. Do not recolour or redraw the logo without authorization.

Site colours are derived from the logo: gold `#AD7E3A` and grey `#ADAAB5`, complemented by deep
navy `#10243A` and warm white `#FAF9F6`. Accessible text shades are defined in
`src/app/globals.css` (`gold-700` on light backgrounds, `gold-400` on navy).

## Content requiring client confirmation

The site uses only facts from the supplied company profile. Please confirm:

- **Registration details**: RC No. 679305 is displayed. The previously published establishment date
  (17 February 2023) and "incorporated under CAMA 2020" statement appear inconsistent with that RC
  number and are hidden until confirmed against the CAC Certificate of Incorporation
  (`src/content/site.ts`).
- **Regulatory review**: the fee model (including success-related fees) and the scope of introductions
  should be reviewed by Nigerian counsel against the Investments and Securities Act 2025 and SEC rules.
- **Representative engagement profile** (featured Commercial Paper readiness profile): present it as
  an ongoing engagement only while the mandate and status can be substantiated.

- **Case studies** (`src/content/projects.ts`): permission to publish client names (CFAO International,
  Brilliant eSystems) and the ₦1,350,000,000 reported transaction value. The other case studies do not yet have a client objective or
  engagement status; add them once verified. Set `published: false` to hide any entry.
- **Leadership** (`src/content/site.ts`): the summaries are based on job titles only. Supply approved
  biographies and, if desired, approved headshots. Board and senior adviser details are not published.
- **Insights** (`src/content/insights.ts`): the four topics are labelled as outlines (forthcoming).
  Replace with approved article text, then set `status: "published"` and a real `publishedOn` date.
- **Drafted copy for review**: About page mission and vision, the governance paragraph on the Leadership page, the careers culture descriptions and the
  privacy notice (which should be reviewed by counsel against the Nigeria Data Protection Act 2023).
- **Photography and video**: the site uses licensed stock media (see "Photography and video" below). Genuine company photography can replace it at any time.
- **Maps**: office links search Google Maps by address; no coordinates are assumed. An embedded
  map can be added once exact locations are verified.

## Photography and video

Licensed stock media is configured in `src/content/media.ts` and stored in `public/media/`:

| Slot | File | Source (free for commercial use, no attribution required) |
| --- | --- | --- |
| Home hero (video) | `home-hero.mp4` | [Mixkit: city at night, aerial](https://mixkit.co/free-stock-video/movement-in-a-city-at-night-in-an-aerial-shot-42343/) (Mixkit Stock Video Free License) |
| Capital markets | `capital-markets.jpg` | [Unsplash: Benjamin Child](https://unsplash.com/photos/GWe0dlVD9e0) |
| Strategic & marketing | `strategic-marketing.jpg` | [Unsplash: Weichao Deng](https://unsplash.com/photos/iDlVmSKg_Is) |
| Infrastructure & technology (video) | `infrastructure-technology.mp4` | [Pexels: Dima Krivoy](https://www.pexels.com/video/blue-colored-cables-1085656/) |
| Business consulting | `business-consulting.jpg` | [Unsplash: Vitaly Gariev](https://unsplash.com/photos/eb5nX6G1sk0) |

Video posters are frames taken from the videos. Videos load only on screens 768px and wider,
while visible, for visitors who allow motion and have not enabled data saving; others see the
poster. If a slot is emptied, the practice area falls back to its animated illustration
(`src/components/practice-visual.tsx`).

Guidelines when replacing media:

- Stock media is atmospheric only; never present it as a Silgo Meta project, client, office or
  team member. Record the source and licence of every stock file.
- Images: landscape, at least 2000 px wide. Videos: muted MP4 (H.264), 720p–1080p, 15–30
  seconds, ideally under 10 MB, with a poster image.

## Deployment

Any Node.js host that supports Next.js 16 works. [Vercel](https://vercel.com) is the simplest:

The production site runs on Hostinger as a Node.js app built from this repository (`npm run build`,
`npm start`). Set the environment variables above in Hostinger and redeploy.

Vercel also works:

1. Import the GitHub repository into Vercel (framework preset: Next.js).
2. Set the environment variables above for the Production environment.
3. Add `silgometa.com.ng` (and optionally `www.silgometa.com.ng`, redirecting to it) as project domains.
4. Update DNS at the domain registrar as Vercel instructs. HTTPS certificates are issued automatically.

Preview deployments are not indexed. Do not change DNS records until the production deployment has
been reviewed and approved.

For self-hosting: `npm ci && npm run build && npm start` (port 3000 by default), behind a reverse
proxy with HTTPS.
