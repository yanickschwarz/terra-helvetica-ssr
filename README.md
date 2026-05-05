# Terra Helvetica Anlagestiftung — SSR

Next.js 15 (App Router) Server-Side Rendered version of the Terra Helvetica Anlagestiftung website.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS + shadcn/ui (Radix Primitives)
- **Animation:** framer-motion + Lenis (smooth scroll)
- **Backend:** Supabase (Auth, Database, Storage, Edge Functions)
- **Deployment:** Vercel

## Architecture

```
src/app/
├── layout.tsx                    # Root layout (providers, metadata)
├── (public)/                     # Public route group with Header/Footer
│   ├── layout.tsx                # Header + Footer + Lenis
│   ├── page.tsx                  # Home (SSR + ISR)
│   ├── anlagegruppe/page.tsx
│   ├── ueber-uns/page.tsx
│   ├── portfolio/page.tsx
│   ├── dokumente/page.tsx
│   ├── kontakt/page.tsx
│   ├── news/page.tsx
│   ├── news/[id]/page.tsx        # SSG with generateStaticParams + generateMetadata
│   ├── impressum/page.tsx
│   └── datenschutz/page.tsx
├── admin/
│   ├── page.tsx                  # Login (public)
│   └── (protected)/
│       ├── layout.tsx            # AdminGuard + AdminLayout sidebar
│       ├── dashboard/page.tsx
│       ├── portfolio/page.tsx
│       ├── team/page.tsx
│       ├── documents/page.tsx
│       ├── news/page.tsx
│       └── newsletter/page.tsx
├── actions/
│   └── newsletter.ts             # Server Action for newsletter signup
├── sitemap.ts                    # Dynamic sitemap from Supabase
├── robots.ts                     # robots.txt
└── not-found.tsx                 # 404 page

src/lib/supabase/
├── server.ts                     # Server Components (cookies-based)
├── client.ts                     # Client Components (browser)
├── middleware.ts                 # Session refresh in middleware
└── static.ts                     # Build-time client (no cookies)

src/middleware.ts                 # Auth middleware: protects /admin/*
```

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ahlgamswoyeeimkvpuoz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<key>
```

## Development

```bash
npm install
npm run dev
```

## Deployment

Auto-deploys to Vercel on `git push` to `main`.

## Rendering Strategy

| Route | Strategy | Notes |
|---|---|---|
| `/` | SSR + ISR (60s) | News loaded server-side |
| `/news/[id]` | SSG + ISR (60s) | Pre-rendered at build, revalidated every 60s |
| `/news` | CSR | Pagination client-side |
| Other public | Static | Server-rendered HTML |
| `/admin/*` | CSR | Auth-gated client components |

## Migration Notes (from React+Vite SPA)

- Replaced `react-router-dom` with `next/link` + `next/navigation`
- Migrated client-side `useQuery` data fetching to Server Components where possible
- Moved newsletter signup from client-side Supabase insert to **Server Action**
- Replaced `localStorage` Supabase auth with cookie-based `@supabase/ssr`
- Auth middleware (`src/middleware.ts`) protects all `/admin/*` routes server-side
