# Momtaz Host — Admin Dashboard Design Guide
## Clean Minimalist Style Reference

---

## DESIGN DIRECTION

**Aesthetic:** Clean, airy, card-based. Light background with soft pastel card accents.
Not dark mode. White/off-white base with color used intentionally only on data.

**Feeling:** Professional financial dashboard. Every number is readable at a glance.
Color is reserved for meaning — not decoration.

**Typography:**
- Display / headings: `Geist` or `DM Sans` — clean, modern, not sterile
- Numbers / data: `Geist Mono` or `JetBrains Mono` — makes amounts scannable
- Body: same as display, 14px, weight 400–500

**Spacing:** Generous. Cards breathe. 24px gaps. 20–24px internal padding.
Never cramped. White space is a feature.

---

## COLOR SYSTEM

```css
:root {
  /* Base */
  --bg:           #F7F8FA;   /* page background — very light grey */
  --surface:      #FFFFFF;   /* card background */
  --border:       #EAECF0;   /* card borders */
  --text-primary: #111827;   /* headings, key numbers */
  --text-secondary:#6B7280;  /* labels, subtitles */
  --text-muted:   #9CA3AF;   /* timestamps, minor info */

  /* Accent colors — pastel but purposeful */
  --blue:         #3B82F6;   /* primary actions, VPS */
  --blue-soft:    #EFF6FF;   /* blue card background */

  --green:        #10B981;   /* active, paid, healthy */
  --green-soft:   #ECFDF5;

  --amber:        #F59E0B;   /* pending, cash, warning */
  --amber-soft:   #FFFBEB;

  --red:          #EF4444;   /* overdue, urgent, error */
  --red-soft:     #FEF2F2;

  --purple:       #8B5CF6;   /* domains, quotations */
  --purple-soft:  #F5F3FF;

  --teal:         #14B8A6;   /* revenue chart fill */
  --teal-soft:    #F0FDFA;
}
```

**Rule:** Each service type has one color, used consistently everywhere:
```
VPS        → blue   (#3B82F6)
Dedicated  → amber  (#F59E0B)
Shared     → green  (#10B981)
Domains    → purple (#8B5CF6)
Revenue    → teal   (#14B8A6)
```

---

## LAYOUT GRID

```
Sidebar (240px fixed) | Main content (fluid)

Main content max-width: 1280px
Page padding: 32px
Card gap: 20px
```

### Sidebar
```
Width: 240px
Background: #FFFFFF
Border-right: 1px solid #EAECF0
Padding: 24px 16px

Logo at top (32px height)
Nav items: 40px height, 8px border-radius
Active item: background #EFF6FF, text #3B82F6, left border 2px solid #3B82F6
Hover: background #F9FAFB
Icon size: 18px, color matches text
```

### Top Header
```
Height: 64px
Background: #FFFFFF
Border-bottom: 1px solid #EAECF0
Contents: Page title (left) | Search + notifications + avatar (right)
Search bar: rounded-full, background #F3F4F6, no border
```

---

## PAGE SECTIONS (in order, top to bottom)

---

### SECTION 1 — KPI STAT CARDS
**Layout:** 4 cards in a row (grid-cols-4)
**Card style:** White background, 1px border #EAECF0, 16px border-radius, 20px padding

Each card contains:
```
┌─────────────────────────────┐
│  Icon (soft bg circle) [↗]  │  ← icon left, arrow-link top-right
│                             │
│  $8,240                     │  ← big number, mono font, 28px bold
│  Monthly Revenue            │  ← label, 13px, text-secondary
│                             │
│  ↑ 12% vs last month        │  ← delta badge: green if up, red if down
└─────────────────────────────┘
```

**Card accent colors (top-left colored strip OR icon bg):**
```
Revenue   → teal icon bg  (#F0FDFA), teal icon
Clients   → blue icon bg  (#EFF6FF), blue icon
Orders    → purple icon bg (#F5F3FF), purple icon
Tickets   → amber icon bg  (#FFFBEB), amber icon
```

