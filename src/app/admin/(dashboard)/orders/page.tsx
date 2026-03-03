"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpRight, Clock, CheckCircle, XCircle, Loader, ChevronDown } from "lucide-react";
import Link from "next/link";

const SERVICE_COLORS: Record<string, string> = { vps: "#3B82F6", shared: "#10B981", dedicated: "#F59E0B", domain: "#8B5CF6" };
const SERVICE_SOFT: Record<string, string> = { vps: "#EFF6FF", shared: "#ECFDF5", dedicated: "#FFFBEB", domain: "#F5F3FF" };
const SERVICE_LABELS: Record<string, string> = { vps: "VPS", shared: "Shared", dedicated: "Dedicated", domain: "Domain" };

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: "#ECFDF5", color: "#059669", label: "Active" },
    pending_payment: { bg: "#FFFBEB", color: "#D97706", label: "Pending Cash" },
    processing: { bg: "#EFF6FF", color: "#2563EB", label: "Processing" },
    suspended: { bg: "#FEF2F2", color: "#DC2626", label: "Suspended" },
    cancelled: { bg: "#F3F4F6", color: "#6B7280", label: "Cancelled" },
};

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

const ALL_ORDERS = [
    { id: "MH-2025-041", client: "Ahmad Karimi", initials: "AK", type: "vps", amount: 28.80, payment: "stripe", status: "active", date: "Mar 1, 2025", plan: "CX21 – 2 vCPU / 4GB" },
    { id: "MH-2025-040", client: "Fatima Noori", initials: "FN", type: "domain", amount: 12.00, payment: "cash", status: "pending_payment", date: "Mar 1, 2025", plan: "momtazweb.com – 1yr" },
    { id: "MH-2025-039", client: "Wahid Ahmadi", initials: "WA", type: "dedicated", amount: 180.00, payment: "stripe", status: "active", date: "Feb 28, 2025", plan: "AX41 – 6C/12T / 64GB" },
    { id: "MH-2025-038", client: "Mariam Sultani", initials: "MS", type: "shared", amount: 8.40, payment: "stripe", status: "processing", date: "Feb 28, 2025", plan: "Business – 10GB SSD" },
    { id: "MH-2025-037", client: "Khalid Rahimi", initials: "KR", type: "vps", amount: 44.00, payment: "cash", status: "active", date: "Feb 27, 2025", plan: "CPX31 – 4 vCPU / 8GB" },
    { id: "MH-2025-036", client: "Nadia Yusuf", initials: "NY", type: "domain", amount: 12.00, payment: "stripe", status: "active", date: "Feb 26, 2025", plan: "nadia-design.af – 1yr" },
    { id: "MH-2025-035", client: "Omar Barakzai", initials: "OB", type: "shared", amount: 5.40, payment: "cash", status: "pending_payment", date: "Feb 25, 2025", plan: "Starter – 5GB SSD" },
    { id: "MH-2025-034", client: "Sara Mohammadi", initials: "SM", type: "vps", amount: 28.80, payment: "stripe", status: "suspended", date: "Feb 24, 2025", plan: "CX21 – 2 vCPU / 4GB" },
    { id: "MH-2025-033", client: "Laila Ahmadi", initials: "LA", type: "dedicated", amount: 289.00, payment: "stripe", status: "active", date: "Feb 22, 2025", plan: "AX61 – 8C/16T / 128GB" },
    { id: "MH-2025-032", client: "Yusuf Karimi", initials: "YK", type: "shared", amount: 8.40, payment: "cash", status: "cancelled", date: "Feb 20, 2025", plan: "Business – 10GB SSD" },
    { id: "MH-2025-031", client: "Dawud Noori", initials: "DN", type: "vps", amount: 62.00, payment: "stripe", status: "active", date: "Feb 18, 2025", plan: "CPX41 – 8 vCPU / 16GB" },
    { id: "MH-2025-030", client: "Hawa Sultani", initials: "HS", type: "domain", amount: 12.00, payment: "stripe", status: "active", date: "Feb 15, 2025", plan: "hawabrand.com – 1yr" },
];

function StatusBadge({ status }: { status: string }) {
    const s = STATUS_MAP[status] || STATUS_MAP.cancelled;
    return <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{s.label}</span>;
}

export default function AdminOrdersPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const filtered = ALL_ORDERS.filter(o => {
        const matchSearch = o.client.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()) || o.plan.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || o.status === statusFilter;
        const matchType = typeFilter === "all" || o.type === typeFilter;
        return matchSearch && matchStatus && matchType;
    });

    const counts = {
        active: ALL_ORDERS.filter(o => o.status === "active").length,
        pending: ALL_ORDERS.filter(o => o.status === "pending_payment").length,
        processing: ALL_ORDERS.filter(o => o.status === "processing").length,
    };

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            {/* Page Header */}
            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.4px" }}>Orders</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Manage and track all client orders</p>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Active Orders", value: counts.active, color: "#10B981", bg: "#ECFDF5" },
                    { label: "Pending Payment", value: counts.pending, color: "#D97706", bg: "#FFFBEB" },
                    { label: "Processing", value: counts.processing, color: "#2563EB", bg: "#EFF6FF" },
                ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <p style={{ fontSize: 24, fontWeight: 700, color: "#111827", fontFamily: "monospace", margin: 0, lineHeight: 1 }}>{s.value}</p>
                            <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{s.label}</p>
                        </div>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: "monospace" }}>{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                {/* Toolbar */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #EAECF0", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#F3F4F6", borderRadius: 10, padding: "7px 12px", flex: 1, minWidth: 200 }}>
                        <Search size={13} color="#9CA3AF" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search orders, clients..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }}
                        />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="pending_payment">Pending Cash</option>
                        <option value="processing">Processing</option>
                        <option value="suspended">Suspended</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Types</option>
                        <option value="vps">VPS</option>
                        <option value="dedicated">Dedicated</option>
                        <option value="shared">Shared</option>
                        <option value="domain">Domain</option>
                    </select>
                </div>

                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.8fr 0.8fr 0.8fr 0.9fr 0.7fr 0.5fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Order", "Client", "Plan", "Type", "Amount", "Payment", "Status", "Date"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div style={{ padding: "48px 20px", textAlign: "center", color: "#9CA3AF", fontSize: 13 }}>No orders found matching your filters.</div>
                ) : (
                    filtered.map((o, i) => (
                        <Link key={o.id} href={`/admin/orders/${o.id}`} style={{ textDecoration: "none", display: "block" }}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1.8fr 0.8fr 0.8fr 0.9fr 0.7fr 0.5fr",
                                padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none",
                                alignItems: "center", cursor: "pointer", transition: "background 0.1s",
                            }}
                                onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                <span style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>{o.id}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: SERVICE_SOFT[o.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: SERVICE_COLORS[o.type], flexShrink: 0 }}>{o.initials}</div>
                                    <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{o.client}</span>
                                </div>
                                <span style={{ fontSize: 12, color: "#6B7280" }}>{o.plan}</span>
                                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: SERVICE_SOFT[o.type], color: SERVICE_COLORS[o.type] }}>{SERVICE_LABELS[o.type]}</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{fmt(o.amount)}</span>
                                <span style={{ fontSize: 12, color: "#6B7280" }}>{o.payment === "stripe" ? "💳 Stripe" : "💵 Cash"}</span>
                                <StatusBadge status={o.status} />
                                <span style={{ fontSize: 12, color: "#9CA3AF" }}>{o.date}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
