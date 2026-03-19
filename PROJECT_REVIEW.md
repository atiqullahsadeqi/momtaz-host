# Momtaz Host - Project Review

## Overview
**Momtaz Host** is a premium hosting and domain service platform built with a focus on high-fidelity UI/UX, smooth animations, and robust domain management integration.

## 🛠 Technology Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4, Radix UI, Shadcn UI
- **Animations**: GSAP (GreenSock Animation Platform), Lenis (Smooth Scroll), Framer Motion
- **3D/Graphics**: Three.js, OGL, Spline
- **API Integration**: Domain Name API (via `nodejs-dna`), Axios
- **Verification**: Playwright (Visual QA)

## 🏗 Architecture
The project follows a modern Next.js App Router structure with logical separation via **Layout Groups**:
- **`(main)`**: Public pages with standard Header and Footer (Homepage, Domains, Hosting, etc.).
- **`(auth)`**: Clean layout for Login and Signup pages.
- **`(dashboard)`**: Custom layout for user management (no main header/footer).

## 🔑 Key Features
1. **Domain Management**: 
   - Real-time availability checks and pricing via **Domain Name API** (migrated from ResellerClub).
   - Support for numerous TLDs with dynamic pricing updates.
2. **Hosting & Server Management**: 
   - **VPS Management**: Integration with **Hetzner Cloud API** for server types, images, and datacenter management.
   - **Dedicated Servers**: Integration with **Hetzner Robot API** for dedicated server ordering and management.
   - **Pricing Logic**: Automated EUR→USD conversion with a built-in 20% markup for all server products.
   - Structured hosting plans (Web, Database, Mobile Development).
3. **Advanced UI**: 
   - Smooth scrolling and complex entrance animations (GSAP/Lenis).
   - 3D integrated components (Spline/Three.js).
   - Responsive-first design with strict visual QA standards.
4. **Google Workspace**: Specialized landing page and integration for workspace services.
5. **Blog**: Content-rich blog section (likely connected to Strapi CMS in production).

## 🚀 Current Status & Recent Updates
- **API Migration**: Successfully migrated the core domain search and pricing functionality from ResellerClub to **Domain Name API**. This included creating a new client library and test routes.
- **Layout Optimization**: Implemented the layout group structure to cleanly manage different UI requirements for auth, dashboard, and public pages.
- **Mobile Experience**: Enhanced the mobile menu and responsive behavior across all core pages.
- **Visual Stability**: Established a "Global Agent" protocol ensuring < 2% visual variance across breakpoints.

## 🎨 AI Brand Rules
- A universal agent rule file (`.cursorrules` & `.windsurfrules`) has been implemented to enforce:
  1. Strict usage of **Shadcn UI** components.
  2. Strict usage of semantic **Tailwind classes** mapped from `globals.css` (e.g., `bg-background`, `text-primary`). No hardcoded Tailwind colors are permitted.


## 📁 Repository Structure
- `src/app`: Routes and Layouts (organized by groups).
- `src/components`: UI primitives (shadcn) and complex layout components.
- `src/lib`: API clients (DNA, ResellerClub) and utility functions.
- `public`: Static assets, including 3D models and branding.
