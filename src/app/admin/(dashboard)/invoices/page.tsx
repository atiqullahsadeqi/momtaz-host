"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

const ALL_INVOICES = [
    { id: "INV-245", client: "Dawud Noori", initials: "DN", type: "dedicated", amount: 180.00, status: "due", dueDate: "Mar 28, 2025", issuedDate: "Feb 28, 2025" },
    { id: "INV-244", client: "Hawa Sultani", initials: "HS", type: "shared", amount: 8.40, status: "due", dueDate: "Mar 25, 2025", issuedDate: "Feb 25, 2025" },
    { id: "INV-243", client: "Yusuf Karimi", initials: "YK", type: "vps", amount: 44.00, status: "due", dueDate: "Mar 25, 2025", issuedDate: "Feb 25, 2025" },
    { id: "INV-242", client: "Laila Ahmadi", initials: "LA", type: "domain", amount: 12.00, status: "due", dueDate: "Mar 22, 2025", issuedDate: "Feb 22, 2025" },
    { id: "INV-241", client: "Omar Barakzai", initials: "OB", type: "dedicated", amount: 95.00, status: "due", dueDate: "Mar 18, 2025", issuedDate: "Feb 18, 2025" },
    { id: "INV-240", client: "Nadia Yusuf", initials: "NY", type: "vps", amount: 28.80, status: "due", dueDate: "Mar 15, 2025", issuedDate: "Feb 15, 2025" },
    { id: "INV-239", client: "Mariam Sultani", initials: "MS", type: "shared", amount: 8.40, status: "paid", dueDate: "Mar 15, 2025", issuedDate: "Feb 15, 2025" },
    { id: "INV-238", client: "Khalid Rahimi", initials: "KR", type: "vps", amount: 44.00, status: "paid", dueDate: "Mar 12, 2025", issuedDate: "Feb 12, 2025" },
    { id: "INV-237", client: "Fatima Noori", initials: "FN", type: "domain", amount: 12.00, status: "overdue", dueDate: "Mar 10, 2025", issuedDate: "Feb 10, 2025" },
    { id: "INV-236", client: "Sara Mohammadi", initials: "SM", type: "shared", amount: 8.40, status: "paid", dueDate: "Mar 7, 2025", issuedDate: "Feb 7, 2025" },
    { id: "INV-235", client: "Ahmad Karimi", initials: "AK", type: "vps", amount: 28.80, status: "paid", dueDate: "Mar 7, 2025", issuedDate: "Feb 7, 2025" },
    { id: "INV-234", client: "Wahid Ahmadi", initials: "WA", type: "dedicated", amount: 180.00, status: "paid", dueDate: "Mar 4, 2025", issuedDate: "Feb 4, 2025" },
];

const SERVICE_COLORS: Record<string, string> = { vps: "#3B82F6", shared: "#10B981", dedicated: "#F59E0B", domain: "#8B5CF6" };
const SERVICE_SOFT: Record<string, string> = { vps: "#EFF6FF", shared: "#ECFDF5", dedicated: "#FFFBEB", domain: "#F5F3FF" };
const SERVICE_LABELS: Record<string, string> = { vps: "VPS", shared: "Shared", dedicated: "Dedicated", domain: "Domain" };

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
    paid: { bg: "#ECFDF5", color: "#059669", label: "Paid" },
    due: { bg: "#FFFBEB", color: "#D97706", label: "Due" },
    overdue: { bg: "#FEF2F2", color: "#DC2626", label: "Overdue" },
};

export default function AdminInvoicesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = ALL_INVOICES.filter(inv => {
        const matchSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || inv.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalDue = ALL_INVOICES.filter(i => i.status !== "paid").reduce((a, i) => a + i.amount, 0);
    const totalPaid = ALL_INVOICES.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);
    const overdue = ALL_INVOICES.filter(i => i.status === "overdue").length;

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Invoices</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Finance system — sourced from Finance API</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Total Collected", value: fmt(totalPaid), color: "#059669", bg: "#ECFDF5" },
                    { label: "Outstanding", value: fmt(totalDue), color: "#D97706", bg: "#FFFBEB" },
                    { label: "Overdue Count", value: String(overdue), color: "#DC2626", bg: "#FEF2F2" },
                ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px" }}>
                        <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: "monospace", margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{s.label}</p>
                    </div>
                ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #EAECF0", display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#F3F4F6", borderRadius: 10, padding: "7px 12px", flex: 1 }}>
                        <Search size={13} color="#9CA3AF" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr 0.8fr 0.8fr 0.8fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Invoice", "Client", "Service", "Amount", "Due Date", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.map((inv, i) => (
                    <div key={inv.id} style={{
                        display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr 0.8fr 0.8fr 0.8fr",
                        padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>{inv.id}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: SERVICE_SOFT[inv.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: SERVICE_COLORS[inv.type], flexShrink: 0 }}>{inv.initials}</div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{inv.client}</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: SERVICE_SOFT[inv.type], color: SERVICE_COLORS[inv.type] }}>{SERVICE_LABELS[inv.type]}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{fmt(inv.amount)}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{inv.dueDate}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: STATUS_MAP[inv.status]?.bg, color: STATUS_MAP[inv.status]?.color }}>{STATUS_MAP[inv.status]?.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
