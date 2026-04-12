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

## Database Tables (Supabase)
- `kef_exhibitors` - Exhibitor registrations
- `kef_visitors` - Visitor registrations
- `kef_contacts` - Contact form submissions

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (set in .env.local)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (set in .env.local)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (Replit Secret)
- `RESEND_API_KEY` - Resend API key for emails (pending real key)

The app has graceful fallback: without real credentials, forms log to console instead of saving to DB/sending emails.
API routes use bilingual emails (ES/EN based on locale parameter).

## Brand Colors
- Gold: #D4A017, Gold Light: #F5C842
- Navy: #0a1628, Blue: #162544, Dark: #1a1a2e

## Development
- Dev server: `npx next dev --port 5000`
- Workflow: "Start application" on port 5000

## Deployment
- Target: Autoscale
- Build: `npm run build`
- Run: `npm run start`
- shadcn/ui components chart.tsx and resizable.tsx have @ts-nocheck due to type incompatibilities with latest package versions (neither is used in the app)

## Known Issues
- None currently
