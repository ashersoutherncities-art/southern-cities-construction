# Southern Cities Construction

Professional website for Southern Cities Construction - Licensed General Contractor in Charlotte, NC.

## 🏗️ Features

- **Premium Design:** Navy + Gold + White brand colors
- **Responsive:** Mobile-first, fully responsive layout
- **Scroll Animations:** Smooth animations on scroll
- **Client Tools Integration:** Links to all existing portals
- **Contact Form:** Google Places address autosuggest
- **Supabase-backed workflows:** Server routes and internal operations tooling

## 🚀 Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
```

## 🚢 Deploy

This app now requires a server-capable Next.js deployment because the marketing platform, order flows, and tracked redirects write to Supabase.

Recommended targets: Vercel, Netlify with Next runtime, or any Node host that can run `next start`.

## 📈 Marketing asset platform MVP

This repo now includes an internal marketing asset management MVP at:

- `/portal/marketing-assets?key=YOUR_MARKETING_PORTAL_ACCESS_KEY`
- tracked redirect links at `/go/[slug]`

Required env for the MVP:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MARKETING_PORTAL_ACCESS_KEY`
- optional: `NEXT_PUBLIC_SITE_URL`

Required env for Rehab Budget Range & Execution Risk Snapshot:

- `REHAB_SNAPSHOT_ADMIN_KEY` (or reuse `MARKETING_PORTAL_ACCESS_KEY`)
- one email provider: `RESEND_API_KEY` or `SENDGRID_API_KEY`
- `REHAB_SNAPSHOT_FROM_EMAIL`
- optional CRM hooks: `GHL_API_TOKEN`, `GHL_LOCATION_ID`, `GHL_REHAB_SNAPSHOT_WEBHOOK_URL`

Required database setup:

1. Apply the existing SQL files in `supabase/README.md`
2. Apply `supabase/marketing_assets.sql`
3. Apply `supabase/rehab_budget_snapshots.sql` for the new investor lead-magnet pipeline

The marketing portal syncs infrastructure-owned pages, logos, and core CTAs from `lib/marketing-registry.ts` into Supabase so website changes can refresh the database source of truth.

## 📄 License Information

- **GC License:** L.107724 (Myriad Investments LLC)
- **Qualifier:** Q.108200
- **Location:** Charlotte, NC

## 📞 Contact

- **Phone:** (704) 299-2742
- **Email:** construction@developthesouth.com

---

© 2026 Southern Cities Construction. A Division of Southern Cities Enterprises.
