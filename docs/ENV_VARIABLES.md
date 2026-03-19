# Environment Variables

All variables are defined in `.env.local`.

| Variable | Purpose | Used In |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | auth.ts, provisioning.ts |
| `NEXT_PUBLIC_APP_URL` | Public app URL (client-side) | auth-client.ts |
| `BETTER_AUTH_SECRET` | Auth session signing secret | better-auth |
| `BETTER_AUTH_URL` | Auth server URL | better-auth |
| `RESEND_API_KEY` | Resend email service key | auth.ts (email sending) |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable key (client) | checkout components |
| `STRIPE_SECRET_KEY` | Stripe secret key (server) | payment API routes |
| `HETZNER_API_TOKEN` | Hetzner Cloud API token | VPS API routes |
| `HETZNER_CLOUD_VPS_ENDPOINT` | Hetzner Cloud base URL | VPS API routes |
| `HETZNER_DEDICATED_SERVER_USERNAME` | Hetzner Robot username | Dedicated server routes |
| `HETZNER_DEDICATED_SERVER_PASSWORD` | Hetzner Robot password | Dedicated server routes |
| `HETZNER_DEDICATED_SERVER_ENDPOINT` | Hetzner Robot base URL | Dedicated server routes |
| `SHARED_SERVER_WHM_API_KEY` | WHM/cPanel API key | whm.ts |
| `SHARED_SERVER_WHM_HOSTNAME` | WHM server hostname:port | whm.ts |
| `RESELLERCLUB_AUTH_USERID` | ResellerClub user ID | resellerclub.ts |
| `RESELLERCLUB_API_KEY` | ResellerClub API key | resellerclub.ts |
| `RESELLERCLUB_TEST_MODE` | Use ResellerClub test API | resellerclub.ts |
| `DOMAIN_NAME_API_USERNAME` | DomainNameAPI username | domainnameapi.ts |
| `DOMAIN_NAME_API_PASSWORD` | DomainNameAPI password | domainnameapi.ts |
| `DOMAIN_NAME_API_TEST_MODE` | Use DomainNameAPI test mode | domainnameapi.ts |
| `SERVER_PROVISIONING_TEST_MODE` | Mock server provisioning | provisioning.ts |
| `NEXT_PUBLIC_STRAPI_URL` | Strapi CMS URL (unused currently) | — |