**Delta badge:**
```
Up:   background #ECFDF5, text #059669, "↑ 12%"
Down: background #FEF2F2, text #DC2626, "↓ 3%"
```

---

### SECTION 2 — REVENUE CHART + SERVICE SPLIT
**Layout:** 2/3 + 1/3 (grid cols 8+4 or 2+1)

**Revenue Chart (left, larger):**
```
Card: white, same border/radius
Title: "Revenue Overview" — subtitle: "Monthly performance"
Time filter tabs: "7D | 1M | 3M | 1Y" — pill style, active = #111827 bg white shadow

Chart type: BAR CHART (like the reference image)
- Bars: rounded top (borderRadius: 6)
- Active/hovered bar: #14B8A6 (teal, solid)
- Inactive bars: #E5E7EB (light grey)
- No Y-axis line, no grid lines — only faint horizontal dashes
- X-axis: month names, 12px, #9CA3AF
- Tooltip: white card, shadow, shows month + $amount

Height: 220px
```

**Service Split (right, smaller):**
```
Card: white
Title: "Services" — subtitle: "Active breakdown"

Chart type: DONUT (thin ring, innerRadius 55, outerRadius 75)
Colors: blue/green/amber/purple (per service map above)
Center label: total count "133" + "Active"

Legend below chart:
  • VPS        38%   [blue dot]
  • Shared     27%   [green dot]
  • Dedicated  15%   [amber dot]
  • Domains    20%   [purple dot]
Each row: dot + name (left) + percentage bold (right)
```

---

### SECTION 3 — RECENT ORDERS TABLE
**Layout:** Full width card

```
Card header:
  Left: "Recent Orders" title + "Last 24 hours" subtitle
  Right: "View All" link (blue, no underline)

Table style:
  No outer borders on rows
  Light #F9FAFB header row
  Row hover: #F9FAFB background
  Row height: 52px
  Divider: 1px #F3F4F6 between rows

Columns:
  Order       | Client         | Type     | Amount   | Payment  | Status   | Date
  MH-2025-041 | Ahmad Karimi   | VPS      | $28.80   | Stripe   | Active   | Mar 1

  Order col: mono font, #6B7280
  Client col: avatar initials circle (32px) + name
  Type col: colored pill badge (blue=VPS, green=Shared, amber=Dedicated, purple=Domain)
  Amount col: mono font, bold, #111827
  Payment col: "💳 Stripe" or "💵 Cash" — small, muted
  Status col: pill badge (see Status Badges below)
  Date col: "Mar 1, 2025" — muted

Status Badges (pill shape, 6px radius):
  Active:          bg #ECFDF5  text #059669
  Pending Cash:    bg #FFFBEB  text #D97706
  Processing:      bg #EFF6FF  text #2563EB
  Suspended:       bg #FEF2F2  text #DC2626
  Cancelled:       bg #F3F4F6  text #6B7280
```

---

### SECTION 4 — INVOICE CALENDAR + OPEN TICKETS
**Layout:** 2/3 + 1/3

**Invoice Calendar (left):**
```
Card: white, same style

Header:
  Left: "Invoice Calendar" + "Upcoming due dates"
  Right: Month nav ← March 2025 →

Month summary strip (inside card, above calendar):
  Pill row: "March total: $892.40" | "11 due dates" | "1 overdue" (red)
  Background: #F9FAFB, border-radius 10px, padding 12px

Calendar grid (7 cols):
  Day headers: SUN MON TUE WED THU FRI SAT
    Font: 10px, uppercase, #9CA3AF, weight 600

  Day cells: 40px × 40px, centered
    Today: circular bg #111827, text white
    Normal: text #374151
    Empty (prev/next month): text #D1D5DB

  Event dots (below day number):
    Due invoice:    filled amber dot  ●  8px
    Overdue:        filled red dot    ●  8px
    Multiple:       show up to 3 dots, then "+N" in 9px muted

  Selected day:
    Circle outline #3B82F6
    Below calendar: slide-down panel showing invoice list for that day

  Invoice list panel (selected day):
    Each invoice row:
      Left:  service color dot + client name + invoice ID
      Right: amount (mono bold) + status badge
    Background: #F9FAFB, border-top 1px #EAECF0
```

