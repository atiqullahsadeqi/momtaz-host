"use client";

import { useState } from "react";
import { Search, Globe } from "lucide-react";

const ALL_DOMAINS = [
    { id: "DOM-001", domain: "karimitech.af", client: "Ahmad Karimi", initials: "AK", tld: ".af", registered: "Jan 12, 2025", expires: "Jan 12, 2026", status: "active", ns: "Cloudflare", autoRenew: true },
    { id: "DOM-002", domain: "nooriadesign.com", client: "Fatima Noori", initials: "FN", tld: ".com", registered: "Jan 20, 2025", expires: "Jan 20, 2026", status: "active", ns: "Cloudflare", autoRenew: true },
    { id: "DOM-003", domain: "momtazweb.com", client: "Fatima Noori", initials: "FN", tld: ".com", registered: "Mar 1, 2025", expires: "Mar 1, 2026", status: "pending", ns: "Cloudflare", autoRenew: false },
    { id: "DOM-004", domain: "rahimient.ws", client: "Khalid Rahimi", initials: "KR", tld: ".ws", registered: "Feb 15, 2025", expires: "Feb 15, 2026", status: "active", ns: "Cloudflare", autoRenew: true },
    { id: "DOM-005", domain: "nadia-design.af", client: "Nadia Yusuf", initials: "NY", tld: ".af", registered: "Feb 26, 2025", expires: "Feb 26, 2026", status: "active", ns: "Cloudflare", autoRenew: true },
    { id: "DOM-006", domain: "hawabrand.com", client: "Hawa Sultani", initials: "HS", tld: ".com", registered: "Feb 15, 2025", expires: "Feb 15, 2026", status: "active", ns: "Cloudflare", autoRenew: false },
    { id: "DOM-007", domain: "lailasolve.co", client: "Laila Ahmadi", initials: "LA", tld: ".co", registered: "Feb 18, 2025", expires: "Feb 18, 2026", status: "active", ns: "Cloudflare", autoRenew: true },
    { id: "DOM-008", domain: "oldsite.net", client: "Sara Mohammadi", initials: "SM", tld: ".net", registered: "Nov 1, 2023", expires: "Nov 1, 2024", status: "expired", ns: "Custom", autoRenew: false },
];

const STATUS_MAP: Record<string, { bg: string; color: string }> = {
    active: { bg: "#ECFDF5", color: "#059669" },
    pending: { bg: "#FFFBEB", color: "#D97706" },
    expired: { bg: "#FEF2F2", color: "#DC2626" },
};

export default function AdminDomainsPage() {
    const [search, setSearch] = useState("");

    const filtered = ALL_DOMAINS.filter(d =>
        d.domain.toLowerCase().includes(search.toLowerCase()) || d.client.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Domains</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>All registered domains across the platform</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Total Domains", value: ALL_DOMAINS.length.toString(), color: "#8B5CF6", bg: "#F5F3FF" },
                    { label: "Active", value: ALL_DOMAINS.filter(d => d.status === "active").length.toString(), color: "#059669", bg: "#ECFDF5" },
                    { label: "Expiring Soon", value: "3", color: "#D97706", bg: "#FFFBEB" },
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
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search domains or clients..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr 0.6fr 0.9fr 0.9fr 0.8fr 0.7fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Domain", "Client", "TLD", "Registered", "Expires", "Nameservers", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.map((d, i) => (
                    <div key={d.id} style={{
                        display: "grid", gridTemplateColumns: "1.6fr 1.4fr 0.6fr 0.9fr 0.9fr 0.8fr 0.7fr",
                        padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <Globe size={13} color="#8B5CF6" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{d.domain}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#8B5CF6", flexShrink: 0 }}>{d.initials}</div>
                            <span style={{ fontSize: 12, color: "#6B7280" }}>{d.client}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>{d.tld}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{d.registered}</span>
                        <span style={{ fontSize: 12, color: d.status === "expired" ? "#DC2626" : "#9CA3AF" }}>{d.expires}</span>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{d.ns}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: STATUS_MAP[d.status]?.bg, color: STATUS_MAP[d.status]?.color, textTransform: "capitalize" }}>{d.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
