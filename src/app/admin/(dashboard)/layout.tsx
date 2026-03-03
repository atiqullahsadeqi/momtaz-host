"use client";

import { Bell, Search } from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";

function AdminHeader() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    return (
        <div style={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #EAECF0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 20,
        }}>
            <div>
                <h1 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.3px" }}>Dashboard Overview</h1>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>{dateStr}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F3F4F6", borderRadius: 20, padding: "7px 14px" }}>
                    <Search size={13} color="#9CA3AF" />
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>Search...</span>
                </div>
                <div style={{ position: "relative" }}>
                    <Bell size={18} color="#6B7280" />
                    <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#EF4444", borderRadius: "50%", fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#2563EB" }}>SA</div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#F7F8FA", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>
            <AdminSidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
                <AdminHeader />
                {children}
            </div>
        </div>
    );
}
