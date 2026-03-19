# API Routes

## Authentication
| Route | Method | Description |
|---|---|---|
| `/api/auth/[...better-auth]` | ALL | better-auth catch-all handler (login, signup, session, verify email, reset password) |
| `/api/admin/verify` | POST | Admin role verification |

## Domains
| Route | Method | Description |
|---|---|---|
| `/api/domains/check` | GET/POST | Check domain availability (ResellerClub API) |
| `/api/domains/pricing` | GET | Get pricing for specific TLDs |
| `/api/domains/all-pricing` | GET | Get all TLD pricing (cached 2h) |
| `/api/domains/tlds` | GET | List available TLDs |
| `/api/domains/tlds-detailed` | GET | Detailed TLD info with pricing |
| `/api/domains/cache-status` | GET | Domain pricing cache status |

## Hosting
| Route | Method | Description |
|---|---|---|
| `/api/hosting/packages` | GET | Shared hosting packages from WHM/cPanel |
| `/api/hetzner/server-types` | GET | VPS server types from Hetzner Cloud API |
| `/api/hetzner/config-options` | GET | VPS configuration options |
| `/api/hetzner/dedicated-servers` | GET | Dedicated server listings from Hetzner Robot |
| `/api/hetzner/dedicated-servers/[slug]` | GET | Single dedicated server details |
| `/api/hetzner/dedicated-servers/[slug]/config` | GET | Dedicated server config options |
| `/api/hetzner/dedicated-servers/order` | POST | Place dedicated server order |

## Orders & Payments
| Route | Method | Description |
|---|---|---|
| `/api/orders` | GET/POST | List/create orders (authenticated) |
| `/api/orders/[orderId]` | GET/PATCH | Get/update specific order |
| `/api/admin/orders` | GET | Admin: list all orders |
| `/api/payments/create-intent` | POST | Create Stripe PaymentIntent |
| `/api/webhooks/stripe` | POST | Stripe webhook handler (payment confirmation, provisioning trigger) |