**Open Tickets (right):**
```
Card: white

Header:
  "Support Tickets" + "Needs attention"
  Right: count badge (red pill with number)

Ticket cards (stacked, gap 8px):
  Each ticket:
    Background: #F9FAFB
    Border: 1px #EAECF0
    Border-radius: 10px
    Padding: 12px

    Row 1: Subject (14px, #111827 semibold) + Priority badge (right)
    Row 2: Client name · Ticket ID · ⏱ 1h ago (all muted, 12px)

Priority badges:
  Urgent: bg #FEF2F2  text #DC2626  border #FECACA
  High:   bg #FFF7ED  text #C2410C  border #FED7AA
  Medium: bg #FFFBEB  text #D97706  border #FDE68A
  Low:    bg #F9FAFB  text #6B7280  border #E5E7EB

Bottom: 3-column mini stats
  | Urgent: 1 | High: 2 | Medium: 3 |
  Each: center-aligned, number in color, label muted below
```

---

### SECTION 5 — INFRASTRUCTURE STATUS BAR
**Layout:** 4 equal cards (grid-cols-4)

```
Card style: white, same border/radius
Slightly more compact: 16px padding

Each card:
  Left: colored icon (18px) in soft circle (32px)
  Right: count (20px bold mono) + label (12px muted)

  Below: thin progress-style bar showing utilization %
    Bar: 4px height, border-radius 4px
    Fill color matches service color
    Background: #F3F4F6

Cards:
  🔵 VPS Servers       18 active  [blue bar at ~36% of max capacity]
  🟡 Dedicated          5 active  [amber bar]
  🟢 Shared Accounts   67 active  [green bar at ~67% of max capacity]
  🟣 Domains           43 active  [purple bar]

Hover: card lifts slightly (box-shadow transition)
```

---

### SECTION 6 — SERVER HEALTH (Collapsible / below fold)
**Layout:** Full-width card, table inside

```
Title: "Server Health" + Live green dot indicator

Table columns:
  Server Name | Type | CPU | RAM | Status | Action

CPU / RAM: shown as inline mini bar (100px wide, 6px tall) + percentage
  Green  < 60%
  Amber  60–80%
  Red    > 80%

Status pill:
  Healthy: green
  Warning: amber
  Critical: red

Action: "View" link → goes to Hetzner console
```

---

## INTERACTION PATTERNS

**Hover states:**
```
Cards:     box-shadow: 0 4px 16px rgba(0,0,0,0.06)  — subtle lift
Table rows: background #F9FAFB
Buttons:   darken 8% on hover
Nav items: background #F3F4F6
```

**Transitions:** all 150ms ease — fast, never sluggish

**Loading states:**
```
Use skeleton loaders — NOT spinners
Skeleton: background #F3F4F6, shimmer animation left→right
Match skeleton shape exactly to real content shape
```

**Empty states:**
```
Centered illustration (simple SVG) + message + CTA button
Never just a blank card
```

**Notifications bell:**
```
Badge: red pill with count
Dropdown: white card, shadow-lg, 320px wide
  Each notification: icon + message + time
  Types: new order (blue), cash approval needed (amber), ticket (red), payment (green)
```

---

## COMPONENT CHECKLIST (shadcn + custom)

```
From shadcn:
  ✓ Card, CardHeader, CardContent
  ✓ Badge
  ✓ Avatar
  ✓ Table, TableHeader, TableRow, TableCell
  ✓ Tabs (for chart time filters)
  ✓ Sheet (for day invoice detail slide-in)
  ✓ Separator
  ✓ Button
  ✓ Skeleton
  ✓ Tooltip

Custom (build these):
  ✓ KPICard          — stat card with icon, number, delta
  ✓ StatusBadge      — colored pill per order/ticket status
  ✓ ServiceBadge     — VPS/Shared/Dedicated/Domain colored pill
  ✓ InvoiceCalendar  — full calendar with event dots + day panel
  ✓ MiniBar          — inline CPU/RAM progress bar
  ✓ ServerHealthRow  — table row with mini bars
  ✓ TicketCard       — ticket summary card
  ✓ AdminSidebar     — nav with icons + active states
```

