"use client";

import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

const ALL_QUOTATIONS = [
    { id: "QUO-012", client: "Hawa Sultani", initials: "HS", service: "dedicated", plan: "AX41 – 64GB", amount: 189.00, status: "pending", created: "Mar 1, 2025", expires: "Mar 8, 2025" },
    { id: "QUO-011", client: "Yusuf Karimi", initials: "YK", service: "vps", plan: "CPX31 – 4vCPU/8GB", amount: 44.00, status: "approved", created: "Feb 28, 2025", expires: "Mar 7, 2025" },
    { id: "QUO-010", client: "Omar Barakzai", initials: "OB", service: "shared", plan: "Starter – 5GB SSD", amount: 5.40, status: "pending", created: "Feb 26, 2025", expires: "Mar 5, 2025" },
    { id: "QUO-009", client: "Laila Ahmadi", initials: "LA", service: "dedicated", plan: "AX61 – 128GB", amount: 289.00, status: "approved", created: "Feb 18, 2025", expires: "Feb 25, 2025" },
    { id: "QUO-008", client: "Fatima Noori", initials: "FN", service: "domain", plan: "momtazweb.com – 1yr", amount: 12.00, status: "approved", created: "Mar 1, 2025", expires: "Mar 8, 2025" },
    { id: "QUO-007", client: "Ahmad Karimi", initials: "AK", service: "vps", plan: "CX21 – 2vCPU/4GB", amount: 28.80, status: "rejected", created: "Feb 15, 2025", expires: "Feb 22, 2025" },
    { id: "QUO-006", client: "Mariam Sultani", initials: "MS", service: "vps", plan: "CX31 – 2vCPU/8GB", amount: 36.00, status: "expired", created: "Feb 10, 2025", expires: "Feb 17, 2025" },
];

const SERVICE_COLORS: Record<string, string> = { vps: "#3B82F6", shared: "#10B981", dedicated: "#F59E0B", domain: "#8B5CF6" };
const SERVICE_SOFT: Record<string, string> = { vps: "#EFF6FF", shared: "#ECFDF5", dedicated: "#FFFBEB", domain: "#F5F3FF" };
const SERVICE_LABELS: Record<string, string> = { vps: "VPS", shared: "Shared", dedicated: "Dedicated", domain: "Domain" };

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: "#FFFBEB", color: "#D97706", label: "Pending" },
    approved: { bg: "#ECFDF5", color: "#059669", label: "Approved" },
    rejected: { bg: "#FEF2F2", color: "#DC2626", label: "Rejected" },
    expired: { bg: "#F3F4F6", color: "#6B7280", label: "Expired" },
};

export default function AdminQuotationsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = ALL_QUOTATIONS.filter(q => {
        const matchSearch = q.client.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || q.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Quotations</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Service quotes sent to clients</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Pending Review", value: ALL_QUOTATIONS.filter(q => q.status === "pending").length, color: "#D97706", bg: "#FFFBEB" },
                    { label: "Approved", value: ALL_QUOTATIONS.filter(q => q.status === "approved").length, color: "#059669", bg: "#ECFDF5" },
                    { label: "Total Value", value: fmt(ALL_QUOTATIONS.filter(q => q.status === "approved").reduce((a, q) => a + q.amount, 0)), color: "#14B8A6", bg: "#F0FDFA" },
                ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px" }}>
                        <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: "monospace", margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{s.label}</p>
                    </div>
                ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #EAECF0", display: "flex", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#F3F4F6", borderRadius: 10, padding: "7px 12px", flex: 1 }}>
                        <Search size={13} color="#9CA3AF" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quotations..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.4fr 1.6fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Quote ID", "Client", "Plan", "Service", "Amount", "Created", "Expires", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.map((q, i) => (
                    <div key={q.id} style={{
                        display: "grid", gridTemplateColumns: "0.9fr 1.4fr 1.6fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr",
                        padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>{q.id}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: SERVICE_SOFT[q.service], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: SERVICE_COLORS[q.service], flexShrink: 0 }}>{q.initials}</div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{q.client}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{q.plan}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: SERVICE_SOFT[q.service], color: SERVICE_COLORS[q.service] }}>{SERVICE_LABELS[q.service]}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{fmt(q.amount)}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{q.created}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{q.expires}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: STATUS_MAP[q.status]?.bg, color: STATUS_MAP[q.status]?.color }}>{STATUS_MAP[q.status]?.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
