# Momtaz Host — Complete Platform Guide
## Real-World Implementation Reference

---

## 1. PROJECT ARCHITECTURE OVERVIEW

```
momtaz-host/
├── app/
│   ├── (marketing)/               # Public pages (layout with navbar/footer)
│   │   ├── page.tsx               # Landing
│   │   ├── domains/
│   │   ├── hosting/
│   │   │   ├── shared/
│   │   │   ├── vps/
│   │   │   └── dedicated/
│   │   ├── services/
│   │   │   ├── web-development/
│   │   │   ├── mobile/
│   │   │   ├── database/
│   │   │   └── google-workspace/
│   │   └── contact/
│   │
│   ├── (auth)/                    # Auth pages (minimal layout)
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   └── admin/
│   │       └── login/
│   │
│   ├── dashboard/                 # Client dashboard (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Overview / metrics
│   │   ├── domains/
│   │   │   ├── page.tsx           # List all domains
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Domain detail + overview
│   │   │       ├── dns/           # DNS records manager (Cloudflare API)
│   │   │       └── nameservers/   # Update nameservers (DNA API)
│   │   ├── hosting/
│   │   │   ├── page.tsx           # All hosting services
│   │   │   └── [id]/              # Individual service detail
│   │   ├── orders/
│   │   │   ├── page.tsx           # Order history
│   │   │   └── [id]/              # Order detail + status timeline
│   │   ├── invoices/
│   │   │   ├── page.tsx           # From Finance System API
│   │   │   └── [id]/              # Invoice detail + pay online button
│   │   ├── quotations/
│   │   │   ├── page.tsx           # From Finance System API
│   │   │   ├── [id]/              # Quotation detail
│   │   │   └── request/           # New quotation request form
│   │   ├── support/
│   │   │   ├── page.tsx           # Tickets list
│   │   │   └── [id]/              # Ticket thread
│   │   └── settings/
│   │       ├── profile/
│   │       ├── security/
│   │       └── billing/
│   │
│   ├── admin/                     # Admin dashboard (protected + role-based)
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Admin overview metrics
│   │   ├── clients/
│   │   │   ├── page.tsx
│   │   │   └── [id]/              # Client detail + their orders/invoices
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/              # Order detail + manual cash approval
│   │   ├── invoices/              # Proxy view from Finance System
│   │   ├── quotations/            # Proxy view from Finance System
│   │   ├── domains/
│   │   ├── hosting/
│   │   ├── support/
│   │   ├── staff/                 # Manage admin users + permissions
│   │   │   ├── page.tsx
│   │   │   └── roles/
│   │   └── settings/
│   │       ├── general/
│   │       ├── pricing/
│   │       └── notifications/
│   │
│   └── api/
│       ├── auth/                  # better-auth routes
│       ├── hetzner/
│       │   ├── server-types/      # VPS plans list
│       │   ├── config-options/    # Images, datacenters, SSH keys
│       │   └── dedicated/         # Robot API dedicated servers
│       ├── whm/
│       │   └── packages/          # Shared hosting packages
│       ├── dna/
│       │   └── search/            # Domain availability search
│       ├── stripe/
│       │   ├── checkout/          # Create Stripe Checkout Session
│       │   └── webhooks/          # Handle Stripe events
│       ├── finance/               # Proxy to Finance System API
│       │   ├── invoices/
│       │   │   ├── route.ts       # GET list of client invoices
│       │   │   └── [id]/route.ts  # GET single invoice
│       │   └── quotations/
│       │       ├── route.ts       # GET list of quotations
│       │       └── [id]/route.ts  # GET single quotation
│       ├── orders/
│       │   ├── route.ts           # POST create order
│       │   └── [id]/
│       │       ├── route.ts       # GET order detail
│       │       └── approve/       # POST admin approve cash payment
│       ├── dns/                   # Cloudflare DNS proxy
│       │   └── [domainId]/
│       │       ├── records/       # GET/POST DNS records
│       │       └── records/[cfId]/ # PATCH/DELETE single record
│       └── admin/
│           └── staff/             # Admin user management
│
├── components/
│   ├── ui/                        # shadcn components
│   ├── marketing/                 # Public page components
│   ├── dashboard/                 # Client dashboard components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── stats-card.tsx
│   │   ├── dns-records-table.tsx
│   │   ├── invoice-list.tsx
│   │   └── order-status-timeline.tsx
│   ├── admin/                     # Admin dashboard components
│   │   ├── sidebar.tsx
│   │   ├── data-table.tsx
│   │   ├── permission-editor.tsx
│   │   └── order-approval.tsx
│   └── shared/
│       ├── status-badge.tsx
│       ├── payment-method-selector.tsx
│       └── service-card.tsx
│
├── lib/
│   ├── auth.ts                    # better-auth config
│   ├── db.ts                      # postgres/drizzle client
│   ├── stripe.ts                  # Stripe client
│   ├── resend.ts                  # Resend email client
│   ├── finance.ts                 # Finance System API wrapper
│   ├── cloudflare.ts              # Cloudflare API wrapper (DNS)
│   ├── hetzner.ts                 # Hetzner Cloud API wrapper
│   ├── hetzner-robot.ts           # Hetzner Robot API wrapper
│   ├── whm.ts                     # WHM API wrapper
│   ├── dna.ts                     # DNA API wrapper
│   ├── permissions.ts             # Role-based access helpers
│   ├── provisioning/
│   │   ├── index.ts               # Main provisioner (routes by order type)
│   │   ├── vps.ts                 # Hetzner Cloud VPS provisioning
│   │   ├── dedicated.ts           # Hetzner Robot dedicated provisioning
│   │   ├── shared.ts              # WHM account provisioning
│   │   └── domain.ts              # DNA register + Cloudflare zone setup
│   └── utils.ts
│
├── db/
│   ├── schema/
│   │   ├── users.ts
│   │   ├── orders.ts
│   │   ├── domains.ts
│   │   ├── hosting.ts
│   │   └── support.ts
│   │   # NOTE: No invoices.ts or quotations.ts
│   │   # Those are owned by the Finance System
│   └── migrations/
│
├── hooks/
├── types/
├── middleware.ts
└── emails/
    ├── welcome.tsx
    ├── email-verified.tsx
    ├── order-confirmed.tsx
    ├── order-pending-cash.tsx
    ├── cash-payment-approved.tsx
    ├── domain-expiring.tsx
    ├── hosting-expiring.tsx
    ├── password-reset.tsx
    ├── ticket-opened.tsx
    ├── ticket-reply.tsx
    └── admin-new-order.tsx
```

