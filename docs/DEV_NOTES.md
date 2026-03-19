# Development Notes & Conventions

## Getting Started
```bash
npm install
npm run dev        # Starts Next.js dev server with Turbopack
```
Requires: Node.js, PostgreSQL running with `DATABASE_URL` configured.

## Key Conventions
- **Route Groups**: `(main)` for public site, `(auth)` for auth pages, `(dashboard)` for client area
- **Path Alias**: `@/*` maps to `./src/*`
- **shadcn/ui**: new-york style, CSS variables enabled, base color slate
- **Styling**: Tailwind v4 with CSS custom properties for theming (oklch color space)
- **Components**: PascalCase files for custom components, kebab-case for shadcn/ui

## Server vs Client
- Pages under `(main)/` are mostly `"use client"` (heavy animations, interactivity)
- API routes are server-side only
- `lib/` files (auth, whm, resellerclub, etc.) are server-only modules
- `nodejs-dna` and `strong-soap` are excluded from client bundles via `next.config.ts`

## Provisioning System
- `src/lib/provisioning.ts` handles post-payment server setup
- Currently in **test mode** (`SERVER_PROVISIONING_TEST_MODE=true`) — generates mock IPs/passwords
- Production Hetzner provisioning logic is placeholder (TODO)
- Triggered by Stripe webhook on successful payment

## Caching
- `src/lib/cache.ts` — Simple in-memory TTL cache (Map-based)
- Used for domain pricing (2-hour TTL)
- Resets on server restart

## Blog System
- Static data in `src/lib/blog-data.ts` (3 posts)
- No CMS integration yet (`NEXT_PUBLIC_STRAPI_URL` env exists but unused)
- Categories: Software Development, Web Performance, Hosting

## Admin Dashboard
- Uses inline styles (not Tailwind) — different design system from public site
- Has its own layout with custom header and sidebar
- Mock data for charts, orders, tickets (not connected to real DB queries yet)

## Known TODOs
1. Production server provisioning (Hetzner API calls)
2. Blog CMS integration (Strapi or similar)
3. Placeholder pages: About, FAQ, Cloud Hosting
4. Connect admin dashboard to real database queries
5. User profile/settings in client dashboard
6. Preloader re-enable decision
7. Dark mode support (CSS variables defined but not toggled)
8. PayPal integration (currently placeholder)
9. Stripe webhook setup for production (replace redirect-based confirm flow)
10. **Database schema refactor** — see `DATABASE_ROADMAP.md`

## Domain Registration Notes
- DNA API test mode: `DOMAIN_NAME_API_TEST_MODE` in `.env.local` (set to `false` for real registrations)
- Provisioning test mode: `SERVER_PROVISIONING_TEST_MODE` in `.env.local`
- DB constraint must include `'domain'` in `orders_order_type_check` — already applied
- Price flows from DNA API → domains page → URL param `?price=X` → register page → `setup_fee` in order
- If price missing from URL, register page re-fetches via `/api/domains/check`
