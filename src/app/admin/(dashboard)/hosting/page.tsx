"use client";

import { useState } from "react";
import { Server, HardDrive, Shield, Search } from "lucide-react";

const ALL_SERVERS = [
    { id: "VPS-001", name: "VPS-01 (nbg1)", client: "Ahmad Karimi", initials: "AK", type: "vps", plan: "CX21 – 2vCPU/4GB", ip: "65.108.12.47", location: "Nuremberg", cpu: 42, ram: 61, disk: 28, status: "running", created: "Jan 12, 2025" },
    { id: "VPS-002", name: "VPS-02 (fsn1)", client: "Khalid Rahimi", initials: "KR", type: "vps", plan: "CPX31 – 4vCPU/8GB", ip: "65.21.77.113", location: "Falkenstein", cpu: 78, ram: 82, disk: 55, status: "running", created: "Feb 15, 2025" },
    { id: "VPS-003", name: "VPS-03 (hel1)", client: "Nadia Yusuf", initials: "NY", type: "vps", plan: "CX21 – 2vCPU/4GB", ip: "95.217.43.22", location: "Helsinki", cpu: 12, ram: 33, disk: 10, status: "running", created: "Feb 20, 2025" },
    { id: "VPS-004", name: "VPS-04 (nbg1)", client: "Dawud Noori", initials: "DN", type: "vps", plan: "CPX41 – 8vCPU/16GB", ip: "49.13.58.201", location: "Nuremberg", cpu: 33, ram: 48, disk: 22, status: "running", created: "Feb 12, 2025" },
    { id: "VPS-005", name: "VPS-05 (fsn1)", client: "Sara Mohammadi", initials: "SM", type: "vps", plan: "CX21 – 2vCPU/4GB", ip: "88.99.14.76", location: "Falkenstein", cpu: 0, ram: 0, disk: 0, status: "suspended", created: "Feb 24, 2025" },
    { id: "DED-001", name: "Dedicated-01", client: "Wahid Ahmadi", initials: "WA", type: "dedicated", plan: "AX41 – 6C/12T/64GB", ip: "135.181.24.98", location: "Helsinki", cpu: 23, ram: 45, disk: 34, status: "running", created: "Feb 3, 2025" },
    { id: "DED-002", name: "Dedicated-02", client: "Laila Ahmadi", initials: "LA", type: "dedicated", plan: "AX61 – 8C/16T/128GB", ip: "65.108.98.43", location: "Nuremberg", cpu: 18, ram: 27, disk: 20, status: "running", created: "Feb 18, 2025" },
    { id: "SHR-001", name: "Shared-01 (WHM)", client: "Mariam Sultani", initials: "MS", type: "shared", plan: "Business – 10GB SSD", ip: "185.93.1.10", location: "Frankfurt", cpu: 8, ram: 22, disk: 41, status: "running", created: "Feb 10, 2025" },
    { id: "SHR-002", name: "Shared-02 (WHM)", client: "Fatima Noori", initials: "FN", type: "shared", plan: "Starter – 5GB SSD", ip: "185.93.1.10", location: "Frankfurt", cpu: 4, ram: 12, disk: 18, status: "running", created: "Jan 20, 2025" },
];

const SERVICE_COLORS: Record<string, string> = { vps: "#3B82F6", shared: "#10B981", dedicated: "#F59E0B" };
const SERVICE_SOFT: Record<string, string> = { vps: "#EFF6FF", shared: "#ECFDF5", dedicated: "#FFFBEB" };
const SERVICE_LABELS: Record<string, string> = { vps: "VPS", shared: "Shared", dedicated: "Dedicated" };

const STATUS_MAP: Record<string, { bg: string; color: string }> = {
    running: { bg: "#ECFDF5", color: "#059669" },
    suspended: { bg: "#FEF2F2", color: "#DC2626" },
    stopped: { bg: "#F3F4F6", color: "#6B7280" },
};

function MiniBar({ value }: { value: number }) {
    const color = value > 80 ? "#EF4444" : value > 65 ? "#F59E0B" : "#10B981";
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, height: 4, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color, fontFamily: "monospace", width: 28, textAlign: "right" }}>{value}%</span>
        </div>
    );
}

export default function AdminHostingPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filtered = ALL_SERVERS.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.client.toLowerCase().includes(search.toLowerCase()) || s.ip.includes(search);
        const matchType = typeFilter === "all" || s.type === typeFilter;
        return matchSearch && matchType;
    });

    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Hosting</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>All active servers — Hetzner Cloud + WHM</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "VPS Servers", value: ALL_SERVERS.filter(s => s.type === "vps").length, color: "#3B82F6", bg: "#EFF6FF" },
                    { label: "Dedicated Servers", value: ALL_SERVERS.filter(s => s.type === "dedicated").length, color: "#F59E0B", bg: "#FFFBEB" },
                    { label: "Shared Accounts", value: ALL_SERVERS.filter(s => s.type === "shared").length, color: "#10B981", bg: "#ECFDF5" },
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
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search servers, clients, IPs..."
                            style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%" }} />
                    </div>
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                        style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #EAECF0", fontSize: 12, color: "#6B7280", background: "#fff", cursor: "pointer" }}>
                        <option value="all">All Types</option>
                        <option value="vps">VPS</option>
                        <option value="dedicated">Dedicated</option>
                        <option value="shared">Shared</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.3fr 1.4fr 0.7fr 0.9fr 0.8fr 0.8fr 0.8fr 0.7fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Server", "Client", "Plan", "Type", "IP", "CPU", "RAM", "Disk", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>

                {filtered.map((s, i) => (
                    <div key={s.id} style={{
                        display: "grid", gridTemplateColumns: "1.3fr 1.3fr 1.4fr 0.7fr 0.9fr 0.8fr 0.8fr 0.8fr 0.7fr",
                        padding: "13px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{s.name}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: SERVICE_SOFT[s.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: SERVICE_COLORS[s.type], flexShrink: 0 }}>{s.initials}</div>
                            <span style={{ fontSize: 12, color: "#6B7280" }}>{s.client}</span>
                        </div>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{s.plan}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: SERVICE_SOFT[s.type], color: SERVICE_COLORS[s.type] }}>{SERVICE_LABELS[s.type]}</span>
                        <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "monospace" }}>{s.ip}</span>
                        <MiniBar value={s.cpu} />
                        <MiniBar value={s.ram} />
                        <MiniBar value={s.disk} />
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: STATUS_MAP[s.status]?.bg, color: STATUS_MAP[s.status]?.color, textTransform: "capitalize" }}>{s.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
