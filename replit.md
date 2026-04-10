# Kids Entrepreneurs Fair

## Overview
International children's entrepreneurship fair website. Standalone Next.js 15 application with bilingual support (Spanish/English).

## Tech Stack
- **Framework**: Next.js 15 (App Router, SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **i18n**: next-intl (ES/EN, default: ES)
- **Forms**: React Hook Form + Zod + @hookform/resolvers
- **UI Components**: shadcn/ui (Radix primitives)
- **Database**: Supabase (external, not Replit DB)
- **Email**: Resend (transactional emails)
- **Fonts**: Baloo 2 (headings), Quicksand (body)

## Project Structure
```
messages/           # Translation files (es.json, en.json)
public/             # Static assets (favicon.svg, opengraph.jpg)
src/
  app/
    globals.css     # Global styles + brand tokens
    api/            # API routes (healthz, contact, register/exhibitor, register/visitor)
    [locale]/       # i18n pages
      layout.tsx    # Root layout
      page.tsx      # Global landing page
      [country]/
        page.tsx    # Country page (Colombia)
        [city]/
          page.tsx  # City page (Bogota) with registration forms
  components/
    layout/         # Navbar, Footer
    registration/   # RegistrationTabs
    ui/             # shadcn/ui components
  hooks/            # Custom hooks
  i18n/             # next-intl config (request.ts, routing.ts)
  lib/              # Utilities (supabase.ts, utils.ts)
  middleware.ts     # next-intl middleware
```

## URL Structure
- `/` redirects to `/es`
- `/es`, `/en` - Global landing pages
- `/es/colombia`, `/en/colombia` - Country pages
- `/es/colombia/bogota`, `/en/colombia/bogota` - City pages with forms
- `/api/register/exhibitor` - POST exhibitor registration
- `/api/register/visitor` - POST visitor registration
- `/api/contact` - POST contact form
- `/api/healthz` - GET health check

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `RESEND_API_KEY` - Resend API key for emails

The app has graceful fallback: without real credentials, forms log to console instead of saving to DB/sending emails.

## Brand Colors
- Gold: #D4A017, Gold Light: #F5C842
- Navy: #0a1628, Blue: #162544, Dark: #1a1a2e

## Development
- Dev server: `npx next dev --port 5000`
- Workflow: "Start application" on port 5000

## Known Issues
- None currently
