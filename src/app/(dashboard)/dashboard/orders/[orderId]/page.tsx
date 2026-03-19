"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle2, Clock, XCircle, Ban, Server, Cpu, Globe,
    ChevronLeft, CalendarDays, Settings2, HardDrive,
    MemoryStick, Wifi, Monitor, AlertCircle, Loader2, Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
    id: string;
    order_type: "dedicated" | "vps" | "shared" | "domain";
    status: string;
    plan_id: string;
    plan_name: string;
    configuration: Record<string, unknown>;
    domain: string | null;
    domain_type: string | null;
    total_monthly: string;
    setup_fee: string;
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
}

const STATUS_CONFIG = {
    pending: {
        label: "Pending Review",
        icon: Clock,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        message: "Your order has been received and is awaiting admin review. We'll activate your service shortly and reach out via email.",
    },
    approved: {
        label: "Approved",
        icon: CheckCircle2,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        message: "Your order has been approved! Our team will contact you with setup details.",
    },
    rejected: {
        label: "Rejected",
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
        message: "Unfortunately your order was rejected. Please contact support for more information.",
    },
    cancelled: {
        label: "Cancelled",
        icon: Ban,
        color: "text-gray-400",
        bg: "bg-gray-400/10",
        border: "border-gray-400/20",
        message: "This order has been cancelled.",
    },
    pending_payment: {
        label: "Pending Payment",
        icon: Clock,
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        message: "Awaiting payment. Please complete your checkout to activate this service.",
    },
    processing: {
        label: "Processing",
        icon: Settings2,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        message: "Payment received! Your server is being provisioned automatically. This may take a few minutes.",
    },
    active: {
        label: "Active",
        icon: CheckCircle2,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        message: "Your service is active and running.",
    },
    suspended: {
        label: "Suspended",
        icon: Ban,
        color: "text-yellow-600",
        bg: "bg-yellow-600/10",
        border: "border-yellow-600/20",
        message: "This service has been temporarily suspended. Please contact support.",
    },
} as Record<string, { label: string; icon: any; color: string; bg: string; border: string; message: string }>;

const TYPE_LABELS: Record<string, string> = { dedicated: "Dedicated Server", vps: "VPS", shared: "Shared Hosting", domain: "Domain" };
const TypeIconMap: Record<string, typeof Server> = { dedicated: Server, vps: Cpu, shared: Globe, domain: Globe };

function ConfigRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-right">{value}</span>
        </div>
    );
}

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/orders/${orderId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) setOrder(data.order);
                else if (data.error === "Unauthorized") router.push("/login");
                else setError(data.error ?? "Order not found");
            })
            .catch(() => setError("Failed to load order"))
            .finally(() => setIsLoading(false));
    }, [orderId, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground p-6">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading order…</span>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error ?? "Order not found"}
                </div>
            </div>
        );
    }

    const statusCfg = STATUS_CONFIG[order.status] ?? {
        label: order.status,
        icon: Clock,
        color: "text-muted-foreground",
        bg: "bg-muted/10",
        border: "border-border",
        message: "",
    };
    const StatusIcon = statusCfg.icon;
    const TypeIcon = TypeIconMap[order.order_type];
    const cfg = order.configuration;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            {/* Back */}
            <Link href="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Orders
            </Link>

            {/* Status Hero */}
            <Card className={`border ${statusCfg.border} ${statusCfg.bg}`}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className={`w-14 h-14 rounded-full ${statusCfg.bg} flex items-center justify-center`}>
                        <StatusIcon className={`w-7 h-7 ${statusCfg.color}`} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Order {statusCfg.label}</h1>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{statusCfg.message}</p>
                    </div>
                    {order.admin_notes && (
                        <div className="text-sm bg-background/60 rounded-lg px-4 py-3 border border-border text-left w-full">
                            <span className="font-medium">Admin notes: </span>{order.admin_notes}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Package className="w-4 h-4" /> Order Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                    <ConfigRow label="Order ID" value={`#${order.id.slice(0, 8).toUpperCase()}`} />
                    <ConfigRow label="Type" value={TYPE_LABELS[order.order_type]} />
                    <ConfigRow label="Plan" value={order.plan_name} />
                    <ConfigRow label="Monthly Price" value={`$${parseFloat(order.total_monthly).toFixed(2)}/mo`} />
                    {parseFloat(order.setup_fee) > 0 && (
                        <ConfigRow label="Setup Fee" value={`$${parseFloat(order.setup_fee).toFixed(2)}`} />
                    )}
                    <ConfigRow label="Placed On" value={new Date(order.created_at).toLocaleString()} />
                </CardContent>
            </Card>

            {/* Configuration Details */}
            {order.order_type !== "shared" && Object.keys(cfg).length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Settings2 className="w-4 h-4" /> Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                        {cfg.location != null && <ConfigRow label="Location" value={String(cfg.location)} />}
                        {cfg.operatingSystem != null && <ConfigRow label="Operating System" value={String(cfg.operatingSystem)} />}
                        {cfg.hostname != null && <ConfigRow label="Hostname" value={String(cfg.hostname)} />}
                        {cfg.ram != null && typeof cfg.ram === "object" && <ConfigRow label="RAM" value={String((cfg.ram as { name: string }).name)} />}
                        {cfg.billingCycle != null && <ConfigRow label="Billing Cycle" value={String(cfg.billingCycle)} />}
                        {cfg.ipv4 !== undefined && <ConfigRow label="IPv4" value={cfg.ipv4 ? "Yes" : "No"} />}
                        {Array.isArray(cfg.drives) && cfg.drives.length > 0 && (
                            <ConfigRow
                                label="Additional Drives"
                                value={(cfg.drives as Array<{ name: string; quantity: number }>)
                                    .map(d => `${d.quantity}x ${d.name}`)
                                    .join(", ")}
                            />
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Domain (for shared hosting) */}
            {order.domain && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Domain
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ConfigRow label="Domain" value={order.domain} />
                        {order.domain_type && (
                            <ConfigRow label="Domain Type" value={order.domain_type === "new" ? "New Registration" : "Existing Domain"} />
                        )}
                    </CardContent>
                </Card>
            )}

            <div className="flex gap-3 pt-2">
                <Button asChild variant="outline">
                    <Link href="/dashboard/orders">View All Orders</Link>
                </Button>
                <Button asChild>
                    <Link href="/hosting/dedicated">Browse More Plans</Link>
                </Button>
            </div>
        </div>
    );
}
