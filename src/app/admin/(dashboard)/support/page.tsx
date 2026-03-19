"use client";

import { useState } from "react";
import { Search, Clock, ArrowUpRight } from "lucide-react";

const ALL_TICKETS = [
    { id: "TKT-089", client: "Ahmad Karimi", initials: "AK", subject: "VPS unreachable after reboot", department: "Technical", priority: "urgent", status: "open", created: "Mar 1, 2025", age: "1h", assignee: "Bilal N." },
    { id: "TKT-088", client: "Nadia Yusuf", initials: "NY", subject: "DNS not propagating for domain", department: "DNS/Domain", priority: "high", status: "open", created: "Mar 1, 2025", age: "3h", assignee: "Unassigned" },
    { id: "TKT-087", client: "Omar Barakzai", initials: "OB", subject: "Question about invoice INV-233", department: "Billing", priority: "medium", status: "open", created: "Feb 28, 2025", age: "1d", assignee: "Sara K." },
    { id: "TKT-086", client: "Mariam Sultani", initials: "MS", subject: "Shared hosting email not working", department: "Technical", priority: "high", status: "in_progress", created: "Feb 27, 2025", age: "2d", assignee: "Bilal N." },
    { id: "TKT-085", client: "Wahid Ahmadi", initials: "WA", subject: "Dedicated server RAM upgrade request", department: "Sales", priority: "medium", status: "in_progress", created: "Feb 25, 2025", age: "4d", assignee: "Sara K." },
    { id: "TKT-084", client: "Khalid Rahimi", initials: "KR", subject: "Need to change payment method", department: "Billing", priority: "low", status: "resolved", created: "Feb 22, 2025", age: "7d", assignee: "Sara K." },
    { id: "TKT-083", client: "Laila Ahmadi", initials: "LA", subject: "SSL certificate expired on domain", department: "Technical", priority: "urgent", status: "resolved", created: "Feb 20, 2025", age: "9d", assignee: "Bilal N." },
];

const PRIORITY_MAP: Record<string, { bg: string; color: string; border: string }> = {
    urgent: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
    high: { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
    medium: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
    low: { bg: "#F9FAFB", color: "#6B7280", border: "#E5E7EB" },
};

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
    open: { bg: "#EFF6FF", color: "#2563EB", label: "Open" },
    in_progress: { bg: "#FFFBEB", color: "#D97706", label: "In Progress" },
    resolved: { bg: "#ECFDF5", color: "#059669", label: "Resolved" },
    closed: { bg: "#F3F4F6", color: "#6B7280", label: "Closed" },
};

export default function AdminSupportPage() {
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filtered = ALL_TICKETS.filter(t => {
        const matchSearch = t.client.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
        const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        return matchSearch && matchPriority && matchStatus;
    });

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Support</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Client support tickets and escalations</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                {[
                    { label: "Open", value: ALL_TICKETS.filter(t => t.status === "open").length, color: "#2563EB", bg: "#EFF6FF" },
                    { label: "In Progress", value: ALL_TICKETS.filter(t => t.status === "in_progress").length, color: "#D97706", bg: "#FFFBEB" },
                    { label: "Urgent", value: ALL_TICKETS.filter(t => t.priority === "urgent").length, color: "#DC2626", bg: "#FEF2F2" },
                    { label: "Resolved", value: ALL_TICKETS.filter(t => t.status === "resolved").length, color: "#059669", bg: "#ECFDF5" },
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
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Priorities</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {filtered.map((t, i) => (
                        <div key={t.id} style={{
                            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px",
                            borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none", cursor: "pointer",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>{t.initials}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{t.subject}</p>
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, border: `1px solid ${PRIORITY_MAP[t.priority]?.border}`, background: PRIORITY_MAP[t.priority]?.bg, color: PRIORITY_MAP[t.priority]?.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.priority}</span>
                                </div>
                                <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#9CA3AF", flexWrap: "wrap" }}>
                                    <span>{t.client}</span><span>·</span>
                                    <span style={{ fontFamily: "monospace" }}>{t.id}</span><span>·</span>
                                    <span>{t.department}</span><span>·</span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {t.age}</span><span>·</span>
                                    <span>→ {t.assignee}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: STATUS_MAP[t.status]?.bg, color: STATUS_MAP[t.status]?.color, flexShrink: 0 }}>{STATUS_MAP[t.status]?.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
