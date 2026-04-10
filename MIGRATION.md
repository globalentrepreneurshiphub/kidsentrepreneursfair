# Kids Entrepreneurs Fair — Migration Guide

## Architecture Overview

This is the standalone version of the Kids Entrepreneurs Fair website, cleaned from the GEH monorepo. It runs as an independent Next.js 15 app with:

- **Next.js 15** (App Router) with SSR
- **next-intl** for i18n (Spanish/English)
- **Tailwind CSS v4** with PostCSS
- **React Hook Form + Zod** for form validation
- **Supabase** for database (registration + contact forms)
- **Resend** for transactional emails

### URL Structure (no prefix, served from root)

```
/              → redirects to /es (default locale)
/es            → Global landing page (Spanish)
/en            → Global landing page (English)
/es/colombia   → Country page
/en/colombia   → Country page
/es/colombia/bogota → City page with registration forms
/en/colombia/bogota → City page with registration forms
/api/register/exhibitor  → POST exhibitor registration
/api/register/visitor    → POST visitor registration
/api/contact             → POST contact form
/api/healthz             → GET health check
```

---

## Step 1: Create New Replit Workspace

1. Go to [replit.com](https://replit.com) and click **Create Repl**
2. Choose **Node.js** template
3. Name it: `kidsentrepreneursfair-web`
4. Click **Create Repl**

## Step 2: Copy Files to the New Workspace

Option A — Upload via Replit UI:
1. In the new workspace, delete any default files (index.js, etc.)
2. Drag and drop the entire contents of this `kids-fair-workspace/` folder into the Replit file tree

Option B — Via GitHub (recommended):
1. Create a new GitHub repo: `kidsentrepreneursfair-web`
2. Clone it locally, copy all files from this folder into it
3. Push to GitHub
4. In Replit, connect the workspace to the GitHub repo

## Step 3: Install Dependencies

In the Replit Shell, run:

```bash
npm install
```

## Step 4: Configure Environment Variables

In the Replit **Secrets** tab (lock icon in the sidebar), add the following:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | For forms to save to DB |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | For forms to save to DB |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | For server-side DB writes |
| `RESEND_API_KEY` | Resend API key for emails | For confirmation emails |

**Note:** The app works without these variables — forms will log submissions to the console instead of saving to a database. You can add them later.

## Step 5: Set Up Supabase Tables

In your Supabase dashboard, run this SQL to create the tables:

```sql
CREATE TABLE exhibitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  business_name TEXT NOT NULL,
  business_description TEXT NOT NULL,
  business_category TEXT NOT NULL,
  video_url TEXT,
  image_auth BOOLEAN DEFAULT false,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  image_auth BOOLEAN DEFAULT false,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Step 6: Test Locally

Run the dev server:

```bash
npm run dev
```

Verify these routes work:
- `/es` — Spanish landing page
- `/en` — English landing page
- `/es/colombia` — Colombia country page
- `/es/colombia/bogota` — Bogota city page with forms
- `/api/healthz` — Returns `{"status":"ok"}`

## Step 7: Configure Deployment

In the Replit `.replit` file, set the run command:

```
run = "npm run build && npm run start"
```

Or use Replit's deployment settings:
- **Build command:** `npm run build`
- **Run command:** `npm run start`
- **Deployment type:** Autoscale (recommended for Next.js with SSR)

## Step 8: Publish

1. Click the **Publish** button in Replit
2. Choose **Autoscale** deployment
3. This gives you a URL like `kidsentrepreneursfair-web.replit.app`

## Step 9: Connect Custom Domain

1. In Replit's deployment settings, go to **Custom Domain**
2. Enter `kidsentrepreneursfair.com`
3. Replit will give you DNS records to configure
4. In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - Add a **CNAME** record pointing to the Replit-provided value
   - Or configure an **A** record if required
5. Wait for DNS propagation (up to 48 hours, usually minutes)
6. Replit automatically provisions an SSL certificate

### Optional: www redirect

Also add a CNAME for `www.kidsentrepreneursfair.com` pointing to the same Replit value. Replit handles the redirect to the apex domain automatically.

---

## GitHub Setup (Optional but Recommended)

### Create the repository

```bash
# In your local machine
git init kidsentrepreneursfair-web
cd kidsentrepreneursfair-web

# Copy all files from this export folder
cp -r /path/to/export/kids-fair-workspace/* .
cp /path/to/export/kids-fair-workspace/.gitignore .
cp /path/to/export/kids-fair-workspace/.env.example .

git add .
git commit -m "Initial commit: Kids Entrepreneurs Fair website"

# Create repo on GitHub, then:
git remote add origin git@github.com:YOUR_ORG/kidsentrepreneursfair-web.git
git push -u origin main
```

### Connect Replit to GitHub

1. In the new Replit workspace, click **Version Control** (Git icon in sidebar)
2. Click **Connect to GitHub**
3. Select the `kidsentrepreneursfair-web` repository
4. Replit will sync with the repo automatically

---

## File Structure

```
kids-fair-workspace/
├── messages/
│   ├── en.json              # English translations (all content)
│   └── es.json              # Spanish translations (all content)
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + brand tokens
│   │   ├── api/
│   │   │   ├── healthz/route.ts
│   │   │   ├── contact/route.ts
│   │   │   └── register/
│   │   │       ├── exhibitor/route.ts
│   │   │       └── visitor/route.ts
│   │   └── [locale]/
│   │       ├── layout.tsx    # Root layout with fonts + i18n
│   │       ├── page.tsx      # Global landing page (11 sections)
│   │       └── [country]/
│   │           ├── page.tsx  # Country page (Colombia)
│   │           └── [city]/
│   │               └── page.tsx  # City page (Bogota)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── registration/
│   │   │   └── RegistrationTabs.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/
│   ├── i18n/
│   │   ├── request.ts       # next-intl server config
│   │   └── routing.ts       # Locale routing config
│   └── lib/
│       ├── supabase.ts       # Supabase client helpers
│       └── utils.ts          # cn() utility
├── .env.example
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Brand Reference

| Token | Value |
|-------|-------|
| Gold | #D4A017 |
| Gold Light | #F5C842 |
| Navy | #0a1628 |
| Blue | #162544 |
| Dark | #1a1a2e |
| Heading Font | Baloo 2 |
| Body Font | Quicksand |