---

## 2. FINANCE SYSTEM INTEGRATION

### Architecture Decision
The Finance System is the **single source of truth** for invoices and quotations.
Momtaz Host platform does NOT maintain its own invoices/quotations tables.
It proxies reads from the Finance API and reports payment events back to it.

```
Finance System API
        ↕  REST API calls
app/api/finance/
├── invoices/route.ts        GET  → fetch client's invoices (filtered by financeClientId)
├── invoices/[id]/route.ts   GET  → single invoice detail
├── quotations/route.ts      GET  → fetch client's quotations
└── quotations/[id]/route.ts GET  → single quotation detail
```

### Client Matching Strategy
When a client registers on Momtaz Host, link them to their existing Finance System record.
Store the Finance System's client ID in the users table as `financeClientId`.

```
On first dashboard load:
  1. Check if users.financeClientId is null
  2. If null → call Finance API: GET /clients?email={email}
  3. If found → save finance_client_id to users table (auto-link)
  4. If not found → Finance System creates new client record → save returned ID

For existing clients with different email in Finance System:
  → Admin manually links from /admin/clients/[id] panel
```

### Finance API Wrapper (`lib/finance.ts`)
```ts
const FINANCE_API_URL = process.env.FINANCE_API_URL!;
const FINANCE_API_KEY = process.env.FINANCE_API_KEY!;

async function financeRequest(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${FINANCE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${FINANCE_API_KEY}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`Finance API error: ${res.status}`);
  return res.json();
}

export const getClientInvoices = (financeClientId: string) =>
  financeRequest(`/invoices?client_id=${financeClientId}`);

export const getInvoice = (invoiceId: string) =>
  financeRequest(`/invoices/${invoiceId}`);

export const getClientQuotations = (financeClientId: string) =>
  financeRequest(`/quotations?client_id=${financeClientId}`);

export async function createInvoiceInFinance(data: {
  clientId: string;
  amount: number;
  description: string;
  orderId: string;
  dueDate: string;
}) {
  return financeRequest("/invoices", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function reportPaymentToFinance(data: {
  invoiceId: string;
  amount: number;
  method: "stripe" | "cash";
  paidAt: string;
  reference?: string; // Stripe PaymentIntent ID or cash receipt ref
}) {
  return financeRequest(`/invoices/${data.invoiceId}/payment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

---

## 3. DATABASE SCHEMA (Drizzle ORM + PostgreSQL)

> **NOTE:** No `invoices` or `quotations` tables — those live in the Finance System.

