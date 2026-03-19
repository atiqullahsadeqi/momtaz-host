# Momtaz Host — Project Overview

## About
Momtaz Host is a hosting provider company based in Afghanistan (domain: momtaz.ws). The website serves as the company's public-facing platform and internal management system. Services include web hosting (shared, VPS, dedicated, Windows Server, cloud), domain registration, Google Workspace reselling, web development, mobile app development, database development, SEO, and branding.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, React 19, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, tw-animate-css
- **UI Library**: shadcn/ui (new-york style, RSC enabled, Lucide icons)
- **Component Registries**: ReactBits, Aceternity UI, shadcnblocks
- **Animation**: GSAP, Motion (Framer Motion), Lenis (smooth scroll)
- **3D**: Three.js, React Three Fiber, React Three Drei, Spline
- **Auth**: better-auth (email/password, email verification, role-based)
- **Database**: PostgreSQL (via `pg` pool)
- **Payments**: Stripe (checkout + webhooks)
- **Email**: Resend + React Email templates
- **Font**: Exo (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Exo font, SmoothScroll, Toaster)
│   ├── globals.css             # Theme variables (brand blue/purple/green)
│   ├── (main)/                 # Public website (Header + Footer layout)
│   │   ├── page.tsx            # Homepage
│   │   ├── domains/            # Domain search & registration
│   │   ├── hosting/
│   │   │   ├── shared/         # Shared hosting plans (cPanel/WHM)
│   │   │   ├── vps/            # VPS hosting (Hetzner Cloud)
│   │   │   ├── dedicated/      # Dedicated servers (Hetzner Robot)
│   │   │   ├── windows-server/ # Windows Server hosting
│   │   │   └── cloud/          # Cloud hosting (placeholder)
│   │   ├── google-workspace/   # Google Workspace plans
│   │   ├── web-development/    # Web dev service page
│   │   ├── mobile-development/ # Mobile dev service page
│   │   ├── database-development/ # DB dev service page
│   │   ├── seo-services/       # SEO (placeholder)
│   │   ├── branding/           # Branding (placeholder)
│   │   ├── contact/            # Contact page
│   │   ├── blogs/              # Blog listing + [slug] detail
│   │   ├── about/              # About (placeholder)
│   │   └── faq/                # FAQ (placeholder)
│   ├── (auth)/                 # Auth pages (login, signup, forgot/reset password, admin login)
│   ├── (dashboard)/            # Client dashboard (sidebar layout)
│   │   └── dashboard/
│   │       ├── page.tsx        # Overview (servers, domains, uptime)
│   │       └── orders/         # Client order management
│   ├── admin/                  # Admin portal
│   │   └── (dashboard)/
│   │       ├── page.tsx        # Admin dashboard (revenue charts, orders, tickets)
│   │       ├── orders/         # Order management
│   │       ├── clients/        # Client management
│   │       ├── domains/        # Domain management
│   │       ├── hosting/        # Hosting management
│   │       ├── invoices/       # Invoice management
│   │       ├── quotations/     # Quotation management
│   │       ├── support/        # Support ticket management
│   │       ├── staff/          # Staff management
│   │       └── settings/       # Admin settings
│   ├── checkout/               # Stripe checkout flow
│   └── api/                    # API routes (see API_ROUTES.md)
├── components/
│   ├── layout/                 # Header, Footer
│   ├── homepage/               # Homepage sections (hero, services, pricing, etc.)
│   ├── services/               # Service page shared components
│   ├── checkout/               # Checkout form + order summary
│   ├── webdevpage/             # Web dev page specific components
│   ├── ui/                     # shadcn/ui components
│   └── [animation components]  # Beams, Orb, RippleGrid, GridDistortion, etc.
├── lib/                        # Business logic & API clients
├── hooks/                      # Custom hooks (use-mobile)
└── emails/                     # React Email templates (verification, reset-password)
```

## Brand Colors
- **Primary (60%)**: `#4267b2` — Brand Blue (buttons, links, nav)
- **Secondary (30%)**: `#5c3e96` — Brand Purple (gradients, headings)
- **Accent (10%)**: `#00c897` — Brand Green (icons, badges, highlights)

## Contact Info
- Phone: +93 77 44 99 000, +93 70 44 99 000, +93 70 41 99 000
- WhatsApp: +93 799 555 440
- Email: info@momtaz.ws
- Sender email: no-reply@mail.momtaz.ws
