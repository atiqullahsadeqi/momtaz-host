1. Project Context

Product: Momtaz Host — Hosting & Web Services
Goal: Professional marketing website + scalable structure (future client area) similar to Hostinger.
Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui (latest, via MCP), Framer Motion (subtle animation).
Brand: Tech-forward, trustworthy, performant. Primary theme managed via globals.css.

Guiding Rules

Use shadcn/ui components first. Only fallback to raw Tailwind if no suitable component exists.

Reference demo components before adding new ones (ensures correct usage).

Accessibility-first (semantic HTML, aria labels, focus states).

Responsive-first (mobile → desktop).

Consistent spacing, typography, states across sections.

Always update PROJECT_STATUS.md after completing new UI parts.

2. Global Design System
   2.1 Theme & Tokens

All colors and surfaces are handled through shadcn theme variables in globals.css.

Primary: bg-primary, text-primary-foreground

Secondary: bg-secondary, text-secondary-foreground

Foreground: text-foreground

Muted Foreground: text-muted-foreground

Background: bg-background, text-foreground

Card: bg-card, text-card-foreground

Border: border-border

Destructive (errors): bg-destructive, text-destructive-foreground

This ensures the entire site can be rebranded simply by changing variables in globals.css.

2.2 Typography

Headings: bold, high-impact, use text-foreground for maximum contrast.

Body: normal weight, text-muted-foreground for secondary copy.

Max line length: ~65–75ch for readability.

2.3 Layout & Spacing

App shell: Header (sticky), Main, Footer.

Responsive container widths via Tailwind container utilities.

Vertical rhythm: py-16–py-24 between sections.

Rounded corners: use shadcn defaults (rounded-lg / rounded-xl).

Shadows: subtle elevation on CTAs/pricing cards.

3. Component Library (shadcn-first)

Always check shadcn demos (via MCP) before integrating.

Need Primary shadcn Component(s) Notes
Buttons & CTAs Button Variants: primary, secondary, outline, ghost
Cards & Surfaces Card Pricing, features, plan highlights
Navigation NavigationMenu, DropdownMenu Mega or simple dropdown menus
Forms Form, Input, Label, Select, Textarea, Checkbox, RadioGroup For search, contact, auth
Tabs/Accordions Tabs, Accordion Pricing toggle, FAQ
Badges Badge “Best Value”, “New”, uptime %
Toasts Toast Feedback for form actions
Dialog/Sheet Dialog, Sheet Mobile nav, inline plan details
Separator Separator Subsection dividers
Skeleton Skeleton Loading states
Avatar Avatar Testimonials/social proof
Tooltip Tooltip Feature info
Table Table Future: pricing comparison
Breadcrumbs Custom If deeper pages added later 4) Global Building Blocks
Header (✅ Completed)

Logo left, nav center, login/signup right.

Dropdowns for Hosting & Services.

Mobile nav via Sheet.

States: active link, hover, focus-visible rings.

Theme colors: bg-background, text-foreground, active text-primary.

Footer (✅ Completed)

Columns: Company, Services, Hosting, Support, Contact.

Bottom bar: copyright.

Theme colors: bg-background, text-muted-foreground.

5. Homepage

Sections (in order):

Hero (✅)

Left: badge, headline, copy, CTAs (Button with bg-primary).

Right: image/illustration.

Social proof with Avatar.

Theme colors: bg-background, CTAs bg-primary.

Features (✅)

Cards with icon + title + description.

Use Card, Badge.

Theme: bg-card, text-card-foreground.

Domain Search Bar (🔄)

Input + Search Button.

Skeleton while loading, toast on error.

TLD chips using Badge.

Hosting Pricing Cards (🔄)

Plans with toggle (Tabs or custom).

“Best Value” with Badge.

CTA buttons bg-primary.

Why Choose Us (🔄)

Feature list grid.

Use Card, Separator.

Testimonials (🔄)

Cards with Avatar + quote.

Theme: bg-card, text-card-foreground.

Enhanced CTA (🔄)

Final headline + CTA.

Background: bg-primary; text: text-primary-foreground.

6. Service Pages

Each service/hosting page follows the same rules:

Hero (bg-background, headline text-foreground).

Pricing or feature cards (Card with bg-card).

CTA buttons (bg-primary).

Accordions for FAQ.

Examples:

VPS/Shared/Cloud/Windows → pricing grids with toggle.

Domains → extended domain search with .af content.

SEO/Branding → service cards + CTA.

7. Support & Company Pages

About: Mission, stats, optional team (Avatar).

Contact: Form (inputs + textarea), success Toast.

FAQ: Accordion grouped by category.

8. Auth & Dashboard

Login/Signup: Form with validation, CTA Button.

Dashboard (future): Layout with sidebar, cards for services.

9. Patterns, States & Accessibility

All forms have labels + error states.

Loading: Skeleton.

Success/error: Toast.

Focus-visible outlines everywhere.

Semantic headings & ARIA attributes used.

10. Navigation & Routing

Routes already created.

Active nav links styled with text-primary.

Mobile nav uses Sheet.

11. Content Strategy

Copy must be concise, benefits-first.

Use local trust signals (.af domain expertise).

Short, scannable paragraphs.

12. QA / Acceptance Criteria

Consistency: Only theme tokens used (bg-primary, text-foreground).

Responsiveness: Works from 360px → 1440px+.

Accessibility: Contrast AA+, keyboard operable.

Performance: Optimized images with next/image.

13. MCP & Cursor Rules

Use shadcn components first.

Check demo usage before integration.

Use theme tokens, never hardcoded Tailwind colors.

✅ bg-primary

❌ bg-blue-600

Place reusable UI in /src/components/ui.

Update PROJECT_STATUS.md after finishing tasks.

Stick to TypeScript with explicit props.

14. Near-Term Tasks

Domain Search Bar

Hosting Pricing Cards

Why Choose Us

Testimonials

Enhanced CTA

15. Future Enhancements

Comparison tables

Blog

Dark mode via theme toggle

Dashboard with real client data