---

## CHART LIBRARY SETUP (Recharts)

```tsx
// Shared chart theme — import and reuse across all charts
export const chartTheme = {
  colors: {
    vps:       "#3B82F6",
    dedicated: "#F59E0B",
    shared:    "#10B981",
    domain:    "#8B5CF6",
    revenue:   "#14B8A6",
  },
  axis: {
    tick: { fontSize: 12, fill: "#9CA3AF" },
    line: false,
    tickLine: false,
  },
  grid: {
    strokeDasharray: "3 3",
    stroke: "#F3F4F6",
    vertical: false, // horizontal lines only
  },
  tooltip: {
    contentStyle: {
      background: "#FFFFFF",
      border: "1px solid #EAECF0",
      borderRadius: 10,
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      fontSize: 13,
    },
    cursor: { fill: "rgba(0,0,0,0.03)" },
  },
};

// Bar chart — rounded tops
<Bar dataKey="revenue" fill="#14B8A6" radius={[6,6,0,0]}/>

// Active bar highlight
<Bar dataKey="revenue"
  radius={[6,6,0,0]}
  fill="#E5E7EB"        // default grey
  activeBar={{ fill: "#14B8A6" }}  // teal on hover/active
/>
```

---

## CALENDAR IMPLEMENTATION NOTES

```tsx
// Build custom — do NOT use a calendar library
// Pure CSS grid — 7 columns, no external deps

// Key behaviors:
// 1. Click day with events → Sheet slides up from bottom (mobile)
//    OR inline panel expands below calendar row (desktop)
// 2. Dot colors: amber = due, red = overdue
// 3. Today: filled dark circle (like Google Calendar)
// 4. Days with no events: still show number, just no dots
// 5. Month summary always visible above grid

// Data shape expected from Finance API:
type InvoiceEvent = {
  invoiceId: string;
  clientName: string;
  amount: number;
  dueDate: string;    // "2025-03-07"
  serviceType: "vps" | "shared" | "dedicated" | "domain";
  status: "due" | "overdue";
};

// Group by date on the frontend:
const eventsByDate = invoices.reduce((acc, inv) => {
  const key = inv.dueDate;
  if (!acc[key]) acc[key] = [];
  acc[key].push(inv);
  return acc;
}, {} as Record<string, InvoiceEvent[]>);
```

---

## FONTS TO IMPORT (in layout.tsx)

```tsx
import { DM_Sans, DM_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
```

---

## FILE STRUCTURE FOR ADMIN DASHBOARD

```
app/admin/
├── layout.tsx               ← sidebar + header shell
├── page.tsx                 ← this dashboard overview
│
components/admin/
├── sidebar.tsx
├── header.tsx
├── kpi-card.tsx             ← Section 1 card
├── revenue-chart.tsx        ← Section 2 bar chart
├── service-donut.tsx        ← Section 2 donut
├── orders-table.tsx         ← Section 3
├── invoice-calendar.tsx     ← Section 4 calendar
├── tickets-panel.tsx        ← Section 4 tickets
├── infra-cards.tsx          ← Section 5
├── server-health.tsx        ← Section 6
│
└── shared/
    ├── status-badge.tsx
    ├── service-badge.tsx
    ├── mini-bar.tsx
    └── skeleton-card.tsx
```

---

## RESPONSIVE BEHAVIOR

```
Desktop (≥1280px): Full layout as described
Tablet  (768-1279px):
  - KPI cards: 2×2 grid
  - Revenue chart: full width, donut below
  - Calendar + tickets: stack vertically
  - Sidebar: icon-only (collapsed, 64px)

Mobile (<768px):
  - All sections stack full width
  - Sidebar: bottom tab bar (5 main items)
  - Calendar: compact, tap to see events in bottom sheet
```
