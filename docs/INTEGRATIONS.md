# Third-Party Integrations

## 1. Hetzner (VPS & Dedicated Servers)
- **Cloud API** (`api.hetzner.cloud/v1/`) — VPS server types, creation, management
- **Robot API** (`robot-ws.your-server.de/`) — Dedicated server marketplace, ordering, configuration
- Auth: API token (Cloud), Basic auth (Robot)
- Env: `HETZNER_API_TOKEN`, `HETZNER_CLOUD_VPS_ENDPOINT`, `HETZNER_DEDICATED_SERVER_USERNAME`, `HETZNER_DEDICATED_SERVER_PASSWORD`, `HETZNER_DEDICATED_SERVER_ENDPOINT`

## 2. WHM/cPanel (Shared Hosting)
- Client: `src/lib/whm.ts` — WHMClient class
- Fetches hosting packages, formats features (storage, databases, email accounts, websites)
- Connects to: `cloudf.momtaz.ws:2087`
- Env: `SHARED_SERVER_WHM_API_KEY`, `SHARED_SERVER_WHM_HOSTNAME`

## 3. ResellerClub (Domain Registration — Primary)
- Client: `src/lib/resellerclub.ts` — ResellerClubAPI class
- Domain availability check, TLD pricing (all TLDs), cache management
- Has fallback pricing if API fails
- Includes fixed `.af` domain pricing ($30)
- Caching: In-memory SimpleCache, 2-hour TTL
- Env: `RESELLERCLUB_AUTH_USERID`, `RESELLERCLUB_API_KEY`, `RESELLERCLUB_TEST_MODE`

## 4. DomainNameAPI (Domain Registration — Secondary)
- Client: `src/lib/domainnameapi.ts` — DomainNameAPIClient class
- Uses `nodejs-dna` npm package
- Domain availability, pricing, TLD listing
- Env: `DOMAIN_NAME_API_USERNAME`, `DOMAIN_NAME_API_PASSWORD`, `DOMAIN_NAME_API_TEST_MODE`

## 5. Stripe (Payments)
- Checkout flow with PaymentIntent
- Webhook at `/api/webhooks/stripe` triggers order provisioning on success
- Env: `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`

## 6. Resend (Transactional Email)
- Sends verification and password reset emails
- From address: `Momtaz Host <no-reply@mail.momtaz.ws>`
- Templates in `src/emails/` (React Email components)
- Env: `RESEND_API_KEY`

## 7. better-auth (Authentication)
- Config: `src/lib/auth.ts`
- PostgreSQL database backend
- Email/password with required email verification
- Custom user fields: `phoneNumber`, `organization`, `role`
- Trusted origins: localhost:3000, momtaz.ws, admin.momtaz.ws
- Env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`

## 8. Google Workspace
- Reseller partnership — plans displayed on `/google-workspace` page
- Plans: Business Starter ($6), Business Standard, Business Plus, Enterprise
- No API integration yet — static pricing page
