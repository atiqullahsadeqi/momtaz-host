"use client";

import { useState } from "react";
import { Search, Mail, Phone, Globe, ExternalLink } from "lucide-react";

const SERVICE_COLORS: Record<string, string> = { vps: "#3B82F6", shared: "#10B981", dedicated: "#F59E0B", domain: "#8B5CF6" };
const SERVICE_SOFT: Record<string, string> = { vps: "#EFF6FF", shared: "#ECFDF5", dedicated: "#FFFBEB", domain: "#F5F3FF" };

const ALL_CLIENTS = [
    { id: "CLT-001", name: "Ahmad Karimi", initials: "AK", email: "ahmad@karimi.af", phone: "+93 70 123 4567", company: "Karimi Tech", joined: "Jan 12, 2025", orders: 4, revenue: 172.80, services: ["vps", "domain"], status: "active" },
    { id: "CLT-002", name: "Fatima Noori", initials: "FN", email: "fatima@noori.com", phone: "+93 79 234 5678", company: "Noori Design", joined: "Jan 20, 2025", orders: 2, revenue: 24.00, services: ["domain", "shared"], status: "active" },
    { id: "CLT-003", name: "Wahid Ahmadi", initials: "WA", email: "wahid@ahmadi.co", phone: "+93 70 345 6789", company: "Ahmadi Consulting", joined: "Feb 3, 2025", orders: 3, revenue: 540.00, services: ["dedicated"], status: "active" },
    { id: "CLT-004", name: "Mariam Sultani", initials: "MS", email: "mariam@sultani.af", phone: "+93 79 456 7890", company: "", joined: "Feb 10, 2025", orders: 1, revenue: 8.40, services: ["shared"], status: "active" },
    { id: "CLT-005", name: "Khalid Rahimi", initials: "KR", email: "khalid@rahimi.ws", phone: "+93 70 567 8901", company: "Rahimi Enterprises", joined: "Feb 15, 2025", orders: 2, revenue: 88.00, services: ["vps"], status: "active" },
    { id: "CLT-006", name: "Nadia Yusuf", initials: "NY", email: "nadia@yusuf.design", phone: "+93 79 678 9012", company: "Yusuf Studio", joined: "Feb 20, 2025", orders: 1, revenue: 12.00, services: ["domain"], status: "active" },
    { id: "CLT-007", name: "Omar Barakzai", initials: "OB", email: "omar@barak.af", phone: "+93 70 789 0123", company: "", joined: "Feb 22, 2025", orders: 2, revenue: 5.40, services: ["shared"], status: "pending" },
    { id: "CLT-008", name: "Sara Mohammadi", initials: "SM", email: "sara@moh.com", phone: "+93 79 890 1234", company: "Sara Web", joined: "Feb 24, 2025", orders: 1, revenue: 28.80, services: ["vps"], status: "suspended" },
    { id: "CLT-009", name: "Laila Ahmadi", initials: "LA", email: "laila@la.co", phone: "+93 70 901 2345", company: "Laila Solutions", joined: "Feb 18, 2025", orders: 2, revenue: 578.00, services: ["dedicated", "domain"], status: "active" },
    { id: "CLT-010", name: "Dawud Noori", initials: "DN", email: "dawud@dn.af", phone: "+93 79 012 3456", company: "", joined: "Feb 12, 2025", orders: 1, revenue: 62.00, services: ["vps"], status: "active" },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

const STATUS_MAP: Record<string, { bg: string; color: string }> = {
    active: { bg: "#ECFDF5", color: "#059669" },
    pending: { bg: "#FFFBEB", color: "#D97706" },
    suspended: { bg: "#FEF2F2", color: "#DC2626" },
};

export default function AdminClientsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = ALL_CLIENTS.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Clients</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Manage platform clients and their services</p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Total Clients", value: ALL_CLIENTS.length, color: "#3B82F6", bg: "#EFF6FF" },
                    { label: "Active", value: ALL_CLIENTS.filter(c => c.status === "active").length, color: "#059669", bg: "#ECFDF5" },
                    { label: "Total Revenue", value: fmt(ALL_CLIENTS.reduce((a, c) => a + c.revenue, 0)), color: "#14B8A6", bg: "#F0FDFA" },
                ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px" }}>
                        <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: "monospace", margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                {/* Toolbar */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #EAECF0", display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#F3F4F6", borderRadius: 10, padding: "7px 12px", flex: 1, minWidth: 200 }}>
                        <Search size={13} color="#9CA3AF" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.2fr 0.8fr 0.8fr 0.8fr 0.7fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Client", "Email", "Company", "Orders", "Revenue", "Services", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.map((c, i) => (
                    <div key={c.id} style={{
                        display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.2fr 0.8fr 0.8fr 0.8fr 0.7fr",
                        padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none",
                        alignItems: "center", cursor: "pointer",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>{c.initials}</div>
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{c.name}</p>
                                <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{c.id}</p>
                            </div>
                        </div>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{c.email}</span>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{c.company || "—"}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{c.orders}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{fmt(c.revenue)}</span>
                        <div style={{ display: "flex", gap: 3 }}>
                            {c.services.map(s => (
                                <span key={s} style={{ width: 8, height: 8, borderRadius: "50%", background: SERVICE_COLORS[s] }} />
                            ))}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: STATUS_MAP[c.status]?.bg, color: STATUS_MAP[c.status]?.color, textTransform: "capitalize" }}>{c.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
