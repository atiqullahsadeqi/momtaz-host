"use client";

const ALL_STAFF = [
    { id: "STF-001", name: "Super Admin", initials: "SA", email: "admin@momtazhost.com", role: "Super Admin", department: "Management", joined: "Jan 1, 2025", status: "active", tickets: 0, orders: 0 },
    { id: "STF-002", name: "Bilal Noori", initials: "BN", email: "bilal@momtazhost.com", role: "Tech Support", department: "Technical", joined: "Jan 15, 2025", status: "active", tickets: 34, orders: 0 },
    { id: "STF-003", name: "Sara Karimi", initials: "SK", email: "sara@momtazhost.com", role: "Billing Agent", department: "Finance", joined: "Jan 20, 2025", status: "active", tickets: 21, orders: 72 },
];

const ROLE_MAP: Record<string, { bg: string; color: string }> = {
    "Super Admin": { bg: "#111827", color: "#fff" },
    "Tech Support": { bg: "#EFF6FF", color: "#2563EB" },
    "Billing Agent": { bg: "#F0FDFA", color: "#14B8A6" },
};

export default function AdminStaffPage() {
    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Staff</h1>
                    <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Admin team members and roles</p>
                </div>
                <button style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    + Invite Member
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                    { label: "Total Staff", value: ALL_STAFF.length.toString(), color: "#3B82F6", bg: "#EFF6FF" },
                    { label: "Active", value: ALL_STAFF.filter(s => s.status === "active").length.toString(), color: "#059669", bg: "#ECFDF5" },
                    { label: "Departments", value: "3", color: "#8B5CF6", bg: "#F5F3FF" },
                ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px" }}>
                        <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: "monospace", margin: 0 }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{s.label}</p>
                    </div>
                ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.2fr 1.2fr 0.8fr 0.7fr 0.7fr 0.7fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                    {["Member", "Email", "Role", "Department", "Joined", "Tickets", "Orders", "Status"].map(h => (
                        <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                    ))}
                </div>
                {ALL_STAFF.map((s, i) => (
                    <div key={s.id} style={{
                        display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.2fr 1.2fr 0.8fr 0.7fr 0.7fr 0.7fr",
                        padding: "14px 20px", borderBottom: i < ALL_STAFF.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>{s.initials}</div>
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{s.name}</p>
                                <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{s.id}</p>
                            </div>
                        </div>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{s.email}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: ROLE_MAP[s.role]?.bg, color: ROLE_MAP[s.role]?.color }}>{s.role}</span>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{s.department}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{s.joined}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{s.tickets}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{s.orders}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: "#ECFDF5", color: "#059669" }}>Active</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
