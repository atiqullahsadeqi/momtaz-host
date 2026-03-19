"use client";

import {
    LayoutDashboard, Users, ShoppingCart, FileText,
    Globe, Server, MessageSquare, Headphones,
    UserCog, Settings, Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Users, label: "Clients", href: "/admin/clients" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: FileText, label: "Invoices", href: "/admin/invoices" },
    { icon: Globe, label: "Domains", href: "/admin/domains" },
    { icon: Server, label: "Hosting", href: "/admin/hosting" },
    { icon: MessageSquare, label: "Quotations", href: "/admin/quotations" },
    { icon: Headphones, label: "Support", href: "/admin/support" },
];

const adminItems = [
    { icon: UserCog, label: "Staff", href: "/admin/staff" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

    return (
        <div style={{
            width: 220,
            background: "#fff",
            borderRight: "1px solid #EAECF0",
            display: "flex",
            flexDirection: "column",
            padding: "20px 12px",
            flexShrink: 0,
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
        }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 28 }}>
                <div style={{ width: 30, height: 30, background: "#111827", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={15} color="#fff" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#111827", letterSpacing: "-0.3px" }}>Momtaz Host</span>
            </div>

            {/* Nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>Main</p>
                {navItems.map(item => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.label} href={item.href} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
                            borderRadius: 8, textDecoration: "none", textAlign: "left", width: "100%",
                            background: active ? "#EFF6FF" : "transparent",
                            borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
                            color: active ? "#2563EB" : "#6B7280",
                            fontWeight: active ? 600 : 400,
                            fontSize: 13,
                            transition: "all 0.15s",
                        }}>
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}

                <div style={{ height: 1, background: "#EAECF0", margin: "8px 8px" }} />

                <p style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>Admin</p>
                {adminItems.map(item => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.label} href={item.href} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
                            borderRadius: 8, textDecoration: "none", textAlign: "left", width: "100%",
                            background: active ? "#EFF6FF" : "transparent",
                            borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
                            color: active ? "#2563EB" : "#6B7280",
                            fontWeight: active ? 600 : 400,
                            fontSize: 13,
                            transition: "all 0.15s",
                        }}>
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Admin profile */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 8px", background: "#F9FAFB", borderRadius: 10, marginTop: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>SA</div>
                <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>Super Admin</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>admin@momtazhost.com</p>
                </div>
            </div>
        </div>
    );
}
