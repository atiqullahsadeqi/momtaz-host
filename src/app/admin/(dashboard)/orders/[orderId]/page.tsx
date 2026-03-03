"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft, Clock, CheckCircle2, XCircle, Ban, Server, Cpu, Globe,
    Package, Settings2, Loader2, AlertCircle, User, Mail, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Order {
    id: string;
    order_type: "dedicated" | "vps" | "shared";
    status: "pending" | "approved" | "rejected" | "cancelled";
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
    user_name: string;
    user_email: string;
}

const STATUS_CONFIG = {
    pending: { label: "Pending Review", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    approved: { label: "Approved", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
    rejected: { label: "Rejected", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
    cancelled: { label: "Cancelled", icon: Ban, color: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" },
};

function ConfigRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground shrink-0">{label}</span>
            <span className="text-sm font-medium text-right">{value}</span>
        </div>
    );
}

export default function AdminOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [adminNotes, setAdminNotes] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/orders/${orderId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.order);
                    setAdminNotes(data.order.admin_notes ?? "");
                } else if (data.error === "Unauthorized" || data.error?.includes("Forbidden")) {
                    router.push("/dashboard");
                } else {
                    setError(data.error ?? "Order not found");
                }
            })
            .catch(() => setError("Failed to load order"))
            .finally(() => setIsLoading(false));
    }, [orderId, router]);

    const updateStatus = async (status: string) => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, adminNotes: adminNotes || undefined }),
            });
            const data = await res.json();
            if (data.success) {
                setOrder(data.order);
                setAdminNotes(data.order.admin_notes ?? "");
            } else {
                throw new Error(data.error ?? "Update failed");
            }
        } catch (err: unknown) {
            setUpdateError(err instanceof Error ? err.message : "Update failed");
        } finally {
            setIsUpdating(false);
        }
    };

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

    const statusCfg = STATUS_CONFIG[order.status];
    const StatusIcon = statusCfg.icon;
    const cfg = order.configuration;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <Link href="/dashboard/admin/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                All Orders
            </Link>

            {/* Status Banner */}
            <Card className={`border ${statusCfg.border} ${statusCfg.bg}`}>
                <CardContent className="p-4 flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${statusCfg.color} shrink-0`} />
                    <div className="flex-1">
                        <p className="font-semibold">Status: {statusCfg.label}</p>
                        <p className="text-xs text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4" /> Customer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ConfigRow label="Name" value={order.user_name} />
                    <ConfigRow label="Email" value={order.user_email} />
                    <ConfigRow label="Placed On" value={new Date(order.created_at).toLocaleString()} />
                </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Package className="w-4 h-4" /> Order Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ConfigRow label="Type" value={{ dedicated: "Dedicated Server", vps: "VPS", shared: "Shared Hosting" }[order.order_type]} />
                    <ConfigRow label="Plan" value={order.plan_name} />
                    <ConfigRow label="Monthly Price" value={`$${parseFloat(order.total_monthly).toFixed(2)}/mo`} />
                    {parseFloat(order.setup_fee) > 0 && <ConfigRow label="Setup Fee" value={`$${parseFloat(order.setup_fee).toFixed(2)}`} />}
                    {order.domain && <ConfigRow label="Domain" value={order.domain} />}
                    {order.domain_type && <ConfigRow label="Domain Type" value={order.domain_type === "new" ? "New registration" : "Existing domain"} />}
                </CardContent>
            </Card>

            {/* Config */}
            {Object.keys(cfg).length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Settings2 className="w-4 h-4" /> Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Object.entries(cfg).map(([key, val]) => {
                            if (Array.isArray(val)) {
                                return <ConfigRow key={key} label={key} value={JSON.stringify(val)} />;
                            }
                            if (val && typeof val === "object") {
                                return <ConfigRow key={key} label={key} value={JSON.stringify(val)} />;
                            }
                            return <ConfigRow key={key} label={key} value={String(val ?? "")} />;
                        })}
                    </CardContent>
                </Card>
            )}

            {/* Admin Action */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Admin Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Notes (optional)</label>
                        <Textarea
                            placeholder="Add internal notes or communicate something to the customer…"
                            value={adminNotes}
                            onChange={e => setAdminNotes(e.target.value)}
                            rows={3}
                        />
                    </div>
                    {updateError && (
                        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {updateError}
                        </div>
                    )}
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateStatus("approved")}
                            disabled={isUpdating || order.status === "approved"}
                        >
                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                            Approve
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => updateStatus("rejected")}
                            disabled={isUpdating || order.status === "rejected"}
                        >
                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                            Reject
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => updateStatus("cancelled")}
                            disabled={isUpdating || order.status === "cancelled"}
                        >
                            <Ban className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                    </div>
                    {order.admin_notes && (
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                            <span className="font-medium">Saved notes: </span>{order.admin_notes}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
