# Entropic Operational Solutions

Marketing site for Entropic Operational Solutions, built with Nuxt 4, Nuxt
Content, and Tailwind CSS 4.

## Site structure

| Route | Page |
| --- | --- |
| `/` | Home: positioning, financial foundations, technical add-ons, industries, process |
| `/services` | Full 55-service catalog with scope, price drivers, and planning ranges |
| `/industries` | Target markets with a common starting combination for each |
| `/pricing` | Billing models, typical ranges, inclusions, and pricing FAQ |
| `/approach` | Principles, how services combine, process, and scope boundaries |
| `/contact` | Inquiry form (`?service=SV06` prefills a service from the catalog) |
| `/brand/logo-preview.html` | Logo comparison sheet (static, unchanged) |

## Editing content

- **Services and prices** live in `content/services/*.yml`, one file per service
  area. Values mirror the client service catalog (planning ranges updated
  September 25, 2026). Edit a range there and every page updates.
- **Industries** live in `content/industries/*.yml`, including the image paths
  and the catalog IDs used for each starting combination.

## Brand and theme

- The Orbital logo is used everywhere via `app/components/SiteLogo.vue`:
  maroon assets in light mode, white assets in dark mode. The header shows the
  wordmark from 640px up and the compact icon below that.
- The theme follows the operating system by default. Visitors can override it
  with the header toggle or the System / Light / Dark switch in the footer and
  mobile menu. An inline script in `nuxt.config.ts` applies the saved theme
  before first paint, so the logo and colors never flash.
- Type: Instrument Serif for display headings (self-hosted by `@nuxt/fonts`),
  Inter for body text.

## Placeholders to replace before launch

Everything below is temporary and marked with `PLACEHOLDER` comments in the
templates (the comments are kept in the rendered HTML):

- **Images** in `public/images/placeholders/`. Replace files in place (keep the
  names) or point the components at new paths. `*-dark.webp` files are the
  dark-mode versions.
- **Testimonials** in `app/components/TestimonialsSection.vue`: invented quotes,
  names, and photos.
- **Client logos** in `app/components/LogoCloud.vue`: stock logos, not clients.
- **Contact delivery**: the browser-uploaded Netlify build uses Netlify Forms.
  In other deployments, `server/api/contact.post.ts` validates inquiries but only
  logs them. Connect an email provider or CRM before launch there.

## Setup

Use Bun 1.3.6 or newer to install dependencies and run the project:

```bash
bun install
```

Commit `bun.lock` when dependencies change. For reproducible installs in CI, use
`bun install --frozen-lockfile`.

## Development

```bash
bun run dev
```

The development server runs at `http://localhost:3000`.

`bunfig.toml` forces package scripts to use Bun's runtime. Nuxt Content then uses
Bun's built-in SQLite support, avoiding native `better-sqlite3` binaries that can
fail when the installed Node.js version changes.

## Production

```bash
bun run build
bun run preview
```

The server build targets Bun. To run the built server directly:

```bash
bun .output/server/index.mjs
```

To generate a static site:

```bash
bun run generate
```

## Netlify browser deployment

Generate the uploadable static site (Node 24 uses built-in SQLite):

```bash
NITRO_PRESET=netlify-static NUXT_PUBLIC_NETLIFY_FORMS=true node node_modules/nuxt/bin/nuxt.mjs generate
```

Upload `dist` or a zip of its contents through Netlify's project dashboard.
Enable form detection in the project's Forms settings before uploading so the
`inquiry` form is registered. Submissions are stored in Netlify Forms; configure
notification emails in Netlify if desired. This deployment needs no server
functions. `netlify.toml` records the same settings for future builds.