### users.ts
```ts
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  role: varchar("role", { length: 20 }).default("client").notNull(),
  // "client" | "admin" | "super_admin"
  emailVerified: boolean("email_verified").default(false),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  financeClientId: varchar("finance_client_id", { length: 100 }),
  // ID in the Finance System — used for all invoice/quotation API calls
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adminPermissions = pgTable("admin_permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  module: varchar("module", { length: 50 }).notNull(),
  // "orders" | "invoices" | "clients" | "hosting" |
  // "domains" | "quotations" | "support" | "staff" | "settings"
  canView: boolean("can_view").default(true),
  canCreate: boolean("can_create").default(false),
  canEdit: boolean("can_edit").default(false),
  canDelete: boolean("can_delete").default(false),
});
```

### orders.ts
```ts
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  // e.g. "MH-2025-00123"
  type: varchar("type", { length: 30 }).notNull(),
  // "domain" | "shared_hosting" | "vps" | "dedicated" | "google_workspace"
  status: varchar("status", { length: 30 }).default("pending").notNull(),
  // "pending"          → order placed, awaiting payment selection
  // "pending_payment"  → cash selected, waiting for collection
  // "processing"       → payment confirmed, provisioning in progress
  // "active"           → provisioned and running
  // "suspended"        → payment overdue
  // "cancelled"        → cancelled before provisioning
  paymentMethod: varchar("payment_method", { length: 20 }),
  // "stripe" | "cash"
  payload: jsonb("payload").notNull(),
  // full config: { plan, os, datacenter, domain, sshKeys, serverName, etc. }
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  billingCycle: varchar("billing_cycle", { length: 10 }).default("monthly"),
  nextBillingDate: date("next_billing_date"),
  // Finance System reference
  financeInvoiceId: varchar("finance_invoice_id", { length: 100 }),
  // Stripe references
  stripeSessionId: varchar("stripe_session_id", { length: 255 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  // Cash approval tracking
  approvedBy: uuid("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### domains.ts
```ts
export const domains = pgTable("domains", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  orderId: uuid("order_id").references(() => orders.id),
  domainName: varchar("domain_name", { length: 255 }).notNull(),
  tld: varchar("tld", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  // "pending" | "active" | "expired" | "pending_transfer" | "suspended"
  registeredAt: date("registered_at"),
  expiresAt: date("expires_at"),
  autoRenew: boolean("auto_renew").default(true),
  // DNA API reference
  dnaOrderId: varchar("dna_order_id", { length: 255 }),
  // Cloudflare reference — key field for all DNS operations
  cloudflareZoneId: varchar("cloudflare_zone_id", { length: 100 }),
  nameservers: jsonb("nameservers").default([]),
  // defaults to Cloudflare NS after registration
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// NOTE: DNS records are NOT stored in your DB.
// They are read/written directly via Cloudflare API using cloudflare_zone_id.
// This keeps DNS always in sync with Cloudflare as the source of truth.
```

### hosting.ts
```ts
export const hostingServices = pgTable("hosting_services", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  orderId: uuid("order_id").references(() => orders.id),
  type: varchar("type", { length: 20 }).notNull(),
  // "shared" | "vps" | "dedicated"
  status: varchar("status", { length: 20 }).default("provisioning"),
  // "provisioning" | "active" | "suspended" | "cancelled"

  // Shared hosting (WHM)
  whmUsername: varchar("whm_username", { length: 50 }),
  whmPackage: varchar("whm_package", { length: 100 }),

  // VPS / Dedicated (Hetzner)
  hetznerServerId: varchar("hetzner_server_id", { length: 50 }),
  hetznerServerType: varchar("hetzner_server_type", { length: 50 }),
  ipv4: varchar("ipv4", { length: 45 }),
  ipv6: varchar("ipv6", { length: 45 }),
  datacenter: varchar("datacenter", { length: 50 }),
  os: varchar("os", { length: 100 }),

  specs: jsonb("specs"),
  // { cores, memory, disk, traffic }
  monthlyPrice: numeric("monthly_price", { precision: 10, scale: 2 }),

  provisionedAt: timestamp("provisioned_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### support.ts
```ts
export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  ticketNumber: varchar("ticket_number", { length: 20 }).notNull().unique(),
  subject: varchar("subject", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).default("open"),
  // "open" | "in_progress" | "waiting_client" | "resolved" | "closed"
  priority: varchar("priority", { length: 10 }).default("medium"),
  // "low" | "medium" | "high" | "urgent"
  category: varchar("category", { length: 50 }),
  // "billing" | "technical" | "domain" | "hosting" | "general"
  assignedTo: uuid("assigned_to").references(() => users.id),
  relatedOrderId: uuid("related_order_id").references(() => orders.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ticketMessages = pgTable("ticket_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticketId: uuid("ticket_id").references(() => supportTickets.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  message: text("message").notNull(),
  isInternal: boolean("is_internal").default(false), // admin-only notes
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow(),
});
```

---

## 4. PAYMENT FLOWS

### Path A — Online Payment (Stripe)

```
1.  Client configures product → selects "Pay with Card"
2.  POST /api/orders
      → Creates order { status: "pending", paymentMethod: "stripe" }
      → Creates invoice in Finance System → saves financeInvoiceId
      → Creates Stripe Checkout Session → returns { orderId, stripeSessionUrl }
3.  Client redirected to Stripe Checkout
4.  Stripe webhook fires → payment_intent.succeeded
5.  /api/stripe/webhooks:
      a. Verify Stripe signature
      b. Update order → status: "processing"
      c. reportPaymentToFinance() → Finance marks invoice paid
      d. Call provisionOrder() from lib/provisioning/index.ts
      e. Update order → status: "active"
      f. Save service details (hosting_services or domains table)
      g. Send order-confirmed.tsx email via Resend
6.  Client sees active service in dashboard immediately
```

### Path B — Cash / Offline Payment

```
1.  Client configures product → selects "Cash / Offline"
2.  POST /api/orders
      → Creates order { status: "pending_payment", paymentMethod: "cash" }
      → Creates invoice in Finance System (status: unpaid)
      → Returns { orderId }
3.  Client sees "Awaiting Cash Collection" state in dashboard
      → order-pending-cash.tsx email sent explaining the process
4.  Staff visits client, collects cash physically
5.  Admin opens /admin/orders/[id] → clicks "Confirm Cash Payment Received"
6.  POST /api/orders/[id]/approve (admin guard: orders + edit)
      a. Verify admin session + permission
      b. Update order → status: "processing", approvedBy, approvedAt
      c. reportPaymentToFinance() → Finance marks invoice paid
      d. Call provisionOrder() from lib/provisioning/index.ts
      e. Update order → status: "active"
      f. Send cash-payment-approved.tsx email to client
7.  Client sees active service in dashboard
```

### Path C — HesabPay (Future / Afghanistan)
```
Same flow as Stripe. When ready:
- Add HESABPAY_API_KEY + HESABPAY_WEBHOOK_SECRET to env
- Create app/api/hesabpay/checkout/route.ts
- Create app/api/hesabpay/webhooks/route.ts
- Add "hesabpay" as paymentMethod option in checkout UI
```

---

## 5. FULL PROVISIONING AUTOMATION

### Main Provisioner (`lib/provisioning/index.ts`)
```ts
import { provisionVPS } from "./vps";
import { provisionDedicated } from "./dedicated";
import { provisionSharedHosting } from "./shared";
import { provisionDomain } from "./domain";

export async function provisionOrder(order: Order) {
  switch (order.type) {
    case "vps":           return provisionVPS(order);
    case "dedicated":     return provisionDedicated(order);
    case "shared_hosting": return provisionSharedHosting(order);
    case "domain":        return provisionDomain(order);
    default:
      throw new Error(`Unknown order type: ${order.type}`);
  }
}
```

### VPS Provisioner (`lib/provisioning/vps.ts`)
```ts
// POST https://api.hetzner.cloud/v1/servers
export async function provisionVPS(order: Order) {
  const { serverType, image, datacenter, sshKeys, serverName } = order.payload;

  const res = await hetznerFetch("/servers", {
    method: "POST",
    body: JSON.stringify({
      name: serverName || `mh-${order.orderNumber.toLowerCase()}`,
      server_type: serverType,
      image,
      datacenter,
      ssh_keys: sshKeys,
      labels: {
        order_id: order.id,
        client_id: order.userId,
        managed_by: "momtaz-host",
      },
    }),
  });

  await db.insert(hostingServices).values({
    userId: order.userId,
    orderId: order.id,
    type: "vps",
    status: "active",
    hetznerServerId: String(res.server.id),
    hetznerServerType: serverType,
    ipv4: res.server.public_net.ipv4?.ip,
    ipv6: res.server.public_net.ipv6?.ip,
    datacenter: res.server.datacenter.name,
    os: image,
    specs: {
      cores: res.server.server_type.cores,
      memory: res.server.server_type.memory,
      disk: res.server.server_type.disk,
    },
    monthlyPrice: order.totalAmount,
    provisionedAt: new Date(),
  });
}
```

### Dedicated Provisioner (`lib/provisioning/dedicated.ts`)
```ts
// Hetzner Robot API (Basic Auth, different from Cloud API)
export async function provisionDedicated(order: Order) {
  const { productId, os, sshKeys } = order.payload;

  const res = await robotFetch("/order/server/transaction", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      authorized_key: sshKeys,
      dist: os,
    }),
  });

  await db.insert(hostingServices).values({
    userId: order.userId,
    orderId: order.id,
    type: "dedicated",
    status: "provisioning", // Robot takes longer, update via polling or webhook
    hetznerServerId: String(res.transaction.server_number),
    os,
    monthlyPrice: order.totalAmount,
  });
}
```

### Domain Provisioner (`lib/provisioning/domain.ts`)
```ts
export async function provisionDomain(order: Order) {
  const { domainName, tld, contactInfo } = order.payload;
  const fullDomain = `${domainName}.${tld}`;

  // 1. Register domain via DNA API
  const dnaOrder = await dnaRegisterDomain({
    domain: fullDomain,
    years: 1,
    contact: contactInfo,
    nameservers: ["ns1.cloudflare.com", "ns2.cloudflare.com"],
  });

  // 2. Add zone to Cloudflare
  const cfZone = await cloudflareAddZone(fullDomain);

  // 3. Save to domains table
  await db.insert(domains).values({
    userId: order.userId,
    orderId: order.id,
    domainName,
    tld,
    status: "active",
    dnaOrderId: dnaOrder.id,
    cloudflareZoneId: cfZone.id,
    nameservers: ["ns1.cloudflare.com", "ns2.cloudflare.com"],
    registeredAt: new Date(),
    expiresAt: addYears(new Date(), 1),
  });
}
```

### Shared Hosting Provisioner (`lib/provisioning/shared.ts`)
```ts
// WHM API
export async function provisionSharedHosting(order: Order) {
  const { package: pkg, domain, username } = order.payload;

  await whmRequest("/json-api/createacct", {
    username,
    domain,
    plan: pkg,
    contactemail: order.userEmail,
  });

  await db.insert(hostingServices).values({
    userId: order.userId,
    orderId: order.id,
    type: "shared",
    status: "active",
    whmUsername: username,
    whmPackage: pkg,
    monthlyPrice: order.totalAmount,
    provisionedAt: new Date(),
  });
}
```

---

## 6. DNS MANAGEMENT — CLOUDFLARE

### Why Cloudflare (not Hetzner DNS)
- Domains are already on Cloudflare — no migration needed
- Faster global propagation via Cloudflare's anycast network
- Free DDoS protection and automatic SSL per domain
- Proxying support (orange cloud) for additional security
- Superior API with better docs and reliability
- Hetzner DNS is basic — no proxying, no analytics, smaller network

### DNS Flow After Domain Registration
```
DNA API registers domain
  → Sets nameservers: ns1.cloudflare.com / ns2.cloudflare.com
  → Cloudflare API: POST /zones (create zone)
  → cloudflare_zone_id saved to domains table
  → All future DNS operations use this zone_id via your API proxy
```

### Cloudflare API Wrapper (`lib/cloudflare.ts`)
```ts
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID!;
const CF_BASE = "https://api.cloudflare.com/client/v4";

async function cfRequest(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${CF_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.errors?.[0]?.message ?? "CF API error");
  return data.result;
}

export const addZone = (domainName: string) =>
  cfRequest("/zones", {
    method: "POST",
    body: JSON.stringify({
      name: domainName,
      account: { id: CF_ACCOUNT },
      jump_start: true,
    }),
  });

export const getDNSRecords = (zoneId: string) =>
  cfRequest(`/zones/${zoneId}/dns_records`);

export const createDNSRecord = (zoneId: string, record: {
  type: string; name: string; content: string;
  ttl?: number; priority?: number; proxied?: boolean;
}) =>
  cfRequest(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify(record),
  });

export const updateDNSRecord = (zoneId: string, recordId: string, data: object) =>
  cfRequest(`/zones/${zoneId}/dns_records/${recordId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteDNSRecord = (zoneId: string, recordId: string) =>
  cfRequest(`/zones/${zoneId}/dns_records/${recordId}`, { method: "DELETE" });
```

### DNS API Routes (backend proxy — never expose CF token to browser)
```
GET    /api/dns/[domainId]/records           → CF GET   /zones/{zoneId}/dns_records
POST   /api/dns/[domainId]/records           → CF POST  /zones/{zoneId}/dns_records
PATCH  /api/dns/[domainId]/records/[cfId]    → CF PATCH /zones/{zoneId}/dns_records/{cfId}
DELETE /api/dns/[domainId]/records/[cfId]    → CF DELETE /zones/{zoneId}/dns_records/{cfId}
PUT    /api/dns/[domainId]/nameservers        → DNA API update nameservers
```

### Client DNS Manager UI
```
/dashboard/domains/[id]/dns

Tabs:
├── DNS Records
│   Table columns: Type | Name | Content | TTL | Proxied | Actions
│   Actions: Edit (inline sheet) | Delete (confirm dialog)
│   "Add Record" button → Sheet with:
│     - Type: A / AAAA / CNAME / MX / TXT / NS / SRV
│     - Name (@ for root, or subdomain)
│     - Content / Value
│     - TTL (Auto or custom seconds)
│     - Proxied toggle (A and CNAME only)
│     - Priority field (MX / SRV only)
│
└── Nameservers
    Displays current NS (Cloudflare by default)
    Update form for custom nameservers
    ⚠ Warning: changing NS disables Cloudflare proxy + SSL
```

---

## 7. MIDDLEWARE — AUTH + ROLE PROTECTION

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession(req);

  if (pathname.startsWith("/dashboard")) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url));
    if (session.user.role !== "client")
      return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) return NextResponse.redirect(new URL("/admin/login", req.url));
    if (session.user.role === "client")
      return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

---

## 8. ROLE-BASED ACCESS — ADMIN MODULES

### Permission Helper (`lib/permissions.ts`)
```ts
export type Module =
  | "orders" | "invoices" | "clients" | "hosting"
  | "domains" | "quotations" | "support" | "staff" | "settings";

export type Action = "view" | "create" | "edit" | "delete";

export async function hasPermission(
  userId: string, role: string, module: Module, action: Action
): Promise<boolean> {
  if (role === "super_admin") return true;

  const [p] = await db.select().from(adminPermissions)
    .where(and(eq(adminPermissions.userId, userId), eq(adminPermissions.module, module)))
    .limit(1);

  if (!p) return false;
  const map = { view: p.canView, create: p.canCreate, edit: p.canEdit, delete: p.canDelete };
  return map[action];
}
```

### API Route Guard (`lib/api-guard.ts`)
```ts
export function adminGuard(module: Module, action: Action, handler: Function) {
  return async (req: NextRequest) => {
    const session = await getSession(req);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user.role === "client") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const allowed = await hasPermission(session.user.id, session.user.role, module, action);
    if (!allowed) return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    return handler(req, session);
  };
}

// Usage in any admin API route:
// export const GET  = adminGuard("clients", "view", async (req, session) => { ... });
// export const POST = adminGuard("orders",  "edit", async (req, session) => { ... });
```

### Module Permissions Matrix
```
Module       | Super Admin | Regular Admin (configurable per staff)
─────────────────────────────────────────────────────────────────
orders       |    CRUD     | view + edit (status, cash approval)
invoices     |    CRUD     | view only   (Finance System data)
clients      |    CRUD     | view + edit
hosting      |    CRUD     | view + edit
domains      |    CRUD     | view + edit
quotations   |    CRUD     | view + edit (Finance System data)
support      |    CRUD     | view + create + edit
staff        |    CRUD     | ✗ super admin only
settings     |    CRUD     | ✗ super admin only
```

---

## 9. CLIENT DASHBOARD UI STRUCTURE

### Layout
```tsx
<div className="flex h-screen bg-background overflow-hidden">
  <DashboardSidebar />
  <div className="flex-1 flex flex-col overflow-hidden">
    <DashboardHeader />   {/* search, notifications bell, user avatar menu */}
    <main className="flex-1 overflow-y-auto p-6">
      {children}
    </main>
  </div>
</div>
```

### Sidebar Navigation
```ts
const clientNav = [
  { label: "Overview",   icon: LayoutDashboard, href: "/dashboard" },
  { label: "Domains",    icon: Globe,           href: "/dashboard/domains" },
  { label: "Hosting",    icon: Server,          href: "/dashboard/hosting" },
  { label: "Orders",     icon: ShoppingCart,    href: "/dashboard/orders" },
  { label: "Invoices",   icon: FileText,        href: "/dashboard/invoices" },
  { label: "Quotations", icon: MessageSquare,   href: "/dashboard/quotations" },
  { label: "Support",    icon: Headphones,      href: "/dashboard/support" },
  { label: "Settings",   icon: Settings,        href: "/dashboard/settings" },
];
```

### Overview Page Sections
```tsx
// Row 1: Metric cards
<StatsCard label="Active Domains"   value={3}     icon={Globe}      />
<StatsCard label="Active Services"  value={2}     icon={Server}     />
<StatsCard label="Unpaid Invoices"  value="$149"  icon={FileText}   status="warning" />
<StatsCard label="Open Tickets"     value={1}     icon={Headphones} />

// Row 2: Recent orders table
// Row 3: Upcoming renewals (domains/hosting expiring in 30 days)
// Row 4: Recent invoices from Finance API (last 3, with pay button if unpaid)
```

### Invoices Page
```tsx
// Source: /api/finance/invoices → Finance System API
// Columns: Invoice # | Date | Description | Amount | Status | Actions
// Status badges: Paid (green) | Unpaid (yellow) | Overdue (red)
// Actions:
//   - View detail
//   - "Pay Online" → POST /api/stripe/checkout with financeInvoiceId
//   - Download PDF (if Finance System provides endpoint)
```

### Quotations Page
```tsx
// Source: /api/finance/quotations → Finance System API
// Columns: Ref # | Service | Date | Status | Amount | Actions
// Status: Pending | Reviewing | Quoted | Accepted | Rejected
// "Request Quotation" button → /dashboard/quotations/request form:
//   Service type | Project title | Description | Budget range | Timeline | Attachments
```

---

## 10. ADMIN DASHBOARD UI STRUCTURE

### Sidebar Navigation (filtered by permissions)
```ts
const adminNav = [
  { label: "Overview",   icon: LayoutDashboard, href: "/admin",            module: null },
  { label: "Clients",    icon: Users,           href: "/admin/clients",    module: "clients" },
  { label: "Orders",     icon: ShoppingCart,    href: "/admin/orders",     module: "orders" },
  { label: "Invoices",   icon: FileText,        href: "/admin/invoices",   module: "invoices" },
  { label: "Quotations", icon: MessageSquare,   href: "/admin/quotations", module: "quotations" },
  { label: "Domains",    icon: Globe,           href: "/admin/domains",    module: "domains" },
  { label: "Hosting",    icon: Server,          href: "/admin/hosting",    module: "hosting" },
  { label: "Support",    icon: Headphones,      href: "/admin/support",    module: "support" },
  { label: "Staff",      icon: UserCog,         href: "/admin/staff",      module: "staff" },
  { label: "Settings",   icon: Settings,        href: "/admin/settings",   module: "settings" },
];
```

### Admin Overview Metrics
```tsx
<StatsCard label="Total Clients"   value={128}    delta="+4 this week" />
<StatsCard label="Active Orders"   value={47}                          />
<StatsCard label="Monthly Revenue" value="$8,240" delta="+12%"        />
<StatsCard label="Open Tickets"    value={6}      status="warning"    />

// Action-required section: pending cash approvals
// Recent orders table with inline status change
// Overdue invoices from Finance API
```

### Cash Payment Approval UI
```tsx
// /admin/orders/[id] when paymentMethod === "cash" && status === "pending_payment"
<Alert variant="warning">
  This order is awaiting cash payment confirmation.
  Only approve after physically collecting payment from the client.
</Alert>
<div className="flex gap-3">
  <Button variant="default" onClick={handleApprove}>
    ✓ Confirm Cash Payment Received
  </Button>
  <Button variant="destructive" onClick={handleCancel}>
    ✗ Cancel Order
  </Button>
</div>
// Clicking approve → POST /api/orders/[id]/approve → triggers provisioning
```

### Staff Management
```tsx
// /admin/staff
// Table: Name | Email | Role | Modules | Last Active | Actions
// "Invite Staff" → email invite via Resend
// "Edit Permissions" → Sheet with permission matrix per module:
//   Module name | [✓] View | [ ] Create | [✓] Edit | [ ] Delete
// "Super Admin" toggle → grants all permissions instantly
```

---

## 11. ORDER NUMBER & REFERENCE GENERATORS

```ts
// lib/utils.ts
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const result = await db.execute(
    sql`SELECT COUNT(*) FROM orders WHERE EXTRACT(YEAR FROM created_at) = ${year}`
  );
  const count = Number(result.rows[0].count) + 1;
  return `MH-${year}-${String(count).padStart(5, "0")}`;
  // e.g. MH-2025-00001
}

// Same pattern for tickets:
// TKT-00001, TKT-00002...
```

---

## 12. EMAIL TEMPLATES (Resend + React Email)

```
emails/
├── welcome.tsx                # Signup → email verification link
├── email-verified.tsx         # After email confirmed
├── order-confirmed.tsx        # After Stripe payment success → service details
├── order-pending-cash.tsx     # After cash order → "we'll visit to collect payment"
├── cash-payment-approved.tsx  # After admin approves → service now active
├── domain-expiring.tsx        # 30 days before domain expiry
├── hosting-expiring.tsx       # 7 days before hosting expiry
├── password-reset.tsx
├── ticket-opened.tsx          # Confirmation to client
├── ticket-reply.tsx           # New reply notification
└── admin-new-order.tsx        # Alert admin team of new orders
```

---

## 13. IMPLEMENTATION ORDER (Recommended)

### Phase 1 — Foundation ✅ (Done)
- [x] Auth (better-auth: login / register / verify email)
- [x] Database setup (Postgres + Drizzle)
- [x] Marketing pages
- [x] Domain search (DNA API)
- [x] Shared hosting packages (WHM API)
- [x] VPS plans + configure page (Hetzner Cloud API)
- [x] Dedicated servers + configure (Hetzner Robot API)
- [x] Stripe sandbox integration

### Phase 2A — Order + Payment Core ← Start here
- [ ] Add `financeClientId` column to users table
- [ ] Add `paymentMethod`, `financeInvoiceId`, `approvedBy`, `approvedAt` to orders table
- [ ] `lib/finance.ts` — Finance System API wrapper
- [ ] POST `/api/orders` — create order + create invoice in Finance System
- [ ] POST `/api/stripe/checkout` — Stripe Checkout Session creation
- [ ] POST `/api/stripe/webhooks` — handle payment_intent.succeeded
- [ ] POST `/api/orders/[id]/approve` — admin cash approval (admin guard)
- [ ] Email: order-confirmed, order-pending-cash, cash-payment-approved

### Phase 2B — Provisioning Layer
- [ ] `lib/provisioning/vps.ts` — Hetzner Cloud POST /v1/servers
- [ ] `lib/provisioning/dedicated.ts` — Hetzner Robot order
- [ ] `lib/provisioning/shared.ts` — WHM createacct
- [ ] `lib/provisioning/domain.ts` — DNA register + Cloudflare zone creation
- [ ] `lib/provisioning/index.ts` — router by order type

### Phase 2C — DNS Management
- [ ] `lib/cloudflare.ts` — Cloudflare API wrapper
- [ ] GET/POST/PATCH/DELETE `/api/dns/[domainId]/records`
- [ ] PUT `/api/dns/[domainId]/nameservers`
- [ ] DNS records table UI (dashboard)
- [ ] Nameservers tab UI (dashboard)

### Phase 3 — Client Dashboard
- [ ] Dashboard layout (sidebar + header)
- [ ] Overview page (metrics + renewals + recent invoices)
- [ ] Orders list + detail + status timeline
- [ ] Invoices page (Finance API proxy + Pay Online button)
- [ ] Quotations page (Finance API proxy + request form)
- [ ] Domain management (overview + DNS editor + nameservers)
- [ ] Hosting services list + detail (IP, OS, specs)
- [ ] Support ticket system
- [ ] Settings (profile / security / billing)

### Phase 4 — Admin Dashboard
- [ ] Admin layout + sidebar with permission filtering
- [ ] Overview metrics page
- [ ] Clients management (list + detail + finance link)
- [ ] Orders management + cash payment approval flow
- [ ] Invoices view (Finance API proxy)
- [ ] Quotations view + management (Finance API proxy)
- [ ] Domains + Hosting management
- [ ] Staff management + permissions matrix editor
- [ ] Support ticket management with internal notes

### Phase 5 — Automation & Polish
- [ ] Renewal reminders cron (Vercel Cron or pg_cron)
- [ ] Auto-suspend on overdue invoices
- [ ] Domain auto-renew via DNA API
- [ ] In-app notification center (bell icon)
- [ ] Admin analytics charts (Recharts)
- [ ] HesabPay integration (Afghanistan gateway)

---

## 14. KEY PACKAGES TO INSTALL

```bash
# ORM
npm install drizzle-orm drizzle-kit @vercel/postgres

# Email
npm install resend @react-email/components

# Data tables (admin)
npm install @tanstack/react-table

# Forms + validation
npm install react-hook-form zod @hookform/resolvers

# Charts (admin dashboard)
npm install recharts

# Date handling
npm install date-fns

# Cron jobs (if self-hosted, not Vercel)
npm install node-cron
```

---

## 15. SHADCN COMPONENTS NEEDED

```bash
npx shadcn@latest add sidebar
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add command
npx shadcn@latest add calendar
npx shadcn@latest add toast
npx shadcn@latest add alert
npx shadcn@latest add progress
npx shadcn@latest add skeleton
npx shadcn@latest add separator
npx shadcn@latest add table
npx shadcn@latest add switch
```

---

## 16. ENV VARIABLES REFERENCE

```env
# Database
DATABASE_URL=

# Auth (better-auth)
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Hetzner Cloud (VPS)
HETZNER_API_TOKEN=

# Hetzner Robot (Dedicated Servers)
HETZNER_ROBOT_USER=
HETZNER_ROBOT_PASSWORD=

# WHM (Shared Hosting)
WHM_HOST=
WHM_TOKEN=

# DNA API (Domain Registration)
DNA_API_KEY=
DNA_API_URL=

# Cloudflare (DNS Management)
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# Stripe (Online Payments)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Finance System (External)
FINANCE_API_URL=
FINANCE_API_KEY=
FINANCE_WEBHOOK_SECRET=    # if Finance System pushes events to you

# Resend (Transactional Emails)
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@momtazhost.com

# HesabPay (Afghanistan — future)
# HESABPAY_API_KEY=
# HESABPAY_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=https://momtazhost.com
```
