"use client";

import { useState } from "react";
import { Globe, Server, Mail, Shield, CreditCard, Zap, ChevronRight } from "lucide-react";

const SECTIONS = [
    {
        title: "General",
        icon: Zap,
        color: "#111827",
        bg: "#F3F4F6",
        settings: [
            { label: "Platform Name", value: "Momtaz Host", type: "text" },
            { label: "Support Email", value: "support@momtazhost.com", type: "email" },
            { label: "Default Currency", value: "USD ($)", type: "select" },
            { label: "Default Language", value: "English", type: "select" },
        ],
    },
    {
        title: "Hosting Providers",
        icon: Server,
        color: "#3B82F6",
        bg: "#EFF6FF",
        settings: [
            { label: "Hetzner Cloud API", value: "••••••••••••••••4fa2", type: "password" },
            { label: "WHM/cPanel Host", value: "cp.momtazhost.com", type: "text" },
            { label: "WHM Username", value: "root", type: "text" },
            { label: "WHM API Token", value: "••••••••••••••••8c19", type: "password" },
        ],
    },
    {
        title: "Domain & DNS",
        icon: Globe,
        color: "#8B5CF6",
        bg: "#F5F3FF",
        settings: [
            { label: "Cloudflare API Token", value: "••••••••••••••••2b14", type: "password" },
            { label: "DNAHOST Auth User", value: "momtaz_dns", type: "text" },
            { label: "DNAHOST API Key", value: "••••••••••••••••7d33", type: "password" },
        ],
    },
    {
        title: "Payments",
        icon: CreditCard,
        color: "#10B981",
        bg: "#ECFDF5",
        settings: [
            { label: "Stripe Secret Key", value: "••••••••••••••••sk_9a", type: "password" },
            { label: "Stripe Public Key", value: "pk_live_51••••••••••42", type: "password" },
            { label: "Cash Orders", value: "Enabled", type: "toggle" },
        ],
    },
    {
        title: "Email",
        icon: Mail,
        color: "#F59E0B",
        bg: "#FFFBEB",
        settings: [
            { label: "Resend API Key", value: "••••••••••••••••re93", type: "password" },
            { label: "From Name", value: "Momtaz Host", type: "text" },
            { label: "From Address", value: "noreply@momtazhost.com", type: "email" },
        ],
    },
    {
        title: "Security",
        icon: Shield,
        color: "#EF4444",
        bg: "#FEF2F2",
        settings: [
            { label: "Two-Factor Auth", value: "Enabled", type: "toggle" },
            { label: "Session Timeout (min)", value: "60", type: "number" },
            { label: "IP Whitelist", value: "Disabled", type: "toggle" },
        ],
    },
];

export default function AdminSettingsPage() {
    return (
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, background: "#F7F8FA", minHeight: "100%", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14, color: "#111827" }}>

            <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Settings</h1>
                <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0 0" }}>Platform configuration and integrations</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {SECTIONS.map(section => (
                    <div key={section.title} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, overflow: "hidden" }}>
                        {/* Section header */}
                        <div style={{ padding: "14px 20px", borderBottom: "1px solid #EAECF0", display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: section.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <section.icon size={15} color={section.color} />
                            </div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>{section.title}</p>
                        </div>

                        {/* Settings rows */}
                        {section.settings.map((setting, i) => (
                            <div key={setting.label} style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "14px 20px", borderBottom: i < section.settings.length - 1 ? "1px solid #F3F4F6" : "none",
                            }}>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 500, color: "#111827", margin: 0 }}>{setting.label}</p>
                                    <p style={{ fontSize: 12, color: "#9CA3AF", margin: "2px 0 0" }}>Click to edit</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {setting.type === "toggle" ? (
                                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: setting.value === "Enabled" ? "#ECFDF5" : "#F3F4F6", color: setting.value === "Enabled" ? "#059669" : "#6B7280" }}>{setting.value}</span>
                                    ) : (
                                        <span style={{ fontSize: 12, color: "#6B7280", fontFamily: setting.type === "password" ? "monospace" : "inherit", background: "#F9FAFB", border: "1px solid #EAECF0", borderRadius: 8, padding: "5px 10px" }}>{setting.value}</span>
                                    )}
                                    <ChevronRight size={14} color="#D1D5DB" />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Save banner */}
            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Settings are saved automatically when you edit each field.</p>
                <button style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}
