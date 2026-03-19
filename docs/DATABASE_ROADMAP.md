# Database Roadmap

## Current State (as of 2026-03-18)

### Tables
| Table | Purpose |
|---|---|
| `user` | Better Auth — user accounts |
| `session` | Better Auth — active sessions |
| `account` | Better Auth — OAuth providers |
| `verification` | Better Auth — email/token verification |
| `orders` | All order types in one table (domain, vps, dedicated, shared) |

### Problem With Current `orders` Table
It's a "god table" — one row describes a domain registration AND a VPS AND a dedicated server.
Product-specific fields are stuffed into a `configuration` JSONB blob because the schema can't
accommodate different column shapes per product type. This means:
- Nullable columns everywhere (e.g. `domain` is null on a VPS order)
- No type safety at the DB level for product-specific data
- Hard to query/report on product-specific fields
- Finance/billing logic is mixed with provisioning data

---

## Planned Schema (To Be Implemented)

### Core: `orders` (financial record only)
```sql
orders
  id              uuid PRIMARY KEY
  user_id         text REFERENCES user(id)
  order_type      text CHECK (order_type IN ('domain','vps','dedicated','shared','cloud'))
  status          text CHECK (status IN ('pending_payment','processing','active','suspended','cancelled','failed'))
  total_amount    numeric(10,2)
  setup_fee       numeric(10,2)
  billing_cycle   text CHECK (billing_cycle IN ('monthly','annual','one_time'))
  next_billing_date date
  payment_method  text CHECK (payment_method IN ('stripe','paypal','offline'))
  payment_intent_id text
  invoice_id      text   -- link to finance system
  paid_at         timestamptz
  created_at      timestamptz DEFAULT NOW()
  updated_at      timestamptz DEFAULT NOW()
```

### Product: `domain_orders`
```sql
domain_orders
  id              uuid PRIMARY KEY
  order_id        uuid REFERENCES orders(id) ON DELETE CASCADE
  domain_name     text NOT NULL        -- e.g. "example"
  tld             text NOT NULL        -- e.g. ".com"
  fqdn            text NOT NULL        -- e.g. "example.com"
  registration_period int NOT NULL     -- years
  auto_renew      boolean DEFAULT true
  expiry_date     date
  registrant_contact jsonb             -- name, email, phone, address
  dns_provider_ref text               -- DNA API order/reference ID
```

### Product: `hosting_orders`
```sql
hosting_orders
  id              uuid PRIMARY KEY
  order_id        uuid REFERENCES orders(id) ON DELETE CASCADE
  hosting_type    text CHECK (hosting_type IN ('vps','dedicated','shared','windows','cloud'))
  plan_id         text NOT NULL
  plan_name       text NOT NULL
  cpu             int
  ram_gb          int
  storage_gb      int
  bandwidth_gb    int
  datacenter      text
  os              text
  ip_address      text                -- filled after provisioning
  server_ref      text                -- Hetzner/provider reference ID
  admin_notes     text
```

### Finance: `invoices`
```sql
invoices
  id              uuid PRIMARY KEY
  order_id        uuid REFERENCES orders(id)
  user_id         text REFERENCES user(id)
  amount          numeric(10,2)
  currency        text DEFAULT 'USD'
  issued_at       timestamptz
  due_at          timestamptz
  paid_at         timestamptz
  pdf_url         text
  line_items      jsonb               -- snapshot of what was charged
```

---

## Migration Plan (When Ready)

1. Create new tables alongside existing `orders`
2. Migrate existing data:
```sql
-- Migrate domain orders
INSERT INTO domain_orders (order_id, fqdn, tld, domain_name, registration_period, registrant_contact)
SELECT id, domain, split_part(domain, '.', 2), split_part(domain, '.', 1),
       (configuration->>'period')::int, configuration->'contact'
FROM orders WHERE order_type = 'domain';

-- Migrate hosting orders
INSERT INTO hosting_orders (order_id, hosting_type, plan_id, plan_name)
SELECT id, order_type, plan_id, plan_name
FROM orders WHERE order_type IN ('vps','dedicated','shared');
```
3. Update API routes and provisioning to read/write new tables
4. Drop old columns from `orders` that moved to product tables
5. Keep `orders` as the financial source of truth

---

## Notes
- **Don't refactor mid-feature-build** — finish core flows first, then do one clean migration
- The JSON `configuration` blob is a temporary workaround, not a permanent solution
- Finance database integration should happen at the same time as this refactor
- Consider adding a `subscriptions` table later for recurring billing management
